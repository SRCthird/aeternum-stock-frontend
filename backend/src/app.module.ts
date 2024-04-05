import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductProfileModule } from './product-profile/product-profile.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { LogModule } from './log/log.module';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryBayModule } from './inventory-bay/inventory-bay.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductProfileModule } from './product-profile/product-profile.module';

@Module({
  imports: [ProductProfileModule, WarehouseModule, InventoryBayModule, InventoryModule, LogModule, ProductModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
