import { Column } from "typeorm";

export class FullNameValue {
  @Column('varchar', { name: 'name', length: 75, nullable: false })
  public name: string;

  @Column('varchar', { name: 'last_name', length: 75, nullable: false })
  public lastName: string;

  private constructor(firstName: string, lastName: string) {
    this.name = firstName;
    this.lastName = lastName;
  }

  public static from(firstName: string, lastName: string): FullNameValue {
    return new FullNameValue(firstName, lastName);
  }
}