import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeletarContaComponent } from './deletar-conta.component';

const routes: Routes = [{ path: '', component: DeletarContaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeletarContaRoutingModule { }
