// eslint-disable-next-line import/prefer-default-export
import httpStatus from 'http-status';
import { EnumStageOfDeal } from '../models/enum.model';
import ApiError from './ApiError';

// eslint-disable-next-line import/prefer-default-export
export const getStageUpdateForActivityLogs = (oldStage, newStage, option) => {
  switch (oldStage) {
    case EnumStageOfDeal.PREPARING_MATERIALS: {
      if (newStage === EnumStageOfDeal.OUT_IN_MARKET) {
        return `${option.dealName} was sent out to lenders`;
      }
      return null;
    }
    case EnumStageOfDeal.OUT_IN_MARKET: {
      if (newStage === EnumStageOfDeal.CLOSING) {
        return `${option.dealName} moved into closing with ${option.lender}`;
      }
      return null;
    }
    case EnumStageOfDeal.CLOSING: {
      if (newStage === EnumStageOfDeal.CLOSED) {
        return `Congratulation, ${option.dealName} closed with ${option.lender}`;
      }
      return null;
    }
    case EnumStageOfDeal.CLOSED: {
      if (newStage === EnumStageOfDeal.ARCHIVE) {
        return `${option.dealName} was archived`;
      }
      return null;
    }
    default:
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        'invalid enum stage of deal-type or we are not support it for activity logs'
      );
  }
};
