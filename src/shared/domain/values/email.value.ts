export class Email {
  private email: string;

  private constructor(email: string) {
    this.email=email;
  }

  public getEmail(): string {
    return this.email;
  }

  public static create(email: string): Email {
    const regExpression = new RegExp('/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i');

    if (!regExpression.test(email)) {
      return null;
    }
    
    return new Email(email);
  }
}