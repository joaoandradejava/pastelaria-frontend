import { Backend } from './../utils/backend';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public realizarLogin(login: Login): Observable<any> {
    return this.http.post(Backend.baseLogin, login);
  }
}
