import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InventoryBayService {

  constructor(readonly databaseService: DatabaseService) { }

  async create(createDto: Prisma.InventoryBayCreateInput) {
    const obj: Prisma.InventoryBayCreateInput & {warehouseName?: string} = {...createDto};

    const warehouse = await this.databaseService.warehouse.findMany({
      select: {
        name: true,
      }
    });

    const warehouseExist = warehouse.find((w) => w.name === obj.warehouseName);

    if (!warehouseExist) {
      throw new BadRequestException('Warehouse does not exist');
    }
    return this.databaseService.inventoryBay.create({ data: createDto });
  }

  async findAll(
    name?: string,
    warehouseName?: string,
    maxUniqueLots?: number,
  ) {
    const query: Prisma.InventoryBayFindManyArgs = {
      where: {
        name: {
          startsWith: name,
        },
        warehouseName: {
          startsWith: warehouseName,
        },
      },
    };

    if (maxUniqueLots) {
      query.where.maxUniqueLots = maxUniqueLots;
    }
    return this.databaseService.inventoryBay.findMany(query);
  }

  async findOne(id: number) {
    return this.databaseService.inventoryBay.findUnique({ where: { id } });
  }

  async update(id: number, updateDto: Prisma.InventoryBayUpdateInput) {
    return this.databaseService.inventoryBay.update({ where: { id }, data: updateDto });
  }

  async remove(id: number) {
    return this.databaseService.inventoryBay.delete({ where: { id } });
  }
}
