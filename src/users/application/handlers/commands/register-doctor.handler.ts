import { Inject } from "@nestjs/common";
import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { AppSettings } from "src/shared/application/app-settings";
import { Doctor } from "src/users/domain/aggregates/users/doctor.entity";
import { DoctorRepository, DOCTOR_REPOSITORY } from "src/users/domain/aggregates/users/doctor.repository";
import { DataSource } from "typeorm";
import { DoctorMapper } from "../../mappers/doctor.mapper";
import { RegisterDoctor } from "../../messages/commands/register-doctor.command";

@CommandHandler(RegisterDoctor)
export class RegisterDoctorHandler implements ICommandHandler<RegisterDoctor> {
  constructor(
    private dataSource: DataSource,
    @Inject(DOCTOR_REPOSITORY)
    private readonly doctorRepository: DoctorRepository,
    private publisher: EventPublisher
  ) {}

  async execute(command: RegisterDoctor) {
    let doctor: Doctor = DoctorMapper.commandToDomain(command, AppSettings.ADMIN);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      doctor = await this.doctorRepository.create(doctor);
      if (doctor==null) {
        throw new Error("");
      }
      doctor=this.publisher.mergeObjectContext(doctor);
      doctor.register();
      doctor.commit();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      doctor=null;
    } finally {
      await queryRunner.release();
    }

    return doctor;
  }
}