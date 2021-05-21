import { Router } from '@angular/router';
import { SnackbarService } from './../../shared/services/snackbar.service';
import { PedidoService } from './../../shared/services/pedido.service';
import { ProdutoCarrinho } from './../../shared/models/produto-carrinho';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';
import { PedidoCreate } from './../../shared/models/pedido-create';
import { EnderecoModel } from './../../shared/models/endereco-model';
import { ClienteFullModel } from './../../shared/models/cliente-full-model';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EnderecoIdInput } from 'src/app/shared/models/endereco-id-input';
import { CarrinhoCompra } from 'src/app/shared/models/carrinho-compras';

@Component({
  selector: 'app-escolher-endereco',
  templateUrl: './escolher-endereco.component.html',
  styleUrls: ['./escolher-endereco.component.scss'],
})
export class EscolherEnderecoComponent implements OnInit {
  clienteFullModel: ClienteFullModel;
  enderecoModel: EnderecoModel = undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private carrinhoService: CarrinhoService,
    private pedidoService: PedidoService,
    private dialogRef: MatDialogRef<EscolherEnderecoComponent>,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.clienteFullModel = this.data.cliente;
  }

  escolherEndereco(enderecoModel: EnderecoModel): void {
    if (this.enderecoModel == undefined) {
      this.enderecoModel = enderecoModel;

      return;
    }

    if (this.enderecoModel.id === enderecoModel.id) {
      this.enderecoModel = undefined;

      return;
    }

    if (this.enderecoModel.id !== enderecoModel.id) {
      this.enderecoModel = enderecoModel;

      return;
    }
  }

  confirmar(): void {
    let pedidoCreate: PedidoCreate = new PedidoCreate();
    pedidoCreate.enderecoDeEntrega = new EnderecoIdInput();
    pedidoCreate.enderecoDeEntrega.id = this.enderecoModel.id;

    let carrinhoCompra: CarrinhoCompra = this.carrinhoService.buscarCarrinho();

    for (let i = 0; i < carrinhoCompra.produtos.length; i++) {
      let produto: ProdutoCarrinho = carrinhoCompra.produtos[i];

      pedidoCreate.adicionarItem(produto.id, produto.quantidade);
    }

    this.pedidoService.fazerPedido(pedidoCreate).subscribe((data) => {
      this.dialogRef.close();
      this.snackbarService.mostrarMensagemSucesso(
        'Pedido realizado com sucesso!',
        5000
      );
      this.router.navigate(['']);
      this.carrinhoService.limparCarrinho();
    });
  }
}
