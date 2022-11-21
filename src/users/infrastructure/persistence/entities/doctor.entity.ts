import { Role } from "src/users/domain/aggregates/users/user-type.enum";
import { ChildEntity, Column } from "typeorm";
import { RatingValue } from "../values/rating.value";
import { UserEntity } from "./user.patient";

@ChildEntity(Role.DOCTOR)
export class DoctorEntity extends UserEntity {
  @Column((type) => RatingValue, {prefix: false})
  public rating: RatingValue;
}