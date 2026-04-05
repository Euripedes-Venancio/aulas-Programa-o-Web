import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cesta',
  imports: [CommonModule],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css',
})

export class Cesta {

  carrinho: any[] = [];

ngOnInit() {
  this.carrinho = JSON.parse(localStorage.getItem('carrinho') || '[]');
}
getTotal() {
  return this.carrinho.reduce((total, item) => {
    return total + (item.valor * item.quantidade);
  }, 0);
}

limparCesta() {
  this.carrinho = [];
  localStorage.removeItem('carrinho');
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
