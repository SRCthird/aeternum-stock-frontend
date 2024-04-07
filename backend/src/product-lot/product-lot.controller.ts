import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductLotService } from './product-lot.service';
import { Prisma } from '@prisma/client';

@Controller('product-lot')
export class ProductLotController {
  constructor(private readonly productLotService: ProductLotService) {}

  @Post()
  create(@Body() createDto: Prisma.ProductLotCreateInput) {
    return this.productLotService.create(createDto);
  }

  @Get()
  findAll() {
    return this.productLotService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productLotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Prisma.ProductLotUpdateInput) {
    return this.productLotService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productLotService.remove(+id);
  }
}
