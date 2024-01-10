"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateEmailTemplate = exports.paginatedEmailTemplate = exports.getEmailTemplateById = exports.getEmailTemplate = exports.deleteEmailTemplateById = exports.createEmailTemplate = void 0;
var _joi = _interopRequireDefault(require("joi"));
var _config = _interopRequireDefault(require("../../config/config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */

_joi["default"].objectId = require('joi-objectid')(_joi["default"]);
var createEmailTemplate = exports.createEmailTemplate = {
  body: _joi["default"].object().keys({
    from: _joi["default"].string().email(),
    ccList: _joi["default"].array().items(_joi["default"].string().email()).allow(''),
    bccList: _joi["default"].array().items(_joi["default"].string().email()).allow(''),
    contact: _joi["default"].array().items(_joi["default"].object().keys({
      sendTo: _joi["default"].string().email(),
      name: _joi["default"].string()
    })),
    advisorName: _joi["default"].string(),
    totalLoanAmount: _joi["default"].number(),
    dealDocument: _joi["default"].array().items(_joi["default"].objectId),
    deal: _joi["default"].objectId,
    lenderPlacement: _joi["default"].objectId,
    subject: _joi["default"].string().allow(''),
    emailContent: _joi["default"].string().allow(''),
    emailAttachments: _joi["default"].string().regex(new RegExp("https://".concat(_config["default"].aws.bucket, ".s3.amazonaws.com\\b([-a-zA-Z0-9()@:%_+.~#?&amp;/=]*.(pdf|doc|docx|ppt|pptx|xls|xlsx)$)"))).allow(''),
    isFirstTime: _joi["default"]["boolean"]()
  })
};
var updateEmailTemplate = exports.updateEmailTemplate = {
  body: _joi["default"].object().keys({
    from: _joi["default"].string().email(),
    ccList: _joi["default"].array().items(_joi["default"].string().email()),
    bccList: _joi["default"].array().items(_joi["default"].string().email()),
    contact: _joi["default"].array().items(_joi["default"].object().keys({
      sendTo: _joi["default"].string().email(),
      name: _joi["default"].string()
    })),
    advisorName: _joi["default"].string(),
    totalLoanAmount: _joi["default"].number(),
    dealDocument: _joi["default"].array().items(_joi["default"].objectId),
    deal: _joi["default"].objectId,
    lenderPlacement: _joi["default"].objectId,
    subject: _joi["default"].string(),
    emailContent: _joi["default"].string(),
    emailAttachments: _joi["default"].string().regex(new RegExp("https://".concat(_config["default"].aws.bucket, ".s3.amazonaws.com\\b([-a-zA-Z0-9()@:%_+.~#?&amp;/=]*.(pdf|doc|docx|ppt|pptx|xls|xlsx)$)")))
  }),
  params: _joi["default"].object().keys({
    emailTemplateId: _joi["default"].objectId().required()
  })
};
var getEmailTemplateById = exports.getEmailTemplateById = {
  params: _joi["default"].object().keys({
    emailTemplateId: _joi["default"].objectId().required()
  })
};
var deleteEmailTemplateById = exports.deleteEmailTemplateById = {
  params: _joi["default"].object().keys({
    emailTemplateId: _joi["default"].objectId().required()
  })
};
var getEmailTemplate = exports.getEmailTemplate = {
  body: _joi["default"].object().keys({}).unknown(true)
};
var paginatedEmailTemplate = exports.paginatedEmailTemplate = {
  body: _joi["default"].object().keys({}).unknown(true),
  query: _joi["default"].object().keys({
    page: _joi["default"].number()["default"](1),
    limit: _joi["default"].number()["default"](10).max(100)
  }).unknown(true)
};