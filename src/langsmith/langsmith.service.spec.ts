import { Test, TestingModule } from '@nestjs/testing';
import { LangSmithService } from './langsmith.service';
import { ConfigService } from '@nestjs/config';

describe('LangSmithService', () => {
  let service: LangSmithService;

  // Mock do ConfigService
  const mockConfigService = {
    get: jest.fn().mockImplementation((key: string, defaultValue?: any) => {
      const config = {
        'langsmith.tracing': false,
        'langsmith.apiKey': 'fake-key',
        'langsmith.callbacksBackground': true,
        'langsmith.project': 'nestjs-saas-study',
      };
      return config[key] ?? defaultValue;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LangSmithService,
        { provide: ConfigService, useValue: mockConfigService }, // injeta o mock
      ],
    }).compile();

    service = module.get<LangSmithService>(LangSmithService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return false for isTracingEnabled', () => {
    expect(service.isTracingEnabled()).toBe(false);
  });
});
