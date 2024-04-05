import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class LogService {

  constructor(readonly databaseService: DatabaseService) { }

  create(createDto: Prisma.LogCreateInput) {
    return this.databaseService.log.create({ data: createDto });
  }

  findAll() {
    return this.databaseService.log.findMany();
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
