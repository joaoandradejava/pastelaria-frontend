import { EnderecoModel } from './endereco-model';
export interface ClienteFullModel {
  id: number;
  nome: string;
  email: string;
  cpf: string;
  telefone: string;
  celular: string;
  enderecos: EnderecoModel[];
}
