import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1723741159912 implements MigrationInterface {
    name = 'Migration1723741159912'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" ADD "orderDetailId" uuid`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_1976b8d15ab024d096a042bcb5a" FOREIGN KEY ("orderDetailId") REFERENCES "order_detail_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_1976b8d15ab024d096a042bcb5a"`);
        await queryRunner.query(`ALTER TABLE "order" DROP COLUMN "orderDetailId"`);
    }

}
