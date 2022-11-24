import { InjectRepository } from "@nestjs/typeorm";import { PatientMapper } from "src/users/application/mappers/patient.mapper";
import { Patient } from "src/users/domain/aggregates/users/patient.entity";
import { PatientRepository } from "src/users/domain/aggregates/users/patient.repository";
import { Repository } from "typeorm";
import { PatientEntity } from "../entities/patient.entity";

export class PatientEntityRepository implements PatientRepository {
  constructor(
    @InjectRepository(PatientEntity)
    private patientRepository: Repository<PatientEntity>
  ) {}

  async create(patient: Patient): Promise<Patient> {
    let patientEntity: PatientEntity = PatientMapper.domainToEntity(patient);
    patientEntity = await this.patientRepository.save(patientEntity);
    return PatientMapper.entityToDomain(patientEntity);
  }

  async update(patient: Patient): Promise<Patient> {
    let patientEntity: PatientEntity = PatientMapper.domainToEntity(patient);
    let patientId: string = patient.getId().getValue();
    await this.patientRepository.update({id: patientId}, patientEntity);
    return patient
  }

  async delete(id: string): Promise<boolean> {
    await this.patientRepository.delete({id: id})
    return true;
  }

  async getById(id: string): Promise<Patient> {
    let patientEntity: PatientEntity = await this.patientRepository.findOne({where: {id: id}});
    return PatientMapper.entityToDomain(patientEntity);
  }
}
