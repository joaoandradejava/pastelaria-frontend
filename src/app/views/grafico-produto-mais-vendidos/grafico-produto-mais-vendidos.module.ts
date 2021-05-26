import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficoProdutoMaisVendidosRoutingModule } from './grafico-produto-mais-vendidos-routing.module';
import { GraficoProdutoMaisVendidosComponent } from './grafico-produto-mais-vendidos.component';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [GraficoProdutoMaisVendidosComponent],
  imports: [
    CommonModule,
    GraficoProdutoMaisVendidosRoutingModule,
    NgApexchartsModule
  ]
})
export class GraficoProdutoMaisVendidosModule { }
