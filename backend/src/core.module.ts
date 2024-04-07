import { Module } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';

import { DatabaseModule } from './database/database.module';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryBayModule } from './inventory-bay/inventory-bay.module';
import { LogModule } from './log/log.module';
import { ProductModule } from './product/product.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductLotModule } from './product-lot/product-lot.module';

@Module({
  imports: [
    InventoryModule,
    InventoryBayModule,
    LogModule,
    ProductModule,
    WarehouseModule,
    DatabaseModule,
    ProductLotModule,
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule {}
