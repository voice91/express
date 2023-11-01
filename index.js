import mongoose from 'mongoose';
// TODO: implement in the future
import config from 'config/config';
import { logger } from 'config/logger';
import socketAPI from 'appEvents/socketAPI';
import app from './app';
import { seedDatabase } from './seed';

const { initSockets } = require('appEvents/handler');

let server;
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  // eslint-disable-next-line global-require
  require('./migrateMongo')();
  server = app.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
  seedDatabase().then().catch();
  // check whether Socket is enabled or not TODO: implement in the future
  // socketAPI.io.adapter(redisAdapter({ host: config.redis.host, port: config.redis.port }));
  socketAPI.io.attach(server);
  initSockets();
});
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};
const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};
process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
