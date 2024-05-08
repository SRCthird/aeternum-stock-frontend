import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductService {

  constructor(readonly databaseService: DatabaseService) {}

  async create(createDto: Product): Promise<Product> {
    try {
      const { insertId } = await this.databaseService.insertInto('Product')
        .values(createDto)
        .executeTakeFirstOrThrow();

      return await this.findOne(Number(insertId));
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Product already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error creating product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async list(): Promise<string[]> {
    try {
      const products = await this.databaseService.selectFrom('Product')
        .select('name')
        .execute();
      return products.map(product => product.name);
    } catch (error) {
      return [] as string[];
    }
  }

  async findAll(
    name?: string,
    description?: string
  ): Promise<Product[]> {
    try {
      return await this.databaseService.selectFrom('Product')
        .selectAll()
        .where((eb) => {
          if (!name && !description) return eb('id', '>', 0);
          return eb.or([
            name ? eb('name', '=', name) : null,
            description ? eb('description', 'like', `%${description}%`) : null
          ].filter((x) => x !== null))
        })
        .execute();
    } catch (error) {
      return [] as Product[];
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      return await this.databaseService.selectFrom('Product')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirstOrThrow();
    } catch (error) {
      throw new HttpException('Product not found', 404);
    }
  }

  async update(id: number, updateDto: Product): Promise<Product> {
    try {
      await this.databaseService.updateTable('Product')
        .set(updateDto)
        .where('id', '=', id)
        .execute();

      return await this.findOne(id);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Product already exists', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error updating product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    try {
      await this.databaseService.deleteFrom('Product')
        .where('id', '=', id)
        .execute();

      return product;
    } catch (error) {
      if (String(error.code).includes('ER_ROW_IS_REFERENCED')) {
        throw new HttpException('Product has dependencies', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error deleting product', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
