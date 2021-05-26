import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GraficoProdutoMaisVendidosComponent } from './grafico-produto-mais-vendidos.component';

const routes: Routes = [{ path: '', component: GraficoProdutoMaisVendidosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GraficoProdutoMaisVendidosRoutingModule { }
