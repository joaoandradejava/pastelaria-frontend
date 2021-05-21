import { Backend } from './../utils/backend';
import { Observable } from 'rxjs';
import { PedidoCreate } from './../models/pedido-create';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  constructor(private http: HttpClient) {}

  public fazerPedido(pedidoCreate: PedidoCreate): Observable<any> {
    return this.http.post(Backend.basePedido, pedidoCreate);
  }
}
