import { ProdutoModelPagination } from '../../shared/models/produto-model-pagination';
import { ProdutoService } from '../../shared/services/produto.service';
import { categoriaModel } from '../../shared/models/categoria-model';
import { Observable } from 'rxjs';
import { CategoriaService } from '../../shared/services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categorias: Observable<categoriaModel[]>;
  produtoModelPaginatio: ProdutoModelPagination;
  pageEvent: PageEvent = new PageEvent();

  categoriaSelecionada: categoriaModel;

  constructor(
    private categoriaService: CategoriaService,
    private produtoService: ProdutoService
  ) {}

  ngOnInit(): void {
    this.pageEvent.pageSize = 8;
    this.pageEvent.pageIndex = 0;
    this.categorias = this.categoriaService.buscarTodos();

    this.buscarTodosProdutosDeFormaPaginada(
      this.pageEvent.pageSize,
      this.pageEvent.pageIndex
    );
  }

  private buscarTodosProdutosDeFormaPaginada(
    tamanho: number,
    pagina: number
  ): void {
    this.produtoService
      .buscarTodosProdutosDisponiveis(tamanho, pagina)
      .subscribe((data) => {
        this.produtoModelPaginatio = data;
        this.pageEvent.length = this.produtoModelPaginatio.totalElements;
      });
  }

  private buscarTodosProdutosPorCategoriaEDeFormaPaginada(
    categoriaId: number,
    tamanho: number,
    pagina: number
  ): void {
    this.produtoService
      .buscarTodosProdutosPorCategoriaEDisponiveisNoEstoque(
        categoriaId,
        pagina,
        tamanho
      )
      .subscribe((data) => {
        this.produtoModelPaginatio = data;
        this.pageEvent.length = this.produtoModelPaginatio.totalElements;
      });
  }

  onChangePage(event): void {
    this.pageEvent = event;
    if (this.categoriaSelecionada == undefined) {
      this.buscarTodosProdutosDeFormaPaginada(
        this.pageEvent.pageSize,
        this.pageEvent.pageIndex
      );
    } else {
      this.buscarTodosProdutosPorCategoriaEDeFormaPaginada(
        this.categoriaSelecionada.id,
        this.pageEvent.pageSize,
        this.pageEvent.pageIndex
      );
    }
  }

  todos(): void {
    this.categoriaSelecionada = undefined;
    this.buscarTodosProdutosDeFormaPaginada(this.pageEvent.pageSize, 0);
  }

  public selecionarCategoria(categoria): void {
    this.categoriaSelecionada = categoria;
    this.buscarTodosProdutosPorCategoriaEDeFormaPaginada(
      categoria.id,
      this.pageEvent.pageSize,
      0
    );
  }
}
