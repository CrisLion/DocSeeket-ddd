import { Result } from "typescript-result";

export class Fullname {
  private readonly name: string;
  private readonly lastName: string;

  private constructor(name: string, lastName: string) {
    this.name = name;
    this.lastName = lastName;
  }

  public getName(): string {
    return this.name;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public static create(firstName: string, lastName: string): Fullname {
    firstName = (firstName ?? "").trim();
    lastName = (lastName ?? "").trim();
    return new Fullname(firstName, lastName);
  }
}