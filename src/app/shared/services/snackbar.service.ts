import { MatSnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  public mostrarMensagemSucesso(mensagem: string, duracao: number): void {
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      verticalPosition: 'top',
      panelClass: ['success'],
    });
  }
  public mostrarMensagemError(mensagem: string, duracao: number): void {
    this.snackBar.dismiss()
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      verticalPosition: 'top',
      panelClass: ['error'],
    });
  }

  public mostrarMensagemAlerta(mensagem: string, duracao: number): void {
    this.snackBar.dismiss()
    this.snackBar.open(mensagem, 'Fechar', {
      duration: duracao,
      verticalPosition: 'top',
      panelClass: ['alerta'],
    });
  }
}
