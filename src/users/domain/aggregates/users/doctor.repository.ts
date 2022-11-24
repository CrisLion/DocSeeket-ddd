import { Doctor } from "./doctor.entity"

export const DOCTOR_REPOSITORY = "DoctorRepository"

export interface DoctorRepository {
  create(doctor: Doctor): Promise<Doctor>;
  update(doctor: Doctor): Promise<Doctor>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<Doctor>;
}