import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductLot } from '@prisma/client';
import { Kysely } from 'kysely';
import { DatabaseService } from 'src/database/database.service';
import { Database } from 'src/database/types';

@Injectable()
export class ProductLotService {
  private db: Kysely<Database>;

  constructor(readonly databaseService: DatabaseService) {
    this.db = this.databaseService.getKyselyInstance();
  }

  async create(createDto: ProductLot): Promise<ProductLot> {

    const lots = await this.db.selectFrom('ProductLot')
      .selectAll()
      .where((eb) => eb.or([
        eb('lotNumber', '=', createDto.lotNumber),
        eb('internalReference', '=', createDto.internalReference)
      ]))
      .execute();

    if (lots.length > 0) {
      throw new HttpException('Lot already exists.', HttpStatus.CONFLICT);
    }

    const product = await this.db.selectFrom('Product')
      .select('name')
      .where('name', '=', createDto.productName)
      .execute();

    const productExists = product.find((p) => p.name === createDto.productName);

    if (!productExists) {
      throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
    }

    const { insertId } = await this.db.insertInto('ProductLot')
      .values(createDto)
      .executeTakeFirstOrThrow();

    return this.findOne(Number(insertId));
  }

  async list(): Promise<string[]> {
    const lots = await this.db.selectFrom('ProductLot')
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
      return await this.db.selectFrom('ProductLot')
        .selectAll()
        .where((eb) => eb.or([
          (lotNumber) ? eb('lotNumber', '=', lotNumber) : null,
          (internalReference) ? eb('internalReference', '=', internalReference) : null,
          (productName) ? eb('productName', '=', productName) : null
        ]))      
        .execute();
    } catch (error) {
      throw new HttpException('Error fetching users: ' + error.message, 500);
    }
  }


  async findOne(id: number): Promise<ProductLot> {
    try {
      return await this.db.selectFrom('ProductLot')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirst();
    } catch (error) {
      throw new HttpException('Lot not found', 404);
    }
  }

  async update(id: number, updateDto: ProductLot): Promise<ProductLot> {
    await this.db.updateTable('ProductLot')
      .set(updateDto)
      .where('id', '=', id)
      .execute();

    return await this.findOne(id);
  }

  async remove(id: number): Promise<ProductLot> {
    const lot = await this.findOne(id);

    const dependency = await this.db.selectFrom('Inventory')
      .where('lotNumber', '=', lot.lotNumber)
      .execute();

    if (dependency.length > 0) {
      throw new HttpException('Lot has dependencies', HttpStatus.NOT_ACCEPTABLE);
    }
    await this.db.deleteFrom('ProductLot')
      .where('id', '=', id)
      .execute();

    return lot;
  }
}
