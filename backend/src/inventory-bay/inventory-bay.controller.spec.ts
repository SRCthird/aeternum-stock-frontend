import { Test, TestingModule } from '@nestjs/testing';
import { InventoryBayController } from './inventory-bay.controller';
import { InventoryBayService } from './inventory-bay.service';

describe('InventoryBayController', () => {
  let controller: InventoryBayController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InventoryBayController],
      providers: [InventoryBayService],
    }).compile();

    controller = module.get<InventoryBayController>(InventoryBayController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
