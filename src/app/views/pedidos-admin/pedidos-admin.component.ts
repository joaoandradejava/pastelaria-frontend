import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PedidoModelPagination } from 'src/app/shared/models/pedido-model-pagination';
import { PedidoService } from 'src/app/shared/services/pedido.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-pedidos-admin',
  templateUrl: './pedidos-admin.component.html',
  styleUrls: ['./pedidos-admin.component.scss'],
})
export class PedidosAdminComponent implements OnInit {
  pedidosPagination: PedidoModelPagination;
  pageEvent: PageEvent = new PageEvent();
  tamanho: number;
  formGroup: FormGroup;

  constructor(
    private pedidoService: PedidoService,
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService
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

  saiuParaEntrega(pedidoId: number): void {
    this.pedidoService.saiuParaEntrega(pedidoId).subscribe((data) => {
      this.snackbarService.mostrarMensagemSucesso(
        'O status do pedido foi alterado para saiu para entrega',
        5000
      );
      this.buscarTodos(

      )
    });
  }

  concluido(pedidoId: number): void {
    this.pedidoService.concluido(pedidoId).subscribe((data) => {
      this.snackbarService.mostrarMensagemSucesso(
        'O status do pedido foi alterado para concluido',
        5000
      );
      this.buscarTodos()
    });
  }

  cancelar(pedidoId: number): void {
    this.pedidoService.cancelarImprevisto(pedidoId).subscribe((data) => {
      this.snackbarService.mostrarMensagemSucesso(
        'O status do pedido foi alterado para cancelado',
        5000
      );
      this.buscarTodos()
    });
  }

  buscarTodos(): void {
    this.pedidoService
      .buscarTodasPorPaginacao(
        this.pageEvent.pageIndex,
        this.pageEvent.pageSize
      )
      .subscribe((data) => {
        this.pedidosPagination = data;
        this.pageEvent.length = this.pedidosPagination.totalElements;
      });
  }

  onChangePage(page): void {
    this.pageEvent = page;
    this.buscarTodos();
  }
}
