import { Patient } from "./patient.entity"

export const PATIENT_REPOSITORY = "PatientRepository"

export interface PatientRepository {
  create(patient: Patient): Promise<Patient>;
  update(patient: Patient): Promise<Patient>;
  delete(id: Number): Promise<boolean>;
  getById(id: Number): Promise<Patient>;
}