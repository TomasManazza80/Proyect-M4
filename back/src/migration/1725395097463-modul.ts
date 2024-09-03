import { MigrationInterface, QueryRunner } from "typeorm";

export class Modul1725395097463 implements MigrationInterface {
    name = 'Modul1725395097463'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" ADD "products" jsonb`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" DROP COLUMN "products"`);
    }

}
