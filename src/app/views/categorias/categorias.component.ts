import { CategoriaModelPagination } from 'src/app/shared/models/categoria-model-pagination';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackbarService } from './../../shared/services/snackbar.service';
import { CategoriaService } from './../../shared/services/categoria.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CategoriaInputComponent } from 'src/app/components/categoria-input/categoria-input.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss'],
})
export class CategoriasComponent implements OnInit {
  categoriasPagination: CategoriaModelPagination;
  pageEvent: PageEvent = new PageEvent();
  tamanho: number;
  formGroup: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.pageEvent.pageSize = 5;
    this.pageEvent.pageIndex = 0;

    this.buscarTodos();

    this.formGroup = this.formBuilder.group({
      nome: [''],
    });

    this.formGroup
      .get('nome')
      .valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
      .subscribe((data) => {
        this.pageEvent.pageIndex = 0;
        this.buscarTodos();
      });
  }

  openModalNovoCategoria(): void {
    const dialogRef = this.dialog.open(CategoriaInputComponent);

    dialogRef.afterClosed().subscribe((data) => {
      this.buscarTodos();
    });
  }

  openModalEditarCategoria(id: number): void {
    const dialogRef = this.dialog.open(CategoriaInputComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.buscarTodos();
    });
  }

  deletarPorId(id: number, nome: string) {
    if (confirm(`Você realmente deseja deletar o categoria ${nome}?`)) {
      this.categoriaService.deletarPorId(id).subscribe((data) => {
        this.buscarTodos();
        this.snackbarService.mostrarMensagemSucesso(
          `O categoria ${nome} foi deletado com sucesso!`,
          5000
        );
      });
    }
  }

  public limpar(): void {
    this.formGroup.reset();
  }

  buscarTodos(): void {
    let nome: string = this.formGroup?.get('nome').value
      ? this.formGroup?.get('nome').value
      : '';
    console.log(nome);
    this.categoriaService
      .buscarTodasPorPaginacao(
        this.pageEvent.pageIndex,
        this.pageEvent.pageSize,
        nome
      )
      .subscribe((data) => {
        this.categoriasPagination = data;
        this.pageEvent.length = this.categoriasPagination.totalElements;
      });
  }

  onChangePage(page): void {
    this.pageEvent = page;
    this.buscarTodos();
  }
}
