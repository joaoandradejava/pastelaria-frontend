import { ProdutoCarrinho } from './produto-carrinho';

export class CarrinhoCompra {
  produtos: ProdutoCarrinho[] = [];

  public adicionarNoCarrinho(produtoCarrinho: ProdutoCarrinho): void {
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].id === produtoCarrinho.id) {
        this.produtos[i].quantidade++;
        return;
      }
    }

    this.produtos.push(produtoCarrinho);
  }

  public subtrairCarrinho(produtoCarrinho: ProdutoCarrinho): void {
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].id === produtoCarrinho.id) {
        this.produtos[i].quantidade--;
        if (this.produtos[i].quantidade <= 0) {
          this.produtos.splice(i, 1);
        }
        return;
      }
    }
  }

  public calcularValorTotal(): number {
    let valorTotal: number = 0.0;

    for (let i = 0; i < this.produtos.length; i++) {
      valorTotal += this.produtos[i].preco * this.produtos[i].quantidade;
    }

    return valorTotal;
  }

  public adicionarCarrinho(produtoCarrinho: ProdutoCarrinho): void {
    for (let i = 0; i < this.produtos.length; i++) {
      if (this.produtos[i].id === produtoCarrinho.id) {
        this.produtos[i].quantidade++;
        return;
      }
    }
  }
}
