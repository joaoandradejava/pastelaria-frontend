import { ClienteAutenticado } from './../models/cliente-autenticado';
import { AutenticacaoService } from './../services/autenticacao.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenJwtInterceptor implements HttpInterceptor {
  constructor(private autenticacaoService: AutenticacaoService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.autenticacaoService.isAutenticado()) {
      let clienteAutenticado: ClienteAutenticado =
        this.autenticacaoService.getClienteAutenticado();

      let req = request.clone({
        setHeaders: { Authorization: clienteAutenticado.tokenJwt },
      });

      return next.handle(req);
    }

    return next.handle(request);
  }
}
