import { categoriaModel } from './categoria-model';
export class ProdutoFullModel{
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  avatarUrl?: string;
  desconto: number;
  isTemEstoque: boolean;
  isTemDesconto: boolean
  categoria: categoriaModel;
}
