import { categoriaModel } from './../models/categoria-model';
import { Backend } from './../utils/backend';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  constructor(private http: HttpClient) {}

  public buscarTodos(): Observable<categoriaModel[]> {
    return this.http
      .get(Backend.baseCategoria)
      .pipe(map((categoria: categoriaModel[]) => categoria));
  }
}
