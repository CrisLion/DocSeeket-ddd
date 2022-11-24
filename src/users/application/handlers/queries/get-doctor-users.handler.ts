import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { DataSource } from "typeorm";
import { DoctorUserDto } from "../../dtos/response/doctor-user.dto";
import { DoctorMapper } from "../../mappers/doctor.mapper";
import { GetDoctorUsers } from "../../messages/queries/get-doctor-users.query";

@QueryHandler(GetDoctorUsers)
export class GetDoctorUsersHandler implements IQueryHandler<GetDoctorUsers> {
  constructor(
    private dataSource: DataSource
  ) {}

  async execute(query: GetDoctorUsers) {
    const manager = this.dataSource.createEntityManager();
    const sql = `
    SELECT
      id,
      first_name as name,
      last_name as lastName,
    FROM
      users
    WHERE
      type='D'
    ORDER BY
      last_name, first_name;`;

    const rows = await manager.query(sql);
    if (rows.length <= 0) return [];

    const doctorUsers: DoctorUserDto[] = rows.map(function(row: any) {
      return DoctorMapper.ormToDoctorDto(row);
    });
    return doctorUsers;
  }
}