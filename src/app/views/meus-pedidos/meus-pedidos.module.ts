import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeusPedidosRoutingModule } from './meus-pedidos-routing.module';
import { MeusPedidosComponent } from './meus-pedidos.component';


@NgModule({
  declarations: [MeusPedidosComponent],
  imports: [
    CommonModule,
    MeusPedidosRoutingModule
  ]
})
export class MeusPedidosModule { }
