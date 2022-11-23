import { Doctor } from "./doctor.entity"

export const PATIENT_REPOSITORY = "PatientRepository"

export interface PatientRepository {
  create(patient: Doctor): Promise<Doctor>;
  update(patient: Doctor): Promise<Doctor>;
  delete(id: string): Promise<boolean>;
  getById(id: string): Promise<Doctor>;
}