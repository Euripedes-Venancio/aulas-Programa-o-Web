import { Injectable } from '@angular/core';
import { Cliente } from './models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private cliente: Cliente = new Cliente();

  setCliente(c: Cliente) {
    this.cliente = c;
  }

  getCliente(): Cliente {
    return this.cliente;
  }
}