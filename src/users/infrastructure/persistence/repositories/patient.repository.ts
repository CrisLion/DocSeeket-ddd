import { InjectRepository } from "@nestjs/typeorm";
import { PatientRepository } from "src/users/domain/aggregates/users/doctor.repository";
import { Patient } from "src/users/domain/aggregates/users/patient.entity";
import { Repository } from "typeorm";
import { PatientEntity } from "../entities/patient.entity";

// export class PatientEntityRepository implements PatientRepository {
//   constructor(
//     @InjectRepository(PatientEntity)
//     private patientRepository: Repository<PatientEntity>,
//   ) {}

// //  async create(patient: Patient): Promise<Patient> {
  
// //  }

// //  async update(patient: Patient): Promise<Patient> {

// //  }

// //  async delete(id: string): Promise<boolean> {

// //  }

// //  async getById(id: string): Promise<Patient> {

// //  }

//   /*
//     create(patient: Patient): Promise<Patient>;
//     update(patient: Patient): Promise<Patient>;
//     delete(id: Number): Promise<boolean>;
//     getById(id: Number): Promise<Patient>;
//   */
// } 