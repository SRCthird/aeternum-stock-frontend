import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Warehouse } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class WarehouseService {

  constructor(readonly databaseService: DatabaseService) {}

  async create(createDto: Warehouse): Promise<Warehouse> {
    const { insertId } = await this.databaseService.insertInto('Warehouse')
      .values(createDto)
      .executeTakeFirstOrThrow();

    return await this.findOne(Number(insertId));
  }

  async list(): Promise<string[]> {
    const warehouses = await this.databaseService
      .selectFrom('Warehouse')
      .select('name')
      .execute();
    return warehouses.map(warehouse => warehouse.name);
  }

  async findAll(name?: string): Promise<Warehouse[]> {
    try {
      return await this.databaseService.selectFrom('Warehouse')
        .selectAll()
        .where((eb) =>{
          if (!name) return eb('id', '>', 0);
          return eb('name', 'like', `%${name}%`);
        })
        .execute();
    } catch (error) {
      return [] as Warehouse[];
    }
  }

  async findOne(id: number): Promise<Warehouse> {
    try {
      return await this.databaseService.selectFrom('Warehouse')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirstOrThrow();
    } catch (error) {
      throw new HttpException('Warehouse not found', 404);
    }
  }

  async update(id: number, updateDto: Warehouse): Promise<Warehouse> {
    await this.databaseService.updateTable('Warehouse')
      .set(updateDto)
      .where('id', '=', id)
      .execute();

    return await this.findOne(id);
  }

  async remove(id: number): Promise<Warehouse> {
    const warehouse = await this.findOne(id);

    const dependency = await this.databaseService.selectFrom('InventoryBay')
      .selectAll()
      .where('warehouseName', '=', warehouse.name)
      .execute();

    if (dependency.length > 0) {
      throw new HttpException('Warehouse has dependencies', HttpStatus.NOT_ACCEPTABLE);
    }

    await this.databaseService.deleteFrom('Warehouse')
      .where('id', '=', id)
      .execute();

    return warehouse;
  }
}
