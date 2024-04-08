import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { Prisma } from '@prisma/client';

/*
model Warehouse {
  id               Int              @id @default(autoincrement())
  name             String           @unique
  inventoryBays    InventoryBay[]
}
*/

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  create(@Body() createDto: Prisma.WarehouseCreateInput) {
    return this.warehouseService.create(createDto);
  }

  @Get()
  findAll(
    @Query('name') name?: string,
  ) {
    return this.warehouseService.findAll(
      name
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.warehouseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Prisma.WarehouseUpdateInput) {
    return this.warehouseService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.warehouseService.remove(+id);
  }
}
