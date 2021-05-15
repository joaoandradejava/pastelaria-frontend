import { SnackbarService } from './../../shared/services/snackbar.service';
import { ProdutoFullModel } from './../../shared/models/produto-full-model';
import { ProdutoService } from './../../shared/services/produto.service';
import { categoriaModel } from './../../shared/models/categoria-model';
import { CategoriaService } from './../../shared/services/categoria.service';
import { ValidadorFormulario } from './../../shared/utils/validador-formulario';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProdutoModel } from 'src/app/shared/models/produto-model';

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
  selector: 'app-produto-input',
  templateUrl: './produto-input.component.html',
  styleUrls: ['./produto-input.component.scss'],
})
export class ProdutoInputComponent implements OnInit {
  matcher = new MyErrorStateMatcher();
  formGroup: FormGroup;
  categorias: categoriaModel[];
  produtoFullModel: ProdutoFullModel;

  constructor(
    private formBuilder: FormBuilder,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<ProdutoInputComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private produtoServce: ProdutoService,
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
      preco: [0.0, [Validators.required, Validators.min(0.1)]],
      descricao: ['', [Validators.required]],
      categoria: this.formBuilder.group({
        id: ['', [Validators.required]],
      }),
    });

    this.buscarTodasCategorias();

    if (this.data?.id !== undefined) {
      this.produtoServce.buscarProdutoPorId(this.data.id).subscribe((data) => {
        this.produtoFullModel = data;
        this.formGroup.get('nome').setValue(this.produtoFullModel.nome);
        this.formGroup.get('preco').setValue(this.produtoFullModel.preco);
        this.formGroup
          .get('descricao')
          .setValue(this.produtoFullModel.descricao);
        this.formGroup
          .get('categoria.id')
          .setValue(this.produtoFullModel.categoria.id);
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
        this.produtoServce
          .atualizar(this.formGroup.value, this.produtoFullModel.id)
          .subscribe((data) => {
            this.formGroup.reset();
            this.cancelar();
            this.snackbarService.mostrarMensagemSucesso(
              'Produto atualizado com sucesso!',
              5000
            );
          });
      } else {
        this.produtoServce.salvar(this.formGroup.value).subscribe((data) => {
          this.formGroup.reset();
          this.cancelar();
          this.snackbarService.mostrarMensagemSucesso(
            'Produto cadastrado com sucesso!',
            5000
          );
        });
      }
    }
  }

  limpar(): void {
    this.formGroup.reset();
  }

  buscarTodasCategorias(): void {
    this.categoriaService.buscarTodos().subscribe((data) => {
      this.categorias = data;
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
  public getMensagemValorMinimo(label: string, valorMinimo): string {
    return ValidadorFormulario.getMensagemValorMinimo(label, valorMinimo);
  }
}
