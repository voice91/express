import { Mongoose } from 'mongoose';
import httpStatus from 'http-status';
import {
  EnumAssetTypeOfDeal,
  EnumLenderTypeOfLendingInstitution,
  EnumLoanTypeOfDeal,
  EnumOfTypeOfValue,
  EnumStatesOfDeal,
} from 'models/enum.model';
import _, { find, includes, isEmpty, isUndefined, round, sum } from "lodash";
import ApiError from './ApiError';
import contentType from './content-type.json';
import { lenderPlacementStageToStageNumberMapping } from './enumStageOfLenderPlacement';
import { dealStageToStageNumberMapping } from './enumStageForDeal';
import { Deal, Invitation } from "../models";
import enumModel from "../models/enum.model";
import { dealService, emailService, notificationService } from "../services";
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

export const removeFalsyValueFromDealSummery = (body) => {
  if (body.propertySummary) {
    // eslint-disable-next-line no-param-reassign
    body.propertySummary = body.propertySummary.filter((item) => item.value);
  }
  if (body.dealMetrics) {
    // eslint-disable-next-line no-param-reassign
    body.dealMetrics = body.dealMetrics.filter((item) => item.value);
  }
  if (body.financingRequest) {
    // eslint-disable-next-line no-param-reassign
    body.financingRequest = body.financingRequest.filter((item) => item.value);
  }
  if (body.sourcesAndUses && body.sourcesAndUses.sources) {
    // eslint-disable-next-line no-param-reassign
    body.sourcesAndUses.sources = body.sourcesAndUses.sources.filter((item) => item.value);
  }
  if (body.sourcesAndUses && body.sourcesAndUses.uses) {
    // eslint-disable-next-line no-param-reassign
    body.sourcesAndUses.uses = body.sourcesAndUses.uses.filter((item) => item.value);
  }
  if (body.financialSummary && body.financialSummary.revenue) {
    // eslint-disable-next-line no-param-reassign
    body.financialSummary.revenue = body.financialSummary.revenue.filter(
      (item) => item.inPlaceValue || item.stabilizedValue
    );
  }
  if (body.financialSummary && body.financialSummary.expenses) {
    // eslint-disable-next-line no-param-reassign
    body.financialSummary.expenses = body.financialSummary.expenses.filter(
      (item) => item.inPlaceValue || item.stabilizedValue
    );
  }
  return body;
};
function findValueFromGivenTableForPArticularKey(table, key) {
  const result = table.find((item) => item.key && item.key === key);
  return result ? result.value : false;
}

// when key is not fixed , so we are passing keys array contains possible values of key
function findValueFromSourcesForParticularKey(table, keys) {
  const result = table.find((item) => item.key && keys.includes(item.key));
  return result ? result.value : false;
}

/**
 * Validates the consistency of the requested loan amount across different parts of the data.
 * @param {object} data - The data object containing financingRequest, dealMetrics, and sourcesAndUses properties.
 * @throws {Error} Throws an error if the requested loan amount values are inconsistent.
 */
export const validateLoanAmount = (data) => {
  const requestLoanAmountInFinancingRequest =
      data.financingRequest && data.financingRequest.length
          ? findValueFromGivenTableForPArticularKey(data.financingRequest, 'Requested Loan Amount')
          : null;
  const requestLoanAmountInDealMetrics =
      data.dealMetrics && data.dealMetrics.length
          ? findValueFromGivenTableForPArticularKey(data.dealMetrics, 'Requested Loan Amount')
          : null;
  const requestLoanAmountInSources =
      data.sourcesAndUses &&
      Object.keys(data.sourcesAndUses).length &&
      data.sourcesAndUses.sources &&
      data.sourcesAndUses.sources.length
          ? findValueFromSourcesForParticularKey(data.sourcesAndUses.sources, [
            'Senior Loan',
            'Loan Amount',
            'Requested Loan Amount',
          ])
          : null;

  if (
      // Check if requested loan amount in Financing Request and Deal Metrics do not match
      (requestLoanAmountInFinancingRequest &&
          requestLoanAmountInDealMetrics &&
          requestLoanAmountInFinancingRequest !== requestLoanAmountInDealMetrics) ||
      // Check if requested loan amount in Financing Request and Sources do not match
      (requestLoanAmountInFinancingRequest &&
          requestLoanAmountInSources &&
          requestLoanAmountInFinancingRequest !== requestLoanAmountInSources) ||
      // Check if requested loan amount in Deal Metrics and Sources do not match
      (requestLoanAmountInDealMetrics &&
          requestLoanAmountInSources &&
          requestLoanAmountInDealMetrics !== requestLoanAmountInSources)
  ) {
    // If any of the above conditions are true, throw an error with details
    //getting the sectionNames to show dynamically in the error
    const sectionNames = [
      requestLoanAmountInFinancingRequest ? `Financing Request` : null,
      requestLoanAmountInDealMetrics ? `Deal Metrics` : null,
      requestLoanAmountInSources ? `Sources` : null,
    ].filter(Boolean);
    throw new ApiError(
        httpStatus.BAD_REQUEST,
        `Mismatched Requested Loan Amount values found in ${sectionNames.join(' and ')}.`
    );
  }
};

/**
 * Add an index to each entry in the customBlocks array and organize them based on their sectionName.
 * checks for index, if sectionName not available in the indexMap then it starts from 0 , else increase index by 1
 * @param {Array} customBlocks - An array of objects representing dynamic fields.
 * @returns {Array} - An array of objects with added index.
 */
export const addIndexForCustomBlocks = (customBlocks) => {
  const indexMap = {};
  const customBlocksWithIndex = [];

  customBlocks.forEach((block) => {
    const { sectionName } = block;
    // here checks for index, if sectionName not available in the indexMap then it starts from 0 , else increase index by 1.
    if (!indexMap[sectionName]) {
      indexMap[sectionName] = 0;
    }
    customBlocksWithIndex.push({ ...block, index: indexMap[sectionName] });
    indexMap[sectionName] += 1;
  });
  return customBlocksWithIndex;
};

/**
 * Function: getTextFromTemplate
 * Description: This function takes in an object containing various parameters and generates an email text based on a provided email template.
 *
 * Parameters:
 *   - lenderName: The name of the lender. If not provided, it defaults to 'Lender'.
 *   - executiveSummary: The executive summary of the deal.
 *   - documents: An array of documents related to the deal.
 *   - dealSummaryLink: A link to the deal summary page.
 *   - passLink: A link to pass page of the deal.
 *   - advisorName: The name of the advisor.
 *   - emailTemplate: The email template that includes placeholders for various parameters.
 *
 * Return:
 *   - The generated email text with placeholders replaced by actual parameter values.
 */
export const getTextFromTemplate = ({
  lenderName,
  executiveSummary,
  documents,
  dealSummaryLink,
  passLink,
  advisorName,
  emailTemplate,
  followUpContent,
}) => {
  return _.template(emailTemplate)({
    lenderName: lenderName || 'Lender',
    executiveSummary,
    documents,
    dealSummaryLink,
    passLink,
    advisorName,
    followUpContent,
  });
};
/**
 * Manage the timeline of stages based on changes in stages.
 * @param {string} oldStage - The previous stage .
 * @param {string} updatedStage - The updated stage.
 * @param {Array} timelineArray - The timeline of stage changes.
 * @param {Map} stageToStageNumberMapping - A mapping of stages to their corresponding numbers.
 * @returns {Array} - The modified timeline after processing the stage changes.
 */
export const manageTimeLine = (oldStage, updatedStage, timelineArray, stageToStageNumberMapping) => {
  const stageNumberToStageMapping = new Map();
  stageToStageNumberMapping.forEach((value, key) => {
    stageNumberToStageMapping.set(value, key);
  });
  const getStageFromStageNumber = (stageNumber) => stageNumberToStageMapping.get(stageNumber);
  const getStageNumberFromStage = (stage) => stageToStageNumberMapping.get(stage);
  if (getStageNumberFromStage(oldStage) > getStageNumberFromStage(updatedStage)) {
    // Iterate through the stages between old and updated stages in reverse.
    for (let i = getStageNumberFromStage(oldStage) - 1; i >= getStageNumberFromStage(updatedStage); i -= 1) {
      if (getStageFromStageNumber(i)) {
        // Add the stage to the timeline with the current date.
        timelineArray.push({ stage: getStageFromStageNumber(i), updateAt: new Date() });
      }
    }
  } else if (getStageNumberFromStage(oldStage) < getStageNumberFromStage(updatedStage)) {
    for (let index = timelineArray.length - 1; index >= 0; index -= 1) {
      const changeLog = timelineArray[index];
      if (getStageNumberFromStage(changeLog.stage) < getStageNumberFromStage(updatedStage)) {
        timelineArray.splice(index, 1);
      }
    }
    return timelineArray;
  }
  return timelineArray;
};

/**
 * Manage the timeline of lender placement stages based on changes in stages.
 * @param {string} oldStage - The previous stage of lender placement.
 * @param {string} updatedStage - The updated stage of lender placement.
 * @param {Array} timeline - The timeline of stage changes.
 * @returns {Array} - The modified timeline after processing the stage changes.
 */
export const manageLenderPlacementStageTimeline = (oldStage, updatedStage, timeline) => {
  const updatedTimeline = manageTimeLine(oldStage, updatedStage, timeline, lenderPlacementStageToStageNumberMapping);
  return updatedTimeline;
};

/**
 * Manage the timeline of deal stages based on changes in stages.
 * @param {string} oldStage - The previous stage of deal.
 * @param {string} updatedStage - The updated stage of deal.
 * @param {Array} timeline - The timeline of stage changes.
 * @returns {Array} - The modified timeline after processing the stage changes.
 */
export const manageDealStageTimeline = (oldStage, updatedStage, timeline) => {
  const updatedTimeline = manageTimeLine(oldStage, updatedStage, timeline, dealStageToStageNumberMapping);
  return updatedTimeline;
};

// check & throw error if term is not added
export const checkTermAdded = (lenderPlacement) => {
  if (_.isEmpty(lenderPlacement.terms)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Can not add term-sheet without adding terms');
  }
};

/**
 * this will return the full name of the state
 * @param stateAbbreviation
 * @return {string|null}
 */
export const getStateFullName = (stateAbbreviation) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const state in EnumStatesOfDeal) {
    if (EnumStatesOfDeal[state] === stateAbbreviation) {
      // We were getting the state value in the email in UPPERCASE, so making it Startcase
      return _.startCase(_.lowerCase(state));
    }
  }
  // If no match is found, return an appropriate null.
  return null;
};

/**
 * this will return the subject for email
 * @param deal
 * @return {`${string}-$${number}m Financing Request`}
 */
export const getEmailSubjectForDeal = (dealSummary) => {
  // As per new requirement now subject of mails should be heading of deal summary i.e., heading of presentation tab
  // The field of heading are not required so have to add condition for which field is there in heading should be present in subject
  // Also have to separate the field by -
  const { dealName, cityState, dealInfo } = dealSummary.heading;

  const dealNamePart = dealName ? `${dealName} - ` : '';
  const cityStatePart = cityState ? `${cityState} - ` : '';
  const dealInfoPart = dealInfo ? `${dealInfo} - ` : '';

  // The purpose of this .replace(/- $/, '') is to search for any trailing hyphen and space at the end of the generated string and remove it.
  return `${dealNamePart}${cityStatePart}${dealInfoPart}`.replace(/- $/, '');
};

function addCommaSeparators(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Modify and format data values (add symbols like $ and % based on value type, and also round the values).
 * @param {Object} data - The data object to be modified.
 * @param {number} decimalPoint - The number of decimal places to round to.
 * @param {string} keyToCheckType - The key used to check the type of value.
 * @param {string} keyToAssign - The key used to assign value.
 * @returns {Object} - The modified data object.
 */
export function changeData(data, decimalPoint, keyToCheckType, keyToAssign) {
  if (typeof data[keyToAssign] === 'number') {
    if (data[keyToAssign]) {
      // eslint-disable-next-line no-param-reassign
      data[keyToAssign] = (data[keyToAssign] * 1).toFixed(decimalPoint);
    }
  }
  if (data[keyToCheckType] && data[keyToCheckType] === EnumOfTypeOfValue.CURRENCY) {
    if (typeof data[keyToAssign] === 'string' && data[keyToAssign].includes(',')) {
      // eslint-disable-next-line no-param-reassign
      data[keyToAssign] = data[keyToAssign].replace(/,/g, '');
    }
    // if data is in string and data not include $ than we have to convert it in num and fixed decimal point
    // todo: fix below condition in more efficient way in future
    if (typeof data[keyToAssign] === 'string' && !/[,()]/.test(data[keyToAssign])) {
      // eslint-disable-next-line no-param-reassign
      if (data[keyToAssign].includes('$')) {
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = data[keyToAssign].split('$').pop();
      }
      // eslint-disable-next-line no-param-reassign
      data[keyToAssign] = (data[keyToAssign] * 1).toFixed(decimalPoint);
    }
    // Check if the value of data[keyToAssign] is not a string
    // OR
    // Check if the value of data[keyToAssign] is a string, but it does not contain a '$' character
    // AND
    // Check if the value of data[keyToAssign] is not one of the following: '(', ',', '('
    if (
      typeof data[keyToAssign] !== 'string' ||
      (typeof data[keyToAssign] === 'string' && !data[keyToAssign].includes('$') && !/[%,$()]/.test(data[keyToAssign]))
    ) {
      // eslint-disable-next-line no-param-reassign,operator-assignment
      data[keyToAssign] = data[keyToAssign] * 1;
      if (typeof data[keyToAssign] === 'number' && data[keyToAssign] < 0) {
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = `$(${Math.abs(data[keyToAssign])})`;
      } else {
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = `$${data[keyToAssign]}`;
      }
    }
  }
  if (data[keyToCheckType] && data[keyToCheckType] === EnumOfTypeOfValue.PERCENTAGE) {
    if (typeof data[keyToAssign] === 'string' && data[keyToAssign].includes(',')) {
      // eslint-disable-next-line no-param-reassign
      data[keyToAssign] = data[keyToAssign].replace(/,/g, '');
    }
    if (typeof data[keyToAssign] === 'string' && !/[,()]/.test(data[keyToAssign])) {
      if (data[keyToAssign].includes('%')) {
        // eslint-disable-next-line no-param-reassign,prefer-destructuring
        data[keyToAssign] = data[keyToAssign].split('%')[0];
      }
      // eslint-disable-next-line no-param-reassign
      data[keyToAssign] = `${(data[keyToAssign] * 1).toFixed(decimalPoint)}%`;
    }
    if (data[keyToAssign] && typeof data[keyToAssign] !== 'string') {
      // eslint-disable-next-line no-param-reassign
      data[keyToAssign] = `${data[keyToAssign].toFixed(decimalPoint)}%`;
    }
  }

  // Adding a comma separator at the end to format the numeric values in all sections that are neither of type string nor represent a year.
  if (![EnumOfTypeOfValue.STRING, EnumOfTypeOfValue.YEAR].includes(data[keyToCheckType])) {
    if (typeof data[keyToAssign] === 'string') {
      if (data[keyToAssign].includes('$') && !/[,()%]/.test(data[keyToAssign])) {
        // Removing the dollar sign, if present
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = data[keyToAssign].replace('$', '');
        // Parsing the value as a number
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = parseFloat(data[keyToAssign]).toFixed(decimalPoint);
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = addCommaSeparators(data[keyToAssign]);

        // Adding the dollar sign back
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = `$${data[keyToAssign]}`;
      } else if (data[keyToAssign].includes('%') && !/[,()%]/.test(data[keyToAssign])) {
        // Removing the dollar sign, if present
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = data[keyToAssign].replace('%', '');
        // Parsing the value as a number
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = parseFloat(data[keyToAssign]).toFixed(decimalPoint);
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = addCommaSeparators(data[keyToAssign]);

        // Adding the dollar sign back
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = `${data[keyToAssign]}%`;
      } else {
        // eslint-disable-next-line no-param-reassign
        data[keyToAssign] = addCommaSeparators(data[keyToAssign]);
      }
    }
  }

  return data;
}

/**
 * This function adds symbols, such as '$' and '%', to specific numeric values within the data.
 * @param {Array} data - The input data to be modified.
 * @returns {Array} - The modified data with symbols added to numeric values.
 */
export const addSymbolInData = (data) => {
  if (!_.isEmpty(data)) {
    const modifiedData = data.map((item) => item.map((field) => changeData(field, 0, 'type', 'value')));
    return modifiedData;
  }
  return data;
};

export const getKeyFromUrl = (url) => {
  const pattern = /(\/users\/.*)/;
  const match = url.match(pattern);
  if (match && match[1]) {
    return match[1].substring(1);
  }
  return url;
};

/**
 * Common function for the template of send deal test mail and send mail
 */
export const sendDealTemplate = ({ emailContent, dealDetail, firstName, advisorName, passLink, dealSummaryLink }) => {
  //function for format currency (round of the value and to show in the form of 'k' if the value is less than 1 million)
  const formatCurrency = (amount) => {
    if (typeof amount === 'string') {
      const floatValue = getAmountInFloat(amount);
      if (isNaN(floatValue)) {

        return 0;
      }
      amount = floatValue;

    } else if (isUndefined(amount)) {
      return 0;
    }
    if (amount >= 1000000) {
      const lastDigit = round(amount / 1000000, 2)
        .toString()
        .slice(-1);
      if (lastDigit === '5') {
        return `$${round(amount / 1000000, 2)}m`;
      } else {
        return `$${round(amount / 1000000, 1)}m`;
      }
    } else {
      return `$${round(amount / 1000, 0)}k`;
    }
  };

// To convert the value into string
  const getAmountFromString = (value) => {
    if (value) {
      return value.toString()?.replace(/[$,]/g, '');
    }
    return value;
  };

// To convert the value into float
  const getAmountInFloat = (value, removeDollarAndCommas = true) => {
    if (value) {
      if (removeDollarAndCommas) {
        return parseFloat(getAmountFromString(value));
      }
      return parseFloat(value?.toString());
    }
    return value;
  };

// To remove the sentence for unitCount, Occupancy and SF when we don't have its value
  const removeStringFromTemplate = (sentence = '', loanType = '') => {
    const updatedSentence = sentence
        ?.replace(/\[unitCount\]-unit,/, '')
        ?.replace(/\[Occupancy\] occupied/, '')
        ?.replace(/\[Square Footage\] SF,/, '');

    return includes(EnumLoanTypeOfDeal.CONSTRUCTION, loanType) ? updatedSentence : updatedSentence?.replace(/\[\[toBeBuilt\]\],/g, '');
  };

  const dealSummaryUsesData = dealDetail.dealSummary?.sourcesAndUses?.uses || [];
  const totalUses = sum(dealSummaryUsesData?.map((use) => getAmountInFloat(use?.value)));
  const removeTotalUses = dealSummaryUsesData?.filter((item) => item?.key !== 'Total Uses');
  const usesKeyValue = removeTotalUses
    ?.map((value) => {
      return `${formatCurrency(value.value)} of ${value.key}`;
    })
    .join(', ');
  const firstUsesValue = formatCurrency(dealSummaryUsesData ? _.get(dealSummaryUsesData[0], 'value', '') : '');
  const ltcValue = getAmountInFloat(dealDetail?.loanAmount) / totalUses || 0;
  const inPlaceDYVal = find(dealDetail?.dealSummary?.dealMetrics, (data) => data.key === 'In-Place DY')?.value;
  const inStabilizedDYVal = find(dealDetail?.dealSummary?.dealMetrics, (data) => data.key === 'Stabilized DY')?.value;
  const existingLoanBalance = find(dealSummaryUsesData, (data) =>
    includes(
      [
        'Loan Balance',
        'Current Loan Balance',
        'Existing Loan Balance',
        'Current Debt',
        'Current Debt Balance',
        'Debt Balance',
        'Payoff Loan Balance',
        'Payoff Current Loan Balance',
        'Payoff Existing Loan Balance',
        'Payoff Current Debt Balance',
        'Payoff Debt Balance',
      ],
      data?.key
    )
  )?.value;

  const getText = _.template(emailContent)({
    lenderFirstName: _.startCase(firstName),
    advisorName:_.startCase(advisorName),
    sponsorName: dealDetail.sponsor?.name || '[[Sponsor Name]]',
    amount: formatCurrency(dealDetail.loanAmount) || 'NA',
    loanPurpose: dealDetail.loanPurpose || 'NA',
    dealName: dealDetail.dealName || 'NA',
    unitCount: dealDetail.unitCount || '[unitCount]',
    propertyType: dealDetail.assetType || 'NA',
    toBeBuilt: '[[toBeBuilt]]',
    address: dealDetail.address || 'NA',
    city: dealDetail.city || 'NA',
    state: getStateFullName(dealDetail.state) || 'NA',
    purchasePrice: formatCurrency(find(dealSummaryUsesData, (data) => data.key === 'Purchase Price')?.value) || 'NA',
    inPlaceNOI: formatCurrency(find(dealDetail.dealSummary?.dealMetrics, (data) => data.key === 'In-Place NOI')?.value) || 'NA',
    stabilizedNOI: formatCurrency(find(dealDetail.dealSummary?.dealMetrics, (data) => data.key === 'Stabilized NOI')?.value) || 'NA',
    squareFootage: dealDetail.squareFootage || '[Square Footage]',
    occupancy: dealDetail.occupancy || '[Occupancy]',
    totalUsesValue: !isEmpty(dealSummaryUsesData) ? formatCurrency(totalUses) : 'NA',
    usesKeyValue: usesKeyValue || 'NA',
    LTC: round(ltcValue / 100, 1) || 'NA',
    firstUsesValue: firstUsesValue || 'NA',
    existingLoanBalance: existingLoanBalance || 'NA',
    inPlaceDY: inPlaceDYVal ? `${getAmountInFloat(inPlaceDYVal)}%` : 'NA',
    stabilizedDY: inStabilizedDYVal ? `${getAmountInFloat(inStabilizedDYVal)}%` : 'NA',
    // we only need first line of sponsor bio so splitting it with (.).
    sponsorBioName: dealDetail.sponsor?.description?.split('.')[0] || '[[Sponsor bio from Sponsor bio page]]',
    loanTypeValue: dealDetail.loanType || 'NA',
    dealSummaryLink: dealSummaryLink,
    passLink: passLink,
  });

  return removeStringFromTemplate(getText,dealDetail.loanType)
};

/**
 * Common function for unsetting the field whose value is null in the body
 */
export const removeNullFields = (obj) => {
  Object.entries(obj).forEach(([key, value]) => {
    if (!value) {
      // eslint-disable-next-line no-param-reassign
      obj.$unset = { ...obj.$unset, [key]: '' };
      // eslint-disable-next-line no-param-reassign
      delete obj[key];
    } else if (typeof value === 'object') {
      removeNullFields(value);
    }
  });
  return obj;
};

/**
 * Common function for inviting borrowers and default advisors to the deal
 */

export const invitationToDeal = async ({existingUsers, fromEmail, pass, userName, dealName, deal, body, isDefaultAdvisor, isDealCreated }) => {
  // Here,we will get the emails that are not in our system, as we can't add them we are throwing error for it.
  const userEmailNotExists = _.differenceBy(
      isDealCreated ? body.dealMembers : body.email,
      existingUsers.map((item) => item.email)
  );
  if (userEmailNotExists && userEmailNotExists.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, `The borrowers : ${userEmailNotExists.join(', ')} doesn't exists`);
  }
  // If default advisors are not getting added then we are checking whether the role is user or not
  if (!isDefaultAdvisor && existingUsers.some((user) => user.role !== enumModel.EnumRoleOfUser.USER)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You can only add borrowers to the deal");
  }
  // If default advisors are added then we are adding it in "involvedUsers advisors" of the deal
  if(isDefaultAdvisor){
      await Deal.findByIdAndUpdate(deal, {
      $addToSet: { 'involvedUsers.advisors' : existingUsers.map((item) => item._id) },
    });
  }
  else{
      const filter = {
        _id: deal,
        'involvedUsers.borrowers': { $in: existingUsers.map((item) => item._id) },
      };
      // here we are checking whether the user is already in the deal
      const userAlreadyIncluded = await dealService.getOne(filter);
      if(userAlreadyIncluded){
        throw new ApiError(httpStatus.BAD_REQUEST, "The borrower is already part of the deal");
      }
      // if not already in the deal but is an existing user then adding it to the "involvedUsers borrowers" of the deal
      else{
        const update = {
          $addToSet: { 'involvedUsers.borrowers': existingUsers.map((item) => item._id) },
        }
        await Deal.findByIdAndUpdate( deal, update );
      }
  }
    if (existingUsers.length) {
      // here we are sending invitation email to user and default advisors
      existingUsers.map(async (item) => {
        const {firstName, email: user} = item;
        await emailService.sendInvitationEmail({
          fromEmail,
          pass,
          user,
          userName,
          dealName: dealName,
          isDealCreated: false,
          link: 'login',
          firstName,
        });
      });
      // here we are creating the notification after we send the invitation email to the users
      existingUsers.map(async (user) => {
        const notification = {
          createdBy: body.createdBy,
          updatedBy: body.createdBy,
          message: `${user.email} Requested to be added to ${dealName}`,
          deal,
        };
        await notificationService.createNotification(notification);
      });

      // as our existingUsers is array we are using map on it. below line will help us to insert many document in our db at once, and we have passed the object in the map we have to enter in our db,
      // so we will get deal id, the user from which we log in or who is creating deal their id will go in invitedBy and in emailExists we get the whole document, and we just want id of the person which we are inviting the deal, so we did emailExists._id
      // here we are adding invitations to the invitation model, if the default advisors are also getting added then we are setting role to "advisor" else "user"
      await Invitation.insertMany(
          existingUsers.map((emailExists) => ({
            deal: deal,
            status: 'accepted',
            invitedBy: body.user,
            invitee: emailExists._id,
            role: isDefaultAdvisor? enumModel.EnumRoleOfUser.ADVISOR : enumModel.EnumRoleOfUser.USER,
          }))
      );
    }
}
