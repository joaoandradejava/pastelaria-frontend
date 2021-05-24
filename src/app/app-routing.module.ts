import { CarrinhoDeComprasComponent } from './components/carrinho-de-compras/carrinho-de-compras.component';
import { AutenticadoGuard } from './shared/guards/autenticado.guard';
import { ProdutoItemComponent } from './views/produto-item/produto-item.component';
import { HomeComponent } from './views/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdministradorGuard } from './shared/guards/administrador.guard';

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
  {
    path: 'produtos',
    loadChildren: () =>
      import('./views/produtos/produtos.module').then((m) => m.ProdutosModule),
    canActivate: [AutenticadoGuard],
  },
  {
    path: 'meus-enderecos',
    loadChildren: () =>
      import('./views/meus-enderecos/meus-enderecos.module').then(
        (m) => m.MeusEnderecosModule
      ),
    canActivate: [AutenticadoGuard],
  },
  {
    path: 'carrinho-compras',
    component: CarrinhoDeComprasComponent,
    canActivate: [AutenticadoGuard],
  },
  {
    path: 'meus-pedidos',
    loadChildren: () =>
      import('./views/meus-pedidos/meus-pedidos.module').then(
        (m) => m.MeusPedidosModule
      ),
    canActivate: [AutenticadoGuard],
  },
  {
    path: 'pedido/:id',
    loadChildren: () =>
      import('./views/pedido/pedido.module').then((m) => m.PedidoModule),
    canActivate: [AutenticadoGuard],
  },
  {
    path: 'categorias',
    loadChildren: () =>
      import('./views/categorias/categorias.module').then(
        (m) => m.CategoriasModule
      ),
    canActivate: [AutenticadoGuard, AdministradorGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
