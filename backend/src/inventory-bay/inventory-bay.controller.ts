import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoryBayService } from './inventory-bay.service';
import { CreateInventoryBayDto } from './dto/create-inventory-bay.dto';
import { UpdateInventoryBayDto } from './dto/update-inventory-bay.dto';

@Controller('inventory-bay')
export class InventoryBayController {
  constructor(private readonly inventoryBayService: InventoryBayService) {}

  @Post()
  create(@Body() createInventoryBayDto: CreateInventoryBayDto) {
    return this.inventoryBayService.create(createInventoryBayDto);
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
  update(@Param('id') id: string, @Body() updateInventoryBayDto: UpdateInventoryBayDto) {
    return this.inventoryBayService.update(+id, updateInventoryBayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoryBayService.remove(+id);
  }
}
