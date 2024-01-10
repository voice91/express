"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _path = _interopRequireDefault(require("path"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _joi = _interopRequireDefault(require("joi"));
var _enum = require("../models/enum.model");
var _Joi$string;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
_dotenv["default"].config({
  path: _path["default"].join(__dirname, '../.env')
});
var envVarsSchema = _joi["default"].object().keys({
  NODE_ENV: _joi["default"].string().valid('production', 'development', 'test').required(),
  APPLICATION_ENV: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_enum.EnumOfNodeEnv))).required(),
  PORT: _joi["default"].number()["default"](3000),
  LOG_LEVEL: _joi["default"].string().required().description('log level'),
  MONGODB_URL: _joi["default"].string().required().description('Mongo DB url'),
  JWT_SECRET: _joi["default"].string().required().description('JWT secret key'),
  JWT_ACCESS_EXPIRATION_MINUTES: _joi["default"].number()["default"](30).description('minutes after which access tokens expire'),
  JWT_REFRESH_EXPIRATION_DAYS: _joi["default"].number()["default"](30).description('days after which refresh tokens expire'),
  SMTP_HOST: _joi["default"].string().description('server that will send the emails'),
  SMTP_PORT: _joi["default"].number().description('port to connect to the email server'),
  SMTP_USERNAME: _joi["default"].string().description('username for email server'),
  SMTP_PASSWORD: _joi["default"].string().description('password for email server'),
  EMAIL_FROM: _joi["default"].string().description('the from field in the emails sent by the app'),
  FRONT_URL: _joi["default"].string().description('frontend url for email service'),
  AWS_BUCKET_NAME: _joi["default"].string().description('Aws Bucket Name is required'),
  AWS_ACCESS_KEY: _joi["default"].string().description('Aws Access Key is required'),
  AWS_SECRET_ACCESS_KEY: _joi["default"].string().description('Aws Secret Access Key is required'),
  ENABLE_PRIVATE_ACCESS: _joi["default"]["boolean"]().description('Flag to enable/disable PRIVATE access of uploaded files')["default"](false),
  URL_EXPIRATION_SECONDS: _joi["default"].number()["default"](3600),
  PARTY_USER_LIMIT: _joi["default"].number()["default"](8),
  RESET_PASSWORD_CODE_SIZE: _joi["default"].number()["default"](6),
  ACTIVITY_SYSTEM_USER: _joi["default"].string(),
  ADMIN_EMAILS: _joi["default"].string().required()["default"](['richardjsutt@gmail.com', 'richard@parallelcre.com']),
  DEFAULT_ADVISORS_TO_ADD_DEAL: _joi["default"].string().required()["default"](['max@parallelcre.com', 'ag@parallelcre.com', 'richard@parallelcre.com']),
  // 1 hr = 3600000
  EMAIL_ACCESS_TO_REGISTER_BORROWER: _joi["default"].string()["default"]('richard@parallelcre.com'),
  DISABLED_TIME_FOR_NOTES: _joi["default"].number()["default"](3600000),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: _joi["default"].number().required().description('minutes after which email verification token expires'),
  // 24 hr = 86400000
  FOLLOW_UP_TIME_FOR_SEND_EMAIL: _joi["default"].number()["default"](86400000),
  GET_RATES_DATA: _joi["default"].string(),
  ADMIN_EMAIL_ID: _joi["default"].string().description('Admin Email Id'),
  POSTMARK_API_TOKEN: _joi["default"].string().required().description('Postmark API Token is Required'),
  POSTMARK_INBOUND_DOMAIN: _joi["default"].string().required().description('Postmark Inbound Domain'),
  POSTMARK_INBOUND_SENDERNAME: _joi["default"].string().description('Postmark Inbound name'),
  EMAIL_SENDER_DISPLAY_NAME: _joi["default"].string()["default"]('Parallel CRE').description('Display name for the email sender'),
  ENCRYPTION_PASSWORD: _joi["default"].string().description('Password for encrypt text'),
  INTERNAL_TOKEN: _joi["default"].string().description('Internal token for OM Generator'),
  DATA_ENCRYPTION: _joi["default"]["boolean"]().description('Flag to enable/disable encryption and decryption of response and request').required(),
  RESET_PASSWORD_EXPIRATION_MINUTES: _joi["default"].number()["default"](60).description('minutes after which password reset tokens expires'),
  EMAIL_ACCESS_TO_DELETE_DEAL: _joi["default"].string().required()["default"]('richard@parallelcre.com'),
  NEW_RELIC_APP_NAME: _joi["default"].string(),
  NEW_RELIC_LICENSE_KEY: _joi["default"].string()
}).unknown();
var _envVarsSchema$prefs$ = envVarsSchema.prefs({
    errors: {
      label: 'key'
    }
  }).validate(process.env),
  envVars = _envVarsSchema$prefs$.value,
  error = _envVarsSchema$prefs$.error;
if (error) {
  throw new Error("Config validation error: ".concat(error.message));
}
var _default = exports["default"] = {
  env: envVars.NODE_ENV,
  application_env: envVars.APPLICATION_ENV,
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
      useUnifiedTopology: true
      // useFindAndModify: false,
    }
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
    resetPasswordCodeSize: envVars.RESET_PASSWORD_CODE_SIZE
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  },
  front: {
    url: envVars.FRONT_URL
  },
  logging: {
    level: envVars.LOG_LEVEL || 'info'
  },
  notification: {
    ttl: 60 * 60 * 24
  },
  party: {
    limit: envVars.PARTY_USER_LIMIT
  },
  aws: {
    accessKeyId: envVars.AWS_ACCESS_KEY,
    secretAccessKey: envVars.AWS_SECRET_ACCESS_KEY,
    bucket: envVars.AWS_BUCKET_NAME,
    enablePrivateAccess: envVars.ENABLE_PRIVATE_ACCESS,
    urlExpirationSeconds: envVars.URL_EXPIRATION_SECONDS
  },
  newRelic: {
    newRelicAppName: envVars.NEW_RELIC_APP_NAME,
    newRelicLicenseKey: envVars.NEW_RELIC_LICENSE_KEY
  }
};