// eslint-disable-next-line import/prefer-default-export
import { EnumStageOfLenderPlacement } from '../models/enum.model';

export const EnumStageOfLenderPlacementWithNumber = {
  CLOSED: { value: 1, name: 'closed' },
  CLOSING: { value: 2, name: 'closing' },
  TERMS_SHEET_RECEIVED: { value: 3, name: 'termsSheetReceived' },
  TERMS_RECEIVED: { value: 4, name: 'termsReceived' },
  REVIEWING: { value: 5, name: 'reviewing' },
  SENT: { value: 6, name: 'sent' },
  NEW: { value: 7, name: 'new' },
  NOT_RESPONSIVE: { value: 8, name: 'notResponsive' },
  NOT_COMPETITIVE: { value: 9, name: 'notCompetitive' },
  PASS: { value: 10, name: 'pass' },
};

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
