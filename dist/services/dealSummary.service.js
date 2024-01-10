import httpStatus from 'http-status';
import _ from 'lodash';
import { Deal, DealSummary } from "../models";
import { importExcelFile } from "../utils/importExcel";
import ApiError from "../utils/ApiError";
import { updateExcelFromDealSummeryServices } from "../utils/updateExcelFromDealSummeryServices";
import { changeData } from "../utils/common";
import { EnumColumnNameOfFinancialSummary, EnumKeyNameInDealSummary } from "../models/enum.model";
export function dealSummeryDto(dealSummary) {
  if (dealSummary.dealMetrics) {
    Object.assign(dealSummary, {
      dealMetrics: dealSummary.dealMetrics.map(item => {
        if ([EnumKeyNameInDealSummary.STABILIZED_DY, EnumKeyNameInDealSummary.ESTIMATED_LTV, EnumKeyNameInDealSummary.IN_PLACE_DY].includes(item.key)) {
          return changeData(item, 1, EnumKeyNameInDealSummary.TYPE, EnumKeyNameInDealSummary.VALUE);
        }
        // In-Place DSCR also need to send in the 2 decimal with x
        if ([EnumKeyNameInDealSummary.STABILIZED_DSCR, EnumKeyNameInDealSummary.IN_PLACE_DSCR].includes(item.key)) {
          if (typeof item.value === 'string' && item.value.includes('x')) {
            return item;
          }
          const convertedData = changeData(item, 2, EnumKeyNameInDealSummary.TYPE, EnumKeyNameInDealSummary.VALUE);
          convertedData.value = `${convertedData.value}x`;
          return convertedData;
        }
        return changeData(item, 0, EnumKeyNameInDealSummary.TYPE, EnumKeyNameInDealSummary.VALUE);
      })
    });
  }
  if (!_.isEmpty(dealSummary.financingRequest)) {
    Object.assign(dealSummary, {
      financingRequest: dealSummary.financingRequest.map(item => changeData(item, 0, EnumKeyNameInDealSummary.TYPE, EnumKeyNameInDealSummary.VALUE))
    });
  }
  if (!_.isEmpty(dealSummary.propertySummary)) {
    Object.assign(dealSummary, {
      propertySummary: dealSummary.propertySummary.map(item => changeData(item, 0, EnumKeyNameInDealSummary.TYPE, EnumKeyNameInDealSummary.VALUE))
    });
  }
  if (dealSummary.sourcesAndUses && !_.isEmpty(dealSummary.sourcesAndUses.sources)) {
    Object.assign(dealSummary.sourcesAndUses, {
      sources: dealSummary.sourcesAndUses.sources.map(item => changeData(item, 0, EnumKeyNameInDealSummary.TYPE, EnumKeyNameInDealSummary.VALUE)).filter(item => item.key !== EnumKeyNameInDealSummary.TOTAL_SOURCES)
    });
  }
  if (dealSummary.sourcesAndUses && !_.isEmpty(dealSummary.sourcesAndUses.uses)) {
    Object.assign(dealSummary.sourcesAndUses, {
      uses: dealSummary.sourcesAndUses.uses.map(item => changeData(item, 0, EnumKeyNameInDealSummary.TYPE, EnumKeyNameInDealSummary.VALUE)).filter(item => item.key !== EnumKeyNameInDealSummary.TOTAL_USES)
    });
  }
  if (!_.isEmpty(dealSummary.rentRollSummary)) {
    Object.assign(dealSummary, {
      rentRollSummary: dealSummary.rentRollSummary.map(item => item.map(data => changeData(data, 0, EnumKeyNameInDealSummary.TYPE, EnumKeyNameInDealSummary.VALUE)))
    });
  }
  if (dealSummary.financialSummary && !_.isEmpty(dealSummary.financialSummary.revenue)) {
    Object.assign(dealSummary.financialSummary, {
      revenue: dealSummary.financialSummary.revenue.map(item => changeData(item, 0, EnumKeyNameInDealSummary.IN_PLACE_TYPE, EnumKeyNameInDealSummary.IN_PLACE_VALUE)).filter(data => data.key !== EnumColumnNameOfFinancialSummary.EFFECTIVE_GROSS_INCOME)
    });
    Object.assign(dealSummary.financialSummary, {
      revenue: dealSummary.financialSummary.revenue.map(item => changeData(item, 0, EnumKeyNameInDealSummary.STABILIZED_TYPE, EnumKeyNameInDealSummary.STABILIZED_VALUE)).filter(data => data.key !== EnumColumnNameOfFinancialSummary.EFFECTIVE_GROSS_INCOME)
    });
  }
  if (dealSummary.financialSummary && !_.isEmpty(dealSummary.financialSummary.expenses)) {
    Object.assign(dealSummary.financialSummary, {
      expenses: dealSummary.financialSummary.expenses.map(item => changeData(item, 0, EnumKeyNameInDealSummary.IN_PLACE_TYPE, EnumKeyNameInDealSummary.IN_PLACE_VALUE)).filter(data => data.key !== EnumColumnNameOfFinancialSummary.TOTAL_OPERATING_EXPNESES)
    });
    Object.assign(dealSummary.financialSummary, {
      expenses: dealSummary.financialSummary.expenses.map(item => changeData(item, 0, EnumKeyNameInDealSummary.STABILIZED_TYPE, EnumKeyNameInDealSummary.STABILIZED_VALUE)).filter(data => data.key !== EnumColumnNameOfFinancialSummary.TOTAL_OPERATING_EXPNESES)
    });
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
  const deal = await Deal.findOne({
    _id: body.deal
  });
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
    body.documents = body.documents.map(item => {
      if (item.url && !item.fileName) {
        // eslint-disable-next-line no-param-reassign
        item.fileName = decodeURIComponent(body.url.split('/').pop());
        return item;
      }
      return item;
    });
  }
  const dealSummary = await DealSummary.create(body);
  await Deal.findOneAndUpdate({
    _id: body.deal
  }, {
    dealSummary: dealSummary._id
  }, {
    new: true
  });
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
    body.documents = body.documents.map(item => {
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