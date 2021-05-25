import { HabilidadeComponent } from './../../components/habilidade/habilidade.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SobreRoutingModule } from './sobre-routing.module';
import { SobreComponent } from './sobre.component';


@NgModule({
  declarations: [SobreComponent, HabilidadeComponent],
  imports: [
    CommonModule,
    SobreRoutingModule
  ]
})
export class SobreModule { }
