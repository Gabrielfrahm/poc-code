export interface CodeProps {
  id?: number;
  code?: string;
  active: boolean;
  groupName?: string;
  responsiblePerson?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export interface CodeUpdateProps {
  groupName?: string;
  responsiblePerson?: string;
}

/**
 * @class Code
 * @extends Entity @generic CodeProps
 * classe responsável por criar entidade de Code
 */
export class Code {
  /**
   * @param {CodeProps} props
   * @param {UniqueEntitySecureId} id?
   * construtor da classe
   */
  constructor(public readonly props: CodeProps) {
    this.props.code = this.code || this.makeCode();
    this.props.id = this.id;
    this.props.groupName = this.groupName;
    this.props.responsiblePerson = this.responsiblePerson;
    this.props.createdAt = this.createdAt || new Date();
    this.props.updatedAt = this.updatedAt || new Date();
    this.props.deletedAt = this.deletedAt || null;
  }

  /**
   * @params {CodeUpdateProps} groupName, responsiblePerson
   * método para atualizar a entidade
   */
  update({ groupName, responsiblePerson }: CodeUpdateProps): void {
    if (groupName) {
      this.props.groupName = groupName;
    }

    if (responsiblePerson) {
      this.props.responsiblePerson = responsiblePerson;
    }

    this.props.updatedAt = new Date();
  }

  /**
   * método para gerar códigos únicos
   */
  makeCode(): string {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let letters = '';

    for (let i = 0; i < 3; i++) {
      const idx = Math.floor(Math.random() * alphabet.length);

      letters += alphabet.charAt(idx);
    }

    const numbers = '0123456789';
    let number = '';

    while (number.length < 4) {
      const digito = numbers.charAt(Math.floor(Math.random() * numbers.length));

      if (!number.includes(digito)) {
        number += digito;
      }
    }

    const code = letters + number;

    this.props.code = code;

    return code;
  }

  /**
   * método para desativar code
   */
  public deactivate(): void {
    this.props.active = false;
  }

  /**
   * método para ativar code
   */
  public activate(): void {
    this.props.active = true;
  }

  /**
   * @return id
   */
  get id(): number {
    return this.props.id;
  }

  /**
   * @return string
   */
  get code(): string {
    return this.props.code;
  }

  /**
   * @return string
   */
  get active(): boolean {
    return this.props.active;
  }

  /**
   * @return string
   */
  get groupName(): string {
    return this.props.groupName;
  }

  /**
   * @return string
   */
  get responsiblePerson(): string {
    return this.props.responsiblePerson;
  }

  /**
   * @return date
   */
  get createdAt(): Date {
    return this.props.createdAt;
  }

  /**
   * @return date
   */
  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  /**
   * @return date
   */
  get deletedAt(): Date {
    return this.props.deletedAt;
  }
}
