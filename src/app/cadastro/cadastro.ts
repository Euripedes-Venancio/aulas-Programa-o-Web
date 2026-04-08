import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  cliente: Cliente = new Cliente();

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  cadastrar() {
    if (!this.cliente.nome || !this.cliente.email || !this.cliente.senha) {
      alert('Preencha todos os campos.');
      return;
    }

    if (!isPlatformBrowser(this.platformId)) return;

    const clienteSerializado = JSON.stringify(this.cliente);
    localStorage.setItem('cliente', clienteSerializado);

    alert('Cliente cadastrado com sucesso!');
    this.router.navigate(['/login']);
  }
}