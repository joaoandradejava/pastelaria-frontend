import { SituacaoPedido } from './../../shared/models/situacao-pedido';
import { PedidoFullModel } from './../../shared/models/pedido-full-model';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from './../../shared/services/pedido.service';
import { Component, OnInit } from '@angular/core';
import { SituacaoPagamento } from 'src/app/shared/models/situacao-pagamento';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss'],
})
export class PedidoComponent implements OnInit {
  pedidoFullModel: PedidoFullModel;

  constructor(
    private pedidoService: PedidoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.pedidoService.buscarPorId(data.id).subscribe((data) => {
        this.pedidoFullModel = data;
      });
    });
  }

  public getValorSituacaoPedido(value: string): string {
    return SituacaoPedido[value];
  }

  public getValorSituacaoPagamento(value: string): string {
    return SituacaoPagamento[value];
  }
}
