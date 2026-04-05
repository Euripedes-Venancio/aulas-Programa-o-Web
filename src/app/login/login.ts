import { Component } from '@angular/core';
import { Cliente } from '../models/cliente';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../services/cliente';
import { RouterModule } from '@angular/router';

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

constructor(private clienteService: ClienteService) {}


  ngOnInit() {
    console.log("Service:", this.clienteService.getCliente());
  }

Login (){
  const dados = localStorage.getItem("cliente");


  if (dados){
    const cliente: Cliente = JSON.parse(dados);
    if (cliente.email === this.email && cliente.senha === this.senha){
      localStorage.setItem('usuarioLogado', this.email);
      alert ("Login realizado com sucesso");
      
    }else{
      alert("Email ou senha incorretos, revise os dados e tente novamente");
    }
  }
}
}