import { MigrationInterface, QueryRunner } from "typeorm"
import { SqlReader } from "node-sql-reader";

export class InitialSchema1668932217461 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const folder = __dirname;
        const path = folder + '/initial-schema.sql';
        let queries = SqlReader.readSqlFile(path);
        for (let query of queries) {
            await queryRunner.query(query);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
