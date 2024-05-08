import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductLot } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class ProductLotService {

  constructor(readonly databaseService: DatabaseService) {}

  async create(createDto: ProductLot): Promise<ProductLot> {
    try {
      const { insertId } = await this.databaseService.insertInto('ProductLot')
        .values(createDto)
        .executeTakeFirstOrThrow();

      return this.findOne(Number(insertId));
    } catch (error) {
      if (error.code === 'ER_NO_REFERENCED_ROW_2') {
        throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
      } else if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Lot already exists.', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error creating lot: ' + error.message, 500);
    }
  }

  async list(): Promise<string[]> {
    const lots = await this.databaseService.selectFrom('ProductLot')
      .select('lotNumber')
      .execute();

    return lots.map(lot => lot.lotNumber);
  }

  async findAll(
    lotNumber?: string,
    internalReference?: string,
    productName?: string
  ): Promise<ProductLot[]> {
    try {
      return await this.databaseService.selectFrom('ProductLot')
        .selectAll()
        .where((eb) => {
          if (!lotNumber && !internalReference && !productName) return eb('id', '>', 0);
          return eb.or([
            lotNumber ? eb('lotNumber', '=', lotNumber) : null,
            internalReference ? eb('internalReference', '=', internalReference) : null,
            productName ? eb('productName', '=', productName) : null
          ].filter((x) => x !== null))
        })
        .execute();
    } catch (error) {
      return [] as ProductLot[];
    }
  }


  async findOne(id: number): Promise<ProductLot> {
    try {
      return await this.databaseService.selectFrom('ProductLot')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirstOrThrow();
    } catch (error) {
      throw new HttpException('Lot not found', 404);
    }
  }

  async update(id: number, updateDto: ProductLot): Promise<ProductLot> {
    try {
      await this.databaseService.updateTable('ProductLot')
        .set(updateDto)
        .where('id', '=', id)
        .execute();

      return await this.findOne(id);
    } catch (error) {
      if (String(error.code).includes('ER_ROW_IS_REFERENCED')) {
        throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
      } else if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException('Lot already exists.', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error creating lot: ' + error.message, 500);
    }
  }

  async remove(id: number): Promise<ProductLot> {
    const lot = await this.findOne(id);
    try{
      await this.databaseService.deleteFrom('ProductLot')
      .where('id', '=', id)
      .execute();

      return lot;
    } catch (error) {
      if (String(error.code).includes('ER_ROW_IS_REFERENCED')) {
        throw new HttpException('Lot has dependencies', HttpStatus.CONFLICT);
      }
      throw new HttpException('Error deleting lot: ' + error.message, 500);
    }
  }
}
