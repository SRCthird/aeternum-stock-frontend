import { Test, TestingModule } from '@nestjs/testing';
import { InventoryBayService } from './inventory-bay.service';

describe('InventoryBayService', () => {
  let service: InventoryBayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InventoryBayService],
    }).compile();

    service = module.get<InventoryBayService>(InventoryBayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
