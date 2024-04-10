import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductLotService {

  constructor(readonly databaseService: DatabaseService) { }

  async create(createDto: Prisma.ProductLotCreateInput) {
    const obj: Prisma.ProductLotCreateInput & {productName?: string} = {...createDto};
    const product = await this.databaseService.product.findMany({
      select: {
        name: true
      },
    })
    const productExists = product.find((p) => p.name === obj.productName);
    if (!productExists) {
      throw new BadRequestException('Product does not exist');
    }

    return this.databaseService.productLot.create({ data: createDto });
  }

  async list() {
    const lots = await this.databaseService.productLot.findMany({
      select: {
        lotNumber: true,
      }
    });

    return lots.map(lot => lot.lotNumber);
  }

  async findAll(
    lotNumber?: string,
    internalReference?: string,
    productName?: string
  ) {
    const query: Prisma.ProductLotFindManyArgs = {
      where: {
        lotNumber: {
          startsWith: lotNumber,
        },
        internalReference: {
          startsWith: internalReference,
        },
        productName: {
          startsWith: productName,
        },
      },
    
    };
    return this.databaseService.productLot.findMany(query);
  }
  

  async findOne(id: number) {
    return this.databaseService.productLot.findUnique({ where: { id } });
  }

  async update(id: number, updateDto: Prisma.ProductLotUpdateInput) {
    return this.databaseService.productLot.update({ where: { id }, data: updateDto });
  }

  async remove(id: number) {
    const dependency = await this.databaseService.inventory.findMany({
      where: {
        productLot: {
          id: id
        }
      },
    })

    if (dependency.length > 0) {
      throw new HttpException('Lot has dependencies', HttpStatus.NOT_ACCEPTABLE);
    }
    return this.databaseService.productLot.delete({ where: { id } });
  }
}
