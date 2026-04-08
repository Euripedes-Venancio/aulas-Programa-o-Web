import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  fazerLogin() {
    if (!isPlatformBrowser(this.platformId)) return;

    const dados = localStorage.getItem('cliente');

    if (!dados) {
      alert('Nenhum cliente cadastrado.');
      return;
    }

    const cliente: Cliente = JSON.parse(dados);

    if (cliente.email === this.email && cliente.senha === this.senha) {
      localStorage.setItem('usuarioLogado', this.email);
      alert('Login realizado com sucesso!');
      this.router.navigate(['/vitrine']);
    } else {
      alert('Email ou senha incorretos. Revise os dados e tente novamente.');
    }
  }
}