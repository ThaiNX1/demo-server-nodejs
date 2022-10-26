import { Test, TestingModule } from '@nestjs/testing';
import { IngredientCalculateService } from './ingredient-calculate.service';

describe('IngredientCalculateService', () => {
  let service: IngredientCalculateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IngredientCalculateService],
    }).compile();

    service = module.get<IngredientCalculateService>(IngredientCalculateService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
