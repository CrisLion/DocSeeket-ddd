export class IdNumber {
  protected readonly value: string;

  protected constructor(value: string) {
    this.value = String(value);
  }

  public static of(value: string): IdNumber {
    return new IdNumber(value);
  }

  public getValue(): string {
    return String(this.value);
  }
}