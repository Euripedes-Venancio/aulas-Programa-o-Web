import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/api.service';

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

  constructor(private router: Router, private api: ApiService) {}

  fazerLogin() {
    if (!this.email || !this.senha) { alert('Preencha todos os campos.'); return; }

    this.api.login(this.email, this.senha).subscribe({
      next: (res) => {
        this.api.salvarSessao(res.nome, res.email);
        alert('Login realizado com sucesso!');
        this.router.navigate(['/vitrine']);
      },
      error: (err) => alert(err.error?.erro || 'Email ou senha incorretos.')
    });
  }
}
