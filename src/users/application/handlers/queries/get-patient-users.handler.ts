import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataSource } from "typeorm";
import { PatientUserDto } from "../../dtos/response/patient-user.dto";
import { PatientMapper } from "../../mappers/patient.mapper";
import { GetPatientUsers } from "../../messages/queries/get-patient-users.query";

@QueryHandler(GetPatientUsers)
export class GetPatientUsersHandler implements IQueryHandler<GetPatientUsers> {
  constructor(
    private dataSource: DataSource
  ) {}

  async execute(query: GetPatientUsers) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT
      id,
      first_name as name,
      last_name as lastName,
    FROM
      users
    WHERE
      type='P'
    ORDER BY
      last_name, first_name;`;

    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];

    const patientUsers: PatientUserDto[] = rows.map(function(row: any) {
      return PatientMapper.ormToPatientDto(row);
    });
    return patientUsers;
  }
}