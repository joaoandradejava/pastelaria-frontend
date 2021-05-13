export class Backend {
  private static get baseUrl(): string {
    return 'https://pastelaria-beicola.herokuapp.com/';
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
}
