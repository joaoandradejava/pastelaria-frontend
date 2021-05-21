export class ProdutoCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;

  constructor(id: number, nome: string, preco: number, quantidade: number) {
    this.id = id;
    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
  }
}
