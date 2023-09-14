import { EnumStageOfDeal, EnumStageOfLenderPlacement } from '../models/enum.model';
import LenderPlacement from '../models/lenderPlacement.model';
import { stageOfLenderPlacementWithNumber } from './enumStageOfLenderPlacement';

// eslint-disable-next-line import/prefer-default-export
export const detailsInDeal = async (stageName, dealId) => {
  let lenderPlacementNumber;
  if (stageName === EnumStageOfDeal.OUT_IN_MARKET) {
    lenderPlacementNumber = await LenderPlacement.find({
      deal: dealId,
      stageEnumWiseNumber: { $lte: stageOfLenderPlacementWithNumber(EnumStageOfLenderPlacement.SENT) },
    }).count();
  }
  let lenderPlacementQuotes;
  if (stageName === EnumStageOfDeal.SELECTING_LENDER) {
    lenderPlacementQuotes = await LenderPlacement.find({ deal: dealId, terms: { $exists: true } }).count();
  }
  let lenderPlacementClosing = [];
  if (stageName === EnumStageOfDeal.CLOSING) {
    lenderPlacementClosing = await LenderPlacement.find({ deal: dealId, stage: 'closing' }).populate({
      path: 'lendingInstitution',
    });
  }

  const stageMapping = new Map([
    [EnumStageOfDeal.NEW, 'Waiting on initial information needed from borrower'],
    [EnumStageOfDeal.PREPARING_MATERIALS, 'Advisor is preparing materials'],
    [EnumStageOfDeal.OUT_IN_MARKET, `Outreach to ${lenderPlacementNumber} Lenders`],
    [EnumStageOfDeal.SELECTING_LENDER, `${lenderPlacementQuotes} Quotes Received`],
    [
      EnumStageOfDeal.CLOSING,
      `In closing with ${lenderPlacementClosing.map((name) => name.lendingInstitution.lenderNameVisible)}`,
    ],
  ]);

  return stageMapping.get(stageName) || null;
};
