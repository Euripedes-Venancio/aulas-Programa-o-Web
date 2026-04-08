import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css',
})
export class Cesta {
  carrinho: any[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    this.carregarCarrinho();
  }

  carregarCarrinho() {
    if (isPlatformBrowser(this.platformId)) {
      this.carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
    }
  }

  getTotal() {
    return this.carrinho.reduce((total, item) => {
      return total + (item.valor * item.qtd);
    }, 0);
  }

  aumentarQuantidade(item: any) {
    if (item.qtd < item.estoque) {
      item.qtd++;
      this.salvarCarrinho();
    }
  }

  diminuirQuantidade(item: any) {
    if (item.qtd > 1) {
      item.qtd--;
      this.salvarCarrinho();
    }
  }

  removerItem(itemRemover: any) {
    this.carrinho = this.carrinho.filter(item => item.id !== itemRemover.id);
    this.salvarCarrinho();
  }

  salvarCarrinho() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('carrinho', JSON.stringify(this.carrinho));
    }
  }

  limparCesta() {
    this.carrinho = [];

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('carrinho');
    }
  }

  finalizarCompra() {
    if (this.carrinho.length === 0) {
      alert('A cesta está vazia!');
      return;
    }

    alert('Compra realizada com sucesso! 🎉');
    this.limparCesta();
  }
}