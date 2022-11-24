import { Inject, Injectable } from "@nestjs/common";
import { AppNotification } from "src/shared/application/app.notification";
import { PatientRepository, PATIENT_REPOSITORY } from "src/users/domain/aggregates/users/patient.repository";
import { RegisterPatient } from "../messages/commands/register-patient.command";

@Injectable()
export class RegisterPatientValidator {
  constructor(
    @Inject(PATIENT_REPOSITORY)
    private patientRepository: PatientRepository
  ) 
  {}

  public async validate(registerPatient: RegisterPatient): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const name: string = registerPatient.name ? registerPatient.name.trim(): '';
    if (name.length <=0) {
      notification.addError("Name is required", null);
    }

    const lastName: string = registerPatient.lastName ? registerPatient.lastName.trim(): '';
    if (lastName.length <=0) {
      notification.addError("Lastname is required", null);
    }

    const password: string = registerPatient.password ? registerPatient.password.trim() : '';
    if (password.length<=0) {
      notification.addError("Password is required", null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    return notification;
  
  }

}