import path from 'path';
import dotenv from 'dotenv';
import Joi from 'joi';
import { EnumOfNodeEnv } from '../models/enum.model';

dotenv.config({ path: path.join(__dirname, '../.env') });
const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .valid(...Object.values(EnumOfNodeEnv))
      .required(),
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
    AWS_BUCKET_NAME: Joi.string().required().description('Aws Bucket Name is required'),
    AWS_ACCESS_KEY: Joi.string().required().description('Aws Access Key is required'),
    AWS_SECRET_ACCESS_KEY: Joi.string().required().description('Aws Secret Access Key is required'),
    ENABLE_PRIVATE_ACCESS: Joi.boolean()
      .description('Flag to enable/disable PRIVATE access of uploaded files')
      .default(false),
    URL_EXPIRATION_SECONDS: Joi.number().default(3600),
    PARTY_USER_LIMIT: Joi.number().default(8),
    RESET_PASSWORD_CODE_SIZE: Joi.number().default(6),
    ACTIVITY_SYSTEM_USER: Joi.string(),
    ADMIN_EMAILS: Joi.string().required().default(['richardjsutt@gmail.com', 'richard@parallelcre.com']),
    DEFAULT_ADVISORS_TO_ADD_DEAL: Joi.string()
      .required()
      .default(['max@parallelcre.com', 'ag@parallelcre.com', 'richard@parallelcre.com']),
    // 1 hr = 3600000
    EMAIL_ACCESS_TO_REGISTER_BORROWER: Joi.string().default('richard@parallelcre.com'),
    DISABLED_TIME_FOR_NOTES: Joi.number().default(3600000),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
      .required()
      .description('minutes after which email verification token expires'),
    // 24 hr = 86400000
    FOLLOW_UP_TIME_FOR_SEND_EMAIL: Joi.number().default(86400000),
    GET_RATES_DATA: Joi.string(),
    ADMIN_EMAIL_ID: Joi.string().description('Admin Email Id'),
    POSTMARK_API_TOKEN: Joi.string().required().description('Postmark API Token is Required'),
    POSTMARK_INBOUND_DOMAIN: Joi.string().required().description('Postmark Inbound Domain'),
    POSTMARK_INBOUND_SENDERNAME: Joi.string().description('Postmark Inbound name'),
    EMAIL_SENDER_DISPLAY_NAME: Joi.string().default('Parallel CRE').description('Display name for the email sender'),
    ENCRYPTION_PASSWORD: Joi.string().description('Password for encrypt text'),
    INTERNAL_TOKEN: Joi.string().description('Internal token for OM Generator'),
    DATA_ENCRYPTION: Joi.boolean()
      .description('Flag to enable/disable encryption and decryption of response and request')
      .required(),
    RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
      .default(60)
      .description('minutes after which password reset tokens expires'),
    EMAIL_ACCESS_TO_DELETE_DEAL: Joi.string().required().default('richard@parallelcre.com'),
    NEW_RELIC_APP_NAME: Joi.string(),
    NEW_RELIC_LICENSE_KEY: Joi.string(),
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
  postmarkAPIToken: envVars.POSTMARK_API_TOKEN,
  emailSenderDisplayName: envVars.EMAIL_SENDER_DISPLAY_NAME,
  postmarkInboundDomain: envVars.POSTMARK_INBOUND_DOMAIN,
  postmarkInboundSenderName: envVars.POSTMARK_INBOUND_SENDERNAME,
  adminEmails: JSON.parse(envVars.ADMIN_EMAILS),
  defaultAdvisorToAddDeal: JSON.parse(envVars.DEFAULT_ADVISORS_TO_ADD_DEAL),
  emailAccessToRegisterBorrower: envVars.EMAIL_ACCESS_TO_REGISTER_BORROWER,
  encryptionPassword: envVars.ENCRYPTION_PASSWORD,
  dataEncryption: envVars.DATA_ENCRYPTION,
  internalToken: envVars.INTERNAL_TOKEN,
  emailAccessToDeleteDeal: envVars.EMAIL_ACCESS_TO_DELETE_DEAL,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.RESET_PASSWORD_EXPIRATION_MINUTES,
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
  party: {
    limit: envVars.PARTY_USER_LIMIT,
  },
  aws: {
    accessKeyId: envVars.AWS_ACCESS_KEY,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    bucket: envVars.AWS_BUCKET_NAME,
    enablePrivateAccess: envVars.ENABLE_PRIVATE_ACCESS,
    urlExpirationSeconds: envVars.URL_EXPIRATION_SECONDS,
  },
  newRelic: {
    newRelicAppName: envVars.NEW_RELIC_APP_NAME,
    newRelicLicenseKey: envVars.NEW_RELIC_LICENSE_KEY,
  },
};
