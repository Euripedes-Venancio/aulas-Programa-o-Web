import { Component, signal, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('web02');

  mensagem: string = '';
  busca: string = '';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuarioLogado');
    }

    this.mensagem = '';
    this.router.navigate(['/login']);
  }

  buscar() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('busca', this.busca);

      if (this.router.url === '/vitrine') {
        window.dispatchEvent(new Event('buscaAtualizada'));
      } else {
        this.router.navigate(['/vitrine']);
      }
    }
  }

  formatarNome(nome: string) {
    return nome.charAt(0).toUpperCase() + nome.slice(1);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      const email = localStorage.getItem('usuarioLogado');

      if (email) {
        const nome = email.split('@')[0];
        this.mensagem = 'Olá ' + this.formatarNome(nome);
      }
    }
  }
}