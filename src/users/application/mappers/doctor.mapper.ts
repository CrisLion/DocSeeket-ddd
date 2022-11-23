import { Address } from "src/shared/domain/values/Address.value";
import { Email } from "src/shared/domain/values/email.value";
import { Fullname } from "src/shared/domain/values/fullname.value";
import { Password } from "src/shared/domain/values/password.value";
import { PhoneNumber } from "src/shared/domain/values/PhoneNumber.value";
import { DoctorId } from "src/users/domain/aggregates/users/doctor-id.value";
import { Doctor } from "src/users/domain/aggregates/users/doctor.entity";
import { Rating } from "src/users/domain/aggregates/users/rating.value";
import { DoctorFactory } from "src/users/domain/factories/doctor-factory";
import { DoctorEntity } from "src/users/infrastructure/persistence/entities/doctor.entity";
import { AddressValue } from "src/users/infrastructure/persistence/values/address.value";
import { EmailValue } from "src/users/infrastructure/persistence/values/email.value";
import { FullNameValue } from "src/users/infrastructure/persistence/values/fullname.value";
import { PasswordValue } from "src/users/infrastructure/persistence/values/password.value";
import { PhoneNumberValue } from "src/users/infrastructure/persistence/values/phone-number.value";
import { RatingValue } from "src/users/infrastructure/persistence/values/rating.value";
import { RegisterDoctorRequest } from "../dtos/request/register-doctor-request.dto";
import { DoctorUserDto } from "../dtos/response/doctor-user.dto";
import { RegisterDoctorResponse } from "../dtos/response/register-doctor-response.dto";
import { RegisterDoctor } from "../messages/commands/register-doctor.command";

export class DoctorMapper {
  public static dtoRequestToCommand(registerDoctorRequest: RegisterDoctorRequest) {
    return new RegisterDoctorRequest(
      registerDoctorRequest.name,
      registerDoctorRequest.lastName,
      registerDoctorRequest.password,
      registerDoctorRequest.email,
      registerDoctorRequest.countryCodePhoneNumber,
      registerDoctorRequest.phoneNumber,
      registerDoctorRequest.country,
      registerDoctorRequest.state,
      registerDoctorRequest.city,
      registerDoctorRequest.street,
      registerDoctorRequest.zipCode,
      registerDoctorRequest.rating
    );
  }

  public static domainToDtoResponse(doctor: Doctor) {
    return new RegisterDoctorResponse(
      doctor.getId().getValue(),
      doctor.getName().getName(),
      doctor.getName().getLastName(),
      doctor.getPassword().getPassword(),
      doctor.getEmail().getEmail(),
      doctor.getPhone().getCodeByCountry(),
      doctor.getPhone().getPhoneNumber(),
      doctor.getAddress().getCountry(),
      doctor.getAddress().getState(),
      doctor.getAddress().getCity(),
      doctor.getAddress().getStreet(),
      doctor.getAddress().getZipCode(),
      doctor.getRating().getRating()
    );
  }

  public static commandToDomain(command: RegisterDoctor, doctorId: string): Doctor {
    const doctorName: Fullname = Fullname.create(
      command.name, 
      command.lastName
    );
    const password: Password = Password.create(command.password);
    const email: Email = Email.create(command.password);
    const phoneNumber: PhoneNumber=PhoneNumber.create(
      command.countryCodePhoneNumber, 
      command.phoneNumber
    );
    const address: Address=Address.create(
      command.country,
      command.state,
      command.city,
      command.street,
      command.zipCode
    )
    const rating: Rating=Rating.create(
      command.rating
    )

    let newDoctor: Doctor = DoctorFactory.createDoctorWithoutId(
      doctorName, 
      password,
      email,
      phoneNumber,
      address,
      rating  
    )

    return newDoctor;
  }

  public static domainToEntity(doctor: Doctor): DoctorEntity {
    const doctorEntity: DoctorEntity = new DoctorEntity();

    doctorEntity.name = FullNameValue.from(
      doctor.getName().getName(), 
      doctor.getName().getLastName()
    );
    doctorEntity.password = PasswordValue.from(
      doctor.getPassword().getPassword()
    );
    doctorEntity.email = EmailValue.from(
      doctor.getEmail().getEmail()
    )
    doctorEntity.phoneNumber = PhoneNumberValue.from(
      doctor.getPhone().getCodeByCountry(),
      doctor.getPhone().getPhoneNumber()
    )
    doctorEntity.adress=AddressValue.from(
      doctor.getAddress().getCountry(),
      doctor.getAddress().getState(),
      doctor.getAddress().getCity(),
      doctor.getAddress().getStreet(),
      doctor.getAddress().getZipCode(),
    )
    doctorEntity.rating=RatingValue.from(
      doctor.getRating().getRating()
    )

    return doctorEntity;
  }

  public static entityToDomain(doctorEntity: DoctorEntity): Doctor {
    if (doctorEntity==null) return null;

    const doctorName: Fullname = Fullname.create(
      doctorEntity.name.name,
      doctorEntity.name.lastName
    );
    const doctorPassword: Password = Password.create(
      doctorEntity.password.value
    );
    const doctorEmail: Email = Email.create(
      doctorEntity.email.value
    );
    const doctorPhoneNumber: PhoneNumber=PhoneNumber.create(
      doctorEntity.phoneNumber.codeByCountry,
      doctorEntity.phoneNumber.phoneNumber
    );
    const doctorAddress: Address=Address.create(
      doctorEntity.adress.country,
      doctorEntity.adress.state,
      doctorEntity.adress.city,
      doctorEntity.adress.street,
      doctorEntity.adress.zipCode
    );
    const doctorRating: Rating=Rating.create(
      doctorEntity.rating.rating
    )
    const doctorId: DoctorId=DoctorId.of(doctorEntity.id);
    
    return DoctorFactory.createDoctorWithId(
      doctorId, 
      doctorName, 
      doctorPassword, 
      doctorEmail, 
      doctorPhoneNumber, 
      doctorAddress,
      doctorRating
    ); 
  }

  public static ormToDoctorDto(row: any): DoctorUserDto {
    let dto=new DoctorUserDto();
    
    dto.id= row.id;
    dto.name= row.name;
    dto.lastName= row.lastName
    dto.password= row.password
    dto.email= row.email;
    dto.countryCodePhoneNumber= row.codeByCountry;
    dto.phoneNumber= row.phoneNumber;
    dto.country= row.country;
    dto.state= row.state;
    dto.city= row.city;
    dto.street= row.street;
    dto.zipCode= row.zipCode;
    dto.rating=row.rating;

    return dto;
  }
}