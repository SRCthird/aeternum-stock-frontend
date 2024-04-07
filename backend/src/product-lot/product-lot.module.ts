import { Module } from '@nestjs/common';
import { ProductLotService } from './product-lot.service';
import { ProductLotController } from './product-lot.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [ProductLotController],
  providers: [ProductLotService],
})
export class ProductLotModule {}
