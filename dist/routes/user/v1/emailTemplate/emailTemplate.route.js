"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _user = require("../../../../controllers/user");
var _user2 = require("../../../../validations/user");
var _validate = _interopRequireDefault(require("../../../../middlewares/validate"));
var _auth = _interopRequireDefault(require("../../../../middlewares/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/')
/**
 * createEmailTemplate
 * */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.emailTemplateValidation.createEmailTemplate), _user.emailTemplateController.create)
/**
 * getEmailTemplate
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.emailTemplateValidation.getEmailTemplate), _user.emailTemplateController.list);
router.route('/paginated')
/**
 * getEmailTemplatePaginated
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.emailTemplateValidation.paginatedEmailTemplate), _user.emailTemplateController.paginate);
router.route('/:emailTemplateId')
/**
 * getEmailTemplateById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.emailTemplateValidation.getEmailTemplateById), _user.emailTemplateController.get)
/**
 * updateEmailTemplate
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.emailTemplateValidation.updateEmailTemplate), _user.emailTemplateController.update)
/**
 * deleteEmailTemplateById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.emailTemplateValidation.deleteEmailTemplateById), _user.emailTemplateController.remove);
var _default = exports["default"] = router;