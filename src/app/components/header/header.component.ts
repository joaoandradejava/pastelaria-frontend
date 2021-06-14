import { OpcaoMenu } from './opcao-menu';
import { CarrinhoService } from 'src/app/shared/services/carrinho.service';
import { ClienteAutenticado } from './../../shared/models/cliente-autenticado';
import { AutenticacaoService } from './../../shared/services/autenticacao.service';
import { LoginComponent } from './../login/login.component';
import { CadastroClienteComponent } from './../cadastro-cliente/cadastro-cliente.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  opcoesComum: OpcaoMenu[] = [
    {nome: 'Editar Meus Dados', url: '/editar-dados', avatarUrl: 'assets/images/edit-profile.png'},
    {nome: 'Meus endereços', url: '/meus-enderecos', avatarUrl: 'assets/images/gps.png'},
    {nome: 'Meus Pedidos', url: '/meus-pedidos', avatarUrl: 'assets/images/pedido.png'},
    {nome: 'Deletar Conta', url: '/deletar-conta', avatarUrl: 'assets/images/trash.png'}

  ]

  opcoesAdmin: OpcaoMenu[] = [
    {nome: 'Produtos', url: '/produtos', avatarUrl: 'assets/images/produto.png'},
    {nome: 'Categorias', url: '/categorias', avatarUrl: 'assets/images/category.png'},
    {nome: 'Pedidos dos Clientes', url: '/pedidos-admin', avatarUrl: 'assets/images/pedidoCliente.png'},
    {nome: 'Gráfico dos Produtos Mais Vendidos', url: '/grafico-produto-mais-vendidos', avatarUrl: 'assets/images/chart.png'}
  ]

  constructor(
    private dialog: MatDialog,
    private autenticacaoService: AutenticacaoService,
    private router: Router,
    private carrinhoService: CarrinhoService
  ) {}

  ngOnInit(): void {}

  sair(): void {
    this.router.navigate(['']);
    localStorage.clear();
  }

  quantidadeNoCarrinho(): number {
    return this.carrinhoService.quantidadeNoCarrinho()
  }

  getClienteAutenticado(): ClienteAutenticado {
    return this.autenticacaoService.getClienteAutenticado();
  }

  public isLogado(): boolean {
    return this.autenticacaoService.isAutenticado();
  }

  public isAdmin(): boolean {
    return this.autenticacaoService.isAdmin();
  }

  openDialogCadastroCliente(): void {
    const dialogRef = this.dialog.open(CadastroClienteComponent);
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent);
  }
}
