import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WarehouseService {

  constructor(readonly databaseService: DatabaseService) { }

  create(createDto: Prisma.WarehouseCreateInput) {
    return this.databaseService.warehouse.create({ data: createDto });
  }

  findAll() {
    return this.databaseService.warehouse.findMany();
  }

  findOne(id: number) {
    return this.databaseService.warehouse.findUnique({ where: { id } });
  }

  update(id: number, updateDto: Prisma.WarehouseUpdateInput) {
    return this.databaseService.warehouse.update({ where: { id }, data: updateDto });
  }

  remove(id: number) {
    return this.databaseService.warehouse.delete({ where: { id } });
  }
}
