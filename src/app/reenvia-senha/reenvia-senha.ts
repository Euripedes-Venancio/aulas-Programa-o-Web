import { Component } from '@angular/core';
import { Cliente } from '../models/cliente';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reenvia-senha',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './reenvia-senha.html',
  styleUrl: './reenvia-senha.css',
})
export class ReenviaSenha {
  email: string ='';

  reenviar(){
    const dados = localStorage.getItem("cliente");

    if(dados){
      const cliente: Cliente = JSON.parse(dados);
      if(cliente.email ===this.email){
        alert("Sua senha é:" + cliente.senha);
      }else{alert("Email não encontrado/cadastrado")

      }
    }
  }
}
