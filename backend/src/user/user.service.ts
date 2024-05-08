import { HttpException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {

  constructor(readonly databaseService: DatabaseService) {}

  async create(createDto: User): Promise<User> {
    try {
      const { insertId } = await this.databaseService.insertInto('User')
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
      return await this.databaseService.selectFrom('User')
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
      return await this.databaseService.selectFrom('User')
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
      await this.databaseService.updateTable('User')
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

    this.databaseService.deleteFrom('User')
      .where('id', '=', id)
      .execute();

    return user;
  }
}
