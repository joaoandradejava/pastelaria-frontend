import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeletarContaRoutingModule } from './deletar-conta-routing.module';
import { DeletarContaComponent } from './deletar-conta.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [DeletarContaComponent],
  imports: [
    CommonModule,
    DeletarContaRoutingModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class DeletarContaModule {}
