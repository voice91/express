"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateManyLenderPlacement = exports.updateLenderPlacement = exports.sendDeal = exports.removeLenderPlacement = exports.paginatedLenderPlacement = exports.getLenderPlacementById = exports.getLenderPlacement = exports.getDocumentsOfMessages = exports.deleteLenderPlacementById = exports.createLenderPlacement = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _config = _interopRequireDefault(require("../../config/config"));
var _enum = _interopRequireDefault(require("../../models/enum.model"));
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4;
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; } /**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
_joi["default"].objectId = require('joi-objectid')(_joi["default"]);
var termsEmbed = _joi["default"].object().keys({
  initialFunding: _joi["default"].number().integer().required(),
  futureFunding: _joi["default"].number().integer(),
  totalLoanAmount: _joi["default"].number().integer(),
  interestRateType: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_enum["default"].EnumInterestRateTypeOfTerms))),
  interestRateIndexValue: _joi["default"].string(),
  interestRateIndexDate: _joi["default"].date(),
  spread: _joi["default"].number().integer(),
  totalRate: _joi["default"].string(),
  rateNotes: _joi["default"].string(),
  initialTerm: _joi["default"].string(),
  extensionOptionOne: _joi["default"].string(),
  extensionFee: _joi["default"].string(),
  interestRateIndex: _joi["default"].string(),
  extensionOptionTwo: _joi["default"].string(),
  LTC: _joi["default"].string()
});
var TermSheetSchema = _joi["default"].object().keys({
  url: _joi["default"].string(),
  fileName: _joi["default"].string()
});
var createLenderPlacement = exports.createLenderPlacement = {
  body: _joi["default"].object().keys({
    lendingDetails: _joi["default"].array().items(_joi["default"].object().keys({
      lendingInstitution: _joi["default"].objectId().required(),
      deal: _joi["default"].objectId().required()
    }).required()).required(),
    lenderContact: _joi["default"].objectId(),
    notes: _joi["default"].array().items(_joi["default"].string()),
    stage: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_enum["default"].EnumStageOfLenderPlacement))),
    terms: termsEmbed,
    termSheet: TermSheetSchema,
    isEmailSent: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_enum["default"].EnumOfEmailStatus))),
    followOnDate: _joi["default"].date(),
    postmarkMessageId: _joi["default"].array().items(_joi["default"].string())
  })
};
var removeLenderPlacement = exports.removeLenderPlacement = {
  query: _joi["default"].object().keys({
    lendingInstitution: _joi["default"].objectId().required(),
    deal: _joi["default"].objectId().required()
  })
};
var updateLenderPlacement = exports.updateLenderPlacement = {
  body: _joi["default"].object().keys({
    lendingInstitution: _joi["default"].objectId(),
    lenderContact: _joi["default"].objectId(),
    notes: _joi["default"].array().items(_joi["default"].string()),
    stage: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_enum["default"].EnumStageOfLenderPlacement))),
    terms: termsEmbed,
    termSheet: _joi["default"].string().regex(new RegExp("https://".concat(_config["default"].aws.bucket, ".s3.amazonaws.com\\b([-a-zA-Z0-9()@:%_+.~#?&amp;/=]*.(pdf|doc|docx|ppt|xls|xlsx|pptx)$)")))
  }),
  params: _joi["default"].object().keys({
    lenderPlacementId: _joi["default"].objectId().required()
  })
};
var updateManyLenderPlacement = exports.updateManyLenderPlacement = {
  body: _joi["default"].object().keys({
    lenderPlacementIds: _joi["default"].array().items(_joi["default"].objectId()).required(),
    // todo : add the validation for below field as per requirements
    update: _joi["default"].object().keys({
      isFavourite: _joi["default"]["boolean"](),
      isArchived: _joi["default"]["boolean"]()
    })
  })
};
var getLenderPlacementById = exports.getLenderPlacementById = {
  params: _joi["default"].object().keys({
    lenderPlacementId: _joi["default"].objectId().required()
  })
};
var deleteLenderPlacementById = exports.deleteLenderPlacementById = {
  params: _joi["default"].object().keys({
    lenderPlacementId: _joi["default"].objectId().required()
  })
};
var getLenderPlacement = exports.getLenderPlacement = {
  body: _joi["default"].object().keys({}).unknown(true)
};
var paginatedLenderPlacement = exports.paginatedLenderPlacement = {
  body: _joi["default"].object().keys({}).unknown(true),
  query: _joi["default"].object().keys({
    page: _joi["default"].number()["default"](1),
    limit: _joi["default"].number()["default"](10).max(100)
  }).unknown(true)
};
var sendDeal = exports.sendDeal = {
  body: _joi["default"].object().keys({
    deals: _joi["default"].array().items(_joi["default"].object().keys({
      lenderInstitute: _joi["default"].objectId().required(),
      deal: _joi["default"].objectId().required(),
      lenderPlacement: _joi["default"].objectId().required()
    }))
  })
};
var getDocumentsOfMessages = exports.getDocumentsOfMessages = {
  params: _joi["default"].object().keys({
    lenderPlacementId: _joi["default"].objectId().required()
  })
};