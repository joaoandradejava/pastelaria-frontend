import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';
import { ClienteService } from 'src/app/shared/services/cliente.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-excluir-conta',
  templateUrl: './excluir-conta.component.html',
  styleUrls: ['./excluir-conta.component.scss'],
})
export class ExcluirContaComponent implements OnInit {
  constructor(
    private autenticacaoService: AutenticacaoService,
    private clienteService: ClienteService,
    private router: Router,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  public deletarConta(): void {
    this.clienteService
      .deletarConta(this.autenticacaoService.getClienteAutenticado().id)
      .subscribe((data) => {
        this.router.navigate(['']);
        this.autenticacaoService.deslogar();
        this.snackbarService.mostrarMensagemSucesso(
          'Sua conta foi deletada com sucesso!',
          5000
        );
      });
  }
}
