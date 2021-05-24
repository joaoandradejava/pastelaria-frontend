import { PagamentoModel } from './pagamento-model';

export class PedidoModel {
  id: number;
  data: string;
  valorTotal: number;
  situacaoPedido: string;
  pagamento: PagamentoModel;
}
