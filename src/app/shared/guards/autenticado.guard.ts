import { AutenticacaoService } from './../services/autenticacao.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AutenticadoGuard implements CanActivate {
  constructor(
    private router: Router,
    private autenticacaoService: AutenticacaoService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.autenticacaoService.isAutenticado()) {
      this.router.navigate(['']);

      return false;
    }

    return true;
  }
}
