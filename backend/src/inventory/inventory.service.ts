import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InventoryService {

  constructor(readonly databaseService: DatabaseService) { }

  async create(createDto: Prisma.InventoryCreateInput, comments?: string, fromLocation?: string) {
    const obj: Prisma.InventoryCreateInput & { lotNumber?: string, location?: string, createdBy?: string, id?: number } = { ...createDto };

    const lot = await this.databaseService.productLot.findUnique({
      where: {
        lotNumber: obj.lotNumber,
      }
    });

    const bay = await this.databaseService.inventoryBay.findUnique({
      where: {
        name: obj.location,
      }
    });

    if (!lot) {
      throw new HttpException('Product lot does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }
    if (!bay) {
      throw new HttpException('Inventory bay does not exist', HttpStatus.PRECONDITION_REQUIRED);
    }

    const inventories = await this.databaseService.inventory.findMany({
      where: {
        productLot: {
          lotNumber: obj.lotNumber,
        },
        inventoryBay: {
          name: obj.location,
        }
      }
    });

    const totalQuantityInBay = inventories.reduce((acc, curr) => acc + curr.quantity, 0);
    if (totalQuantityInBay + obj.quantity > lot.quantity) {
      throw new HttpException('Selected locator is already ocupied', HttpStatus.BAD_REQUEST);
    }

    const uniqueLotsInBay = await this.databaseService.inventory.findMany({
      where: {
        inventoryBay: {
          name: obj.location,
        }
      },
      select: {
        productLot: true,
      }
    });

    const uniqueLotNumbers = new Set(uniqueLotsInBay.map(inventory => inventory.productLot.lotNumber));
    if (uniqueLotNumbers.size >= bay.maxUniqueLots && !uniqueLotNumbers.has(obj.lotNumber)) {
      throw new HttpException('Inventory bay is at capacity for unique lots', HttpStatus.BAD_REQUEST);
    }

    const existingInventory = await this.databaseService.inventory.findFirst({
      where: {
        lotNumber: obj.lotNumber,
        location: obj.location,
        NOT: {
          id: obj.id,
        }
      }
    });

    if (existingInventory) {
      const newQuantity = existingInventory.quantity + obj.quantity;
      const updatedInventory = await this.databaseService.inventory.update({
        where: {
          id: existingInventory.id,
        },
        data: {
          quantity: newQuantity,
          updatedBy: obj.createdBy,
          updatedAt: new Date(),
        }
      });

      const log = await this.databaseService.log.create({
        data: {
          fromLocation: fromLocation,
          toLocation: obj.location,
          dateTime: new Date(),
          user: obj.createdBy,
          lotNumber: obj.lotNumber,
          quantityMoved: obj.quantity,
          comments: comments || 'Inventory updated'
        }
      });

      return updatedInventory;
    }

    const log = await this.databaseService.log.create({
      data: {
        fromLocation: fromLocation || 'Operations',
        toLocation: obj.location,
        dateTime: new Date(),
        user: obj.createdBy,
        lotNumber: obj.lotNumber,
        quantityMoved: obj.quantity,
        comments: comments || 'Inventory created'
      }
    });

    return this.databaseService.inventory.create({ data: createDto });
  }

  async findAll(
    lotNumber?: string,
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
            startsWith: lotNumber 
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

  async update(id: number, updateDto: Prisma.InventoryUpdateInput, comments?: string, fromLocation?: string) {
    const obj: Prisma.InventoryUpdateInput & { lotNumber?: string, location?: string, createdBy?: string, id?: number } = { ...updateDto };

    const lot = await this.databaseService.productLot.findMany({
      where: {
        lotNumber: obj.lotNumber,
      }
    });

    if (obj.lotNumber) {
      const lotExist = lot.find((l) => l.lotNumber === obj.lotNumber);
      if (!lotExist) {
        throw new HttpException('Product lot does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
      }
    }

    if (+obj.quantity > lot[0].quantity) {
      console.log(obj.quantity, lot[0].quantity);
      throw new HttpException('Inventory quantity exceeds product lot quantity', HttpStatus.BAD_REQUEST);
    }

    if (obj.location) {
      const bay = await this.databaseService.inventoryBay.findMany({
        where: {
          name: obj.location,
        }
      });

      const bayExist = bay.find((b) => b.name === obj.location);
      if (!bayExist) {
        throw new HttpException('Inventory bay does not exist', HttpStatus.PRECONDITION_REQUIRED);
      }
    }

    try {
      const log = await this.databaseService.log.create({
        data: {
          fromLocation: fromLocation,
          toLocation: obj.location,
          dateTime: new Date(),
          user: obj.createdBy,
          lotNumber: obj.lotNumber,
          quantityMoved: +obj.quantity,
          comments: comments || 'Inventory updated'
        }
      })
    } catch (error) {
      null;
    }

    return this.databaseService.inventory.update({ where: { id }, data: updateDto });
  }

  async remove(id: number) {
    return this.databaseService.inventory.delete({ where: { id } });
  }
}
