import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Vitrine } from '../vitrine/vitrine'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-produto-detalhado',
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-detalhado.html',
  styleUrl: './produto-detalhado.css',
})
export class ProdutoDetalhado implements OnInit {
  produto: any;

  ngOnInit() {
    const dados = localStorage.getItem('produtoSelecionado');
    
    if (dados) {
    this.produto = JSON.parse(dados);
    this.produto.qtd = 1; 
  }
}
adicionarCarrinho(produto: any) {

  let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

  let existente = carrinho.find((p: any) => p.id === produto.id);

  if (existente) {
    existente.qtd += produto.qtd || 1;
  } else {
    carrinho.push({
      ...produto,
      qtd: produto.qtd || 1
    });
  }

  localStorage.setItem('carrinho', JSON.stringify(carrinho));

  alert('Produto adicionado ao carrinho!');
}
}


