import { MigrationInterface, QueryRunner } from 'typeorm';

export class BookRefactor1673210625133 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" RENAME COLUMN "description" to "excerpt"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "book" RENAME COLUMN "excerpt" to "description"`,
    );
  }
}
