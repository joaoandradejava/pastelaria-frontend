import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidosAdminRoutingModule } from './pedidos-admin-routing.module';
import { PedidosAdminComponent } from './pedidos-admin.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [PedidosAdminComponent],
  imports: [
    CommonModule,
    PedidosAdminRoutingModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
})
export class PedidosAdminModule {}
