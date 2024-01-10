"use strict";

var _express = _interopRequireDefault(require("express"));
var _user = require("../../../../controllers/user");
var _user2 = require("../../../../validations/user");
var _auth = _interopRequireDefault(require("../../../../middlewares/auth"));
var _validate = _interopRequireDefault(require("../../../../middlewares/validate"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();
router.route('/')
/**
 * importFileForDealSummary
 * */
/**
 * @deprecated
 * This route is no longer in use as borrower don't have access to import file for deal summary anymore.
 */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealSummaryValidation.importFileForDealSummary), _user.dealSummaryController.importFileForDealSummary);
router.route('/create')
/**
 * createDealSummary
 * */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealSummaryValidation.createDealSummary), _user.dealSummaryController.create);
router.route('/:dealSummaryId')
/**
 * getDealSummaryById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealSummaryValidation.getDealSummaryById), _user.dealSummaryController.get)
/**
 * updateDealSummary
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.dealSummaryValidation.updateDealSummary), _user.dealSummaryController.update);
module.exports = router;