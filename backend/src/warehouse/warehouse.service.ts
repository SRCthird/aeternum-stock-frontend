import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Warehouse } from '@prisma/client';
import { Kysely } from 'kysely';
import { DatabaseService } from 'src/database/database.service';
import { Database } from 'src/database/types';

@Injectable()
export class WarehouseService {
  private db: Kysely<Database>;

  constructor(readonly databaseService: DatabaseService) {
    this.db = databaseService.getKyselyInstance();
  }

  async create(createDto: Warehouse) {
    const { insertId } = await this.db
      .insertInto('Warehouse')
      //.values(createDto)
      .onDuplicateKeyUpdate(createDto)
      .executeTakeFirstOrThrow();

    return await this.findOne(Number(insertId));
  }

  async list() {
    const warehouses = await this.db
      .selectFrom('Warehouse')
      .select('name')
      .execute();
    return warehouses.map(warehouse => warehouse.name);
  }

  async findAll(name?: string) {
    try {
      const warehouses = await this.db.selectFrom('Warehouse')
        .where('name', '=', name)
        .execute();
      return warehouses;
    } catch (error) {
      throw new HttpException('Error fetching warehouses: ' + error.message, 500);
    }
  }

  async findOne(id: number) {
    try {
      const warehouse = await this.db.selectFrom('Warehouse')
        .where('id', '=', id)
        .executeTakeFirst();
      return warehouse[0];
    } catch (error) {
      throw new HttpException('Warehouse not found', 404);
    }
  }

  async update(id: number, updateDto: Warehouse) {
    await this.db.updateTable('Warehouse')
      .set(updateDto)
      .where('id', '=', id)
      .execute();

    return await this.findOne(id);
  }

  async remove(id: number) {
    const warehouse = await this.findOne(id);

    const dependency = await this.db.selectFrom('InventoryBay')
      .where('warehouseName', '=', warehouse.name)
      .execute();

    if (dependency.length > 0) {
      throw new HttpException('Warehouse has dependencies', HttpStatus.NOT_ACCEPTABLE);
    }

    await this.db.deleteFrom('Warehouse')
      .where('id', '=', id)
      .execute();

    return warehouse;
  }
}
