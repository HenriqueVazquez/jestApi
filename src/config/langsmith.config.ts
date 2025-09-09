import { registerAs } from '@nestjs/config';

export default registerAs('langsmith', () => ({
  tracing: process.env.LANGSMITH_TRACING === 'true',
  apiKey: process.env.LANGSMITH_API_KEY,
  callbacksBackground: process.env.LANGCHAIN_CALLBACKS_BACKGROUND === 'true',
  project: process.env.LANGCHAIN_PROJECT || 'nestjs-app',
}));