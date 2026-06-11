import { Component, signal, OnInit } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('web02');
  mensagem: string = '';
  busca: string = '';

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    const nome = this.api.getNome();
    if (nome) {
      this.mensagem = 'Olá, ' + nome.charAt(0).toUpperCase() + nome.slice(1) + '!';
    }
  }

  logout() {
    this.api.logout().subscribe({ error: () => {} });
    this.api.limparSessao();
    this.mensagem = '';
    this.router.navigate(['/login']);
  }

  buscar() {
    if (this.router.url.startsWith('/vitrine')) {
      window.dispatchEvent(new CustomEvent('buscaAtualizada', { detail: this.busca }));
    } else {
      this.router.navigate(['/vitrine'], { queryParams: { busca: this.busca } });
    }
  }
}
