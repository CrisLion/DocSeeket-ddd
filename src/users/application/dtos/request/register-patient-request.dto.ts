export class RegisterPatientRequest {
  constructor(
    public readonly name: string,
    public readonly lastName: string,
    public readonly password: string,
    public readonly email: string,
    public readonly countryCode: string,
    public readonly phoneNumber: string,
    public readonly city: string,
    public readonly state: string,
    public readonly country: string,
    public readonly street: string,
    public readonly zipCode: string
  ) {}
}