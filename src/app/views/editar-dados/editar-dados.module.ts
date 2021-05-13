import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarDadosRoutingModule } from './editar-dados-routing.module';
import { EditarDadosComponent } from './editar-dados.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgxMaskModule, IConfig } from 'ngx-mask';
export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [EditarDadosComponent],
  imports: [
    CommonModule,
    EditarDadosRoutingModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMaskModule.forRoot(),
  ],
})
export class EditarDadosModule {}
