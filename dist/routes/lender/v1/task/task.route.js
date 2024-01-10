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
 * getTask
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.taskValidation.getTask), _lender.taskController.list);
router.route('/paginated')
/**
 * getTaskPaginated
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.taskValidation.paginatedTask), _lender.taskController.paginate);
router.route('/:taskId')
/**
 * getTaskById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.taskValidation.getTaskById), _lender.taskController.get);
var _default = exports["default"] = router;