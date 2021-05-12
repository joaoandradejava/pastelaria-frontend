import { Backend } from './../utils/backend';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(private http: HttpClient) {}

  public buscarTodosProdutosDisponiveis(
    tamanho: number,
    pagina: number
  ): Observable<any> {
    return this.http.get(
      Backend.baseProduto +
        `/disponivel-estoque/paginacao?size=${tamanho}&page=${pagina}`
    );
  }

  public buscarTodosProdutosPorCategoriaEDisponiveisNoEstoque(
    categoriaId: number,
    pagina: number,
    tamanho: number
  ): Observable<any> {
    return this.http.get(
      Backend.baseProduto +
        `/categoria/${categoriaId}/disponivel-estoque/paginacao?size=${tamanho}&page=${pagina}`
    );
  }

  public buscarProdutoPorId(id: number): Observable<any> {
    return this.http.get(Backend.baseProduto + `/${id}`);
  }
}
