import { EscolherEnderecoComponent } from './../escolher-endereco/escolher-endereco.component';
import { SnackbarService } from './../../shared/services/snackbar.service';
import { Router } from '@angular/router';
import { ClienteFullModel } from './../../shared/models/cliente-full-model';
import { AutenticacaoService } from './../../shared/services/autenticacao.service';
import { ProdutoCarrinho } from './../../shared/models/produto-carrinho';
import { CarrinhoCompra } from './../../shared/models/carrinho-compras';
import { Component, OnInit } from '@angular/core';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-carrinho-de-compras',
  templateUrl: './carrinho-de-compras.component.html',
  styleUrls: ['./carrinho-de-compras.component.scss'],
})
export class CarrinhoDeComprasComponent implements OnInit {
  carrinhoCompra: CarrinhoCompra;

  constructor(private carrinhoService: CarrinhoService, private clienteService: ClienteService, private autenticacaoService: AutenticacaoService, private router: Router, private snackbarService: SnackbarService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.carrinhoCompra = this.carrinhoService.buscarCarrinho();
  }

  public limparCarrinho(): void {
    this.carrinhoService.limparCarrinho();

    this.carrinhoCompra = this.carrinhoService.buscarCarrinho();
  }

  public adicionarCarrinho(produtoCarrinho: ProdutoCarrinho): void {
    this.carrinhoService.adicionarCarrinho(
      this.carrinhoCompra,
      produtoCarrinho
    );
  }

  public valorTotal(): number {
    return this.carrinhoCompra.calcularValorTotal();
  }

  public subtrairCarrinho(produtoCarrinho: ProdutoCarrinho): void {
    this.carrinhoService.subtrairCarrinho(this.carrinhoCompra, produtoCarrinho);

    if(this.carrinhoCompra.produtos.length === 0){
      this.limparCarrinho()
    }
  }

  public finalizarPedido(): void {
    this.clienteService.buscarPorId(this.autenticacaoService.getClienteAutenticado().id).subscribe(data => {
      if(data.enderecos === undefined || data.enderecos.length == 0){
        this.snackbarService.mostrarMensagemAlerta('É necessario ter ao menos um endereço de entrega!', 5000)
        this.router.navigate(['meus-enderecos'])

        return;
      }

      this.dialog.open(EscolherEnderecoComponent, {
        data: {
          cliente: data
        }
      })
    })
  }
}
