"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _lender = require("../../../../controllers/lender");
var _lender2 = require("../../../../validations/lender");
var _validate = _interopRequireDefault(require("../../../../middlewares/validate"));
var _auth = _interopRequireDefault(require("../../../../middlewares/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/')
/**
 * createEmailTemplate
 * */.post((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.emailTemplateValidation.createEmailTemplate), _lender.emailTemplateController.create)
/**
 * getEmailTemplate
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.emailTemplateValidation.getEmailTemplate), _lender.emailTemplateController.list);
router.route('/paginated')
/**
 * getEmailTemplatePaginated
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.emailTemplateValidation.paginatedEmailTemplate), _lender.emailTemplateController.paginate);
router.route('/:emailTemplateId')
/**
 * getEmailTemplateById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.emailTemplateValidation.getEmailTemplateById), _lender.emailTemplateController.get)
/**
 * updateEmailTemplate
 * */.put((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.emailTemplateValidation.updateEmailTemplate), _lender.emailTemplateController.update)
/**
 * deleteEmailTemplateById
 * */["delete"]((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.emailTemplateValidation.deleteEmailTemplateById), _lender.emailTemplateController.remove);
var _default = exports["default"] = router;