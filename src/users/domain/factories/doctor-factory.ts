import { Email } from "src/shared/domain/values/email.value";
import { Fullname } from "src/shared/domain/values/fullname.value";
import { Password } from "src/shared/domain/values/password.value";
import { PhoneNumber } from "src/shared/domain/values/PhoneNumber.value";
import { Address } from "src/shared/domain/values/Address.value";
import { Rating } from "../aggregates/users/rating.value";
import { Doctor } from "../aggregates/users/doctor.entity";
import { DoctorId } from "../aggregates/users/doctor-id.value";

export class PatientFactory {
  public static createPatient(id: DoctorId, name: Fullname, password: Password, email: Email,
    phone: PhoneNumber, address: Address, rating: Rating) {
      let doctor: Doctor = new Doctor(name, password, email, phone, address, rating);
      doctor.changeId(id);
      return doctor;
  }
}