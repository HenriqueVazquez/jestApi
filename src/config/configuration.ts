export default () => {
  const isDocker = process.env.DOCKER === 'true';

  return {
    port: parseInt(process.env.PORT || '3000', 10),
    mongoUri: process.env.MONGO_URI || (isDocker
      ? 'mongodb://admin:admin123@mongo:27017/saas-study?authSource=admin'
      : 'mongodb://admin:admin123@localhost:27017/saas-study?authSource=admin'),
    jwtSecret: process.env.JWT_SECRET || 'changeme',
  };
};
