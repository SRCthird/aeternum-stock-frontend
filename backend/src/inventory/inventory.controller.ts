import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { Prisma } from '@prisma/client';

/**
*model Inventory {
  id               Int              @id @default(autoincrement())
  lotNumber        String
  location         String
  quantity         Int
  createdAt        DateTime         @default(now())
  createdBy        String
  updatedAt        DateTime         @updatedAt
  updatedBy        String

  productLot       ProductLot       @relation(fields: [lotNumber], references: [lotNumber])
  inventoryBay     InventoryBay     @relation(fields: [location], references: [name])
}
*/

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Post()
  create(
    @Body() createDto: Prisma.InventoryCreateInput
  ) {
    return this.inventoryService.create(createDto);
  }

  @Get()
  findAll(
    @Query('logNumber') logNumber?: string,
    @Query('inventoryBay') inventoryBay?: string,
    @Query('createdBy') createdBy?: string,
    @Query('updatedBy') updatedBy?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.inventoryService.findAll(
      logNumber,
      inventoryBay,
      createdBy,
      updatedBy,
      startDate,
      endDate
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Prisma.InventoryUpdateInput) {
    return this.inventoryService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryService.remove(+id);
  }
}
