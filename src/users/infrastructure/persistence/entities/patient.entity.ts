import { Role } from "src/users/domain/aggregates/users/user-type.enum";
import { ChildEntity } from "typeorm";
import { UserEntity } from "./user.patient";

@ChildEntity(Role.PATIENT)
export class PatientEntity extends UserEntity {
  
}