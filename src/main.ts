import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import langsmithConfig from './config/langsmith.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) || 3000;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const config = app.get<ConfigType<typeof langsmithConfig>>(langsmithConfig.KEY);

  if (config.tracing) {
    process.env.LANGSMITH_TRACING = 'true';
    process.env.LANGSMITH_API_KEY = config.apiKey;
    process.env.LANGCHAIN_CALLBACKS_BACKGROUND = config.callbacksBackground ? 'true' : 'false';
    process.env.LANGCHAIN_PROJECT = config.project;

    console.log(`🔍 LangSmith tracking enabled for project: ${config.project}`);
  }

  await app.listen(port);
  console.log(`App listening on ${port}`);
}
bootstrap().catch((err) => {

  console.error('Bootstrap failed', err);
  process.exit(1);
});
