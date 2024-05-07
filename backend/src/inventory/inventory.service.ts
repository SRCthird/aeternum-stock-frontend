import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Inventory } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class InventoryService {

  constructor(readonly databaseService: DatabaseService) {}

  async create(createDto: Inventory, fromLocation?: string, comment?: string) {

    // Get lot information
    const lot = await this.databaseService.selectFrom('ProductLot')
      .selectAll()
      .where('lotNumber', '=', createDto.lotNumber)
      .executeTakeFirst();
    if (lot) {
      throw new HttpException('Product lot does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    // Get target bay information
    const bay = await this.databaseService.selectFrom('InventoryBay')
      .selectAll()
      .where('name', '=', createDto.location)
      .executeTakeFirst();
    if (bay) {
      throw new HttpException('Inventory bay does not exist', HttpStatus.PRECONDITION_REQUIRED);
    }

    // Get all instances of this lot
    const lotTotal = await this.databaseService.selectFrom('Inventory')
      .select(
        (eb) => eb.fn.sum<number>('quantity').as('total')
      )
      .where('lotNumber', '=', createDto.lotNumber)
      .executeTakeFirst();
    if (lotTotal.total + createDto.quantity > lot.quantity) {
      throw new HttpException('Overflow of lot size. Check lot quantity.', HttpStatus.BAD_REQUEST);
    }

    // Get distinct lots in bay
    const uniqueLotsInBay = await this.databaseService.selectFrom('Inventory')
      .select('lotNumber')
      .where('location', '=', createDto.lotNumber)
      .distinct()
      .execute();

    if (
      uniqueLotsInBay.length >= bay.maxUniqueLots &&
      !uniqueLotsInBay.some(
        lot => lot.lotNumber === createDto.lotNumber
      )
    ) {
      throw new HttpException('Inventory bay is at capacity for unique lots', HttpStatus.BAD_REQUEST);
    }

    // Get mergable lots
    const mergableLots = await this.databaseService.selectFrom('Inventory')
      .selectAll()
      .where('location', '=', createDto.location)
      .where('lotNumber', '=', createDto.lotNumber)
      .where('id', '<>', createDto.id)
      .executeTakeFirst();

    if (mergableLots) {
      await this.databaseService.updateTable('Inventory')
        .where('id', '=', mergableLots.id)
        .set({
          quantity: (mergableLots.quantity + createDto.quantity),
          updatedBy: createDto.createdBy,
          updatedAt: new Date()
        })
        .execute();

      await this.databaseService.insertInto('Log')
        .values({
          fromLocation: fromLocation,
          toLocation: createDto.location,
          dateTime: new Date(),
          user: createDto.createdBy,
          lotNumber: createDto.lotNumber,
          quantityMoved: createDto.quantity,
          comments: comment || 'Inventory updated'
        })
        .execute();

      return this.findOne(mergableLots.id);
    }

    await this.databaseService.insertInto('Log')
      .values({
        fromLocation: fromLocation || 'Operations',
        toLocation: createDto.location,
        dateTime: new Date(),
        user: createDto.createdBy,
        lotNumber: createDto.lotNumber,
        quantityMoved: createDto.quantity,
        comments: comment || 'Inventory updated'
      })
      .execute();

    const { insertId } = await this.databaseService.insertInto('Inventory')
      .values(createDto)
      .executeTakeFirst();

    return this.findOne(Number(insertId));
  }

  async findAll(
    lotNumber?: string,
    inventoryBay?: string,
    createdBy?: string,
    updatedBy?: string,
    startDate?: string,
    endDate?: string
  ) {
    try {
      return await this.databaseService.selectFrom('Inventory')
        .selectAll()
        .where((eb) => eb.or([
          lotNumber ? eb('lotNumber', '=', lotNumber) : null,
          inventoryBay ? eb('location', '=', inventoryBay) : null,
          createdBy ? eb('createdBy', '=', createdBy) : null,
          updatedBy ? eb('updatedBy', '=', updatedBy) : null,
          startDate ? eb('createdAt', '>=', new Date(startDate)) : null,
          (startDate && endDate) ? eb('createdAt', '<=', new Date(endDate)) : null
        ]))
        .execute();
    } catch (error) {
      throw new HttpException('Error fetching users: ' + error.message, 500);
    }
  }

  async findOne(id: number): Promise<Inventory> {
    try {
      return await this.databaseService.selectFrom('ProductLot')
        .selectAll()
        .where('id', '=', id)
        .execute()[0];
    } catch (error) {
      throw new HttpException('Lot not found', 404);
    }
  }

  async update(id: number, updateDto: Inventory, fromLocation?: string, comments?: string) {
    const lot = await this.databaseService.selectFrom('ProductLot')
      .selectAll()
      .where('lotNumber', '=', updateDto.lotNumber)
      .executeTakeFirst()

    if (!lot) {
      throw new HttpException('Lot does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    if (updateDto.quantity > lot.quantity) {
      throw new HttpException('Inventory quantity exceeds product lot quantity', HttpStatus.BAD_REQUEST);
    }

    const bay = await this.databaseService.selectFrom('InventoryBay')
      .selectAll()
      .where('name', '=', updateDto.location)
      .executeTakeFirst();

    if (!bay) {
      throw new HttpException('Inventory bay does not exist', HttpStatus.PRECONDITION_REQUIRED);
    }

    await this.databaseService.insertInto('Log')
      .values({
        fromLocation: fromLocation,
        toLocation: updateDto.location,
        dateTime: new Date(),
        user: updateDto.createdBy,
        lotNumber: updateDto.lotNumber,
        quantityMoved: updateDto.quantity,
        comments: comments || 'Inventory updated'
      })
      .execute();

    await this.databaseService.updateTable('Inventory')
      .where('id', '=', id)
      .set(updateDto)
      .execute();

    return this.findOne(id);
  }

  async remove(id: number) {
    const inventory = await this.findOne(id);

    await this.databaseService.deleteFrom('Inventory')
      .where('id', '=', id)
      .execute();

    return inventory;
  }
}
