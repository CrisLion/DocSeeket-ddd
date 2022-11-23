export class RegisterPatientResponse {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly lastName: string,
    public readonly password: string,
    public readonly email: string,
    public readonly countryCodePhoneNumber: string,
    public readonly phoneNumber: string,
    public readonly country: string,
    public readonly state: string,
    public readonly city: string,
    public readonly street: string,
    public readonly zipCode: string,
  ) {}
}