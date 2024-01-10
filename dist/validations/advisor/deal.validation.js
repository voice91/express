"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDeal = exports.paginatedDeal = exports.invitationToDeal = exports.getDealById = exports.getDeal = exports.deleteDealById = exports.createDeal = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _enum = _interopRequireDefault(require("../../models/enum.model"));
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5, _Joi$string6, _Joi$string7, _Joi$string8, _Joi$string9, _Joi$string10, _Joi$string11;
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
var locationSchema = _joi["default"].object().keys({
  type: _joi["default"].string().equal('Point').required(),
  coordinates: _joi["default"].array().required()
});
var involvedUsersEmbed = _joi["default"].object().keys({
  lenders: _joi["default"].array().items(_joi["default"].objectId()),
  borrowers: _joi["default"].array().items(_joi["default"].objectId()),
  advisors: _joi["default"].array().items(_joi["default"].objectId())
});
var photoSchema = _joi["default"].object().keys({
  url: _joi["default"].string(),
  fileName: _joi["default"].string()
});

// validation for all the values in the heading field
var headingSchema = _joi["default"].object().keys({
  dealName: _joi["default"].string(),
  cityState: _joi["default"].string(),
  dealInfo: _joi["default"].string()
});

// dynamic field schema for repetitive code in create and update deal
var dealDynamicFieldSchema = _joi["default"].object().keys({
  key: _joi["default"].string(),
  value: _joi["default"].any(),
  type: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_enum["default"].EnumOfTypeOfValue)))
});
var createDeal = exports.createDeal = {
  body: _joi["default"].object().keys({
    dealName: _joi["default"].string().required(),
    stage: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_enum["default"].EnumStageOfDeal))),
    address: _joi["default"].string().required(),
    city: _joi["default"].string().required(),
    state: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_enum["default"].EnumStatesOfDeal))).required(),
    // zipcode: Joi.number().integer().min(10000).max(99999).required(),
    zipcode: _joi["default"].string().pattern(new RegExp('^[0-9]{5}$')).messages({
      'string.pattern.base': 'zipcode must be 5 digits number'
    }),
    mapLocation: locationSchema,
    involvedUsers: involvedUsersEmbed,
    involvedUsersLender: _joi["default"].array().items(_joi["default"].objectId()),
    involvedUsersBorrower: _joi["default"].array().items(_joi["default"].objectId()),
    involvedUsersAdvisor: _joi["default"].array().items(_joi["default"].objectId()),
    sponsor: _joi["default"].objectId(),
    assetType: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_enum["default"].EnumAssetTypeOfDeal))).required(),
    loanAmount: _joi["default"].string().required(),
    loanPurpose: (_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_enum["default"].EnumLoanPurposeOfDeal))).required(),
    loanType: (_Joi$string6 = _joi["default"].string()).valid.apply(_Joi$string6, _toConsumableArray(Object.values(_enum["default"].EnumLoanTypeOfDeal))),
    dealMembers: _joi["default"].array().items(_joi["default"].string().email()),
    tasks: _joi["default"].array().items(_joi["default"].objectId()),
    dealNotes: _joi["default"].array().items(_joi["default"].objectId()),
    lenderPlacement: _joi["default"].array().items(_joi["default"].objectId()),
    documents: _joi["default"].array().items(_joi["default"].objectId()),
    dealSummary: _joi["default"].objectId(),
    squareFootage: _joi["default"].string(),
    unitCount: _joi["default"].number(),
    occupancy: _joi["default"].string(),
    loanInformation: _joi["default"].array().items(dealDynamicFieldSchema),
    dealSummaryBody: _joi["default"].object({
      heading: headingSchema.required().min(1),
      mainPhoto: photoSchema,
      propertySummary: _joi["default"].array().items(dealDynamicFieldSchema),
      financingRequest: _joi["default"].array().items(dealDynamicFieldSchema),
      dealMetrics: _joi["default"].array().items(dealDynamicFieldSchema),
      sourcesAndUses: _joi["default"].object().keys({
        sources: _joi["default"].array().items(dealDynamicFieldSchema),
        uses: _joi["default"].array().items(dealDynamicFieldSchema)
      })
    })
  })
};
var updateDeal = exports.updateDeal = {
  body: _joi["default"].object().keys({
    dealName: _joi["default"].string(),
    stage: (_Joi$string7 = _joi["default"].string()).valid.apply(_Joi$string7, _toConsumableArray(Object.values(_enum["default"].EnumStageOfDeal))),
    address: _joi["default"].string(),
    city: _joi["default"].string(),
    state: (_Joi$string8 = _joi["default"].string()).valid.apply(_Joi$string8, _toConsumableArray(Object.values(_enum["default"].EnumStatesOfDeal))),
    zipcode: _joi["default"].string().pattern(new RegExp('^[0-9]{5}$')).messages({
      'string.pattern.base': 'zipcode must be 5 digits number'
    }),
    mapLocation: locationSchema,
    involvedUsers: involvedUsersEmbed,
    involvedUsersLender: _joi["default"].array().items(_joi["default"].objectId()),
    involvedUsersBorrower: _joi["default"].array().items(_joi["default"].objectId()),
    involvedUsersAdvisor: _joi["default"].array().items(_joi["default"].objectId()),
    sponsor: _joi["default"].objectId(),
    assetType: (_Joi$string9 = _joi["default"].string()).valid.apply(_Joi$string9, _toConsumableArray(Object.values(_enum["default"].EnumAssetTypeOfDeal))),
    loanAmount: _joi["default"].string(),
    loanPurpose: (_Joi$string10 = _joi["default"].string()).valid.apply(_Joi$string10, _toConsumableArray(Object.values(_enum["default"].EnumLoanPurposeOfDeal))),
    loanType: (_Joi$string11 = _joi["default"].string()).valid.apply(_Joi$string11, _toConsumableArray(Object.values(_enum["default"].EnumLoanTypeOfDeal))),
    tasks: _joi["default"].array().items(_joi["default"].objectId()),
    dealNotes: _joi["default"].array().items(_joi["default"].objectId()),
    lenderPlacement: _joi["default"].array().items(_joi["default"].objectId()),
    documents: _joi["default"].array().items(_joi["default"].objectId()),
    squareFootage: _joi["default"].string().allow(null),
    unitCount: _joi["default"].number().allow(null),
    occupancy: _joi["default"].string().allow(null),
    loanInformation: _joi["default"].array().items(dealDynamicFieldSchema),
    dealSummaryBody: _joi["default"].object({
      _id: _joi["default"].objectId(),
      mainPhoto: photoSchema,
      propertySummary: _joi["default"].array().items(dealDynamicFieldSchema),
      financingRequest: _joi["default"].array().items(dealDynamicFieldSchema),
      dealMetrics: _joi["default"].array().items(dealDynamicFieldSchema),
      sourcesAndUses: _joi["default"].object().keys({
        sources: _joi["default"].array().items(dealDynamicFieldSchema),
        uses: _joi["default"].array().items(dealDynamicFieldSchema)
      })
    })
  }),
  params: _joi["default"].object().keys({
    dealId: _joi["default"].objectId().required()
  })
};
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
var invitationToDeal = exports.invitationToDeal = {
  body: _joi["default"].object().keys({
    email: _joi["default"].array().items(_joi["default"].string().email().required().min(1)),
    deal: _joi["default"].objectId().required(),
    role: _joi["default"].string().required().valid(_enum["default"].EnumRoleOfUser.ADVISOR, _enum["default"].EnumRoleOfUser.USER)
  })
};