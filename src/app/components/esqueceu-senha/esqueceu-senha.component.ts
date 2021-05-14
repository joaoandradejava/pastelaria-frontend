import { SnackbarService } from './../../shared/services/snackbar.service';
import { ClienteService } from './../../shared/services/cliente.service';
import { ValidadorFormulario } from './../../shared/utils/validador-formulario';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

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
  selector: 'app-esqueceu-senha',
  templateUrl: './esqueceu-senha.component.html',
  styleUrls: ['./esqueceu-senha.component.scss'],
})
export class EsqueceuSenhaComponent implements OnInit {
  formGroup: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<EsqueceuSenhaComponent>
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(255),
          Validators.email,
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

  public enviarNovaSenha(): void {
    if (this.formGroup.valid) {
      this.clienteService
        .esqueciSenha(this.formGroup.value)
        .subscribe((data) => {
          this.formGroup.reset();
          this.snackbarService.mostrarMensagemSucesso(
            'Um nova senha foi enviada para seu e-mail!',
            5000
          );
          this.dialogRef.close();
        });
    }
  }
}
