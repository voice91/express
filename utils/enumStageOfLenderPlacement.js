// eslint-disable-next-line import/prefer-default-export
import { EnumStageOfLenderPlacement } from '../models/enum.model';

// eslint-disable-next-line import/prefer-default-export
export const stageOfLenderPlacementWithNumber = (stageName) => {
  const stageNumberMap = new Map([
    [EnumStageOfLenderPlacement.CLOSED, 1],
    [EnumStageOfLenderPlacement.CLOSING, 2],
    [EnumStageOfLenderPlacement.TERMS_SHEET_RECEIVED, 3],
    [EnumStageOfLenderPlacement.TERMS_RECEIVED, 4],
    [EnumStageOfLenderPlacement.REVIEWING, 5],
    [EnumStageOfLenderPlacement.SENT, 6],
    [EnumStageOfLenderPlacement.NEW, 7],
    [EnumStageOfLenderPlacement.NOT_RESPONSIVE, 8],
    [EnumStageOfLenderPlacement.NOT_COMPETITIVE, 9],
    [EnumStageOfLenderPlacement.PASS, 10],
  ]);

  return stageNumberMap.get(stageName) || null;
};
