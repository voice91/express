"use strict";

var _express = _interopRequireDefault(require("express"));
var _lender = require("../../../../controllers/lender");
var _lender2 = require("../../../../validations/lender");
var _auth = _interopRequireDefault(require("../../../../middlewares/auth"));
var _validate = _interopRequireDefault(require("../../../../middlewares/validate"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = (0, _express["default"])();
router.route('/:dealSummaryId')
/**
 * getDealSummaryById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.dealSummaryValidation.getDealSummaryById), _lender.dealSummaryController.get);
module.exports = router;