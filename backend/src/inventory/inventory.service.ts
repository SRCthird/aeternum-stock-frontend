import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InventoryService {

  constructor(readonly databaseService: DatabaseService) { }

  async create(createDto: Prisma.InventoryCreateInput, comments?: string, fromLocation?: string) {
    const obj: Prisma.InventoryCreateInput & {lotNumber?: string, location?: string, createdBy?: string} = {...createDto};

    const lot = await this.databaseService.productLot.findMany({
      where: {
        lotNumber: obj.lotNumber,
      }
    });

    const bay = await this.databaseService.inventoryBay.findMany({
      where: {
        name: obj.location,
      }
    });

    const inventory = await this.databaseService.inventory.findMany({
      where: {
        productLot: {
          lotNumber: obj.lotNumber,
        },
      }
    });

    const sumInv = inventory.reduce((acc, curr) => acc + curr.quantity, 0);

    if (sumInv + obj.quantity > lot[0].quantity) {
      throw new HttpException('Inventory quantity exceeds product lot quantity', HttpStatus.BAD_REQUEST); 
    }

    const lotExist = lot.find((l) => l.lotNumber === obj.lotNumber);
    if (!lotExist) {
      throw new HttpException('Product lot does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const bayExist = bay.find((b) => b.name === obj.location);
    if (!bayExist) {
      throw new HttpException('Inventory bay does not exist', HttpStatus.PRECONDITION_REQUIRED);
    }

    const log = await this.databaseService.log.create({
      data: {
        fromLocation: fromLocation,
        toLocation: obj.location,
        dateTime: new Date(),
        user: obj.createdBy,
        lotNumber: obj.lotNumber,
        quantityMoved: obj.quantity,
        comments: comments || 'Inventory created'
      }
    })

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

  async update(id: number, updateDto: Prisma.InventoryUpdateInput, comments?: string, fromLocation?: string) {
    const obj: Prisma.InventoryUpdateInput & {lotNumber?: string, location?: string, createdBy?: string } = {...updateDto};

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
