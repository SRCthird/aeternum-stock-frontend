import { Injectable } from "@nestjs/common";
import { Inventory } from "@prisma/client";

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
    console.log(updateDto);
    let scrubbed: UpdateInventory = {};
    if (updateDto.lotNumber) scrubbed.lotNumber = updateDto.lotNumber
    if (updateDto.location) scrubbed.location = updateDto.location;
    if (updateDto.quantity) scrubbed.quantity = updateDto.quantity;
    if (updateDto.updatedBy) scrubbed.updatedBy = updateDto.updatedBy;
    if (updateDto.updatedBy) scrubbed.updatedAt = new Date();
    console.log(scrubbed);
    return scrubbed;
  }
};

