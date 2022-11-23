export class Address {
  private country: string;
  private state: string;
  private city: string;
  private street: string;
  private zipCode: string;

  private constructor(country: string, state: string, city: string, street: string, zipCode: string) {
    this.country=country;
    this.state=state;
    this.city=city;
    this.street=street;
    this.zipCode=zipCode;
  }

  public getCountry(): string {
    return this.country;
  }

  public getState(): string {
    return this.state;
  }

  public getCity(): string {
    return  this.city;
  }

  public getStreet(): string {
    return this.street;
  }

  public getZipCode(): string {
    return this.zipCode;
  }

  public static create(country: string, state: string, city: string, street: string, zipCode: string): Address {
    return new Address(country, state, city, street, zipCode);
  }
}