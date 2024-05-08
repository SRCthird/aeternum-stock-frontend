import { HttpException, Injectable } from '@nestjs/common';
import { Log } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LogService {

  constructor(readonly databaseService: DatabaseService) {}

  async create(createDto: Log): Promise<Log> {
    try {
      const { insertId } = await this.databaseService.insertInto('Log')
        .values(createDto)
        .executeTakeFirstOrThrow();

      return await this.findOne(Number(insertId));
    } catch (error) {
      throw new HttpException('Error creating log: ' + error.message, 500);
    }
  }

  async findAll(
    fromLocation?: string,
    toLocation?: string,
    username?: string,
    lotNumber?: string,
    startDate?: string,
    endDate?: string
  ): Promise<Log[]> {
    try {
      return await this.databaseService.selectFrom('Log')
        .selectAll()
        .where((eb) => {
          if (
            !fromLocation &&
            !toLocation &&
            !username &&
            !lotNumber &&
            !startDate &&
            !endDate
          ) return eb('id', '>', 0);
          return eb.or([
            fromLocation ? eb('fromLocation', '=', fromLocation) : null,
            toLocation ? eb('toLocation', '=', toLocation) : null,
            username ? eb('user', '=', username) : null,
            lotNumber ? eb('lotNumber', '=', lotNumber) : null,
            startDate ? eb('dateTime', '>=', new Date(startDate)) : null,
            endDate ? eb('dateTime', '<=', new Date(endDate)) : null
          ].filter((x) => x !== null))
        })
        .execute();
    } catch (error) {
      return [] as Log[];
    }
  }

  async findOne(id: number): Promise<Log> {
    try {
      return await this.databaseService.selectFrom('Log')
        .selectAll()
        .where('id', '=', id)
        .execute()[0];
    } catch (error) {
      throw new HttpException('Log not found', 404);
    }
  }

  async update(id: number, updateDto: Log): Promise<Log> {
    try {
      await this.databaseService.updateTable('Log')
        .set(updateDto)
        .where('id', '=', id)
        .execute();

      return await this.findOne(id);
    } catch (error) {
      throw new HttpException('Error updating log: ' + error.message, 500);
    }
  }

  async remove(id: number): Promise<Log> {
    const log = await this.findOne(id);
    try {
      this.databaseService.deleteFrom('Log')
        .where('id', '=', id)
        .execute();

      return log;
    } catch (error) {
      throw new HttpException('Error deleting log: ' + error.message, 500);
    }
  }
}
