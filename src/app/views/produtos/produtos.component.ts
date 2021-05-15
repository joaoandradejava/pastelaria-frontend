import { ProdutoAcaoAvancadaComponent } from './../../components/produto-acao-avancada/produto-acao-avancada.component';
import { ProdutoInputComponent } from './../../components/produto-input/produto-input.component';
import { PageEvent } from '@angular/material/paginator';
import { ProdutoModelPagination } from './../../shared/models/produto-model-pagination';
import { ProdutoService } from './../../shared/services/produto.service';
import { Component, OnInit } from '@angular/core';
import { ProdutoModel } from 'src/app/shared/models/produto-model';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss'],
})
export class ProdutosComponent implements OnInit {
  produtosPagination: ProdutoModelPagination;
  pageEvent: PageEvent = new PageEvent();
  tamanho: number;
  formGroup: FormGroup;

  constructor(
    private produtoService: ProdutoService,
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
        this.buscarTodos();
      });
  }

  openModalNovoProduto(): void {
    const dialogRef = this.dialog.open(ProdutoInputComponent);

    dialogRef.afterClosed().subscribe((data) => {
      this.buscarTodos();
    });
  }

  openModalEditarProduto(id: number): void {
    const dialogRef = this.dialog.open(ProdutoInputComponent, {
      data: { id: id },
    });

    dialogRef.afterClosed().subscribe((data) => {
      this.buscarTodos();
    });
  }

  deletarPorId(id: number, nome: string) {
    if (confirm(`Você realmente deseja deletar o produto ${nome}?`)) {
      this.produtoService.deletarPorId(id).subscribe((data) => {
        this.buscarTodos();
        this.snackbarService.mostrarMensagemSucesso(
          `O produto ${nome} foi deletado com sucesso!`,
          5000
        );
      });
    }
  }
  public openModalAcaoAvancada(id: number): void {
    const dialogRef = this.dialog.open(ProdutoAcaoAvancadaComponent, {
      data: { id: id },
    });
  }

  public limpar(): void {
    this.formGroup.reset();
  }

  buscarTodos(): void {
    let nome: string = this.formGroup?.get('nome').value
      ? this.formGroup?.get('nome').value
      : '';
    console.log(nome);
    this.produtoService
      .buscarTodos(this.pageEvent.pageIndex, this.pageEvent.pageSize, nome)
      .subscribe((data) => {
        this.produtosPagination = data;
        this.pageEvent.length = this.produtosPagination.totalElements;
      });
  }

  buscarFoto(produto: ProdutoModel): string {
    return produto.avatarUrl
      ? produto.avatarUrl
      : '../../../assets/images/sem-imagem.png';
  }

  onChangePage(page): void {
    this.pageEvent = page;
    this.buscarTodos();
  }
}
