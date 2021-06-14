import { Router } from '@angular/router';
import { SnackbarService } from './../services/snackbar.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { AutenticacaoService } from '../services/autenticacao.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private snackbarService: SnackbarService,
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error.error.status === 403) {
          let mensagem =
            'Sessão expirou. para continuar é necessário realizar o login novamente';

          this.snackbarService.mostrarMensagemError(mensagem, 5000);
          this.autenticacaoService.deslogar();
          this.router.navigate(['']);
        } else {
          let errors = error.error.errors;
          let mensagem = error.error.userMessage;

          if (errors) {
            mensagem = '';
            for (let i = 0; i < errors.length; i++) {
              mensagem = errors[i].userMessage;
            }
          }

          this.snackbarService.mostrarMensagemError(mensagem, 5000);
        }
        return throwError(error);
      })
    );
  }
}
