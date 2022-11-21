export class Address {
  private city: string;
  private state: string;
  private country: string;
  private street: string;
  private zipCode: string;

  private constructor(city: string, state: string, country: string, street: string, zipCode: string) {
    this.city=city;
    this.state=state;
    this.country=country;
    this.street=street;
    this.zipCode=zipCode;
  }

  public getCity(): string {
    return  this.city;
  }

  public getState(): string {
    return this.state;
  }

  public getCountry(): string {
    return this.country;
  }

  public getStreet(): string {
    return this.street;
  }

  public getZipCode(): string {
    return this.zipCode;
  }

  public static create(city: string, state: string, country: string, street: string, zipCode: string): Address {
    return new Address(city, state, country, street, zipCode);
  }
}