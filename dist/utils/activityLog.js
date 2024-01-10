"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStageUpdateForActivityLogs = void 0;
var _enum = require("../models/enum.model");
// eslint-disable-next-line import/prefer-default-export

// eslint-disable-next-line import/prefer-default-export
var getStageUpdateForActivityLogs = exports.getStageUpdateForActivityLogs = function getStageUpdateForActivityLogs(oldStage, newStage, option) {
  switch (oldStage) {
    case _enum.EnumStageOfDeal.PREPARING_MATERIALS:
      {
        if (newStage === _enum.EnumStageOfDeal.OUT_IN_MARKET) {
          return "".concat(option.dealName, " was sent out to lenders");
        }
        return null;
      }
    case _enum.EnumStageOfDeal.OUT_IN_MARKET:
      {
        if (newStage === _enum.EnumStageOfDeal.CLOSING) {
          return "".concat(option.dealName, " moved into closing with ").concat(option.lender);
        }
        return null;
      }
    case _enum.EnumStageOfDeal.CLOSING:
      {
        if (newStage === _enum.EnumStageOfDeal.CLOSED) {
          return "Congratulation, ".concat(option.dealName, " closed with ").concat(option.lender);
        }
        return null;
      }
    case _enum.EnumStageOfDeal.CLOSED:
      {
        if (newStage === _enum.EnumStageOfDeal.ARCHIVE) {
          return "".concat(option.dealName, " was archived");
        }
        return null;
      }
    default:
      return null;
  }
};