import { categoriaModel } from './../../shared/models/categoria-model';
import { ErrorStateMatcher } from '@angular/material/core';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CategoriaService } from 'src/app/shared/services/categoria.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ValidadorFormulario } from 'src/app/shared/utils/validador-formulario';
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
  selector: 'app-categoria-input',
  templateUrl: './categoria-input.component.html',
  styleUrls: ['./categoria-input.component.scss'],
})
export class CategoriaInputComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  formGroup: FormGroup;
  categoriaModel: categoriaModel;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CategoriaInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoriaServce: CategoriaService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(255),
        ],
      ],
    });

    if (this.data?.id !== undefined) {
      this.categoriaServce.buscarPorId(this.data.id).subscribe((data) => {
        this.categoriaModel = data;
        this.formGroup.get('nome').setValue(this.categoriaModel.nome);
      });
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  public isAtualizar(): boolean {
    return this.data?.id !== undefined ? true : false;
  }

  public salvar(): void {
    if (this.formGroup.valid) {
      if (this.isAtualizar()) {
        this.categoriaServce
          .atualizar(this.formGroup.value, this.categoriaModel.id)
          .subscribe((data) => {
            this.formGroup.reset();
            this.cancelar();
            this.snackbarService.mostrarMensagemSucesso(
              'Categoria atualizado com sucesso!',
              5000
            );
          });
      } else {
        this.categoriaServce.salvar(this.formGroup.value).subscribe((data) => {
          this.formGroup.reset();
          this.cancelar();
          this.snackbarService.mostrarMensagemSucesso(
            'Categoria cadastrado com sucesso!',
            5000
          );
        });
      }
    }
  }

  limpar(): void {
    this.formGroup.reset();
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
}
