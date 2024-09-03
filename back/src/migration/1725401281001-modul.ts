import { MigrationInterface, QueryRunner } from "typeorm";

export class Modul1725401281001 implements MigrationInterface {
    name = 'Modul1725401281001'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" ALTER COLUMN "products" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" ALTER COLUMN "products" DROP NOT NULL`);
    }

}
