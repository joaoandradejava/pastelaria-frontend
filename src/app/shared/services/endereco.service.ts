import { AutenticacaoService } from './autenticacao.service';
import { Backend } from './../utils/backend';
import { EnderecoInput } from './../models/endereco-input';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EnderecoService {
  constructor(
    private http: HttpClient,
    private autenticacaoService: AutenticacaoService
  ) {}

  public buscarEndereco(cep: string): Observable<any> {
    return this.http.get(`https://viacep.com.br/ws/${cep}/json/`);
  }

  public inserirEndereco(
    clienteId: number,
    enderecoInput: EnderecoInput
  ): Observable<any> {
    return this.http.post(
      Backend.baseCliente + `/${clienteId}/enderecos`,
      enderecoInput,
      {
        headers: {
          Authorization:
            this.autenticacaoService.getClienteAutenticado().tokenJwt,
        },
      }
    );
  }

  public buscarEnderecoDoCliente(clienteId: number): Observable<any> {
    return this.http.get(Backend.baseCliente + `/${clienteId}/enderecos`, {
      headers: {
        Authorization:
          this.autenticacaoService.getClienteAutenticado().tokenJwt,
      },
    });
  }

  public deletarEnderecoDoCliente(
    clienteId: number,
    enderecoId: number
  ): Observable<any> {
    return this.http.delete(
      Backend.baseCliente + `/${clienteId}/enderecos/${enderecoId}`,
      {
        headers: {
          Authorization:
            this.autenticacaoService.getClienteAutenticado().tokenJwt,
        },
      }
    );
  }
}
