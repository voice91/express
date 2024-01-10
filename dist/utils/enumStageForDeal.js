"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stageOfDealWithNumber = exports.dealStageToStageNumberMapping = void 0;
var _enum = require("../models/enum.model");
// eslint-disable-next-line import/prefer-default-export
var stageOfDealWithNumber = exports.stageOfDealWithNumber = function stageOfDealWithNumber(stageName) {
  var stageMapping = new Map([[_enum.EnumStageOfDeal.CLOSING, 1], [_enum.EnumStageOfDeal.SELECTING_LENDER, 2], [_enum.EnumStageOfDeal.OUT_IN_MARKET, 3], [_enum.EnumStageOfDeal.PREPARING_MATERIALS, 4], [_enum.EnumStageOfDeal.NEW, 5], [_enum.EnumStageOfDeal.ON_HOLD, 6], [_enum.EnumStageOfDeal.CLOSED, 7]]);
  return stageMapping.get(stageName) || null;
};
var dealStageToStageNumberMapping = exports.dealStageToStageNumberMapping = new Map([[_enum.EnumStageOfDeal.CLOSED, 1], [_enum.EnumStageOfDeal.CLOSING, 2], [_enum.EnumStageOfDeal.SELECTING_LENDER, 3], [_enum.EnumStageOfDeal.OUT_IN_MARKET, 4], [_enum.EnumStageOfDeal.PREPARING_MATERIALS, 5], [_enum.EnumStageOfDeal.NEW, 6]]);