import { Column } from "typeorm";

export class AddressValue {
  @Column('varchar', {name: 'city', length: 20, nullable: false})
  public city: string;

  @Column('varchar', {name: 'state', length: 20, nullable: true})
  public state: string;

  @Column('varchar', {name: 'country', length: 20, nullable: false})
  public country: string;

  @Column('varchar', {name: 'street', length: 20, nullable: false})
  public street: string;

  @Column('varchar', {name: 'zip_code', length: 20, nullable: false})
  public zipCode: string;

  private constructor(city: string, state: string, country: string, street: string, zipCode: string) {
    this.city=city;
    this.state=state;
    this.country=country;
    this.street=street;
    this.zipCode=zipCode;
  }

  public static from(city: string, state: string, country: string, street: string, zipCode: string):AddressValue {
    return new AddressValue(city, state, country,street, zipCode)
  } 
}