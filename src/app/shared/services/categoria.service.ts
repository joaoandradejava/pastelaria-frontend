import { CategoriaInput } from './../models/categoria-input';
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

  public buscarPorId(id: number): Observable<any> {
    return this.http.get(Backend.baseCategoria + `/${id}`);
  }

  public salvar(categoriaInput: CategoriaInput): Observable<any> {
    return this.http.post(Backend.baseCategoria, categoriaInput);
  }

  public atualizar(
    categoriaInput: CategoriaInput,
    id: number
  ): Observable<any> {
    return this.http.put(Backend.baseCategoria + `/${id}`, categoriaInput);
  }

  public deletarPorId(id: number): Observable<any> {
    return this.http.delete(Backend.baseCategoria + `/${id}`);
  }

  public buscarTodasPorPaginacao(
    pagina: number,
    tamanho: number,
    nome: string
  ): Observable<any> {
    return this.http.get(
      Backend.baseCategoria +
        `/paginacao?size=${tamanho}&page=${pagina}&nome=${nome}`
    );
  }
}
