import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Prisma } from '@prisma/client';

/*
model Product {
  id               Int             @id @default(autoincrement())
  name             String          @unique
  description      String
  productLots      ProductLot[]
}
*/

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createDto: Prisma.ProductCreateInput) {
    return this.productService.create(createDto);
  }

  @Get('list')
  list() {
    return this.productService.list();
  }

  @Get()
  findAll(
    @Query('name') name?: string,
    @Query('description') description?: string
  ) {
    return this.productService.findAll(
      name,
      description
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Prisma.ProductUpdateInput) {
    return this.productService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
