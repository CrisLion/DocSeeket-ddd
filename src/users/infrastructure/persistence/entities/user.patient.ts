import { Role } from "src/users/domain/aggregates/users/user-type.enum";
import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import { AddressValue } from "../values/address.value";
import { EmailValue } from "../values/email.value";
import { FullNameValue } from "../values/fullname.value";
import { PasswordValue } from "../values/password.value";
import { PhoneNumberValue } from "../values/phone-number.value";

@Entity('users')
@TableInheritance({column: 'type'})
export class UserEntity {
  @PrimaryGeneratedColumn('increment', 
  {type: 'bigint', name: 'id', unsigned: true})
  public id: string;

  @Column({name: 'type', type: 'enum', enum: Role, default: Role.PATIENT})
  readonly type: Role;

  @Column((type) => FullNameValue, {prefix: false})
  public name: FullNameValue;

  @Column((type) => PasswordValue, {prefix: false})
  public password: PasswordValue;

  @Column((type) => EmailValue, {prefix: false})
  public email: EmailValue;

  @Column((type) => PhoneNumberValue, {prefix: false})
  public phoneNumber: PhoneNumberValue;

  @Column((type) => AddressValue, {prefix: false})
  public adress: AddressValue;
}