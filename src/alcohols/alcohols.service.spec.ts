import { Test, TestingModule } from '@nestjs/testing';
import { AlcoholsService } from './alcohols.service';

describe('AlcoholsService', () => {
  let service: AlcoholsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlcoholsService],
    }).compile();

    service = module.get<AlcoholsService>(AlcoholsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
