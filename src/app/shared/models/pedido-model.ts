import { PagamentoModel } from './pagamento-model';
import { SituacaoPagamento } from './situacao-pagamento';
import { SituacaoPedido } from './situacao-pedido';

export class PedidoModel {
  id: number;
  data: string;
  valorTotal: number;
  situacaoPedido: SituacaoPedido;
  pagamento: PagamentoModel;
  pix: string = 'ss'


  getSituacaoPagamento(): string {
    return SituacaoPagamento[this.pagamento.situacaoPagamento];
  }
}
