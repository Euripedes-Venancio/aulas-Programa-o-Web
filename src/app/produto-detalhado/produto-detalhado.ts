import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-produto-detalhado',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-detalhado.html',
  styleUrl: './produto-detalhado.css',
})
export class ProdutoDetalhado implements OnInit {
  produto: any = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const dados = localStorage.getItem('produtoSelecionado');

      if (dados) {
        this.produto = JSON.parse(dados);
        this.produto.qtd = 1;
      }
    }
  }

  adicionarCarrinho(produto: any) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    let existente = carrinho.find((p: any) => p.id === produto.id);

    const quantidadeSelecionada = produto.qtd || 1;

    if (existente) {
      existente.qtd += quantidadeSelecionada;
    } else {
      carrinho.push({
        ...produto,
        qtd: quantidadeSelecionada
      });
    }

    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    alert('Produto adicionado à cesta!');
  }
}