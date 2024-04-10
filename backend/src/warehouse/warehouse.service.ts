import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WarehouseService {

  constructor(readonly databaseService: DatabaseService) { }

  async create(createDto: Prisma.WarehouseCreateInput) {
    return this.databaseService.warehouse.create({ data: createDto });
  }

  async list() {
    const warehouses = await this.databaseService.warehouse.findMany({
      select: {
        name: true,
      }
    });

    return warehouses.map(warehouse => warehouse.name);
  }

  async findAll(
    name?: string,
  ) {
    const query: Prisma.WarehouseFindManyArgs = {
      where: {
        name: {
          contains: name,
        },
      },
    };
    return this.databaseService.warehouse.findMany(query);
  }

  async findOne(id: number) {
    return this.databaseService.warehouse.findUnique({ where: { id } });
  }

  async update(id: number, updateDto: Prisma.WarehouseUpdateInput) {
    return this.databaseService.warehouse.update({ where: { id }, data: updateDto });
  }

  async remove(id: number) {
    return this.databaseService.warehouse.delete({ where: { id } });
  }
}
