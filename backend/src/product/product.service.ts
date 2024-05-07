import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { Kysely } from 'kysely';
import { DatabaseService } from 'src/database/database.service';
import { Database } from 'src/database/types';

@Injectable()
export class ProductService {
  private db: Kysely<Database>;

  constructor(readonly databaseService: DatabaseService) {
    this.db = this.databaseService.getKyselyInstance();
  }

  async create(createDto: Product): Promise<Product> {
    const { insertId } = await this.db.insertInto('Product')
      .values(createDto)
      .executeTakeFirstOrThrow();

    return await this.findOne(Number(insertId));
  }

  async list(): Promise<string[]> {
    const products = await this.db.selectFrom('Product')
      .select('name')
      .execute();

    return products.map(product => product.name);
  }

  async findAll(
    name?: string,
    description?: string
  ): Promise<Product[]> {
    try {
      return await this.db.selectFrom('Product')
        .selectAll()
        .where((eb) => {
          let query = []
          if (!name && !description) return eb('id', '>', 0);
          if (name) {
            query.push(eb('name', '=', name));
          }
          if (description) {
            query.push(eb('description', 'like', `%${description}%`));
          }
          return eb.or(query)
        })
        .execute();
    } catch (error) {
      return [] as Product[];
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      return await this.db.selectFrom('Product')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirstOrThrow();
    } catch (error) {
      throw new HttpException('Product not found', 404);
    }
  }

  async update(id: number, updateDto: Product): Promise<Product> {
    await this.db.updateTable('Product')
      .set(updateDto)
      .where('id', '=', id)
      .execute();

    return await this.findOne(id);
  }

  async remove(id: number) {
    const product = await this.findOne(id);

    const dependency = await this.db.selectFrom('ProductLot')
      .selectAll()
      .where('productName', '=', product.name)
      .execute();

    if (dependency.length > 0) {
      throw new HttpException('Product has dependencies', HttpStatus.NOT_ACCEPTABLE);
    }

    await this.db.deleteFrom('Product')
      .where('id', '=', id)
      .execute();

    return product;
  }
}
