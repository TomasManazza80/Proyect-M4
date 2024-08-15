import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateNewMigration1722971422833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('CREATE TABLE TEST (id SERIAL PRIMARY KEY)');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query('DROP TABLE TEST');
    }

}


