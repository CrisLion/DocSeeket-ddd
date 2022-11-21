import { Doctor } from "./doctor.entity"

export const PATIENT_REPOSITORY = "PatientRepository"

export interface PatientRepository {
  create(patient: Doctor): Promise<Doctor>;
  update(patient: Doctor): Promise<Doctor>;
  delete(id: Number): Promise<boolean>;
  getById(id: Number): Promise<Doctor>;
}