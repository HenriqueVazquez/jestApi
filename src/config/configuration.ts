export default () => {
  const isDocker = process.env.DOCKER === 'true';

  return {
    port: parseInt(process.env.PORT || '3000', 10),
    mongoUri: process.env.MONGO_URI || (isDocker
      ? 'mongodb://admin:admin123@mongo:27017/saas-study?authSource=admin'
      : 'mongodb://admin:admin123@localhost:27017/saas-study?authSource=admin'),
    googleApiKey: process.env.GOOGLE_API_KEY || '',
    jwtSecret: process.env.JWT_SECRET || 'changeme',

    langsmith: {
      tracing: process.env.LANGSMITH_TRACING === 'true',
      apiKey: process.env.LANGSMITH_API_KEY,
      callbacksBackground: process.env.LANGCHAIN_CALLBACKS_BACKGROUND === 'true',
      project: process.env.LANGCHAIN_PROJECT || 'nestjs-saas-study',
    },
  };
};