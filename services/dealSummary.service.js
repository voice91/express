import httpStatus from 'http-status';
import { Deal, DealSummary } from '../models';
import { importExcelFile } from '../utils/importExcel';
import ApiError from '../utils/ApiError';

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
