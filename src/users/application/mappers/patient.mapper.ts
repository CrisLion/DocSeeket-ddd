import { Address } from "src/shared/domain/values/Address.value";
import { Email } from "src/shared/domain/values/email.value";
import { Fullname } from "src/shared/domain/values/fullname.value";
import { Password } from "src/shared/domain/values/password.value";
import { PhoneNumber } from "src/shared/domain/values/PhoneNumber.value";
import { PatientId } from "src/users/domain/aggregates/users/patient-id.value";
import { Patient } from "src/users/domain/aggregates/users/patient.entity";
import { PatientFactory } from "src/users/domain/factories/patient-factory";
import { PatientEntity } from "src/users/infrastructure/persistence/entities/patient.entity";
import { AddressValue } from "src/users/infrastructure/persistence/values/address.value";
import { EmailValue } from "src/users/infrastructure/persistence/values/email.value";
import { FullNameValue } from "src/users/infrastructure/persistence/values/fullname.value";
import { PasswordValue } from "src/users/infrastructure/persistence/values/password.value";
import { PhoneNumberValue } from "src/users/infrastructure/persistence/values/phone-number.value";
import { RegisterPatientRequest } from "../dtos/request/register-patient-request.dto";
import { PatientUserDto } from "../dtos/response/patient-user.dto";
import { RegisterPatientResponse } from "../dtos/response/register-patient-response.dto";
import { RegisterPatient } from "../messages/commands/register-patient.command";

export class PatientMapper {
  public static dtoRequestToCommand(registerPatientRequest: RegisterPatientRequest) {
    return new RegisterPatient(
      registerPatientRequest.name,
      registerPatientRequest.lastName,
      registerPatientRequest.password,
      registerPatientRequest.email,
      registerPatientRequest.countryCodePhoneNumber,
      registerPatientRequest.phoneNumber,
      registerPatientRequest.country,
      registerPatientRequest.state,
      registerPatientRequest.city,
      registerPatientRequest.street,
      registerPatientRequest.zipCode
    )
  }

  public static domainToDtoResponse(patient: Patient) {
    return new RegisterPatientResponse(
      patient.getId().getValue(),
      patient.getName().getName(),
      patient.getName().getLastName(),
      patient.getPassword().getPassword(),
      patient.getEmail().getEmail(),
      patient.getPhone().getCodeByCountry(),
      patient.getPhone().getPhoneNumber(),
      patient.getAddress().getCountry(),
      patient.getAddress().getState(),
      patient.getAddress().getCity(),
      patient.getAddress().getStreet(),
      patient.getAddress().getZipCode(),
    )
  }

  public static commandToDomain(command: RegisterPatient, patientId: string): Patient {
    const patientName: Fullname = Fullname.create(
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

    let newPatient: Patient = PatientFactory.createPatientWithoutId(
      patientName, 
      password,
      email,
      phoneNumber,
      address)

    return newPatient;
  }

  public static domainToEntity(patient: Patient): PatientEntity {
    const patientEntity: PatientEntity = new PatientEntity();

    patientEntity.name = FullNameValue.from(
      patient.getName().getName(), 
      patient.getName().getLastName()
    );
    patientEntity.password = PasswordValue.from(
      patient.getPassword().getPassword()
    );
    patientEntity.email = EmailValue.from(
      patient.getEmail().getEmail()
    )
    patientEntity.phoneNumber = PhoneNumberValue.from(
      patient.getPhone().getCodeByCountry(),
      patient.getPhone().getPhoneNumber()
    )
    patientEntity.adress=AddressValue.from(
      patient.getAddress().getCountry(),
      patient.getAddress().getState(),
      patient.getAddress().getCity(),
      patient.getAddress().getStreet(),
      patient.getAddress().getZipCode(),
    )

    return patientEntity;
  }

  public static entityToDomain(patientEntity: PatientEntity): Patient {
    if (patientEntity==null) return null;

    const patientName: Fullname = Fullname.create(
      patientEntity.name.name,
      patientEntity.name.lastName
    );
    const patientPassword: Password = Password.create(
      patientEntity.password.value
    );
    const patientEmail: Email = Email.create(
      patientEntity.email.value
    );
    const patientPhoneNumber: PhoneNumber=PhoneNumber.create(
      patientEntity.phoneNumber.codeByCountry,
      patientEntity.phoneNumber.phoneNumber
    );
    const patientAddress: Address=Address.create(
      patientEntity.adress.country,
      patientEntity.adress.state,
      patientEntity.adress.city,
      patientEntity.adress.street,
      patientEntity.adress.zipCode
    );
    const patientId: PatientId=PatientId.of(patientEntity.id);
    
    return PatientFactory.createPatientWithId(
      patientId, 
      patientName, 
      patientPassword, 
      patientEmail, 
      patientPhoneNumber, 
      patientAddress
    );
    
  }

  public static ormToPatientDto(row: any): PatientUserDto {
    let dto=new PatientUserDto();
    
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

    return dto;
  }

}