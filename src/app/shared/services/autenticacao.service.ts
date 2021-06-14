import { ClienteAutenticado } from './../models/cliente-autenticado';
import { Injectable } from '@angular/core';
import { iif } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticacaoService {
  constructor() {}

  public isAdmin(): boolean {
    if (this.isAutenticado()) {
      return this.getClienteAutenticado().isAdmin;
    }

    return false;
  }

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

  public deslogar(): void {
    localStorage.clear()
  }
}
