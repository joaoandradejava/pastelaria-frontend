import { EsqueciSenhaInput } from './../models/esqueci-senha-input';
import { MudarSenhaInput } from './../models/mudar-senha-input';
import { ClienteUpdateInput } from './../models/cliente-update-input';
import { Backend } from './../utils/backend';
import { ClienteCreateInput } from './../models/cliente-create-input';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private http: HttpClient) {}

  public cadastrar(clienteCreateInput: ClienteCreateInput): Observable<any> {
    return this.http.post(Backend.baseCliente, clienteCreateInput);
  }

  public buscarPorId(id: number): Observable<any> {
    return this.http.get(Backend.baseCliente + `/${id}`);
  }

  public atualizar(
    clienteUpdateInput: ClienteUpdateInput,
    id: number
  ): Observable<any> {
    return this.http.put(Backend.baseCliente + `/${id}`, clienteUpdateInput);
  }

  public mudarSenha(mudarSenhaInput: MudarSenhaInput): Observable<any> {
    return this.http.put(Backend.baseCliente + `/senha`, mudarSenhaInput);
  }

  public deletarConta(id: number): Observable<any> {
    return this.http.delete(Backend.baseCliente + `/${id}`);
  }

  public esqueciSenha(esqueciSenhaInput: EsqueciSenhaInput): Observable<any> {
    return this.http.put(
      Backend.baseCliente + `/esqueci-senha`,
      esqueciSenhaInput
    );
  }
}
