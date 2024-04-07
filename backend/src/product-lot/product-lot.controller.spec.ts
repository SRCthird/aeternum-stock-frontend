import { Test, TestingModule } from '@nestjs/testing';
import { ProductLotController } from './product-lot.controller';
import { ProductLotService } from './product-lot.service';

describe('ProductLotController', () => {
  let controller: ProductLotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductLotController],
      providers: [ProductLotService],
    }).compile();

    controller = module.get<ProductLotController>(ProductLotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
