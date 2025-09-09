import { Test, TestingModule } from '@nestjs/testing';
import { LangsmithService } from './langsmith.service';

describe('LangsmithService', () => {
  let service: LangsmithService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LangsmithService],
    }).compile();

    service = module.get<LangsmithService>(LangsmithService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
