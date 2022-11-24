import { Inject, Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AppNotification } from "src/shared/application/app.notification";
import { Patient } from "src/users/domain/aggregates/users/patient.entity";
import { PatientRepository, PATIENT_REPOSITORY } from "src/users/domain/aggregates/users/patient.repository";
import { Result } from "typescript-result";
import { RegisterPatientRequest } from "../dtos/request/register-patient-request.dto";
import { RegisterPatientResponse } from "../dtos/response/register-patient-response.dto";
import { PatientMapper } from "../mappers/patient.mapper";
import { RegisterPatient } from "../messages/commands/register-patient.command";
import { RegisterPatientValidator } from "../validators/register-patient.validator";

@Injectable()
export class PatientApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerPatientValidator: RegisterPatientValidator,
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: PatientRepository
  ) {}

  async register(
    registerPatientRequest: RegisterPatientRequest
  ): Promise<Result<AppNotification, RegisterPatientResponse>> 
  {
    const registerPatient: RegisterPatient = PatientMapper.dtoRequestToCommand(registerPatientRequest);
    const notification: AppNotification = await this.registerPatientValidator.validate(registerPatient);

    if (notification.hasErrors()) return Result.error(notification);

    const patient: Patient = await this.commandBus.execute(registerPatient);
    const response: RegisterPatientResponse = PatientMapper.domainToDtoResponse(patient);

    return Result.ok(response);
  }

  async getById(id: string) {
    return await this.patientRepository.getById(id);
  }
}