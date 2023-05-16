import { EnumStageOfDeal } from '../models/enum.model';

// eslint-disable-next-line import/prefer-default-export
export const stageOfDealWithNumber = (stageName) => {
  const stageMapping = new Map([
    [EnumStageOfDeal.CLOSING, 1],
    [EnumStageOfDeal.SELECTING_LENDER, 2],
    [EnumStageOfDeal.OUT_IN_MARKET, 3],
    [EnumStageOfDeal.PREPARING_MATERIALS, 4],
    [EnumStageOfDeal.NEW, 5],
    [EnumStageOfDeal.ON_HOLD, 6],
    [EnumStageOfDeal.CLOSED, 7],
  ]);

  return stageMapping.get(stageName) || null;
};
