import { EnderecoIdInput } from './endereco-id-input';
import { ItemInput } from './item-input';
export class PedidoCreate {
  itens: ItemInput[] = [];
  enderecoDeEntrega: EnderecoIdInput;

  public adicionarItem(produtoId: number, quantidade: number): void {
    let item: ItemInput = new ItemInput();
    item.produtoId = produtoId;
    item.quantidade = quantidade;

    this.itens.push(item);
  }
}
