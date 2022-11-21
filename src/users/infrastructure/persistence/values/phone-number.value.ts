import { Column } from "typeorm";

export class PhoneNumberValue {
  @Column('varchar', { name: 'country_code', length: 6, nullable: false })
  public codeByCountry: string;

  @Column('varchar', { name: 'phone_number', length: 16, nullable: false })
  public phoneNumber: string;

  private constructor(codeByCountry: string, phoneNumber: string) {
    this.codeByCountry=codeByCountry;
    this.phoneNumber=phoneNumber;
  }

  public static from(codeByCountry: string, phoneNumber: string): PhoneNumberValue {
    return new PhoneNumberValue(codeByCountry, phoneNumber);
  }
}