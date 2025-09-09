import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = Number(process.env.PORT) || 3000;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const configService = app.get(ConfigService);

  if (configService.get('langsmith.tracing')) {
    process.env.LANGSMITH_TRACING = 'true';
    process.env.LANGSMITH_API_KEY = configService.get('langsmith.apiKey');
    process.env.LANGCHAIN_CALLBACKS_BACKGROUND = configService.get('langsmith.callbacksBackground') ? 'true' : 'false';
    process.env.LANGCHAIN_PROJECT = configService.get('langsmith.project');

    console.log('🔍 LangSmith tracking enabled');
  }

  await app.listen(port);
  console.log(`App listening on ${port}`);
}
bootstrap().catch((err) => {

  console.error('Bootstrap failed', err);
  process.exit(1);
});
