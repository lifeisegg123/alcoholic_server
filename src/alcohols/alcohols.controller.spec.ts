import { Test, TestingModule } from '@nestjs/testing';
import { AlcoholsController } from './alcohols.controller';
import { AlcoholsService } from './alcohols.service';

describe('AlcoholsController', () => {
  let controller: AlcoholsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlcoholsController],
      providers: [AlcoholsService],
    }).compile();

    controller = module.get<AlcoholsController>(AlcoholsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
