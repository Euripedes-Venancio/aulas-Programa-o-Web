import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService, Produto } from '../services/api.service';

interface ProdutoVitrine extends Produto {
  quantidade: number;
}

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine implements OnInit, OnDestroy {
  lista: ProdutoVitrine[] = [];
  listaFiltrada: ProdutoVitrine[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.api.listarProdutos().subscribe({
      next: (produtos) => {
        this.lista = produtos.map(p => ({ ...p, quantidade: 1 }));
        this.listaFiltrada = [...this.lista];
        this.route.queryParams.subscribe(p => {
          this.filtrar(p['busca'] || '');
        });
        this.cdr.markForCheck();
      },
      error: () => alert('Erro ao carregar produtos.')
    });

    window.addEventListener('buscaAtualizada', this.onBusca);
  }

  ngOnDestroy() {
    window.removeEventListener('buscaAtualizada', this.onBusca);
  }

  onBusca = (e: any) => {
    this.filtrar(e.detail || '');
    this.cdr.markForCheck();
  };

  filtrar(termo: string) {
    if (!termo) {
      this.listaFiltrada = [...this.lista];
      return;
    }
    const t = termo.toLowerCase();
    this.listaFiltrada = this.lista.filter(p =>
      (p.nome || '').toLowerCase().includes(t) ||
      (p.keywords || '').toLowerCase().includes(t)
    );
  }

  limparBusca() {
    this.listaFiltrada = [...this.lista];
  }

  selecionarProduto(produto: ProdutoVitrine) {
    // Apenas navega — a rota já cuida do resto
  }

  adicionarCarrinho(produto: ProdutoVitrine) {
    const email = this.api.getEmail();
    if (!email) {
      alert('Você precisa estar logado para adicionar ao carrinho.');
      this.router.navigate(['/login']);
      return;
    }
    const qtd = produto.quantidade || 1;
    this.api.adicionarAoCarrinho(email, produto.id, qtd).subscribe({
      next: () => alert('Produto adicionado à cesta!'),
      error: (err) => alert(err.error?.erro || 'Erro ao adicionar ao carrinho.')
    });
  }
}