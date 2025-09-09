import { registerAs } from '@nestjs/config';

export default registerAs('appLangChain', () => {
  const isDocker = process.env.DOCKER === 'true';

  return {
    port: parseInt(process.env.PORT || '3000', 10),
    mongoUri: process.env.MONGO_URI || (isDocker
      ? 'mongodb://admin:admin123@mongo:27017/saas-study?authSource=admin'
      : 'mongodb://admin:admin123@localhost:27017/saas-study?authSource=admin'),
    googleApiKey: process.env.GOOGLE_API_KEY || '',
    googleApiModel: process.env.GOOGLE_API_MODEL || 'gemini-2.0-flash',
    googleApiTemperature: parseFloat(process.env.GOOGLE_API_TEMPERATURE || '0'),
    jwtSecret: process.env.JWT_SECRET || 'changeme',


  };
});
