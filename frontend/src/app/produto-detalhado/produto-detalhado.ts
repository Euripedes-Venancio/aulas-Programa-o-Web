import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-produto-detalhado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-detalhado.html',
  styleUrl: './produto-detalhado.css',
})
export class ProdutoDetalhado implements OnInit {
  // O HTML usa produto.qtd — usamos any para flexibilidade
  produto: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.api.buscarProdutoPorId(id).subscribe({
        next: (p) => this.produto = { ...p, qtd: 1 },
        error: () => alert('Produto não encontrado.')
      });
    }
  }

  // O HTML chama adicionarCarrinho(produto)
  adicionarCarrinho(produto: any) {
    const email = this.api.getEmail();
    if (!email) {
      alert('Você precisa estar logado para adicionar ao carrinho.');
      this.router.navigate(['/login']);
      return;
    }
    this.api.adicionarAoCarrinho(email, produto.id, produto.qtd || 1).subscribe({
      next: () => alert('Produto adicionado à cesta! 🛒'),
      error: (err) => alert(err.error?.erro || 'Erro ao adicionar.')
    });
  }
}
