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
 * createActivityLog
 * */.post((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.activityLogValidation.createActivityLog), _lender.activityLogController.create)
/**
 * getActivityLog
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.activityLogValidation.getActivityLog), _lender.activityLogController.list);
router.route('/paginated')
/**
 * getActivityLogPaginated
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.activityLogValidation.paginatedActivityLog), _lender.activityLogController.paginate);
router.route('/:activityLogId')
/**
 * getActivityLogById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.activityLogValidation.getActivityLogById), _lender.activityLogController.get)
/**
 * updateActivityLog
 * */.put((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.activityLogValidation.updateActivityLog), _lender.activityLogController.update)
/**
 * deleteActivityLogById
 * */["delete"]((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.activityLogValidation.deleteActivityLogById), _lender.activityLogController.remove);
var _default = exports["default"] = router;