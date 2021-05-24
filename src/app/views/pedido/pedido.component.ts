import { PedidoFullModel } from './../../shared/models/pedido-full-model';
import { ActivatedRoute } from '@angular/router';
import { PedidoService } from './../../shared/services/pedido.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.scss']
})
export class PedidoComponent implements OnInit {

  pedidoFullModel: PedidoFullModel

  constructor(private pedidoService: PedidoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.pedidoService.buscarPorId(data.id).subscribe(data => {
        this.pedidoFullModel = data
      })
    })
  }

}
