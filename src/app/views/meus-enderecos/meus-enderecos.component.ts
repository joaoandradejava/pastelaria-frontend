import { Observable } from 'rxjs';
import { AutenticacaoService } from './../../shared/services/autenticacao.service';
import { EnderecoService } from './../../shared/services/endereco.service';
import { NovoEnderecoComponent } from './../../components/novo-endereco/novo-endereco.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-meus-enderecos',
  templateUrl: './meus-enderecos.component.html',
  styleUrls: ['./meus-enderecos.component.scss'],
})
export class MeusEnderecosComponent implements OnInit {
  enderecos: Observable<any>;

  constructor(
    private dialog: MatDialog,
    private enderecoService: EnderecoService,
    private autenticacaoService: AutenticacaoService
  ) {}

  ngOnInit(): void {
    this.buscarEnderecosDoCliente();
  }

  public abrirModalNovoEndereco(): void {
    this.dialog.open(NovoEnderecoComponent);
  }

  buscarEnderecosDoCliente(): void {
    this.enderecos = this.enderecoService.buscarEnderecoDoCliente(
      this.autenticacaoService.getClienteAutenticado().id
    );
  }
}
