import { AggregateRoot } from "@nestjs/cqrs";
import { Address } from "src/shared/domain/values/Address.value";
import { Email } from "src/shared/domain/values/email.value";
import { Fullname } from "src/shared/domain/values/fullname.value";
import { Password } from "src/shared/domain/values/password.value";
import { PhoneNumber } from "src/shared/domain/values/PhoneNumber.value";
import { Role } from "./user-type.enum";

export class User extends AggregateRoot {
  protected name: Fullname;
  protected password: Password;
  protected email: Email;
  protected phoneNumber: PhoneNumber;
  protected address: Address;
  protected type: Role;

  public constructor(type: Role, name: Fullname, password:Password, email:Email,
    phone: PhoneNumber, address: Address) {
    super();
    this.type=type;
    this.name=name;
    this.password=password;
    this.email=email;
    this.phoneNumber=phone;
    this.address=address;
  }

  public getName(): Fullname {
    return this.name;
  }

  public getPassword(): Password {
    return this.password;
  }

  public getEmail(): Email {
    return this.email;
  }

  public getPhone(): PhoneNumber {
    return this.phoneNumber;
  }

  public getAddress(): Address {
    return this.address;
  }

  public getType(): Role {
    return this.type;
  }
}