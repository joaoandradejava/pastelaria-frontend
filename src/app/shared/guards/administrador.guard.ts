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
export class AdministradorGuard implements CanActivate {
  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.autenticacaoService.isAdmin()) {
      this.router.navigate(['']);

      return false;
    }

    return true;
  }
}
