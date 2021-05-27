import { ProdutoInput } from './../models/produto-input';
import { Backend } from './../utils/backend';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/operators'
import { retry } from 'rxjs/operators';

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
    ).pipe(retry(5));
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

  public salvar(produtoInput: ProdutoInput): Observable<any> {
    return this.http.post(Backend.baseProduto, produtoInput);
  }

  public atualizar(produtoInput: ProdutoInput, id: number): Observable<any> {
    return this.http.put(Backend.baseProduto + `/${id}`, produtoInput);
  }

  public deletarPorId(id: number): Observable<any> {
    return this.http.delete(Backend.baseProduto + `/${id}`);
  }

  public buscarTodos(
    pagina: number,
    tamanho: number,
    nome: string
  ): Observable<any> {
    return this.http.get(
      Backend.baseProduto +
        `/paginacao?nome=${nome}&page=${pagina}&size=${tamanho}`
    );
  }
  public buscarProdutoPorId(id: number): Observable<any> {
    return this.http.get(Backend.baseProduto + `/${id}`);
  }

  public colocarNoEstoque(id: number): Observable<any> {
    return this.http.put(Backend.baseProduto + `/${id}/estoque`, null);
  }

  public tirarDoEstoque(id: number): Observable<any> {
    return this.http.delete(Backend.baseProduto + `/${id}/estoque`);
  }

  public adicionarImagem(id: number, foto: FormData): Observable<any> {
    return this.http.put(Backend.baseProduto + `/${id}/foto`, foto);
  }

  public removerFoto(id: number): Observable<any> {
    return this.http.delete(Backend.baseProduto + `/${id}/foto`);
  }
}
