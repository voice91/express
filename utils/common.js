import { Mongoose } from 'mongoose';
import {
  EnumAssetTypeOfDeal,
  EnumLenderTypeOfLendingInstitution,
  EnumLoanTypeOfDeal,
  EnumStatesOfDeal,
} from 'models/enum.model';
import contentType from './content-type.json';
/* eslint-disable */
export const asyncForEach = async (array, callback) => {
  for (let index = 0; index < array.length; index += 1) {
    await callback(array[index], index, array);
  }
};

/* eslint-enable */
/**
 * Check Whether Object is Mongoose Model
 * @param object
 * @returns {boolean}
 */
export const isMongooseModel = (object = {}) => {
  return object instanceof Mongoose.prototype.Model;
};

/**
 * Check Whether Object is Mongoose Documents
 * @param object
 * @returns {boolean}
 */
export const isMongooseDocument = (object = {}) => {
  return object instanceof Mongoose.prototype.Document;
};

/**
 * Check Whether Object is Mongoose ObjectId
 * @param data
 * @returns {boolean}
 */
export const isObjectId = (data = {}) => {
  return Mongoose.prototype.isValidObjectId(data);
};

/**
 * @param {String} string
 * @returns {string}
 */
export const capitalizeFirstLetter = (string = '') => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 *
 * @returns {number}
 */
export const generateOtp = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

export const transFormCardResponse = (paymentMethod) => {
  const {
    card: { exp_month: expMonth, exp_year: expYear, last4 },
    billing_details: {
      address: { city, country, line1, line2, postal_code: postalCode, state },
      name,
    },
    id,
  } = paymentMethod;
  return { expMonth, expYear, last4, id, city, country, line1, line2, postalCode, state, name };
};

export const transFormAccountResponse = (account) => {
  const { object } = account;
  if (object === 'bank_account') {
    const { bank_name: bankName, country, last4, routing_number: routingNumber } = account;
    return { type: 'payout', object, bankName, country, last4, routingNumber };
  }
  if (object === 'card') {
    const { brand, country, exp_month: expMonth, exp_year: expYear, funding, last4 } = account;
    return { type: 'payout', object, brand, country, expMonth, expYear, funding, last4 };
  }
  return {};
};

export const getUserField = (field = '') => {
  return `firstName lastName ${field}`;
};
/* eslint-disable */
export function sortObjectByKeys(o) {
  return Object.keys(o)
    .sort()
    .reduce((r, k) => ((r[k] = o[k]), r), {});
}

/* eslint-enable */
export const getBatchedIterable = async function* (cursor, batchSize) {
  let batch = [];
  let hasNext = false;
  do {
    /* eslint-disable no-await-in-loop */
    const item = await cursor.next();
    /* eslint-enable no-await-in-loop */
    hasNext = !!item;
    if (hasNext) batch.push(item);
    if (batch.length === batchSize) {
      yield batch;
      batch = [];
    }
  } while (hasNext);
  if (batch.length) yield batch;
};

export const getQueueUrlFromArn = (arn, sqs) => {
  const accountId = arn.split(':')[4];
  const queueName = arn.split(':')[5];
  return `${sqs.endpoint.href + accountId}/${queueName}`;
};

export const validUrl = (s) => {
  try {
    const url = new URL(s);
    return url;
  } catch (err) {
    return false;
  }
};

export const addDays = (theDate, days) => {
  return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
};

export const getMimeType = (allowedExtension) => {
  return allowedExtension.map((ext) => {
    const obj = contentType.find((c) => c.key === ext);
    return obj ? obj.mimeType : '';
  });
};

export const encodeUrl = (url) => {
  const fileUrl = url.split('/');
  const fileUrlToEncode = fileUrl[fileUrl.length - 1];
  const encodedUrl = encodeURI(fileUrlToEncode);
  const fileRemoveUnEncodedPart = fileUrl.splice(0, fileUrl.length - 1);
  fileRemoveUnEncodedPart.push(encodedUrl);
  const finalEncodedUrl = fileRemoveUnEncodedPart.join('/');
  return finalEncodedUrl;
};

export const CsvReverseLenderTypeMapping = {
  [EnumLenderTypeOfLendingInstitution.BANK]: 'Bank',
  [EnumLenderTypeOfLendingInstitution.DEBT_FUND]: 'Debt Fund',
  [EnumLenderTypeOfLendingInstitution.CREDIT_UNION]: 'Credit Union',
  [EnumLenderTypeOfLendingInstitution.NATIONAL_BANK]: 'National Bank',
  [EnumLenderTypeOfLendingInstitution.REGIONAL_BANK]: 'Regional Bank',
  [EnumLenderTypeOfLendingInstitution.LIFECO]: 'LifeCo',
  [EnumLenderTypeOfLendingInstitution.LIFE_INSURANCE]: 'Life Insurance',
  [EnumLenderTypeOfLendingInstitution.CMBS]: 'CMBS',
  [EnumLenderTypeOfLendingInstitution.LOCAL_BANK]: 'Local Bank',
};
export const CsvLenderTypeMapping = {
  Bank: EnumLenderTypeOfLendingInstitution.BANK,
  'Debt Fund': EnumLenderTypeOfLendingInstitution.DEBT_FUND,
  'Credit Union': EnumLenderTypeOfLendingInstitution.CREDIT_UNION,
  'National Bank': EnumLenderTypeOfLendingInstitution.NATIONAL_BANK,
  'Regional Bank': EnumLenderTypeOfLendingInstitution.REGIONAL_BANK,
  LifeCo: EnumLenderTypeOfLendingInstitution.LIFECO,
  'Life Insurance': EnumLenderTypeOfLendingInstitution.LIFE_INSURANCE,
  CMBS: EnumLenderTypeOfLendingInstitution.CMBS,
  'Local Bank': EnumLenderTypeOfLendingInstitution.LOCAL_BANK,
};

export const CsvReverseLenderPropertyTypeMapping = {
  [EnumAssetTypeOfDeal.MULTIFAMILY]: 'Multifamily',
  [EnumAssetTypeOfDeal.STUDENT_HOUSING]: 'Student Housing',
  [EnumAssetTypeOfDeal.INDUSTRIAL]: 'Industrial',
  [EnumAssetTypeOfDeal.SELF_STORAGE]: 'Self-Storage',
  [EnumAssetTypeOfDeal.RETAIL]: 'Retail',
  [EnumAssetTypeOfDeal['1_4_SFR']]: '1_4 SFR',
  [EnumAssetTypeOfDeal.HOTELS]: 'Hotels',
  [EnumAssetTypeOfDeal.OFFICE]: 'Office',
  [EnumAssetTypeOfDeal.NNN_RETAIL]: 'NNN Retail',
  [EnumAssetTypeOfDeal.MOBILE_HOME_PARK]: 'Mobile Home Park',
  [EnumAssetTypeOfDeal.CANNABIS]: 'Cannabis',
  [EnumAssetTypeOfDeal.FOR_SALE_CONDOS]: 'For Sale Condos',
  [EnumAssetTypeOfDeal.HEALTHCARE]: 'Healthcare',
  [EnumAssetTypeOfDeal.SHORT_TERM_RENTALS]: 'Short-term rentals',
  [EnumAssetTypeOfDeal.CO_LIVING]: 'Co-living',
  [EnumAssetTypeOfDeal.OUTDOOR_STORAGE]: 'Outdoor Storage',
};

export const CsvLenderPropertyTypeMapping = {
  Multifamily: EnumAssetTypeOfDeal.MULTIFAMILY,
  'Student Housing': EnumAssetTypeOfDeal.STUDENT_HOUSING,
  Industrial: EnumAssetTypeOfDeal.INDUSTRIAL,
  'Self-Storage': EnumAssetTypeOfDeal.SELF_STORAGE,
  Retail: EnumAssetTypeOfDeal.RETAIL,
  '1_4 SFR': EnumAssetTypeOfDeal['1_4_SFR'],
  Hotels: EnumAssetTypeOfDeal.HOTELS,
  Hospitality: EnumAssetTypeOfDeal.HOTELS,
  Office: EnumAssetTypeOfDeal.OFFICE,
  'NNN Retail': EnumAssetTypeOfDeal.NNN_RETAIL,
  All: Object.values(EnumAssetTypeOfDeal),
  'Mobile Home Park': EnumAssetTypeOfDeal.MOBILE_HOME_PARK,
  Cannabis: EnumAssetTypeOfDeal.CANNABIS,
  'For Sale Condos': EnumAssetTypeOfDeal.FOR_SALE_CONDOS,
  Healthcare: EnumAssetTypeOfDeal.HEALTHCARE,
  'Short-term rentals': EnumAssetTypeOfDeal.SHORT_TERM_RENTALS,
  'Co-living': EnumAssetTypeOfDeal.CO_LIVING,
  'Outdoor Storage': EnumAssetTypeOfDeal.OUTDOOR_STORAGE,
};

export const CsvReverseLenderLoanTypeMapping = {
  [EnumLoanTypeOfDeal.CONSTRUCTION]: 'Construction',
  [EnumLoanTypeOfDeal.PRE_DEVELOPMENT_LAND]: 'Land',
  [EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL]: 'Light Transitional',
  [EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL]: 'Heavy Transitional',
  [EnumLoanTypeOfDeal.TRANSITIONAL]: 'Transitional',
  [EnumLoanTypeOfDeal.STABILIZED]: 'Stabilized',
};

export const CsvLenderLoanTypeMapping = {
  Construction: EnumLoanTypeOfDeal.CONSTRUCTION,
  Bridge: [EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL, EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL],
  Permanent: EnumLoanTypeOfDeal.STABILIZED,
  Land: EnumLoanTypeOfDeal.PRE_DEVELOPMENT_LAND,
  'Light Bridge': EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL,
  'Heavy Bridge': EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL,
  'Light Transitional': EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL,
  'Heavy Transitional': EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL,
  Transitional: EnumLoanTypeOfDeal.TRANSITIONAL,
  Stabilized: EnumLoanTypeOfDeal.STABILIZED,
};

export const CsvStatesArrayMapping = {
  AL: EnumStatesOfDeal.ALABAMA,
  AK: EnumStatesOfDeal.ALASKA,
  AZ: EnumStatesOfDeal.ARIZONA,
  AR: EnumStatesOfDeal.ARKANSAS,
  CA: EnumStatesOfDeal.CALIFORNIA,
  CO: EnumStatesOfDeal.COLORADO,
  CT: EnumStatesOfDeal.CONNECTICUT,
  DE: EnumStatesOfDeal.DELAWARE,
  DC: EnumStatesOfDeal.DISTRICT_OF_COLUMBIA,
  FL: EnumStatesOfDeal.FLORIDA,
  GA: EnumStatesOfDeal.GEORGIA,
  HI: EnumStatesOfDeal.HAWAII,
  ID: EnumStatesOfDeal.IDAHO,
  IL: EnumStatesOfDeal.ILLINOIS,
  IN: EnumStatesOfDeal.INDIANA,
  IA: EnumStatesOfDeal.IOWA,
  KS: EnumStatesOfDeal.KANSAS,
  KY: EnumStatesOfDeal.KENTUCKY,
  LA: EnumStatesOfDeal.LOUISIANA,
  ME: EnumStatesOfDeal.MAINE,
  MD: EnumStatesOfDeal.MARYLAND,
  MA: EnumStatesOfDeal.MASSACHUSETTS,
  MI: EnumStatesOfDeal.MICHIGAN,
  MN: EnumStatesOfDeal.MINNESOTA,
  MS: EnumStatesOfDeal.MISSISSIPPI,
  MO: EnumStatesOfDeal.MISSOURI,
  MT: EnumStatesOfDeal.MONTANA,
  NE: EnumStatesOfDeal.NEBRASKA,
  NV: EnumStatesOfDeal.NEVADA,
  NH: EnumStatesOfDeal.NEW_HAMPSHIRE,
  NJ: EnumStatesOfDeal.NEW_JERSEY,
  NM: EnumStatesOfDeal.NEW_MEXICO,
  NY: EnumStatesOfDeal.NEW_YORK,
  NC: EnumStatesOfDeal.NORTH_CAROLINA,
  ND: EnumStatesOfDeal.NORTH_DAKOTA,
  OH: EnumStatesOfDeal.OHIO,
  OK: EnumStatesOfDeal.OKLAHOMA,
  OR: EnumStatesOfDeal.OREGON,
  PA: EnumStatesOfDeal.PENNSYLVANIA,
  RI: EnumStatesOfDeal.RHODE_ISLAND,
  SC: EnumStatesOfDeal.SOUTH_CAROLINA,
  SD: EnumStatesOfDeal.SOUTH_DAKOTA,
  TN: EnumStatesOfDeal.TENNESSEE,
  TX: EnumStatesOfDeal.TEXAS,
  UT: EnumStatesOfDeal.UTAH,
  VT: EnumStatesOfDeal.VERMONT,
  VA: EnumStatesOfDeal.VIRGINIA,
  WA: EnumStatesOfDeal.WASHINGTON,
  WV: EnumStatesOfDeal.WEST_VIRGINIA,
  WI: EnumStatesOfDeal.WISCONSIN,
  WY: EnumStatesOfDeal.WYOMING,
  Nationwide: Object.values(EnumStatesOfDeal),
};
