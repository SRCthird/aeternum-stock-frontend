import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InventoryService {

  constructor(readonly databaseService: DatabaseService) { }

  create(createDto: Prisma.InventoryCreateInput) {
    return this.databaseService.inventory.create({ data: createDto });
  }

  findAll(
    logNumber?: string,
    inventoryBay?: string,
    createdBy?: string,
    updatedBy?: string,
    startDate?: string,
    endDate?: string
  ) {
    const query: Prisma.InventoryFindManyArgs = {
      where: {
        productLot: {
          lotNumber: logNumber
        },
        inventoryBay: {
          name: inventoryBay
        },
        createdBy: createdBy,
        updatedBy: updatedBy,
        createdAt: {
          gte: new Date(startDate),
          lte: new Date(endDate)
        }
      }
    };
    return this.databaseService.inventory.findMany(query);
  }

  findOne(id: number) {
    return this.databaseService.inventory.findUnique({ where: { id } });
  }

  update(id: number, updateDto: Prisma.InventoryUpdateInput) {
    return this.databaseService.inventory.update({ where: { id }, data: updateDto });
  }

  remove(id: number) {
    return this.databaseService.inventory.delete({ where: { id } });
  }
}
