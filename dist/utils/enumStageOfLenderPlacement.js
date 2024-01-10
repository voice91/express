"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stageOfLenderPlacementWithNumber = exports.lenderPlacementStageToStageNumberMapping = void 0;
var _enum = require("../models/enum.model");
// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
var stageOfLenderPlacementWithNumber = exports.stageOfLenderPlacementWithNumber = function stageOfLenderPlacementWithNumber(stageName) {
  var stageNumberMap = new Map([[_enum.EnumStageOfLenderPlacement.CLOSED, 1], [_enum.EnumStageOfLenderPlacement.CLOSING, 2], [_enum.EnumStageOfLenderPlacement.TERMS_SHEET_RECEIVED, 3], [_enum.EnumStageOfLenderPlacement.TERMS_RECEIVED, 4], [_enum.EnumStageOfLenderPlacement.REVIEWING, 5], [_enum.EnumStageOfLenderPlacement.SENT, 6], [_enum.EnumStageOfLenderPlacement.NEW, 7], [_enum.EnumStageOfLenderPlacement.NOT_RESPONSIVE, 8], [_enum.EnumStageOfLenderPlacement.NOT_COMPETITIVE, 9], [_enum.EnumStageOfLenderPlacement.PASS, 10]]);
  return stageNumberMap.get(stageName) || null;
};
var lenderPlacementStageToStageNumberMapping = exports.lenderPlacementStageToStageNumberMapping = new Map([[_enum.EnumStageOfLenderPlacement.CLOSED, 1], [_enum.EnumStageOfLenderPlacement.CLOSING, 2], [_enum.EnumStageOfLenderPlacement.TERMS_SHEET_RECEIVED, 3], [_enum.EnumStageOfLenderPlacement.TERMS_RECEIVED, 4], [_enum.EnumStageOfLenderPlacement.REVIEWING, 5], [_enum.EnumStageOfLenderPlacement.SENT, 6], [_enum.EnumStageOfLenderPlacement.NEW, 7]]);