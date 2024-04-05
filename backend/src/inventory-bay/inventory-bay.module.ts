import { Module } from '@nestjs/common';
import { InventoryBayService } from './inventory-bay.service';
import { InventoryBayController } from './inventory-bay.controller';

@Module({
  controllers: [InventoryBayController],
  providers: [InventoryBayService],
})
export class InventoryBayModule {}
