import {MigrationInterface, QueryRunner} from "typeorm";

export class createArticles1630230112332 implements MigrationInterface {
    name = 'createArticles1630230112332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "slug" character varying NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL DEFAULT '', "body" character varying NOT NULL DEFAULT '', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "tagList" text NOT NULL, "favoritesCount" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "image" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "image" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "image" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
