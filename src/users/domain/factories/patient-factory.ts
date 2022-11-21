import { Patient } from "../aggregates/users/patient.entity";
import { Email } from "src/shared/domain/values/email.value";
import { Fullname } from "src/shared/domain/values/fullname.value";
import { Password } from "src/shared/domain/values/password.value";
import { PhoneNumber } from "src/shared/domain/values/PhoneNumber.value";
import { PatientId } from "../aggregates/users/patient-id.value";
import { Address } from "src/shared/domain/values/Address.value";

export class PatientFactory {
  public static createPatient(id: PatientId, name: Fullname, password: Password, email: Email,
    phone: PhoneNumber, address: Address) {
      let patient: Patient = new Patient(name, password, email, phone, address);
      patient.changeId(id);
      return patient;
  }
}