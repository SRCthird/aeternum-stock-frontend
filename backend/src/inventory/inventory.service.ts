import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InventoryService {
  
  constructor(readonly databaseService: DatabaseService) {}

  create(createDto: Prisma.InventoryCreateInput) {
    return this.databaseService.inventory.create({ data: createDto });
  }

  findAll() {
    return this.databaseService.inventory.findMany();
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
