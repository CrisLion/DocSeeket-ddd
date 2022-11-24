import { Inject, Injectable } from "@nestjs/common";
import { AppNotification } from "src/shared/application/app.notification";
import { DoctorRepository, DOCTOR_REPOSITORY } from "src/users/domain/aggregates/users/doctor.repository";
import { RegisterDoctor } from "../messages/commands/register-doctor.command";

@Injectable()
export class RegisterDoctorValidator {
  constructor(
    @Inject(DOCTOR_REPOSITORY)
    private doctorRepository: DoctorRepository
  ) 
  {}

  public async validate(registerdoctor: RegisterDoctor): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const name: string = registerdoctor.name ? registerdoctor.name.trim(): '';
    if (name.length <=0) {
      notification.addError("Name is required", null);
    }

    const lastName: string = registerdoctor.lastName ? registerdoctor.lastName.trim(): '';
    if (lastName.length <=0) {
      notification.addError("Lastname is required", null);
    }

    const password: string = registerdoctor.password ? registerdoctor.password.trim() : '';
    if (password.length<=0) {
      notification.addError("Password is required", null);
    }

    if (notification.hasErrors()) {
      return notification;
    }

    return notification;
  
  }
}