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
}
