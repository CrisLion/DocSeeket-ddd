export class Password {
  private password: string;
  private MINLENGTH: number=8;
  private MAXLENGTH: number=24;

  private constructor(password: string) {
    this.password=password;
  }

  public getPassword(): string {
    return this.password;
  }

  public static create(password: string): Password {
    
    password=(password ?? "").trim();

    return new Password(password);
  }
}