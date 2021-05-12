export interface ProdutoModel {
  id: number;
  nome: string;
  preco: number;
  descricao: string;
  avatarUrl?: string;
  desconto: number;
  isTemEstoque: boolean;
}
