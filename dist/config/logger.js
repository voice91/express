import winston from 'winston';
import config from "./config";
export const enumerateErrorFormat = winston.format(info => {
  if (info instanceof Error) {
    Object.assign(info, {
      message: info.stack
    });
  }
  return info;
});
export const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: winston.format.combine(enumerateErrorFormat(), config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(), winston.format.splat(), winston.format.timestamp(), winston.format.printf(({
    level,
    message,
    timestamp
  }) => `${timestamp} ${level}: ${message} `)),
  transports: [new winston.transports.Console({
    stderrLevels: ['error']
  })]
});
// module.exports = logger;