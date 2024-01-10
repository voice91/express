"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paginatedDealDocument = exports.getDealDocumentById = exports.getDealDocument = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */

_joi["default"].objectId = require('joi-objectid')(_joi["default"]);
var getDealDocumentById = exports.getDealDocumentById = {
  params: _joi["default"].object().keys({
    dealDocumentId: _joi["default"].objectId().required()
  })
};
var getDealDocument = exports.getDealDocument = {
  body: _joi["default"].object().keys({}).unknown(true)
};
var paginatedDealDocument = exports.paginatedDealDocument = {
  body: _joi["default"].object().keys({}).unknown(true),
  query: _joi["default"].object().keys({
    page: _joi["default"].number()["default"](1),
    limit: _joi["default"].number()["default"](10).max(100)
  }).unknown(true)
};