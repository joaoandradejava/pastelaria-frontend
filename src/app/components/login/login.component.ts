import { ClienteAutenticado } from './../../shared/models/cliente-autenticado';
import { SnackbarService } from './../../shared/services/snackbar.service';
import { LoginService } from './../../shared/services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
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
      senha: [
        '',
        [
          Validators.required,
          Validators.minLength(0),
          Validators.maxLength(255),
        ],
      ],
    });
  }

  public realizarLogin(): void {
    if (this.formGroup.valid) {
      this.loginService
        .realizarLogin(this.formGroup.value)
        .subscribe((data) => {
          this.dialogRef.close();
          this.formGroup.reset();
          let clienteAutenticado: ClienteAutenticado = data;
          localStorage.setItem(
            'cliente-autenticado',
            JSON.stringify(clienteAutenticado)
          );
        });
    }
  }
}
