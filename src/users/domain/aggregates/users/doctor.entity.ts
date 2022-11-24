import { Address } from "src/shared/domain/values/Address.value";
import { Email } from "src/shared/domain/values/email.value";
import { Fullname } from "src/shared/domain/values/fullname.value";
import { Password } from "src/shared/domain/values/password.value";
import { PhoneNumber } from "src/shared/domain/values/PhoneNumber.value";
import { DoctorRegistered } from "../../events/doctor-registered.event";
import { DoctorId } from "./doctor-id.value";
import { Rating } from "./rating.value";
import { Role } from "./user-type.enum";
import { User } from "./user.root.entity";

export class Doctor extends User {
  private id: DoctorId;
  private rate: Rating;

  public constructor(name: Fullname, password: Password, email: Email,
    phone: PhoneNumber, address: Address, rating: Rating) {
    super(Role.DOCTOR, name, password, email, phone, address);
    this.rate=rating;
  }

  public register() {
    const event = new DoctorRegistered(
      this.id.getValue(),
      this.name.getName(),
      this.name.getLastName(),
      this.password.getPassword(),
      this.email.getEmail(),
      this.phoneNumber.getCodeByCountry(),
      this.phoneNumber.getPhoneNumber(),
      this.address.getCountry(),
      this.address.getState(),
      this.address.getCity(),
      this.address.getStreet(),
      this.address.getZipCode(),
      this.rate.getRating()
    )
  }
  
  public getId(): DoctorId {
    return this.id;
  }

  public getRating(): Rating {
    return this.rate;
  }

  public changeId(id: DoctorId) {
    this.id=id;
  }
}