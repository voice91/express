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
var _checkUserOfDeal = _interopRequireDefault(require("../../../../middlewares/checkUserOfDeal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/')
/**
 * createTask
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.taskValidation.createTask), _checkUserOfDeal["default"], _advisor.taskController.create)
/**
 * getTask
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.taskValidation.getTask), _checkUserOfDeal["default"], _advisor.taskController.list);
router.route('/deal/:dealId')
/**
 * getTask
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.taskValidation.getTaskByDealId), _checkUserOfDeal["default"], _advisor.taskController.listByDeal);
router.route('/deal/:dealId/paginated')
/**
 * getTaskPaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.taskValidation.paginatedTask), _checkUserOfDeal["default"], _advisor.taskController.paginate);
router.route('/:taskId')
/**
 * getTaskById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.taskValidation.getTaskById), _advisor.taskController.get)
/**
 * updateTask
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.taskValidation.updateTask), _checkUserOfDeal["default"], _advisor.taskController.update)
/**
 * deleteTaskById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.taskValidation.deleteTaskById), _advisor.taskController.remove);
router.route('/taskDocument/:taskDocumentId')["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.taskValidation.deleteTaskDocument), _advisor.taskController.removeTaskDocument);
var _default = exports["default"] = router;