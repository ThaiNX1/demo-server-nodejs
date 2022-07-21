import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductEntity1635230202032 implements MigrationInterface {
    name = 'ProductEntity1635230202032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "store" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "address" character varying NOT NULL, "phone" character varying NOT NULL, "expire" TIMESTAMP WITH TIME ZONE NOT NULL, "commission" jsonb NOT NULL, "userId" integer, CONSTRAINT "PK_f3172007d4de5ae8e7692759d79" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "store" ADD CONSTRAINT "FK_3f82dbf41ae837b8aa0a27d29c3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "store" DROP CONSTRAINT "FK_3f82dbf41ae837b8aa0a27d29c3"`);
        await queryRunner.query(`DROP TABLE "store"`);
    }

}
