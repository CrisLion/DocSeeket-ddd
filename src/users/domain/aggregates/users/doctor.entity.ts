import { Address } from "src/shared/domain/values/Address.value";
import { Email } from "src/shared/domain/values/email.value";
import { Fullname } from "src/shared/domain/values/fullname.value";
import { Password } from "src/shared/domain/values/password.value";
import { PhoneNumber } from "src/shared/domain/values/PhoneNumber.value";
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