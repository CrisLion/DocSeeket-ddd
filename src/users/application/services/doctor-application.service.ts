import { Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AppNotification } from "src/shared/application/app.notification";
import { Doctor } from "src/users/domain/aggregates/users/doctor.entity";
import { DoctorRepository, DOCTOR_REPOSITORY } from "src/users/domain/aggregates/users/doctor.repository";
import { Result } from "typescript-result";
import { RegisterDoctorRequest } from "../dtos/request/register-doctor-request.dto";
import { RegisterDoctorResponse } from "../dtos/response/register-doctor-response.dto";
import { DoctorMapper } from "../mappers/doctor.mapper";
import { RegisterDoctor } from "../messages/commands/register-doctor.command";
import { RegisterDoctorValidator } from "../validators/register-doctor.validator";

@Injectable()
export class DoctorApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerdoctorValidator: RegisterDoctorValidator,
    @Inject(DOCTOR_REPOSITORY)
    private readonly doctorRepository: DoctorRepository
  ) {}

  async register(
    registerdoctorRequest: RegisterDoctorRequest
  ): Promise<Result<AppNotification, RegisterDoctorResponse>> 
  {
    const registerdoctor: RegisterDoctor = DoctorMapper.dtoRequestToCommand(registerdoctorRequest);
    const notification: AppNotification = await this.registerdoctorValidator.validate(registerdoctor);

    if (notification.hasErrors()) return Result.error(notification);

    const doctor: Doctor = await this.commandBus.execute(registerdoctor);
    const response: RegisterDoctorResponse = DoctorMapper.domainToDtoResponse(doctor);

    return Result.ok(response);
  }

  async getById(id: string) {
    return await this.doctorRepository.getById(id);
  }
}