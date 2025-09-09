import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import langsmithConfig from '../config/langsmith.config';
import type { ConfigType } from '@nestjs/config';

@Injectable()
export class LangSmithService implements OnModuleInit {
  constructor(
    @Inject(langsmithConfig.KEY)
    private readonly config: ConfigType<typeof langsmithConfig>,
  ) { }

  onModuleInit() {
    this.setupLangSmith();
  }

  private setupLangSmith() {
    const { tracing, apiKey, callbacksBackground, project } = this.config;

    if (tracing) {
      process.env.LANGSMITH_TRACING = 'true';
      process.env.LANGSMITH_API_KEY = apiKey;
      process.env.LANGCHAIN_CALLBACKS_BACKGROUND = callbacksBackground ? 'true' : 'false';
      process.env.LANGCHAIN_PROJECT = project;

      console.log(`🔍 LangSmith initialized for project: ${project}`);
    }
  }

  isTracingEnabled(): boolean {
    return this.config.tracing;
  }
}