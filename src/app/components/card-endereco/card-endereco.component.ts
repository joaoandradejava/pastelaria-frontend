import { SnackbarService } from './../../shared/services/snackbar.service';
import { AutenticacaoService } from './../../shared/services/autenticacao.service';
import { EnderecoModel } from './../../shared/models/endereco-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EnderecoService } from 'src/app/shared/services/endereco.service';

@Component({
  selector: 'app-card-endereco',
  templateUrl: './card-endereco.component.html',
  styleUrls: ['./card-endereco.component.scss'],
})
export class CardEnderecoComponent implements OnInit {
  @Input() enderecoModel: EnderecoModel;
  @Output() atualizarEnderecosDoCliente: EventEmitter<void> =
    new EventEmitter();

  constructor(
    private enderecoService: EnderecoService,
    private autenticacaoService: AutenticacaoService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {}

  deletarEnderecoDoCliente(): void {
    if (confirm('Tem certeza que deseja deletar este endereço?')) {
      this.enderecoService
        .deletarEnderecoDoCliente(
          this.autenticacaoService.getClienteAutenticado().id,
          this.enderecoModel.id
        )
        .subscribe((data) => {
          this.snackbarService.mostrarMensagemSucesso(
            'Endereço deletado com sucesso!',
            5000
          );
          this.atualizarEnderecosDoCliente.emit();
        });
    }
  }
}
