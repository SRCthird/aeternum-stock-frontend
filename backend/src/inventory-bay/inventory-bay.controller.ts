import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryBayService } from './inventory-bay.service';
import { Prisma } from '@prisma/client';

@Controller('inventory-bay')
export class InventoryBayController {
  constructor(private readonly inventoryBayService: InventoryBayService) {}

  @Post()
  create(@Body() createDto: Prisma.InventoryBayCreateInput) {
    return this.inventoryBayService.create(createDto);
  }

  @Get()
  findAll() {
    return this.inventoryBayService.findAll();
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
