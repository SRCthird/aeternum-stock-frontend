import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LogService {

  constructor(readonly databaseService: DatabaseService) { }

  create(createDto: Prisma.LogCreateInput) {
    return this.databaseService.log.create({ data: createDto });
  }

  findAll(
    fromLocation?: string,
    toLocation?: string,
    userId?: string,
    lotNumber?: string,
    startDate?: string,
    endDate?: string
  ) {
    const query: Prisma.LogFindManyArgs = {
      where: {
        fromLocation: {
          startsWith: fromLocation
        },
        toLocation: {
          startsWith: toLocation
        },
        userId: userId,
        lotNumber: {
          startsWith: lotNumber
        },
      }
    };

    if (startDate && endDate) {
      query.where.dateTime = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    return this.databaseService.log.findMany(query);
  }

  findOne(id: number) {
    return this.databaseService.log.findUnique({ where: { id } });
  }

  update(id: number, updateDto: Prisma.LogUpdateInput) {
    return this.databaseService.log.update({ where: { id }, data: updateDto });
  }

  remove(id: number) {
    return this.databaseService.log.delete({ where: { id } });
  }
}
