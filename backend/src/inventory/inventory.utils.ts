import { Injectable } from "@nestjs/common";
import { Inventory } from "@prisma/client";
import { DatabaseService } from "src/database/database.service";

type UpdateInventory = {
  id?: number;
  lotNumber?: string;
  location?: string;
  quantity?: number;
  updatedBy?: string;
  updatedAt?: Date;
};

type CreateInventory = {
  id?: number;
  lotNumber: string;
  location: string;
  quantity: number;
  createdAt: Date;
  createdBy: string;
};

@Injectable()
export class InventoryUtils {

  constructor(readonly databaseService: DatabaseService) { }

  scrubCreateDto(createDto: Inventory): CreateInventory {
    return {
      lotNumber: createDto.lotNumber,
      location: createDto.location,
      quantity: createDto.quantity,
      createdAt: new Date(),
      createdBy: createDto.createdBy
    };
  }


  scrubUpdateDto(updateDto: Inventory): UpdateInventory {
    let scrubbed: UpdateInventory = {};
    if (updateDto.lotNumber) scrubbed.lotNumber = updateDto.lotNumber
    if (updateDto.location) scrubbed.location = updateDto.location;
    if (updateDto.quantity) scrubbed.quantity = updateDto.quantity;
    if (updateDto.updatedBy) scrubbed.updatedBy = updateDto.updatedBy;
    if (updateDto.updatedBy) scrubbed.updatedAt = new Date();
    console.log(scrubbed);
    return scrubbed;
  }

  async mergeLot(dto: Inventory, fromLocation: string, comment?: string) {
    const mergableLots = await this.databaseService.selectFrom('Inventory')
      .selectAll()
      .where('location', '=', dto.location)
      .where('lotNumber', '=', dto.lotNumber)
      .executeTakeFirst();

    if (mergableLots) {
      await this.databaseService.updateTable('Inventory')
        .where('id', '=', mergableLots.id)
        .set({
          quantity: (mergableLots.quantity + dto.quantity),
          updatedBy: dto.createdBy,
          updatedAt: new Date()
        })
        .execute();

      await this.databaseService.insertInto('Log')
        .values({
          fromLocation: fromLocation,
          toLocation: dto.location,
          dateTime: new Date(),
          user: dto.createdBy,
          lotNumber: dto.lotNumber,
          quantityMoved: dto.quantity,
          comments: comment || 'Inventory updated'
        })
        .execute();

      const merged = await this.databaseService.selectFrom('Inventory')
        .selectAll()
        .where('id', '=', mergableLots.id)
        .executeTakeFirst();

      return merged;
    }
    throw new Error('Inventory not mergable');
  }
};

