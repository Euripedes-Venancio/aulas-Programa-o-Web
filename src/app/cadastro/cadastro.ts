import { Component } from '@angular/core';
import {Cliente} from '../models/cliente';
import { FormsModule } from '@angular/forms';

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
