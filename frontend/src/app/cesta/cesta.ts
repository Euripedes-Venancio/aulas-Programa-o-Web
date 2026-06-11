import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cesta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cesta.html',
  styleUrl: './cesta.css',
})
export class Cesta implements OnInit {
  carrinho: any[] = [];

  constructor(private api: ApiService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const email = this.api.getEmail();
    if (!email) {
      alert('Você precisa estar logado para ver sua cesta.');
      this.router.navigate(['/login']);
      return;
    }
    this.api.listarCarrinho(email).subscribe({
      next: (itens) => {
        this.carrinho = itens.map(i => ({
          id:     i.id,
          produtoId: i.produtoId,
          nome:   i.nomeProduto,
          imagem: i.imagemProduto,
          valor:  i.valorUnitario,
          qtd:    i.quantidade
        }));
        this.cdr.markForCheck();
      },
      error: () => alert('Erro ao carregar carrinho.')
    });
  }

  getTotal() {
    return this.carrinho.reduce((t, i) => t + i.valor * i.qtd, 0);
  }

  aumentarQuantidade(item: any) {
    this.api.atualizarItem(item.id, item.qtd + 1).subscribe({
      next: (atualizado) => {
        item.qtd = atualizado.quantidade;
        this.cdr.markForCheck();
      }
    });
  }

  diminuirQuantidade(item: any) {
    if (item.qtd <= 1) return;
    this.api.atualizarItem(item.id, item.qtd - 1).subscribe({
      next: (atualizado) => {
        item.qtd = atualizado.quantidade;
        this.cdr.markForCheck();
      }
    });
  }

  removerItem(item: any) {
    this.api.removerItem(item.id).subscribe({
      next: () => {
        this.carrinho = this.carrinho.filter(i => i.id !== item.id);
        this.cdr.markForCheck();
      }
    });
  }

  limparCesta() {
    const ids = [...this.carrinho.map(i => i.id)];
    ids.forEach(id => this.api.removerItem(id).subscribe());
    this.carrinho = [];
    this.cdr.markForCheck();
  }

  finalizarCompra() {
    if (this.carrinho.length === 0) { alert('A cesta está vazia!'); return; }
    const email = this.api.getEmail()!;
    this.api.finalizarCompra(email).subscribe({
      next: (res) => {
        alert(`Compra realizada!\nTotal: R$ ${res.total.toFixed(2)}`);
        this.carrinho = [];
        this.cdr.markForCheck();
      },
      error: (err) => alert(err.error?.erro || 'Erro ao finalizar compra.')
    });
  }
}