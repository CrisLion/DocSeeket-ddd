import { InjectRepository } from "@nestjs/typeorm";import { PatientMapper } from "src/users/application/mappers/patient.mapper";
import { DoctorRepository } from "src/users/domain/aggregates/users/doctor.repository";
import { DoctorEntity } from "../entities/doctor.entity";
import { Repository } from "typeorm";
import { Doctor } from "src/users/domain/aggregates/users/doctor.entity";
import { DoctorMapper } from "src/users/application/mappers/doctor.mapper";


export class DoctorEntityRepository implements DoctorRepository {
  constructor(
    @InjectRepository(DoctorEntity)
    private doctorRepository: Repository<DoctorEntity>
  ) {}

  async create(doctor: Doctor): Promise<Doctor> {
    let doctorEntity: DoctorEntity = DoctorMapper.domainToEntity(doctor);
    doctorEntity = await this.doctorRepository.save(doctorEntity);
    return DoctorMapper.entityToDomain(doctorEntity);
  }

  async update(doctor: Doctor): Promise<Doctor> {
    let doctorEntity: DoctorEntity = DoctorMapper.domainToEntity(doctor);
    let doctorId: string = doctor.getId().getValue();
    await this.doctorRepository.update({id: doctorId}, doctorEntity);
    return doctor;
  }

  async delete(id: string): Promise<boolean> {
    await this.doctorRepository.delete({id: id})
    return true;
  }

  async getById(id: string): Promise<Doctor> {
    let doctorEntity: DoctorEntity = await this.doctorRepository.findOne({where: {id: id}});
    return DoctorMapper.entityToDomain(doctorEntity);
  }
}