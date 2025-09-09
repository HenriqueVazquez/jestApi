import { Test, TestingModule } from '@nestjs/testing';
import { LangchainService } from './langchain.service';
import appLangChainConfig from '../config/configuration';
import type { ConfigType } from '@nestjs/config';
import { BaseMessageLike } from '@langchain/core/messages';

// Mock do model para não fazer requisição real no teste
jest.mock('@langchain/google-genai', () => {
  return {
    ChatGoogleGenerativeAI: jest.fn().mockImplementation(() => ({
      invoke: jest.fn().mockResolvedValue({ content: 'mocked response' }),
    })),
  };
});

describe('LangchainService', () => {
  let service: LangchainService;
  let configMock: ConfigType<typeof appLangChainConfig>;

  beforeEach(async () => {
    // Mock do ConfigType
    configMock = {
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
      providers: [
        LangchainService,
        {
          provide: appLangChainConfig.KEY,
          useValue: configMock, // injeta o mock
        },
      ],
    }).compile();

    service = module.get<LangchainService>(LangchainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a mocked response', async () => {
    const messages: BaseMessageLike[] = [
      { role: 'system', content: 'Test system message' },
      { role: 'user', content: 'Hello' },
    ] as any; // cast para simplificar o mock

    const result = await service.sendMessage(messages);
    expect(result.content).toBe('mocked response');
  });
});
