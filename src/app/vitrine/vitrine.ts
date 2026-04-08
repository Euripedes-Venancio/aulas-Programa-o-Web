import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Produto } from '../model/produto';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './vitrine.html',
  styleUrl: './vitrine.css',
})
export class Vitrine {

  lista: Produto[] = [
    {
      id: 1,
      nome: "Pastel de 'Flango'",
      imagem: "/pastel-de-pombo.png",
      descritivo: "Delicioso pastel de Pombo...",
      valor: 12,
      quantidade: 1,
      keywords: "flango, pombo, pastel",
      estoque: 50,
    },
    {
      id: 2,
      nome: "Pastel de 'Carne'",
      imagem: "/pastel-de-cachorro.png",
      descritivo: "Clássico pastel de carne...",
      valor: 11,
      quantidade: 1,
      keywords: "pastel, carne, cachorro",
      estoque: 30,
    },
    {
      id: 3,
      nome: "Pastel Especial",
      imagem: "/pastel-de-rato.png",
      descritivo: "Magnífico pastel...",
      valor: 20,
      quantidade: 1,
      keywords: "pastel, especial, rato",
      estoque: 5,
    },
    {
      id: 4,
      nome: "Pastel de Goiaba",
      imagem: "/pastel-de-goiaba.jpeg",
      descritivo: "Delicioso pastel de goiaba",
      valor: 30,
      quantidade: 1,
      keywords: "pastel, goiaba",
      estoque: 15,
    },
    {
      id: 5,
      nome: "Caldo de Cana",
      imagem: "/imagem-caldo-de-cana.jpg",
      descritivo: "Caldo de cana feito...",
      valor: 7,
      quantidade: 1,
      keywords: "caldo de cana",
      estoque: 10,
    }
  ];

  listaFiltrada: Produto[] = [];

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.listaFiltrada = [...this.lista];

    if (isPlatformBrowser(this.platformId)) {
      this.aplicarBusca();

      window.addEventListener('buscaAtualizada', this.atualizarBusca);
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('buscaAtualizada', this.atualizarBusca);
    }
  }

  atualizarBusca = () => {
    this.aplicarBusca();
  };

  aplicarBusca() {
    if (!isPlatformBrowser(this.platformId)) {
      this.listaFiltrada = [...this.lista];
      return;
    }

    const termo = localStorage.getItem('busca') || '';
    const busca = termo.toLowerCase().trim();

    if (!busca) {
      this.listaFiltrada = [...this.lista];
      return;
    }

    this.listaFiltrada = this.lista.filter((produto: Produto) =>
      produto.nome.toLowerCase().includes(busca) ||
      produto.keywords?.toLowerCase().includes(busca)
    );
  }

  limparBusca() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('busca');
    }
    this.listaFiltrada = [...this.lista];
  }

  selecionarProduto(produto: Produto) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('produtoSelecionado', JSON.stringify(produto));
    }
  }

  adicionarCarrinho(produto: Produto) {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    let carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');

    let existente = carrinho.find((p: any) => p.id === produto.id);

    const quantidadeSelecionada = produto.quantidade || 1;

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