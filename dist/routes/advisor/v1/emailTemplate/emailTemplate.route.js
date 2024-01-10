"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _advisor = require("../../../../controllers/advisor");
var _advisor2 = require("../../../../validations/advisor");
var _validate = _interopRequireDefault(require("../../../../middlewares/validate"));
var _auth = _interopRequireDefault(require("../../../../middlewares/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/')
/**
 * createEmailTemplate
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.emailTemplateValidation.createEmailTemplate), _advisor.emailTemplateController.create)
/**
 * getEmailTemplate
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.emailTemplateValidation.getEmailTemplate), _advisor.emailTemplateController.list);
router.route('/paginated')
/**
 * getEmailTemplatePaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.emailTemplateValidation.paginatedEmailTemplate), _advisor.emailTemplateController.paginate);
router.route('/:emailTemplateId')
/**
 * getEmailTemplateById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.emailTemplateValidation.getEmailTemplateById), _advisor.emailTemplateController.get)
/**
 * updateEmailTemplate
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.emailTemplateValidation.updateEmailTemplate), _advisor.emailTemplateController.update)
/**
 * deleteEmailTemplateById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.emailTemplateValidation.deleteEmailTemplateById), _advisor.emailTemplateController.remove);
var _default = exports["default"] = router;