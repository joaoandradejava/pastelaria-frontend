import { ClienteService } from './../../shared/services/cliente.service';
import { EnderecoService } from './../../shared/services/endereco.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { NovoEnderecoComponent } from './../../components/novo-endereco/novo-endereco.component';
import { CardEnderecoComponent } from './../../components/card-endereco/card-endereco.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeusEnderecosRoutingModule } from './meus-enderecos-routing.module';
import { MeusEnderecosComponent } from './meus-enderecos.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [
    MeusEnderecosComponent,
    CardEnderecoComponent,
    NovoEnderecoComponent,
  ],
  imports: [
    CommonModule,
    MeusEnderecosRoutingModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
  ],
  providers: [
    EnderecoService,
    ClienteService,
  ],
})
export class MeusEnderecosModule {}
