import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';
import { ApiKeyMiddleware } from './api-key/api-key.middleware';

import { DatabaseModule } from './database/database.module';
import { InventoryModule } from './inventory/inventory.module';
import { InventoryBayModule } from './inventory-bay/inventory-bay.module';
import { LogModule } from './log/log.module';
import { ProductModule } from './product/product.module';
import { WarehouseModule } from './warehouse/warehouse.module';
import { ProductLotModule } from './product-lot/product-lot.module';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    InventoryModule,
    InventoryBayModule,
    LogModule,
    ProductModule,
    WarehouseModule,
    DatabaseModule,
    ProductLotModule,
    UserModule,
    ProfileModule,
  ],
  controllers: [CoreController],
  providers: [CoreService],
})
export class CoreModule { 
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
