import { Test, TestingModule } from '@nestjs/testing';
import { IngredientCalculateController } from './ingredient-calculate.controller';
import { IngredientCalculateService } from './ingredient-calculate.service';

describe('IngredientCalculateController', () => {
  let controller: IngredientCalculateController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngredientCalculateController],
      providers: [IngredientCalculateService],
    }).compile();

    controller = module.get<IngredientCalculateController>(IngredientCalculateController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
