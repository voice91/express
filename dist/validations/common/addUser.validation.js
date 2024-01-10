"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addUser = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _enum = _interopRequireDefault(require("../../models/enum.model"));
var _Joi$string, _Joi$string2;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// eslint-disable-next-line import/prefer-default-export
var addUser = exports.addUser = {
  body: _joi["default"].object().keys({
    name: _joi["default"].string(),
    email: _joi["default"].string().email().required(),
    role: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_enum["default"].EnumRoleOfUser))),
    password: _joi["default"].string().required(),
    firstName: _joi["default"].string().required(),
    lastName: _joi["default"].string().required(),
    phoneNumber: _joi["default"].string(),
    companyName: _joi["default"].string().required(),
    companyAddress: _joi["default"].string(),
    city: _joi["default"].string(),
    state: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_enum["default"].EnumStatesOfDeal))),
    zipcode: _joi["default"].number().integer().min(100).max(999999),
    lastSignIn: _joi["default"].date(),
    profilePhoto: _joi["default"].string(),
    emailPresentingPostmark: _joi["default"].bool()["default"](false)
  })
};