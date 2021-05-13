export class ValidadorFormulario {
  public static getMensagemCampoObrigatorio(label: string): string {
    return `Preencha o campo ${label}!`;
  }

  public static getMensagemCampoTamanhoCaracteres(
    label: string,
    min: number,
    max: number
  ): string {
    return `O Campo ${label} tem que ter entre ${min} á ${max}!`;
  }

  public static getEmailOuCpfInvalido(label: string): string {
    return `${label} inválido!`;
  }
}
