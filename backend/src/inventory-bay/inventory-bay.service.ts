import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InventoryBayService {

  constructor(readonly databaseService: DatabaseService) { }

  create(createDto: Prisma.InventoryBayCreateInput) {
    return this.databaseService.inventoryBay.create({ data: createDto });
  }

  findAll() {
    return this.databaseService.inventoryBay.findMany();
  }

  findOne(id: number) {
    return this.databaseService.inventoryBay.findUnique({ where: { id } });
  }

  update(id: number, updateDto: Prisma.InventoryBayUpdateInput) {
    return this.databaseService.inventoryBay.update({ where: { id }, data: updateDto });
  }

  remove(id: number) {
    return this.databaseService.inventoryBay.delete({ where: { id } });
  }
}
