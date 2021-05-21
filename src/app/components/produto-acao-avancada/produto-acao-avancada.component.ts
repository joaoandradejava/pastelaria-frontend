import { ProdutoFullModel } from './../../shared/models/produto-full-model';
import { ProdutoService } from './../../shared/services/produto.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { formatDate } from '@angular/common';

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
            `${this.produtoFullModel.nome} tirado do estoque!`,
            3000
          );
          this.buscarProduto();
        });
    } else {
      this.produtoService
        .colocarNoEstoque(this.produtoFullModel.id)
        .subscribe((data) => {
          this.snackbarService.mostrarMensagemSucesso(
            `${this.produtoFullModel.nome} colocado no estoque!`,
            3000
          );
          this.buscarProduto();
        });
    }
  }

  inputFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const foto = event.target.files[0];

      const formData = new FormData();
      formData.append('foto', foto);

      this.produtoService
        .adicionarImagem(this.produtoFullModel.id, formData)
        .subscribe((data) => {
          this.snackbarService.mostrarMensagemSucesso(
            'Foto adicionada com sucesso!',
            5000
          );
          this.buscarProduto();
        });
    }
  }

  removerFoto(): void {
    this.produtoService
      .removerFoto(this.produtoFullModel.id)
      .subscribe((data) => {
        this.snackbarService.mostrarMensagemSucesso(
          'Foto removida com sucesso!',
          5000
        );
        this.buscarProduto();
      });
  }
}
