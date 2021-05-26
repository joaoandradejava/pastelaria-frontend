export class Backend {
  private static get baseUrl(): string {
    return 'https://pastelaria-beicola.herokuapp.com/';
    //return 'http://localhost:8080/'
  }

  public static get baseCategoria(): string {
    return this.baseUrl + 'categorias';
  }

  public static get baseProduto(): string {
    return this.baseUrl + 'produtos';
  }

  public static get baseLogin(): string {
    return this.baseUrl + 'login';
  }

  public static get baseCliente(): string {
    return this.baseUrl + 'clientes';
  }

  public static get basePedido(): string {
    return this.baseUrl + 'pedidos';
  }

  public static get baseEstatistica(): string {
    return this.baseUrl + 'estatisticas'
  }
}
