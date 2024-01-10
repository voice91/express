"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateDealSummary = exports.importFileForDealSummary = exports.getDealSummaryById = exports.exportFileForDealSummary = exports.createDealSummary = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _enum = _interopRequireDefault(require("../../models/enum.model"));
var _Joi$string, _Joi$string2, _Joi$string3, _Joi$string4, _Joi$string5, _Joi$string6, _Joi$string7;
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
var PhotosSchema = _joi["default"].object().keys({
  url: _joi["default"].string(),
  fileName: _joi["default"].string()
});

// validation for all the values in the heading field
var headingSchema = _joi["default"].object().keys({
  dealName: _joi["default"].string().allow(null),
  cityState: _joi["default"].string().allow(null),
  dealInfo: _joi["default"].string().allow(null)
});

// TODO : use this embed schema validation to reduce code duplication
// dynamic field schema for repetitive code in create and update deal summary
var dealSummaryDynamicFieldSchema = _joi["default"].object().keys({
  key: _joi["default"].string(),
  value: _joi["default"].any(),
  type: (_Joi$string = _joi["default"].string()).valid.apply(_Joi$string, _toConsumableArray(Object.values(_enum["default"].EnumOfTypeOfValue)))
});

// dynamic field schema for repetitive code in create and update financial summary in deal summary
var financialSummaryDynamicFieldSchema = _joi["default"].object().keys({
  key: _joi["default"].string(),
  stabilizedValue: _joi["default"].string(),
  inPlaceValue: _joi["default"].string(),
  stabilizedType: (_Joi$string2 = _joi["default"].string()).valid.apply(_Joi$string2, _toConsumableArray(Object.values(_enum["default"].EnumOfTypeOfValue))),
  inPlaceType: (_Joi$string3 = _joi["default"].string()).valid.apply(_Joi$string3, _toConsumableArray(Object.values(_enum["default"].EnumOfTypeOfValue))),
  note: _joi["default"].string()
});

// eslint-disable-next-line import/prefer-default-export
var importFileForDealSummary = exports.importFileForDealSummary = {
  query: _joi["default"].object().keys({
    url: _joi["default"].string().required(),
    deal: _joi["default"].objectId().required()
  })
};
var exportFileForDealSummary = exports.exportFileForDealSummary = {
  body: _joi["default"].object().keys({
    url: _joi["default"].string().required()
  }),
  params: _joi["default"].object().keys({
    dealSummaryId: _joi["default"].objectId().required()
  })
};
var getDealSummaryById = exports.getDealSummaryById = {
  params: _joi["default"].object().keys({
    dealSummaryId: _joi["default"].objectId().required()
  })
};
var createDealSummary = exports.createDealSummary = {
  body: _joi["default"].object().keys({
    propertySummary: _joi["default"].array().items(dealSummaryDynamicFieldSchema),
    dealMetrics: _joi["default"].array().items(dealSummaryDynamicFieldSchema),
    financingRequest: _joi["default"].array().items(dealSummaryDynamicFieldSchema),
    sourcesAndUses: _joi["default"].object().keys({
      sources: _joi["default"].array().items(dealSummaryDynamicFieldSchema),
      uses: _joi["default"].array().items(dealSummaryDynamicFieldSchema)
    }),
    rentRollSummary: _joi["default"].array().items(_joi["default"].array().items(dealSummaryDynamicFieldSchema)),
    financialSummary: _joi["default"].object().keys({
      revenue: _joi["default"].array().items(financialSummaryDynamicFieldSchema),
      expenses: _joi["default"].array().items(financialSummaryDynamicFieldSchema),
      netOperatingIncome: _joi["default"].object().keys({
        inPlaceValue: _joi["default"].alternatives()["try"](_joi["default"].string(), _joi["default"].number())
      })
    }),
    executiveSummary: _joi["default"].string(),
    dealHighLights: _joi["default"].array().items(_joi["default"].string()),
    marketSummary: _joi["default"].string(),
    url: _joi["default"].string(),
    sponsorOverview: _joi["default"].string(),
    deal: _joi["default"].objectId().required(),
    mainPhoto: PhotosSchema,
    dataSheet: PhotosSchema,
    otherPhotos: _joi["default"].array().items(PhotosSchema),
    map: _joi["default"].object().keys({
      lat: _joi["default"].number(),
      lng: _joi["default"].number()
    }),
    documents: _joi["default"].array().items(PhotosSchema),
    /**
     * if type is bullet then in the response bulletPoints is required ,
     * if type is text then in the response text is required ,
     * if type is bulletText then in the response bulletPoints and text are required ,
     * if type is file then in the response fileUrl and fileName are required ,
     * if type is table then in the response fileUrl is required
     */
    dynamicField: _joi["default"].array().items(_joi["default"].object().keys({
      name: _joi["default"].string().required(),
      type: (_Joi$string4 = _joi["default"].string()).valid.apply(_Joi$string4, _toConsumableArray(Object.values(_enum["default"].EnumOfDynamicFieldType))).required(),
      // for tableType fields, if fileUrl is updated then isUpdated come true from FE, else false
      isUpdated: _joi["default"]["boolean"](),
      // Added the tableData field as optional in validation of response in all(except table) type of dynamicField.
      // Because get default added empty array in the response as it is defined in schema as array
      response: _joi["default"].object().when('type', {
        is: _enum["default"].EnumOfDynamicFieldType.BULLET,
        then: _joi["default"].object({
          tableData: _joi["default"].optional(),
          bulletPoints: _joi["default"].array().items(_joi["default"].string()).min(1).required()
        }).required(),
        otherwise: _joi["default"].object().when('type', {
          is: _enum["default"].EnumOfDynamicFieldType.TEXT,
          then: _joi["default"].object({
            bulletPoints: _joi["default"].optional(),
            tableData: _joi["default"].optional(),
            text: _joi["default"].string().required()
          }).required(),
          otherwise: _joi["default"].object().when('type', {
            is: _enum["default"].EnumOfDynamicFieldType.BULLET_TEXT,
            then: _joi["default"].object({
              tableData: _joi["default"].optional(),
              bulletPoints: _joi["default"].array().items(_joi["default"].string()).min(1).required(),
              text: _joi["default"].string().required()
            }).required(),
            otherwise: _joi["default"].object().when('type', {
              is: _enum["default"].EnumOfDynamicFieldType.FILE,
              then: _joi["default"].object({
                tableData: _joi["default"].optional(),
                bulletPoints: _joi["default"].optional(),
                fileUrl: _joi["default"].string().uri().required(),
                fileName: _joi["default"].string().required()
              }).required(),
              otherwise: _joi["default"].object().when('type', {
                is: _enum["default"].EnumOfDynamicFieldType.TABLE,
                then: _joi["default"].object({
                  bulletPoints: _joi["default"].optional(),
                  fileUrl: _joi["default"].string().uri().required(),
                  fileName: _joi["default"].string(),
                  tableData: _joi["default"].array().items(_joi["default"].array().items(dealSummaryDynamicFieldSchema))
                }).required()
              })
            })
          })
        })
      }).required(),
      sectionName: (_Joi$string5 = _joi["default"].string()).valid.apply(_Joi$string5, _toConsumableArray(Object.values(_enum["default"].EnumOfSectionName))),
      index: _joi["default"].number()
    })),
    isDealSummaryAddedFromDeal: _joi["default"]["boolean"]()
  })
};
var updateDealSummary = exports.updateDealSummary = {
  body: _joi["default"].object().keys({
    propertySummary: _joi["default"].array().items(dealSummaryDynamicFieldSchema).allow(''),
    dealMetrics: _joi["default"].array().items(dealSummaryDynamicFieldSchema).allow(''),
    financingRequest: _joi["default"].array().items(dealSummaryDynamicFieldSchema).allow(''),
    sourcesAndUses: _joi["default"].object().keys({
      sources: _joi["default"].array().items(dealSummaryDynamicFieldSchema),
      uses: _joi["default"].array().items(dealSummaryDynamicFieldSchema)
    }).allow(''),
    rentRollSummary: _joi["default"].array().items(_joi["default"].array().items(dealSummaryDynamicFieldSchema)).allow(''),
    financialSummary: _joi["default"].object().keys({
      revenue: _joi["default"].array().items(financialSummaryDynamicFieldSchema),
      expenses: _joi["default"].array().items(financialSummaryDynamicFieldSchema)
    }).allow(''),
    executiveSummary: _joi["default"].string().allow(null),
    url: _joi["default"].string(),
    dealHighLights: _joi["default"].array().items(_joi["default"].string()).allow(''),
    marketSummary: _joi["default"].string().allow(''),
    sponsorOverview: _joi["default"].string().allow(null),
    mainPhoto: PhotosSchema,
    dataSheet: PhotosSchema,
    otherPhotos: _joi["default"].array().items(PhotosSchema),
    map: _joi["default"].object().keys({
      lat: _joi["default"].number(),
      lng: _joi["default"].number()
    }),
    documents: _joi["default"].array().items(PhotosSchema),
    /**
     * if type is bullet then in the response bulletPoints is required ,
     * if type is text then in the response text is required ,
     * if type is bulletText then in the response bulletPoints and text are required ,
     * if type is file then in the response fileUrl and fileName are required ,
     * if type is table then in the response fileUrl is required ,
     */
    dynamicField: _joi["default"].array().items(_joi["default"].object().keys({
      name: _joi["default"].string().required(),
      type: (_Joi$string6 = _joi["default"].string()).valid.apply(_Joi$string6, _toConsumableArray(Object.values(_enum["default"].EnumOfDynamicFieldType))).required(),
      // for tableType fields, if fileUrl is updated then isUpdated come true from FE, else false
      isUpdated: _joi["default"]["boolean"](),
      // Added the tableData field as optional in validation of response in all(except table) type of dynamicField.
      // Because get default added empty array in the response as it is defined in schema as array
      response: _joi["default"].object().when('type', {
        is: _enum["default"].EnumOfDynamicFieldType.BULLET,
        then: _joi["default"].object({
          tableData: _joi["default"].optional(),
          bulletPoints: _joi["default"].array().items(_joi["default"].string()).min(1).required()
        }).required(),
        otherwise: _joi["default"].object().when('type', {
          is: _enum["default"].EnumOfDynamicFieldType.TEXT,
          then: _joi["default"].object({
            tableData: _joi["default"].optional(),
            bulletPoints: _joi["default"].optional(),
            text: _joi["default"].string().required()
          }).required(),
          otherwise: _joi["default"].object().when('type', {
            is: _enum["default"].EnumOfDynamicFieldType.BULLET_TEXT,
            then: _joi["default"].object({
              tableData: _joi["default"].optional(),
              bulletPoints: _joi["default"].array().items(_joi["default"].string()).min(1).required(),
              text: _joi["default"].string().required()
            }).required(),
            otherwise: _joi["default"].object().when('type', {
              is: _enum["default"].EnumOfDynamicFieldType.FILE,
              then: _joi["default"].object({
                tableData: _joi["default"].optional(),
                bulletPoints: _joi["default"].optional(),
                fileUrl: _joi["default"].string().uri().required(),
                fileName: _joi["default"].string().required()
              }).required(),
              otherwise: _joi["default"].object().when('type', {
                is: _enum["default"].EnumOfDynamicFieldType.TABLE,
                then: _joi["default"].object({
                  bulletPoints: _joi["default"].optional(),
                  fileUrl: _joi["default"].string().uri().required(),
                  fileName: _joi["default"].string(),
                  tableData: _joi["default"].array().items(_joi["default"].array().items(dealSummaryDynamicFieldSchema))
                }).required()
              })
            })
          })
        })
      }).required(),
      sectionName: (_Joi$string7 = _joi["default"].string()).valid.apply(_Joi$string7, _toConsumableArray(Object.values(_enum["default"].EnumOfSectionName))),
      index: _joi["default"].number()
    })),
    isDealSummaryAddedFromDeal: _joi["default"]["boolean"](),
    heading: headingSchema.required().min(1),
    sponsor: _joi["default"].objectId().allow(null)
  }),
  params: _joi["default"].object().keys({
    dealSummaryId: _joi["default"].objectId().required()
  })
};