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
    if (typeof data[keyToAssign] === 'string') {
      // eslint-disable-next-line no-param-reassign
      data[keyToAssign] = (data[keyToAssign] * 1).toFixed(decimalPoint);
    }
    // eslint-disable-next-line no-param-reassign
    data[keyToAssign] = `$${data[keyToAssign]}`;
  }
  if (data[keyToCheckType] && data[keyToCheckType] === EnumOfTypeOfValue.PERCENTAGE) {
    // eslint-disable-next-line no-param-reassign
    data[keyToAssign] = `${data[keyToAssign]}%`;
  }
  return data;
}

// eslint-disable-next-line import/prefer-default-export
export async function importFileForDealSummary(body) {
  const record = await importExcelFile(body.url);

  record.deal = body.deal;
  record.url = body.url;
  record.createdBy = body.createdBy;
  record.updatedBy = body.updatedBy;

  const dealSummary = await DealSummary.create(record);
  await Deal.findOneAndUpdate({ _id: dealSummary.deal }, { dealSummary: dealSummary._id }, { new: true });
  return dealSummary;
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
  return dealSummary;
}

export async function getDealSummaryById(query, options = {}) {
  const dealSummary = await DealSummary.findOne(query, options.projection, options);
  // here we create dto. we have to move this dto to function, so we can use that at multiple places.
  dealSummary.dealMetrics = dealSummary.dealMetrics.map((item) => changeData(item, 2, 'type', 'value'));
  dealSummary.financingRequest = dealSummary.financingRequest.map((item) => changeData(item, 2, 'type', 'value'));
  dealSummary.propertySummary = dealSummary.propertySummary.map((item) => changeData(item, 2, 'type', 'value'));

  dealSummary.sourcesAndUses.sources = dealSummary.sourcesAndUses.sources.map((item) =>
    changeData(item, 2, 'type', 'value')
  );
  const updatedSources = dealSummary.sourcesAndUses.sources.map((item) => {
    const updateData = { sources: item.key, _id: item._id, value: item.value, type: item.type };
    return updateData;
  });
  Object.assign(dealSummary.sourcesAndUses.sources, updatedSources);

  dealSummary.sourcesAndUses.uses = dealSummary.sourcesAndUses.uses.map((item) => changeData(item, 2, 'type', 'value'));
  const updatedUses = dealSummary.sourcesAndUses.uses.map((item) => {
    return { uses: item.key, _id: item._id, value: item.value, type: item.type };
  });
  Object.assign(dealSummary.sourcesAndUses.uses, updatedUses);

  dealSummary.rentRollSummary = dealSummary.rentRollSummary.map((item) =>
    item.map((data) => changeData(data, 2, 'type', 'value'))
  );
  dealSummary.financialSummary.revenue = dealSummary.financialSummary.revenue.map((item) =>
    changeData(item, 2, 'inPlaceType', 'inPlaceValue')
  );
  dealSummary.financialSummary.revenue = dealSummary.financialSummary.revenue.map((item) =>
    changeData(item, 2, 'stabilizedType', 'stabilizedValue')
  );
  dealSummary.financialSummary.expenses = dealSummary.financialSummary.expenses.map((item) =>
    changeData(item, 2, 'inPlaceType', 'inPlaceValue')
  );
  dealSummary.financialSummary.expenses = dealSummary.financialSummary.expenses.map((item) =>
    changeData(item, 2, 'stabilizedType', 'stabilizedValue')
  );

  return dealSummary;
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
