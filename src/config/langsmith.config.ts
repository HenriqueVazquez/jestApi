// config/langsmith.config.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LangSmithConfig {
  constructor(private configService: ConfigService) {
    this.setupLangSmith();
  }

  private setupLangSmith() {
    process.env.LANGSMITH_TRACING = this.configService.get('LANGSMITH_TRACING');
    process.env.LANGSMITH_API_KEY = this.configService.get('LANGSMITH_API_KEY');
    process.env.LANGCHAIN_CALLBACKS_BACKGROUND = this.configService.get('LANGCHAIN_CALLBACKS_BACKGROUND');
    process.env.LANGCHAIN_PROJECT = this.configService.get('LANGCHAIN_PROJECT') || 'nestjs-app';
  }
}