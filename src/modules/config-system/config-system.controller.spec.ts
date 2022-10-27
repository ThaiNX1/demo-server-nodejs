import { Test, TestingModule } from '@nestjs/testing';
import { ConfigSystemController } from './config-system.controller';
import { ConfigSystemService } from './config-system.service';

describe('ConfigSystemController', () => {
  let controller: ConfigSystemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConfigSystemController],
      providers: [ConfigSystemService],
    }).compile();

    controller = module.get<ConfigSystemController>(ConfigSystemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
