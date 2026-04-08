import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-reenvia-senha',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reenvia-senha.html',
  styleUrl: './reenvia-senha.css',
})
export class ReenviaSenha {
  email: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  reenviar() {
    if (!isPlatformBrowser(this.platformId)) return;

    const dados = localStorage.getItem('cliente');

    if (dados) {
      const cliente: Cliente = JSON.parse(dados);

      if (cliente.email === this.email) {
        alert('Sua senha é: ' + cliente.senha);
      } else {
        alert('Email não encontrado/cadastrado.');
      }
    } else {
      alert('Nenhum cliente cadastrado.');
    }
  }
}