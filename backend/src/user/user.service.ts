import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { Kysely } from 'kysely';
import { DatabaseService } from 'src/database/database.service';
import { Database } from 'src/database/types';

@Injectable()
export class UserService {
  private db: Kysely<Database>;

  constructor(readonly databaseService: DatabaseService) {
    this.db = this.databaseService.getKyselyInstance();
  }

  async create(createDto: User): Promise<User> {
    try {
      const { insertId } = await this.db.insertInto('User')
        .values(createDto)
        .executeTakeFirstOrThrow();
      return await this.findOne(Number(insertId));
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('User already exists', 409);
      }
      throw new HttpException('User not created', 500);
    }
  }

  async findAll(email: string): Promise<User[]> {
    try {
      return await this.db.selectFrom('User')
        .selectAll()
        .where((eb) => {
          if (!email) return eb('id', '>', 0);
          return eb('email', '=', email)
        })
        .execute();
    } catch (error) {
      return [] as User[];
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.db.selectFrom('User')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirstOrThrow();
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }

  async update(id: number, updateDto: User): Promise<User> {
    updateDto.updatedAt = new Date();
    try {
      await this.db.updateTable('User')
      .set(updateDto)
      .where('id', '=', id)
      .execute();

      return await this.findOne(id);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('User already exists', 409);
      }
      throw new HttpException('User not updated', 500);
    }
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);

    this.db.deleteFrom('User')
      .where('id', '=', id)
      .execute();

    return user;
  }
}
