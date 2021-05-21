import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MeusEnderecosComponent } from './meus-enderecos.component';

const routes: Routes = [{ path: '', component: MeusEnderecosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeusEnderecosRoutingModule { }
