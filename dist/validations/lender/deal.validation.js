"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginatedDeal = exports.getDealById = exports.getDeal = exports.deleteDealById = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */

_joi["default"].objectId = require('joi-objectid')(_joi["default"]);
var getDealById = exports.getDealById = {
  params: _joi["default"].object().keys({
    dealId: _joi["default"].objectId().required()
  })
};
var deleteDealById = exports.deleteDealById = {
  params: _joi["default"].object().keys({
    dealId: _joi["default"].objectId().required()
  })
};
var getDeal = exports.getDeal = {
  body: _joi["default"].object().keys({}).unknown(true),
  query: _joi["default"].object().keys({
    page: _joi["default"].string(),
    limit: _joi["default"].string(),
    sort: _joi["default"].string(),
    search: _joi["default"].string()
  }).unknown(true)
};
var paginatedDeal = exports.paginatedDeal = {
  body: _joi["default"].object().keys({}).unknown(true),
  query: _joi["default"].object().keys({
    page: _joi["default"].number()["default"](1),
    limit: _joi["default"].number()["default"](10).max(100)
  }).unknown(true)
};