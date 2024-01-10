"use strict";

var _express = _interopRequireDefault(require("express"));
var _advisor = require("../../../../controllers/advisor");
var _advisor2 = require("../../../../validations/advisor");
var _auth = _interopRequireDefault(require("../../../../middlewares/auth"));
var _validate = _interopRequireDefault(require("../../../../middlewares/validate"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();
router.route('/read-data-from-excel-sheet')
/**
 * importFileForDealSummary
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealSummaryValidation.importFileForDealSummary), _advisor.dealSummaryController.importFileForDealSummary);
router.route('/create')
/**
 * createDealSummary
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealSummaryValidation.createDealSummary), _advisor.dealSummaryController.create);
router.route('/:dealSummaryId/update-and-download')
/**
 * update-and-download DealSummary
 * */
/**
 * @deprecated
 * This route is no longer in use as we are not exporting file for deal summary.
 */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealSummaryValidation.exportFileForDealSummary), _advisor.dealSummaryController.exportFileForDealSummary);
router.route('/:dealSummaryId')
/**
 * getDealSummaryById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealSummaryValidation.getDealSummaryById), _advisor.dealSummaryController.get)
/**
 * updateDealSummary
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.dealSummaryValidation.updateDealSummary), _advisor.dealSummaryController.update);
module.exports = router;