// eslint-disable-next-line import/prefer-default-export
import httpStatus from 'http-status';
import { EnumStageOfDeal } from '../models/enum.model';
import ApiError from './ApiError';

// eslint-disable-next-line import/prefer-default-export
export const getStageUpdateForActivityLogs = (stageName, option) => {
  switch (stageName) {
    case EnumStageOfDeal.PREPARING_MATERIALS:
      return `${option.dealName} was sent out to lenders`;
    case EnumStageOfDeal.OUT_IN_MARKET:
      return `${option.dealName} moved into closing with ${option.lender}`;
    case EnumStageOfDeal.CLOSING:
      return `Congratulation, ${option.dealName} closed with ${option.lender}`;
    // todo: in all stageName below from here need to update after get client requirement
    case EnumStageOfDeal.CLOSED:
      return `${option.dealName} was closed`;
    case EnumStageOfDeal.NEW:
      return `${option.dealName} was created`;
    case EnumStageOfDeal.ARCHIVE:
      return `${option.dealName} was archive`;
    case EnumStageOfDeal.ON_HOLD:
      return `${option.dealName} was on hold `;
    case EnumStageOfDeal.SELECTING_LENDER:
      return `${option.dealName} was selecting lender`;
    default:
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'invalid enum stage of deal-type or we are not support it for activity logs'
      );
  }
};
