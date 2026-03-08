import { Component } from '@angular/core';
import { Cliente } from '../models/cliente';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  senha: string = '';

Login (){
  const dados = localStorage.getItem("cliente");


  if (dados){
    const cliente: Cliente = JSON.parse(dados);
    if (cliente.email === this.email && cliente.senha === this.senha){
      alert ("Login realizado com sucesso");
      
    }else{
      alert("Email ou senha incorretos, revise os dados e tente novamente");
    }
  }
}
}