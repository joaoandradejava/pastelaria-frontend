import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarDadosComponent } from './editar-dados.component';

const routes: Routes = [{ path: '', component: EditarDadosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarDadosRoutingModule { }
