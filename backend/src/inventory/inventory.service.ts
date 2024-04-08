import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InventoryService {

  constructor(readonly databaseService: DatabaseService) { }

  async create(createDto: Prisma.InventoryCreateInput) {
    const obj: Prisma.InventoryCreateInput & {lotNumber?: string, location?: string} = {...createDto};

    const lot = await this.databaseService.productLot.findMany({
      select: {
        lotNumber: true,
      }
    });
    const lotExist = lot.find((l) => l.lotNumber === obj.lotNumber);
    if (!lotExist) {
      throw new BadRequestException('Product lot does not exist');
    }

    const bay = await this.databaseService.inventoryBay.findMany({
      select: {
        name: true,
      }
    });
    const bayExist = bay.find((b) => b.name === obj.location);
    if (!bayExist) {
      throw new BadRequestException('Inventory bay does not exist');
    }

    return this.databaseService.inventory.create({ data: createDto });
  }

  async findAll(
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
          lotNumber: {
            startsWith: logNumber
          }
        },
        inventoryBay: {
          name: {
            startsWith: inventoryBay
          }
        },
        createdBy: createdBy,
        updatedBy: updatedBy
      }
    };

    if (startDate && endDate) {
      query.where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }
    return this.databaseService.inventory.findMany(query);
  }

  async findOne(id: number) {
    return this.databaseService.inventory.findUnique({ where: { id } });
  }

  async update(id: number, updateDto: Prisma.InventoryUpdateInput) {
    return this.databaseService.inventory.update({ where: { id }, data: updateDto });
  }

  async remove(id: number) {
    return this.databaseService.inventory.delete({ where: { id } });
  }
}
