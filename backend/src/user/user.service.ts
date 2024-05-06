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
    const { insertId } = await this.db
      .insertInto('User')
      //.values(createDto)
      .onDuplicateKeyUpdate(createDto)
      .executeTakeFirstOrThrow();

    return await this.findOne(Number(insertId));
  }

  async findAll(email: string): Promise<User[]> {
    try {
      const users = await this.db.selectFrom('User')
        .where('email', '=', email)
        .execute();
      return users.map((user: User) => user);
    } catch (error) {
      throw new HttpException('Error fetching users: ' + error.message, 500);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      return await this.db.selectFrom('User')
        .where('id', '=', id)
        .execute()[0];
    } catch (error) {
      throw new HttpException('User not found', 404);
    }
  }

  async update(id: number, updateDto: User): Promise<User> {
    await this.db.updateTable('User')
      .set(updateDto)
      .where('id', '=', id)
      .execute();

    return await this.findOne(id);
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);

    this.db.deleteFrom('User')
      .where('id', '=', id)
      .execute();

    return user;
  }
}
