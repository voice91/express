import httpStatus from 'http-status';
import { Deal, DealSummary } from '../models';
import { importExcelFile } from '../utils/importExcel';
import ApiError from '../utils/ApiError';
import { updateExcelFromDealSummeryServices } from '../utils/updateExcelFromDealSummeryServices';
import { EnumOfTypeOfValue } from '../models/enum.model';

function changeData(data, decimalPoint, keyToCheckType, keyToAssign) {
  if (decimalPoint && typeof data.value === 'number') {
    // eslint-disable-next-line no-param-reassign
    data.value = data.value.toFixed(decimalPoint);
  }
  if (data[keyToCheckType] && data[keyToCheckType] === EnumOfTypeOfValue.CURRENCY) {
    if (typeof data[keyToAssign] === 'string' && !data[keyToAssign].includes('$')) {
      // eslint-disable-next-line no-param-reassign
      data[keyToAssign] = (data[keyToAssign] * 1).toFixed(decimalPoint);
    }
    if (!data[keyToAssign].includes('$')) {
      // eslint-disable-next-line no-param-reassign
      data[keyToAssign] = `$${data[keyToAssign]}`;
    }
  }
  if (data[keyToCheckType] && data[keyToCheckType] === EnumOfTypeOfValue.PERCENTAGE) {
    // eslint-disable-next-line no-param-reassign
    data[keyToAssign] = `${data[keyToAssign]}%`;
  }
  return data;
}

export function dealSummeryDto(dealSummary) {
  if (dealSummary.dealMetrics) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.dealMetrics = dealSummary.dealMetrics.map((item) => changeData(item, 2, 'type', 'value'));
  }
  if (dealSummary.financingRequest) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.financingRequest = dealSummary.financingRequest.map((item) => changeData(item, 2, 'type', 'value'));
  }
  if (dealSummary.propertySummary) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.propertySummary = dealSummary.propertySummary.map((item) => changeData(item, 2, 'type', 'value'));
  }
  if (dealSummary.sourcesAndUses && dealSummary.sourcesAndUses.sources) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.sourcesAndUses.sources = dealSummary.sourcesAndUses.sources.map((item) =>
      changeData(item, 2, 'type', 'value')
    );
  }
  if (dealSummary.sourcesAndUses && dealSummary.sourcesAndUses.uses) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.sourcesAndUses.uses = dealSummary.sourcesAndUses.uses.map((item) => changeData(item, 2, 'type', 'value'));
  }
  if (dealSummary.rentRollSummary) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.rentRollSummary = dealSummary.rentRollSummary.map((item) =>
      item.map((data) => changeData(data, 2, 'type', 'value'))
    );
  }
  if (dealSummary.financialSummary && dealSummary.financialSummary.revenue) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.financialSummary.revenue = dealSummary.financialSummary.revenue.map((item) =>
      changeData(item, 2, 'inPlaceType', 'inPlaceValue')
    );
    // eslint-disable-next-line no-param-reassign
    dealSummary.financialSummary.revenue = dealSummary.financialSummary.revenue.map((item) =>
      changeData(item, 2, 'stabilizedType', 'stabilizedValue')
    );
  }
  if (dealSummary.financialSummary && dealSummary.financialSummary.revenue) {
    // eslint-disable-next-line no-param-reassign
    dealSummary.financialSummary.expenses = dealSummary.financialSummary.expenses.map((item) =>
      changeData(item, 2, 'inPlaceType', 'inPlaceValue')
    );
    // eslint-disable-next-line no-param-reassign
    dealSummary.financialSummary.expenses = dealSummary.financialSummary.expenses.map((item) =>
      changeData(item, 2, 'stabilizedType', 'stabilizedValue')
    );
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

  const dealSummary = await DealSummary.findOneAndUpdate(filter, body, options);
  return dealSummary;
}
