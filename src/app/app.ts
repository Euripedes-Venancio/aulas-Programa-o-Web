import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { Router } from '@angular/router';


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

  constructor(private router: Router) {}

logout() {
  localStorage.removeItem('usuarioLogado'); // remove login
  this.mensagem = ''; // limpa o "Olá ..."
  
  this.router.navigate(['/login']); // opcional (recomendado)
}

  buscar() {

    localStorage.setItem('busca', this.busca);

    
    if (this.router.url === '/vitrine') {
      window.dispatchEvent(new Event('buscaAtualizada'));
    } 
    else {
      this.router.navigate(['/vitrine']);
    }

  }
  formatarNome(nome: string) {
  return nome.charAt(0).toUpperCase() + nome.slice(1);
}
  ngOnInit() {

  const email = localStorage.getItem('usuarioLogado');

  if (email) {

    const nome = email.split('@')[0]; // pega antes do @

    this.mensagem = 'Olá ' + this.formatarNome(nome);

  }

}
}