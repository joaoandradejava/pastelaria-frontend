import { SnackbarService } from './snackbar.service';
import { LoginComponent } from './../../components/login/login.component';
import { AutenticacaoService } from './autenticacao.service';
import { CarrinhoCompra } from './../models/carrinho-compras';
import { Injectable } from '@angular/core';
import { ProdutoModel } from '../models/produto-model';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoCarrinho } from '../models/produto-carrinho';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoService {
  constructor(
    private autenticacaoService: AutenticacaoService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService
  ) {}

  public limparCarrinho(): void {
    localStorage.removeItem('carrinho');
  }

  public adicionarNoCarrinho(produtoModel: ProdutoModel): void {
    if (!this.autenticacaoService.isAutenticado()) {
      this.dialog.open(LoginComponent);
      return;
    }

    if (this.isTemCarrinho()) {
      let carrinhoCompra: CarrinhoCompra = this.buscarCarrinho();
      let produtoCarrinho: ProdutoCarrinho = new ProdutoCarrinho(
        produtoModel.id,
        produtoModel.nome,
        produtoModel.preco,
        1
      );
      carrinhoCompra.adicionarNoCarrinho(produtoCarrinho);

      this.salvarNoCarrinho(carrinhoCompra);
    } else {
      let carrinhoCompra: CarrinhoCompra = new CarrinhoCompra();
      let produtoCarrinho: ProdutoCarrinho = new ProdutoCarrinho(
        produtoModel.id,
        produtoModel.nome,
        produtoModel.preco,
        1
      );
      carrinhoCompra.adicionarNoCarrinho(produtoCarrinho);

      this.salvarNoCarrinho(carrinhoCompra);
    }

    this.snackbarService.mostrarMensagemSucesso(
      'Produto adicionado no carrinho!',
      3000
    );
  }

  public adicionarCarrinho(
    carrinhoCompra: CarrinhoCompra,
    produtoCarrinho: ProdutoCarrinho
  ): void {
    carrinhoCompra.adicionarCarrinho(produtoCarrinho);

    this.salvarNoCarrinho(carrinhoCompra);
  }

  public subtrairCarrinho(
    carrinhoCompra: CarrinhoCompra,
    produtoCarrinho: ProdutoCarrinho
  ): void {
    carrinhoCompra.subtrairCarrinho(produtoCarrinho);

    this.salvarNoCarrinho(carrinhoCompra);
  }

  public salvarNoCarrinho(carrinhoCompra: CarrinhoCompra): void {
    localStorage.setItem('carrinho', JSON.stringify(carrinhoCompra));
  }

  public isTemCarrinho(): boolean {
    return !(
      localStorage.getItem('carrinho') === undefined ||
      localStorage.getItem('carrinho') === null
    );
  }

  public quantidadeNoCarrinho(): number{
    let carrinhoCompra: CarrinhoCompra = this.buscarCarrinho()
    if(carrinhoCompra != null){
      return carrinhoCompra.produtos.length
    }

    return 0;
  }

  public buscarCarrinho(): CarrinhoCompra {
    if (this.isTemCarrinho()) {
      let dados = JSON.parse(localStorage.getItem('carrinho'));
      let carrinhoCompra: CarrinhoCompra = new CarrinhoCompra();
      carrinhoCompra.produtos = dados.produtos;

      return carrinhoCompra;
    }

    return null;
  }
}
