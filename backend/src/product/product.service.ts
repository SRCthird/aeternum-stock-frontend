import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
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
    const { insertId } = await this.db
      .insertInto('Product')
      //.values(createDto)
      .onDuplicateKeyUpdate(createDto)
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
      const products = await this.db.selectFrom('Product')
        .where((eb) => eb.or([
          (name) ? eb('name', '=', name) : null,
          (description) ? eb('description', '=', description) : null
        ]))
        .execute();
      return products.map((product: Product) => product);
    } catch (error) {
      throw new HttpException('Error fetching product: ' + error.message, 500);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      return await this.db.selectFrom('Product')
        .where('id', '=', id)
        .execute()[0];
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
