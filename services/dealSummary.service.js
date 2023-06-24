import { DealSummary } from '../models';
import { importExcelFile } from '../utils/importExcel';

// eslint-disable-next-line import/prefer-default-export
export async function createDealSummary(body) {
  const record = await importExcelFile(body.url);

  record.deal = body.deal;
  record.createdBy = body.createdBy;
  record.updatedBy = body.updatedBy;

  const dealSummary = await DealSummary.create(record);
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
