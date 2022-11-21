export class PhoneNumber {
  private codeByCountry: string;
  private phoneNumber: string;

  private constructor(code: string, phoneNumber: string) {
    this.codeByCountry=code;
    this.phoneNumber=phoneNumber;
  }

  public getCodeByCountry(): string {
    return this.codeByCountry;
  }

  public getPhoneNumber(): string {
    return this.phoneNumber;
  }

  public static create(code: string, phoneNumber: string): PhoneNumber {
    return new PhoneNumber(code, phoneNumber);
  }
}