import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Inventory } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { InventoryUtils } from './inventory.utils';

@Injectable()
export class InventoryService {

  constructor(
    readonly databaseService: DatabaseService,
    readonly inventoryUtils: InventoryUtils
  ) { }

  async create(createDto: Inventory, fromLocation?: string, comment?: string) {
    // Error codes
    // HttpStatus.UNPROCESSABLE_ENTITY = 422
    // HttpStatus.PRECONDITION_REQUIRED = 428
    // HttpStatus.CONFLICT = 409
    // HttpStatus.BAD_REQUEST = 400

    const lot = await this.databaseService.selectFrom('ProductLot')
      .selectAll()
      .where('lotNumber', '=', createDto.lotNumber)
      .executeTakeFirst();
    if (!lot) {
      throw new HttpException('Product lot does not exist', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const bay = await this.databaseService.selectFrom('InventoryBay')
      .selectAll()
      .where('name', '=', createDto.location)
      .executeTakeFirst();
    if (!bay) {
      throw new HttpException('Inventory bay does not exist', HttpStatus.PRECONDITION_REQUIRED);
    }

    const lotTotal = await this.databaseService.selectFrom('Inventory')
      .select(
        (eb) => eb.fn.sum<number>('quantity').as('total')
      )
      .where('lotNumber', '=', createDto.lotNumber)
      .executeTakeFirst();
    if (+lotTotal.total + createDto.quantity > lot.quantity) {
      throw new HttpException('Overflow of lot size. Check lot quantity.', HttpStatus.CONFLICT);
    }

    const uniqueLotsInBay = await this.databaseService.selectFrom('Inventory')
      .select('lotNumber')
      .where('location', '=', createDto.location)
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

    const mergableLots = await this.databaseService.selectFrom('Inventory')
      .selectAll()
      .where('location', '=', createDto.location)
      .where('lotNumber', '=', createDto.lotNumber)
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

      const merged = await this.findOne(mergableLots.id);
      return merged;
    }

    await this.databaseService.insertInto('Log')
      .values({
        fromLocation: fromLocation || 'Operations',
        toLocation: createDto.location,
        dateTime: new Date(),
        user: createDto.createdBy,
        lotNumber: createDto.lotNumber,
        quantityMoved: createDto.quantity,
        comments: comment || 'Inventory created'
      })
      .execute();

    const { insertId } = await this.databaseService.insertInto('Inventory')
      .values(this.inventoryUtils.scrubCreateDto(createDto))
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
        .where((eb) => {
          if (
            !lotNumber &&
            !inventoryBay &&
            !createdBy &&
            !updatedBy &&
            !startDate &&
            !endDate
          ) return eb('id', '>', 0);
          return eb.or([
            lotNumber ? eb('lotNumber', '=', lotNumber) : null,
            inventoryBay ? eb('location', '=', inventoryBay) : null,
            createdBy ? eb('createdBy', '=', createdBy) : null,
            updatedBy ? eb('updatedBy', '=', updatedBy) : null,
            startDate ? eb('createdAt', '>=', new Date(startDate)) : null,
            (startDate && endDate) ? eb('createdAt', '<=', new Date(endDate)) : null
          ].filter((x) => x !== null))
        })
        .execute();
    } catch (error) {
      return [] as Inventory[];
    }
  }

  async findOne(id: number): Promise<Inventory> {
    try {
      return await this.databaseService.selectFrom('Inventory')
        .selectAll()
        .where('id', '=', id)
        .executeTakeFirstOrThrow();
    } catch (error) {
      throw new HttpException('Lot not found', 404);
    }
  }

  async update(id: number, updateDto: Inventory, fromLocation?: string, comments?: string) {
    // Error codes:
    // HttpStatus.BAD_REQUEST = 400
    // HttpStatus.UNPROCESSABLE_ENTITY = 422
    // HttpStatus.PRECONDITION_REQUIRED = 428
    // HttpStatus.INTERNAL_SERVER_ERROR = 500

    const item = await this.findOne(id);

    let lotNumber: string;
    try {
      lotNumber = updateDto.lotNumber || item.lotNumber;
    } catch (error) {
      lotNumber = item.lotNumber;
    }
    const lot = await this.databaseService.selectFrom('ProductLot')
      .selectAll()
      .where('lotNumber', '=', lotNumber)
      .executeTakeFirst()

    if (!lot) {
      throw new HttpException('Lot does not exist', HttpStatus.BAD_REQUEST);
    }

    if (updateDto.quantity && updateDto.quantity > lot.quantity) {
      throw new HttpException('Inventory quantity exceeds product lot quantity', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    try {
      if (updateDto.location) {
        await this.databaseService.selectFrom('InventoryBay')
          .selectAll()
          .where('name', '=', updateDto.location)
          .executeTakeFirstOrThrow();
      }
    } catch (error) {
      throw new HttpException('Inventory bay does not exist', HttpStatus.PRECONDITION_REQUIRED);
    }

    try {
      await this.databaseService.updateTable('Inventory')
        .where('id', '=', id)
        .set(this.inventoryUtils.scrubUpdateDto(updateDto))
        .execute();

      if (fromLocation) {
        await this.databaseService.insertInto('Log')
          .values({
            fromLocation: fromLocation,
            toLocation: updateDto.location,
            dateTime: new Date(),
            user: updateDto.updatedBy,
            lotNumber: updateDto.lotNumber,
            quantityMoved: updateDto.quantity,
            comments: comments || 'Inventory updated'
          })
          .execute();
      }

      return this.findOne(id);
    } catch (error) {
      throw new HttpException('Error updating inventory', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    const inventory = await this.findOne(id);

    await this.databaseService.deleteFrom('Inventory')
      .where('id', '=', id)
      .execute();

    return inventory;
  }
}
