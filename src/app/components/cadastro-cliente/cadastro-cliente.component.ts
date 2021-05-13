import { SnackbarService } from './../../shared/services/snackbar.service';
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
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.scss'],
  providers: [ClienteService],
})
export class CadastroClienteComponent implements OnInit {
  formGroup: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private snackbarService: SnackbarService
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
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(255),
          Validators.email,
        ],
      ],
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(255),
        ],
      ],
      confirmacaoSenha: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(255),
        ],
      ],
      telefone: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(11),
        ],
      ],
    });
  }

  public getMensagemCampoObrigatorio(label: string): string {
    return ValidadorFormulario.getMensagemCampoObrigatorio(label);
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

  public getEmailOuCpfInvalido(label: string): string {
    return ValidadorFormulario.getEmailOuCpfInvalido(label);
  }

  public cadastrar(): void {
    if (this.formGroup.valid) {
      this.clienteService.cadastrar(this.formGroup.value).subscribe((data) => {
        this.formGroup.reset();
        this.snackbarService.mostrarMensagemSucesso(
          'Seu cadastro foi realizado com sucesso!',
          5000
        );
      });
    }
  }
}
