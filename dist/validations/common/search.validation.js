"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.search = void 0;
var _joi = _interopRequireDefault(require("joi"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// eslint-disable-next-line import/prefer-default-export
var search = exports.search = {
  query: _joi["default"].object().keys({
    searchValue: _joi["default"].string()
  })
};