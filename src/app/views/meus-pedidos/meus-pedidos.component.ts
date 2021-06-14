import { SituacaoPedido } from './../../shared/models/situacao-pedido';
import { PedidoModelPagination } from './../../shared/models/pedido-model-pagination';
import { PedidoService } from './../../shared/services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { SituacaoPagamento } from 'src/app/shared/models/situacao-pagamento';

@Component({
  selector: 'app-meus-pedidos',
  templateUrl: './meus-pedidos.component.html',
  styleUrls: ['./meus-pedidos.component.scss']
})
export class MeusPedidosComponent implements OnInit {

  pedidoModelPagination: PedidoModelPagination

  constructor(private pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.buscarTodos(0, 20).subscribe(data => {
      this.pedidoModelPagination = data
    })
  }

  public getValorSituacaoPedido(value: string): string {
    return SituacaoPedido[value];
  }

  public getValorSituacaoPagamento(value: string): string {
    return SituacaoPagamento[value]
  }

}
