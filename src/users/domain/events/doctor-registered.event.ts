import { UserRegistered } from "./user-registered.event";

export class DoctorRegistered extends UserRegistered {
  constructor(id: number,
    firstName: string,
    lastName: string,password: string,email: string,
    codeByCountry: string, phoneNumber: string,city: string,
    state: string,country: string,street: string,zipCode: string,
    public readonly rating: Number) 
  {
    super(id, firstName, lastName, password, email, codeByCountry, phoneNumber, city,
      state, country, street, zipCode);
  }
}