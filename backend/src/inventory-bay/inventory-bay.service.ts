import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InventoryBay } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InventoryBayService {

  constructor(readonly databaseService: DatabaseService) {}

  async create(createDto: InventoryBay): Promise<InventoryBay> {
    const warehouse = await this.databaseService.selectFrom('Warehouse')
      .select('name')
      .where('name', '=', createDto.warehouseName)
      .execute();

    if (warehouse.length === 0) {
      throw new BadRequestException('Warehouse does not exist');
    }

    const { insertId } = await this.databaseService.insertInto('InventoryBay')
      .values(createDto)
      .executeTakeFirstOrThrow();

    return this.findOne(Number(insertId));
  }

  async list(): Promise<string[]> {
    const bays = await this.databaseService.selectFrom('InventoryBay')
      .select('name')
      .execute();

    return bays.map(bay => bay.name);
  }

  async findAll(
    name?: string,
    warehouseName?: string,
    maxUniqueLots?: number,
  ): Promise<InventoryBay[]> {
    try {
      return await this.databaseService.selectFrom('InventoryBay')
        .selectAll()
        .where((eb) => eb.or([
          name ? eb('name', '=', name) : null,
          warehouseName ? eb('warehouseName', '=', warehouseName) : null,
          maxUniqueLots ? eb('maxUniqueLots', '=', maxUniqueLots) : null
        ]))      
        .execute();
    } catch (error) {
      throw new HttpException('Error fetching users: ' + error.message, 500);
    }
  }

  async findOne(id: number): Promise<InventoryBay> {
    try {
      return await this.databaseService.selectFrom('InventoryBay')
        .selectAll()
        .where('id', '=', id)
        .execute()[0];
    } catch (error) {
      throw new HttpException('Bay not found', 404);
    }
  }

  async update(id: number, updateDto: InventoryBay): Promise<InventoryBay> {
    await this.databaseService.updateTable('InventoryBay')
      .set(updateDto)
      .where('id', '=', id)
      .execute();

    return await this.findOne(id);
  }

  async remove(id: number): Promise<InventoryBay> {
    const bay = await this.findOne(id);

    const dependency = await this.databaseService.selectFrom('Inventory')
      .selectAll()
      .where('location', '=', bay.name)
      .execute();

    if (dependency.length > 0) {
      throw new HttpException('Lot has dependencies', HttpStatus.NOT_ACCEPTABLE);
    }
    await this.databaseService.deleteFrom('InventoryBay')
      .where('id', '=', id)
      .execute();

    return bay;
  }
}
