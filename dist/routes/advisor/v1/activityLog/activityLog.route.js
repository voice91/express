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
 * createActivityLog
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.activityLogValidation.createActivityLog), _advisor.activityLogController.create)
/**
 * getActivityLog
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.activityLogValidation.getActivityLog), _advisor.activityLogController.list);
router.route('/paginated')
/**
 * getActivityLogPaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.activityLogValidation.paginatedActivityLog), _advisor.activityLogController.paginate);
router.route('/:activityLogId')
/**
 * getActivityLogById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.activityLogValidation.getActivityLogById), _advisor.activityLogController.get)
/**
 * updateActivityLog
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.activityLogValidation.updateActivityLog), _advisor.activityLogController.update)
/**
 * deleteActivityLogById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.activityLogValidation.deleteActivityLogById), _advisor.activityLogController.remove);
var _default = exports["default"] = router;