import { HttpException, Injectable } from '@nestjs/common';
import { Log } from '@prisma/client';
import { Kysely } from 'kysely';
import { DatabaseService } from 'src/database/database.service';
import { Database } from 'src/database/types';

@Injectable()
export class LogService {
  private db: Kysely<Database>;

  constructor(readonly databaseService: DatabaseService) {
    this.db = this.databaseService.getKyselyInstance();
  }

  async create(createDto: Log) {
    const { insertId } = await this.db
      .insertInto('Log')
      //.values(createDto)
      .onDuplicateKeyUpdate(createDto)
      .executeTakeFirstOrThrow();

    return await this.findOne(Number(insertId));
  }

  async findAll(
    fromLocation?: string,
    toLocation?: string,
    username?: string,
    lotNumber?: string,
    startDate?: string,
    endDate?: string
  ) {
    try {
      const result = await this.db.selectFrom('Log')
        .where((eb) => eb.or([
          fromLocation ? eb('fromLocation', '=', fromLocation) : null,
          toLocation ? eb('toLocation', '=', toLocation) : null,
          username ? eb('user', '=', username) : null,
          lotNumber ? eb('lotNumber', '=', lotNumber) : null,
          startDate ? eb('dateTime', '>=', new Date(startDate)) : null,
          endDate ? eb('dateTime', '<=', new Date(endDate)) : null
        ]))
        .execute();
      return result.map((row: Log) => row);
    } catch (error) {
      throw new HttpException('Error fetching users: ' + error.message, 500);
    }
  }

  async findOne(id: number) {
    try {
      return await this.db.selectFrom('Log')
        .where('id', '=', id)
        .execute()[0];
    } catch (error) {
      throw new HttpException('Log not found', 404);
    }
  }

  async update(id: number, updateDto: Log) {
    await this.db.updateTable('Log')
      .set(updateDto)
      .where('id', '=', id)
      .execute();

    return await this.findOne(id);
  }

  async remove(id: number) {
    const log = await this.findOne(id);

    this.db.deleteFrom('Log')
      .where('id', '=', id)
      .execute();

    return log;
  }
}
