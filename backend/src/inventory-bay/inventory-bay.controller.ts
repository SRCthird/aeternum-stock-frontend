import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { InventoryBayService } from './inventory-bay.service';
import { Prisma } from '@prisma/client';

/**
*model InventoryBay {
  id               Int              @id @default(autoincrement())
  name             String           @unique
  warehouseName    String
  maxUniqueLots    Int              @default(1)

  warehouse        Warehouse        @relation(fields: [warehouseName], references: [name])
  inventoryRecords Inventory[]      
  activityLogsFrom Log[]            @relation("FromLocation") 
  activityLogsTo   Log[]            @relation("ToLocation")  
}
*/

@Controller('inventory-bay')
export class InventoryBayController {
  constructor(private readonly inventoryBayService: InventoryBayService) {}

  @Post()
  create(@Body() createDto: Prisma.InventoryBayCreateInput) {
    return this.inventoryBayService.create(createDto);
  }

  @Get('list')
  list() {
    return this.inventoryBayService.list();
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('warehouseName') warehouseName?: string,
    @Query('maxUniqueLots') maxUniqueLots?: string,
  ) {
    return this.inventoryBayService.findAll(
      name,
      warehouseName,
      +maxUniqueLots,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoryBayService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Prisma.InventoryBayUpdateInput) {
    return this.inventoryBayService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryBayService.remove(+id);
  }
}
