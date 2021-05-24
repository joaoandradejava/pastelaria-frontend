import { PedidoModelPagination } from './../../shared/models/pedido-model-pagination';
import { PedidoService } from './../../shared/services/pedido.service';
import { Component, OnInit } from '@angular/core';

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

}
