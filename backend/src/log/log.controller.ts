import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LogService } from './log.service';
import { Log } from '@prisma/client';

/*
model Log {
  id               Int              @id @default(autoincrement())
  fromLocation     String
  toLocation       String
  dateTime         DateTime         @default(now())
  userId           String
  lotNumber        String
  quantityMoved    Int
  comments         String           @default("")

  fromInventoryBay InventoryBay     @relation("FromLocation", fields: [fromLocation], references: [name])
  toInventoryBay   InventoryBay     @relation("ToLocation", fields: [toLocation], references: [name])
  productLot       ProductLot       @relation(fields: [lotNumber], references: [lotNumber])
}
*/

@Controller('log')
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  create(@Body() createDto: Log) {
    return this.logService.create(createDto);
  }

  @Get()
  findAll(
    @Query('fromLocation') fromLocation?: string,
    @Query('toLocation') toLocation?: string,
    @Query('username') username?: string,
    @Query('lotNumber') lotNumber?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string
  ) {
    return this.logService.findAll(
      fromLocation,
      toLocation,
      username,
      lotNumber,
      startDate,
      endDate
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.logService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Log) {
    return this.logService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.logService.remove(+id);
  }
}
