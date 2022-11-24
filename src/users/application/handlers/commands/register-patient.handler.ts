import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AppSettings } from "src/shared/application/app-settings";
import { Patient } from "src/users/domain/aggregates/users/patient.entity";
import { PatientRepository, PATIENT_REPOSITORY } from "src/users/domain/aggregates/users/patient.repository";
import { DataSource } from "typeorm";
import { PatientMapper } from "../../mappers/patient.mapper";
import { RegisterPatient } from "../../messages/commands/register-patient.command";

@CommandHandler(RegisterPatient)
export class RegisterPatientHandler implements ICommandHandler<RegisterPatient> {
  constructor(
    private dataSource: DataSource,
    @Inject(PATIENT_REPOSITORY)
    private readonly patientRepository: PatientRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterPatient) {
    let patient: Patient = PatientMapper.commandToDomain(command, AppSettings.ADMIN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      patient = await this.patientRepository.create(patient);
      if (patient==null) {
        throw new Error("");
      }
      patient=this.publisher.mergeObjectContext(patient);
      patient.register();
      patient.commit();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      patient=null;
    } finally {
      await queryRunner.release();
    }

    return patient;
  }
}