import { ClienteAutenticado } from './../models/cliente-autenticado';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor() {}

  public isAutenticado(): boolean {
    return !(
      localStorage.getItem('cliente-autenticado') === null ||
      localStorage.getItem('cliente-autenticado') === undefined ||
      localStorage.getItem('cliente-autenticado') === ''
    );
  }

  public getClienteAutenticado(): ClienteAutenticado {
    let clienteAutenticado: ClienteAutenticado = JSON.parse(
      localStorage.getItem('cliente-autenticado')
    );

    return clienteAutenticado;
  }
}
