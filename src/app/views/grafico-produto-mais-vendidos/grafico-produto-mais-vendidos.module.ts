import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficoProdutoMaisVendidosRoutingModule } from './grafico-produto-mais-vendidos-routing.module';
import { GraficoProdutoMaisVendidosComponent } from './grafico-produto-mais-vendidos.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [GraficoProdutoMaisVendidosComponent],
  imports: [
    CommonModule,
    GraficoProdutoMaisVendidosRoutingModule,
    NgApexchartsModule,
    MatButtonModule,
    MatDialogModule

  ]
})
export class GraficoProdutoMaisVendidosModule { }
