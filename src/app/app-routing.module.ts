import { AutenticadoGuard } from './shared/guards/autenticado.guard';
import { ProdutoItemComponent } from './views/produto-item/produto-item.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'produto-item/:id', component: ProdutoItemComponent },
  {
    path: 'editar-dados',
    loadChildren: () =>
      import('./views/editar-dados/editar-dados.module').then(
        (m) => m.EditarDadosModule
      ),
    canActivate: [AutenticadoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
