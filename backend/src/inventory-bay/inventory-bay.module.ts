import { Module } from '@nestjs/common';
import { InventoryBayService } from './inventory-bay.service';
import { InventoryBayController } from './inventory-bay.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [InventoryBayController],
  providers: [InventoryBayService],
})
export class InventoryBayModule {}
