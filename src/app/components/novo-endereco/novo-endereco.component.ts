import { MatDialogRef } from '@angular/material/dialog';
import { AutenticacaoService } from './../../shared/services/autenticacao.service';
import { EnderecoInput } from './../../shared/models/endereco-input';
import { SnackbarService } from './../../shared/services/snackbar.service';
import { EnderecoService } from './../../shared/services/endereco.service';
import { ValidadorFormulario } from './../../shared/utils/validador-formulario';
import { Component, EventEmitter, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ClienteService } from 'src/app/shared/services/cliente.service';

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
  selector: 'app-novo-endereco',
  templateUrl: './novo-endereco.component.html',
  styleUrls: ['./novo-endereco.component.scss'],
})
export class NovoEnderecoComponent implements OnInit {
  formGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  enderecoInput: EnderecoInput = new EnderecoInput();
  cepValido: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private enderecoService: EnderecoService,
    private snackbarService: SnackbarService,
    private autenticacaoService: AutenticacaoService,
    private dialogRef: MatDialogRef<NovoEnderecoComponent>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      cep: ['', [Validators.required]],
      complemento: ['', [Validators.minLength(0), Validators.maxLength(255)]],
      numero: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(10),
        ],
      ],
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

  confirmar(): void {
    if (this.formGroup.valid) {
      this.enderecoInput.numero = this.formGroup.get('numero').value;
      this.enderecoInput.complemento = this.formGroup.get('complemento').value;
      this.enderecoInput.numero = String(this.enderecoInput.numero);
      this.enderecoService
        .inserirEndereco(
          this.autenticacaoService.getClienteAutenticado().id,
          this.enderecoInput
        )
        .subscribe(
          (data) => {
            this.snackbarService.mostrarMensagemSucesso(
              'Seu endereço foi adicionado com sucesso!',
              5000
            );
            this.dialogRef.close();
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  public buscarCep(): void {
    this.cepValido = false;

    if (this.formGroup.get('cep').valid) {
      this.enderecoService
        .buscarEndereco(this.formGroup.get('cep').value)
        .subscribe((value) => {
          if (value.erro) {
            this.snackbarService.mostrarMensagemAlerta(
              'Ops, não conseguimos localizar o CEP informado!',
              5000
            );
          } else {
            this.cepValido = true;
            this.enderecoInput.cep = value.cep;
            this.enderecoInput.bairro = value.bairro;
            this.enderecoInput.cidade = value.localidade;
            this.enderecoInput.estado = value.uf;
            this.enderecoInput.endereco = value.logradouro;
          }
        });
    }
  }
}
