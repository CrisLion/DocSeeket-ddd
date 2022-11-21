import { Address } from "src/shared/domain/values/Address.value";
import { Email } from "src/shared/domain/values/email.value";
import { Fullname } from "src/shared/domain/values/fullname.value";
import { Password } from "src/shared/domain/values/password.value";
import { PhoneNumber } from "src/shared/domain/values/PhoneNumber.value";
import { PatientId } from "./patient-id.value";
import { Role } from "./user-type.enum";
import { User } from "./user.root.entity";

export class Patient extends User {
  private id: PatientId

  public constructor(name: Fullname, password: Password, email: Email,
    phone: PhoneNumber, address: Address) {
    super(Role.PATIENT, name, password, email, phone, address);
  }
  
  public getId(): PatientId {
    return this.id;
  }

  public changeId(id: PatientId) {
    this.id=id;
  }
}