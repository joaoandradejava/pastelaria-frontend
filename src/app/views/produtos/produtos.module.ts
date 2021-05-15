import { ProdutoAcaoAvancadaComponent } from './../../components/produto-acao-avancada/produto-acao-avancada.component';
import { CategoriaService } from './../../shared/services/categoria.service';
import { ProdutoService } from './../../shared/services/produto.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ProdutoInputComponent } from './../../components/produto-input/produto-input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    ProdutosComponent,
    ProdutoInputComponent,
    ProdutoAcaoAvancadaComponent,
  ],
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    MatPaginatorModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [ProdutoService, CategoriaService],
})
export class ProdutosModule {}
