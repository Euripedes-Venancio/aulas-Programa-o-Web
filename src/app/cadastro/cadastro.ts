import { Component } from '@angular/core';
import {Cliente} from '../models/cliente';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../services/cliente';

export class CadastroComponent {

  cliente: Cliente = new Cliente();

  constructor(private clienteService: ClienteService) {}

  cadastrar() {
    this.clienteService.setCliente(this.cliente);
    console.log("ENVIADO:", this.cliente);
  }
}

@Component({
  selector: 'app-cadastro',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  cliente: Cliente = new Cliente();
  cadastrar (){
    const clienteserializado = JSON.stringify(this.cliente);
    localStorage.setItem("cliente",clienteserializado);
    alert ("cliente cadastrado");
  }
}
