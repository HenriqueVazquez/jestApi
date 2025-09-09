import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LangSmithService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) { }

  onModuleInit() {
    this.setupLangSmith();
  }

  private setupLangSmith() {
    const isTracingEnabled = this.configService.get('langsmith.tracing');

    if (isTracingEnabled) {
      process.env.LANGSMITH_TRACING = 'true';
      process.env.LANGSMITH_API_KEY = this.configService.get('langsmith.apiKey');
      process.env.LANGCHAIN_CALLBACKS_BACKGROUND = this.configService.get('langsmith.callbacksBackground') ? 'true' : 'false';
      process.env.LANGCHAIN_PROJECT = this.configService.get('langsmith.project');

      console.log(`🔍 LangSmith initialized for project: ${this.configService.get('langsmith.project')}`);
    }
  }

  isTracingEnabled(): boolean {
    return this.configService.get('langsmith.tracing', false);
  }
}