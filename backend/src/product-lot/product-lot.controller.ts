import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductLotService } from './product-lot.service';
import { ProductLot } from '@prisma/client';

/*
model ProductLot {
  id                Int            @id @default(autoincrement())
  lotNumber         String         @unique
  internalReference String         @unique
  productName       String

  product           Product        @relation(fields: [productName], references: [name])
  inventoryRecords  Inventory[]
  activityLogs      Log[]  
}
*/

@Controller('product-lot')
export class ProductLotController {
  constructor(private readonly productLotService: ProductLotService) {}

  @Post()
  create(@Body() createDto: ProductLot) {
    return this.productLotService.create(createDto);
  }

  @Get('list')
  list() {
    return this.productLotService.list();
  }

  @Get()
  findAll(
    @Query('lotNumber') lotNumber?: string,
    @Query('internalReference') internalReference?: string,
    @Query('productName') productName?: string
  ) {
    return this.productLotService.findAll(
      lotNumber,
      internalReference,
      productName
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productLotService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: ProductLot) {
    return this.productLotService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productLotService.remove(+id);
  }
}
