import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {

  constructor(readonly databaseService: DatabaseService) {}

  async create(createDto: Prisma.ProductCreateInput) {
    return this.databaseService.product.create({ data: createDto });
  }

  async findAll(
    name?: string,
    description?: string
  ) {
    const query: Prisma.ProductFindManyArgs = {
      where: {
        name: {
          startsWith: name,
        },
        description: {
          contains: description,
        }
      }
    };
    return this.databaseService.product.findMany(query);
  }

  async findOne(id: number) {
    return this.databaseService.product.findUnique({ where: { id } });
  }

  async update(id: number, updateDto: Prisma.ProductUpdateInput) {

    return this.databaseService.product.update({ where: { id }, data: updateDto });
  }

  async remove(id: number) {
    const dependency = await this.databaseService.productLot.findMany({
      where: {
        product: {
          id: id
        }
      },
    })

    if (dependency.length > 0) {
      throw new HttpException('Product has dependencies', HttpStatus.NOT_ACCEPTABLE);
    }

    return this.databaseService.product.delete({ where: { id } });
  }
}
