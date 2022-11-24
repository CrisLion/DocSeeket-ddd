import { UserRegistered } from "./user-registered.event";

export class DoctorRegistered extends UserRegistered {
  constructor(
    id: string,
    firstName: string,
    lastName: string,
    password: string,
    email: string,
    countryCodePhoneNumber: string, 
    phoneNumber: string,
    country: string,
    state: string,
    city: string,
    street: string,
    zipCode: string,
    public readonly rating: Number) 
  {
    super(
      id, 
      firstName, 
      lastName, 
      password, 
      email, 
      countryCodePhoneNumber, 
      phoneNumber, 
      country, 
      state, 
      city, 
      street, 
      zipCode
    );
  }
}