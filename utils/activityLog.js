// eslint-disable-next-line import/prefer-default-export
import httpStatus from 'http-status';
import { EnumStageOfDeal } from '../models/enum.model';
import ApiError from './ApiError';

// eslint-disable-next-line import/prefer-default-export
export const getStageUpdateForActivityLogs = (stageName, option) => {
  switch (stageName) {
    case EnumStageOfDeal.OUT_IN_MARKET:
      return `${option.dealName} was sent out to lenders`;
    case EnumStageOfDeal.CLOSING:
      return `${option.dealName} moved into closing with ${option.lender}`;
    case EnumStageOfDeal.CLOSED:
      return `Congratulation, ${option.dealName} closed with ${option.lender}`;
    case EnumStageOfDeal.ARCHIVE:
      return `${option.dealName} was archived`;
    case EnumStageOfDeal.NEW:
      return `${option.dealName} was created`;
    default:
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'invalid enum stage of deal-type or we are not support it for activity logs'
      );
  }
};
