import { MigrationInterface, QueryRunner } from "typeorm";

export class Modul1725399338674 implements MigrationInterface {
    name = 'Modul1725399338674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "orderDetail_id" jsonb NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order_detail" ALTER COLUMN "products" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_detail" ALTER COLUMN "products" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderDetail_id"`);
    }

}
