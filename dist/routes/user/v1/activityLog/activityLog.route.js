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
 * createActivityLog
 * */.post((0, _auth["default"])('user'), (0, _validate["default"])(_user2.activityLogValidation.createActivityLog), _user.activityLogController.create)
/**
 * getActivityLog
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.activityLogValidation.getActivityLog), _user.activityLogController.list);
router.route('/paginated')
/**
 * getActivityLogPaginated
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.activityLogValidation.paginatedActivityLog), _user.activityLogController.paginate);
router.route('/:activityLogId')
/**
 * getActivityLogById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.activityLogValidation.getActivityLogById), _user.activityLogController.get)
/**
 * updateActivityLog
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.activityLogValidation.updateActivityLog), _user.activityLogController.update)
/**
 * deleteActivityLogById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.activityLogValidation.deleteActivityLogById), _user.activityLogController.remove);
var _default = exports["default"] = router;