import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  // O HTML usa cliente.nome, cliente.email, cliente.senha
  cliente = { nome: '', email: '', senha: '' };

  constructor(private router: Router, private api: ApiService) {}

  cadastrar() {
    if (!this.cliente.nome || !this.cliente.email || !this.cliente.senha) {
      alert('Preencha todos os campos.');
      return;
    }

    this.api.cadastrar(this.cliente.nome, this.cliente.email, this.cliente.senha).subscribe({
      next: () => {
        alert('Cadastro realizado com sucesso!');
        this.router.navigate(['/login']);
      },
      error: (err) => alert(err.error?.erro || 'Erro ao cadastrar.')
    });
  }
}
