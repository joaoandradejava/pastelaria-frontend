import { Backend } from './../utils/backend';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EstatisticaService {
  constructor(private http: HttpClient) {}

  public buscarProdutosMaisVendidos(): Observable<any> {
    return this.http.get(
      Backend.baseEstatistica + '/produtos-mais-vendidos?size=8'
    );
  }

  public gerarRelatorioDosProdutosVendidos(): Observable<any> {
    return this.http.get(
      Backend.baseEstatistica + '/produtos-mais-vendidos/relatorio'
    );
  }

  public gerarRelatorioDosProdutos(): Observable<any> {
    return this.http.get(Backend.baseEstatistica + `/produtos/relatorio`);
  }
}
