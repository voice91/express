import httpStatus from 'http-status';
import _ from 'lodash';
import { Deal, DealSummary } from '../models';
import { importExcelFile } from '../utils/importExcel';
import ApiError from '../utils/ApiError';
import { updateExcelFromDealSummeryServices } from '../utils/updateExcelFromDealSummeryServices';
import { EnumOfTypeOfValue } from '../models/enum.model';

function addCommaSeparators(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function changeData(data, decimalPoint, keyToCheckType, keyToAssign) {
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

export function dealSummeryDto(dealSummary) {
  if (dealSummary.dealMetrics) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.dealMetrics = dealSummary.dealMetrics.map((item) => {
      if (['Stabilized DY', 'Estimated LTV', 'In-Place DY'].includes(item.key)) {
        return changeData(item, 1, 'type', 'value');
      }
      // In-Place DSCR also need to send in the 2 decimal with x
      if (['Stabilized DSCR', 'In-Place DSCR'].includes(item.key)) {
        if (typeof item.value === 'string' && item.value.includes('x')) {
          return item;
        }
        const convertedData = changeData(item, 2, 'type', 'value');
        convertedData.value = `${convertedData.value}x`;
        return convertedData;
      }
      return changeData(item, 0, 'type', 'value');
    });
  }
  if (!_.isEmpty(dealSummary.financingRequest)) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.financingRequest = dealSummary.financingRequest.map((item) => changeData(item, 0, 'type', 'value'));
  }
  if (!_.isEmpty(dealSummary.propertySummary)) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.propertySummary = dealSummary.propertySummary.map((item) => changeData(item, 0, 'type', 'value'));
  }
  if (dealSummary.sourcesAndUses && !_.isEmpty(dealSummary.sourcesAndUses.sources)) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.sourcesAndUses.sources = dealSummary.sourcesAndUses.sources
      .map((item) => changeData(item, 0, 'type', 'value'))
      .filter((item) => item.key !== 'Total Sources');
  }
  if (dealSummary.sourcesAndUses && !_.isEmpty(dealSummary.sourcesAndUses.uses)) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.sourcesAndUses.uses = dealSummary.sourcesAndUses.uses
      .map((item) => changeData(item, 0, 'type', 'value'))
      .filter((item) => item.key !== 'Total Uses');
  }
  if (!_.isEmpty(dealSummary.rentRollSummary)) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.rentRollSummary = dealSummary.rentRollSummary.map((item) =>
      item.map((data) => changeData(data, 0, 'type', 'value'))
    );
  }
  if (dealSummary.financialSummary && !_.isEmpty(dealSummary.financialSummary.revenue)) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.financialSummary.revenue = dealSummary.financialSummary.revenue
      .map((item) => changeData(item, 0, 'inPlaceType', 'inPlaceValue'))
      .filter((data) => data.key !== 'Effective Gross Income');
    // eslint-disable-next-line no-param-reassign
    dealSummary.financialSummary.revenue = dealSummary.financialSummary.revenue
      .map((item) => changeData(item, 0, 'stabilizedType', 'stabilizedValue'))
      .filter((data) => data.key !== 'Effective Gross Income');
  }
  if (dealSummary.financialSummary && !_.isEmpty(dealSummary.financialSummary.expenses)) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.financialSummary.expenses = dealSummary.financialSummary.expenses
      .map((item) => changeData(item, 0, 'inPlaceType', 'inPlaceValue'))
      .filter((data) => data.key !== 'Total Operating Expneses');
    // eslint-disable-next-line no-param-reassign
    dealSummary.financialSummary.expenses = dealSummary.financialSummary.expenses
      .map((item) => changeData(item, 0, 'stabilizedType', 'stabilizedValue'))
      .filter((data) => data.key !== 'Total Operating Expneses');
  }

  return dealSummary;
}

// eslint-disable-next-line import/prefer-default-export
export async function importFileForDealSummary(options) {
  const record = await importExcelFile(options.url);

  record.url = options.url;
  record.deal = options.deal;
  return dealSummeryDto(record);
}

export async function updateExcelFromDealSummery(body, dealSummaryId) {
  return updateExcelFromDealSummeryServices(body.url, dealSummaryId);
}

export async function createDealSummary(body) {
  const deal = await Deal.findOne({ _id: body.deal });
  if (!deal) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Deal does not Exist..');
  }
  // todo: below code commented as per FE requirements as of now, because already passing url and fileName in documents Array
  // if (body.url) {
  //   body.documents.push({
  //     url: body.url,
  //     fileName: decodeURIComponent(body.url.split('/').pop()),
  //   });
  // }

  if (body.documents && body.documents.length) {
    // eslint-disable-next-line no-param-reassign
    body.documents = body.documents.map((item) => {
      if (item.url && !item.fileName) {
        // eslint-disable-next-line no-param-reassign
        item.fileName = decodeURIComponent(body.url.split('/').pop());
        return item;
      }
      return item;
    });
  }

  const dealSummary = await DealSummary.create(body);
  await Deal.findOneAndUpdate({ _id: body.deal }, { dealSummary: dealSummary._id }, { new: true });

  return dealSummeryDto(dealSummary);
}

export async function getDealSummaryById(query, options = {}) {
  const dealSummary = await DealSummary.findOne(query, options.projection, options);
  if (!dealSummary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No such Deal Summary');
  }
  return dealSummeryDto(dealSummary);
}

export async function updateDealSummary(filter, body, options = {}) {
  // Loop through each key in the body
  // eslint-disable-next-line no-restricted-syntax
  for (const key in body) {
    // Check if the key exists in the body and its value is an empty string
    // eslint-disable-next-line no-prototype-builtins
    if (body.hasOwnProperty(key) && body[key] === '') {
      // If the $unset operator object doesn't exist, initialize it
      if (!body.$unset) {
        // eslint-disable-next-line no-param-reassign
        body.$unset = {};
      }
      // Add the key to the $unset operator object with a value of 1
      // eslint-disable-next-line no-param-reassign
      body.$unset[key] = 1;
      // Remove the key from the body object
      // eslint-disable-next-line no-param-reassign
      delete body[key];
    }
  }

  if (body.documents && body.documents.length) {
    // eslint-disable-next-line no-param-reassign
    body.documents = body.documents.map((item) => {
      if (item.url && !item.fileName) {
        // eslint-disable-next-line no-param-reassign
        item.fileName = decodeURIComponent(body.url.split('/').pop());
        return item;
      }
      return item;
    });
  }
  const dealSummary = await DealSummary.findOneAndUpdate(filter, body, options);
  return dealSummary;
}

// added this remove deal summary function
export async function removeDealSummary(filter) {
  const dealSummary = await DealSummary.findOneAndRemove(filter);
  return dealSummary;
}
