// eslint-disable-next-line import/prefer-default-export
import { EnumStageOfDeal } from "../models/enum.model";

// eslint-disable-next-line import/prefer-default-export
export const getStageUpdateForActivityLogs = (oldStage, newStage, option) => {
  switch (oldStage) {
    case EnumStageOfDeal.PREPARING_MATERIALS:
      {
        if (newStage === EnumStageOfDeal.OUT_IN_MARKET) {
          return `${option.dealName} was sent out to lenders`;
        }
        return null;
      }
    case EnumStageOfDeal.OUT_IN_MARKET:
      {
        if (newStage === EnumStageOfDeal.CLOSING) {
          return `${option.dealName} moved into closing with ${option.lender}`;
        }
        return null;
      }
    case EnumStageOfDeal.CLOSING:
      {
        if (newStage === EnumStageOfDeal.CLOSED) {
          return `Congratulation, ${option.dealName} closed with ${option.lender}`;
        }
        return null;
      }
    case EnumStageOfDeal.CLOSED:
      {
        if (newStage === EnumStageOfDeal.ARCHIVE) {
          return `${option.dealName} was archived`;
        }
        return null;
      }
    default:
      return null;
  }
};