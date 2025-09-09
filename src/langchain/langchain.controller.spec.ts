import { Test, TestingModule } from '@nestjs/testing';
import { LangchainController } from './langchain.controller';
import { LangchainService } from './langchain.service';
import appLangChainConfig from '../config/configuration';
import type { ConfigType } from '@nestjs/config';

// Mock do service
const mockLangchainService = {
  sendMessage: jest.fn().mockResolvedValue({ content: 'mocked response' }),
};

describe('LangchainController', () => {
  let controller: LangchainController;
  let service: LangchainService;

  beforeEach(async () => {
    const configMock: ConfigType<typeof appLangChainConfig> = {
      port: 3000,
      mongoUri: 'mongodb://localhost:27017/test',
      googleApiKey: 'fake-api-key',
      googleApiModel: 'gemini-2.0-flash',
      googleApiTemperature: 0.5,
      jwtSecret: 'changeme',
      langsmith: {
        tracing: false,
        apiKey: undefined,
        callbacksBackground: true,
        project: 'nestjs-saas-study',
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [LangchainController],
      providers: [
        {
          provide: LangchainService,
          useValue: mockLangchainService, // injeta o mock
        },
        {
          provide: appLangChainConfig.KEY,
          useValue: configMock,
        },
      ],
    }).compile();

    controller = module.get<LangchainController>(LangchainController);
    service = module.get<LangchainService>(LangchainService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return the mocked translation', async () => {
    const result = await controller.translate('Hello');
    expect(result).toEqual({ result: 'mocked response' });
    expect(mockLangchainService.sendMessage).toHaveBeenCalled();
  });
});
