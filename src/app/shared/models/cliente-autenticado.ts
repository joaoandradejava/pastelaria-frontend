export interface ClienteAutenticado {
  id: number;
  nome: string;
  tokenJwt: string;
  isAdmin: boolean;
}
