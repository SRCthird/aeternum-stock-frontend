import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductLotService {

  constructor(readonly databaseService: DatabaseService) { }

  create(createDto: Prisma.ProductLotCreateInput) {
    return this.databaseService.productLot.create({ data: createDto });
  }

  findAll() {
    return this.databaseService.productLot.findMany();
  }
  

  findOne(id: number) {
    return this.databaseService.productLot.findUnique({ where: { id } });
  }

  update(id: number, updateDto: Prisma.ProductLotUpdateInput) {
    return this.databaseService.productLot.update({ where: { id }, data: updateDto });
  }

  remove(id: number) {
    return this.databaseService.productLot.delete({ where: { id } });
  }
}
