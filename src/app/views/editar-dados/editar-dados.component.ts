import { MudarSenhaComponent } from './../../components/mudar-senha/mudar-senha.component';
import { ClienteUpdateInput } from './../../shared/models/cliente-update-input';
import { SnackbarService } from './../../shared/services/snackbar.service';
import { ClienteFullModel } from './../../shared/models/cliente-full-model';
import { ClienteService } from './../../shared/services/cliente.service';
import { ValidadorFormulario } from './../../shared/utils/validador-formulario';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { AutenticacaoService } from 'src/app/shared/services/autenticacao.service';
import { MatDialog } from '@angular/material/dialog';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-editar-dados',
  templateUrl: './editar-dados.component.html',
  styleUrls: ['./editar-dados.component.scss'],
})
export class EditarDadosComponent implements OnInit {
  formGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  clienteFullModel: ClienteFullModel;

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private autenticacaoService: AutenticacaoService,
    private snackbarService: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      cpf: ['', [Validators.minLength(0), Validators.maxLength(11)]],
      telefone: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(11),
        ],
      ],
      celular: ['', [Validators.minLength(0), Validators.maxLength(11)]],
    });

    this.buscarClienteAutenticado();
  }

  public buscarClienteAutenticado(): void {
    this.clienteService
      .buscarPorId(this.autenticacaoService.getClienteAutenticado().id)
      .subscribe((data) => {
        this.clienteFullModel = data;
        this.formGroup.get('nome').setValue(this.clienteFullModel.nome);
        this.formGroup.get('cpf').setValue(this.clienteFullModel.cpf);
        this.formGroup.get('telefone').setValue(this.clienteFullModel.telefone);
        this.formGroup.get('celular').setValue(this.clienteFullModel.celular);
      });
  }

  public getMensagemCampoObrigatorio(label: string): string {
    return ValidadorFormulario.getMensagemCampoObrigatorio(label);
  }

  public getEmailOuCpfInvalido(label: string): string {
    return ValidadorFormulario.getEmailOuCpfInvalido(label);
  }

  public getMensagemCampoTamanhoCaracteres(
    label: string,
    min: number,
    max: number
  ): string {
    return ValidadorFormulario.getMensagemCampoTamanhoCaracteres(
      label,
      min,
      max
    );
  }

  public abrirModalMudarSenha(): void {
    const dialogRef = this.dialog.open(MudarSenhaComponent);
  }

  public atualizar(): void {
    if (this.formGroup.valid) {
      if (String(this.formGroup.get('cpf').value).trim() === '') {
        this.formGroup.get('cpf').setValue(undefined);
      }
      this.clienteService
        .atualizar(this.formGroup.value, this.clienteFullModel.id)
        .subscribe((data) => {
          this.snackbarService.mostrarMensagemSucesso(
            'Seus dados foram atualizados com sucesso!',
            5000
          );
          this.buscarClienteAutenticado();
        });
    }
  }
}
