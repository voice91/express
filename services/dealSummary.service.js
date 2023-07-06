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
  const dealSummary = await DealSummary.findOneAndUpdate(filter, body, options);
  return dealSummary;
}
