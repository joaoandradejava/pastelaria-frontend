import { ProdutoFullModel } from './../../shared/models/produto-full-model';
import { ProdutoService } from './../../shared/services/produto.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-produto-acao-avancada',
  templateUrl: './produto-acao-avancada.component.html',
  styleUrls: ['./produto-acao-avancada.component.scss'],
})
export class ProdutoAcaoAvancadaComponent implements OnInit {
  produtoFullModel: ProdutoFullModel;

  constructor(
    private produtoService: ProdutoService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.buscarProduto();
  }

  buscarProduto(): void {
    this.produtoService.buscarProdutoPorId(this.data?.id).subscribe((data) => {
      this.produtoFullModel = data;
    });
  }

  public isTemEstoque(): boolean {
    return this.produtoFullModel.isTemEstoque;
  }

  public acaoDoEstoque(): void {
    if (this.isTemEstoque()) {
      this.produtoService
        .tirarDoEstoque(this.produtoFullModel.id)
        .subscribe((data) => {
          this.snackbarService.mostrarMensagemSucesso(
            `${this.produtoFullModel.nome} colocado no estoque!`,
            3000
          );
          this.buscarProduto();
        });
    } else {
      this.produtoService
        .colocarNoEstoque(this.produtoFullModel.id)
        .subscribe((data) => {
          this.snackbarService.mostrarMensagemSucesso(
            `${this.produtoFullModel} tirado do estoque!`,
            3000
          );
          this.buscarProduto();
        });
    }
  }
}
