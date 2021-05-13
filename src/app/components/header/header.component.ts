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
  constructor(
    private dialog: MatDialog,
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  sair(): void {
    this.router.navigate(['']);
    localStorage.clear();
  }

  getClienteAutenticado(): ClienteAutenticado {
    return this.autenticacaoService.getClienteAutenticado();
  }

  public isLogado(): boolean {
    return this.autenticacaoService.isAutenticado();
  }

  openDialogCadastroCliente(): void {
    const dialogRef = this.dialog.open(CadastroClienteComponent);
  }

  openDialogLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent);
  }
}
