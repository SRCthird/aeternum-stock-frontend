import { Test, TestingModule } from '@nestjs/testing';
import { ProductLotService } from './product-lot.service';

describe('ProductLotService', () => {
  let service: ProductLotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductLotService],
    }).compile();

    service = module.get<ProductLotService>(ProductLotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
