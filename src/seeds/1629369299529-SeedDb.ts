import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1629369299529 implements MigrationInterface {
  name = 'SeedDb1629369299529';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'),('coffee'),('nestjs')`,
    );

    //pass is 123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('foo','foo@gmail.com', '$2b$10$cHBACqAeEfGfrmB6nujS8ezNGJJJDaDXvXV1SKdZEDAIMGhxstsfK')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") 
      VALUES ('first-article','first title', 'first descr', 'first  body', 'coffee, dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article','second article', 'second article descr', 'second article body', 'coffee, dragons', 1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(``);
  }
}
