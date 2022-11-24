import { Module } from '@nestjs/common';
import { CommandHandler, CqrsModule, EventsHandler, QueryHandler } from '@nestjs/cqrs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRegisteredHandler } from 'src/notifications/application/handlers/events/doctor-registered.handler';
import { PatientRegisteredHandler } from 'src/notifications/application/handlers/events/patient-registered.handler';
import { RegisterDoctorHandler } from './application/handlers/commands/register-doctor.handler';
import { RegisterPatientHandler } from './application/handlers/commands/register-patient.handler';
import { GetDoctorUsersHandler } from './application/handlers/queries/get-doctor-users.handler';
import { GetPatientUsersHandler } from './application/handlers/queries/get-patient-users.handler';
import { DoctorApplicationService } from './application/services/doctor-application.service';
import { PatientApplicationService } from './application/services/patient-application.service';
import { RegisterDoctorValidator } from './application/validators/register-doctor.validator';
import { RegisterPatientValidator } from './application/validators/register-patient.validator';
import { DOCTOR_REPOSITORY } from './domain/aggregates/users/doctor.repository';
import { PATIENT_REPOSITORY } from './domain/aggregates/users/patient.repository';
import { DoctorEntity } from './infrastructure/persistence/entities/doctor.entity';
import { PatientEntity } from './infrastructure/persistence/entities/patient.entity';
import { UserEntity } from './infrastructure/persistence/entities/user.patient';
import { DoctorEntityRepository } from './infrastructure/persistence/repositories/doctor.repository';
import { PatientEntityRepository } from './infrastructure/persistence/repositories/patient.repository';
import { DoctorController } from './interface/rest/doctor.controller';
import { PatientController } from './interface/rest/patient.controller';

export const CommandHandlers = [RegisterPatientHandler, RegisterDoctorHandler];
export const EventHandlers = [PatientRegisteredHandler, DoctorRegisteredHandler];
export const QueryHandlers = [GetPatientUsersHandler, GetDoctorUsersHandler];

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([UserEntity, PatientEntity, DoctorEntity])
  ],
  exports: [TypeOrmModule],
  controllers: [PatientController, DoctorController],
  providers: [
    {useClass: PatientEntityRepository, provide: PATIENT_REPOSITORY},
    {useClass: DoctorEntityRepository, provide: DOCTOR_REPOSITORY},
    PatientApplicationService,
    DoctorApplicationService,
    RegisterPatientValidator,
    RegisterDoctorValidator,
    PatientEntityRepository,
    DoctorEntityRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers
  ]
})
export class UsersModule {}
