import path from 'path';
import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config({ path: path.join(__dirname, '../.env') });
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    LOG_LEVEL: Joi.string().required().description('log level'),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
    FRONT_URL: Joi.string().description('frontend url for email service'),
    REDIS_HOST: Joi.string().required().description('Redis Host is required'),
    REDIS_PORT: Joi.string().required().description('Redis Port is required'),
    REDIS_PASSWORD: Joi.string().required().description('Redis Password is required'),
    AWS_BUCKET_NAME: Joi.string().required().description('Aws Bucket Name is required'),
    AWS_ACCESS_KEY: Joi.string().required().description('Aws Access Key is required'),
    AWS_SECRET_ACCESS_KEY: Joi.string().required().description('Aws Secret Access Key is required'),
    PARTY_USER_LIMIT: Joi.number().default(8),
    RESET_PASSWORD_CODE_SIZE: Joi.number().default(6),
    GOOGLE_CLIENT_ID: Joi.string().required().description('Google Client is required'),
    GOOGLE_CLIENT_SECRET: Joi.string().required().description('Google Client Secret required'),
    CAPTCHA_SECRET_KEY: Joi.string().required().description('Google Captcha Secret Key required'),
    ACTIVITY_SYSTEM_USER: Joi.string(),
    // 1 hr = 3600000
    DISABLED_TIME_FOR_NOTES: Joi.number().default(3600000),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .required()
      .description('minutes after which email verification token expires'),
    // 24 hr = 86400000
    FOLLOW_UP_TIME_FOR_SEND_EMAIL: Joi.number().default(86400000),
    GET_RATES_DATA: Joi.string(),
    ADMIN_EMAIL_ID: Joi.string().description('Admin Email Id'),
    MONGODB_HOST: Joi.string().required().description('MongoDB Host required'),
    MONGO_DB: Joi.string().required().description('Database name required'),
  })
  .unknown();
const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}
export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  activitySystemUser: envVars.ACTIVITY_SYSTEM_USER,
  disabledTimeForNotes: envVars.DISABLED_TIME_FOR_NOTES,
  followUpTimeForSendEmail: envVars.FOLLOW_UP_TIME_FOR_SEND_EMAIL,
  getsRatesData: envVars.GET_RATES_DATA,
  adminEmailId: envVars.ADMIN_EMAIL_ID,
  mongodbHost: envVars.MONGODB_HOST,
  mongodb: envVars.MONGO_DB,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    resetPasswordCodeSize: envVars.RESET_PASSWORD_CODE_SIZE,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
  front: {
    url: envVars.FRONT_URL,
  },
  logging: {
    level: envVars.LOG_LEVEL || 'info',
  },
  notification: {
    ttl: 60 * 60 * 24,
  },
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    password: envVars.REDIS_PASSWORD,
  },
  party: {
    limit: envVars.PARTY_USER_LIMIT,
  },
  aws: {
    accessKeyId: envVars.AWS_ACCESS_KEY,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    bucket: envVars.AWS_BUCKET_NAME,
  },
  google: {
    clientID: envVars.GOOGLE_CLIENT_ID,
    clientSecret: envVars.GOOGLE_CLIENT_SECRET,
  },
  captcha: {
    secretKey: envVars.CAPTCHA_SECRET_KEY,
  },
};
