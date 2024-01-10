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
var _checkUserOfDeal = _interopRequireDefault(require("../../../../middlewares/checkUserOfDeal"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var router = _express["default"].Router();
router.route('/')
/**
 * getTask
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.taskValidation.getTask), _checkUserOfDeal["default"], _user.taskController.list);
router.route('/deal/:dealId')
/**
 * getTask
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.taskValidation.getTaskByDealId), _checkUserOfDeal["default"], _user.taskController.listByDeal);
router.route('/deal/:dealId/paginated')
/**
 * getTaskPaginated
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.taskValidation.paginatedTask), _checkUserOfDeal["default"], _user.taskController.paginate);
router.route('/:taskId')
/**
 * getTaskById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.taskValidation.getTaskById), _user.taskController.get)
/**
 * updateTask
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.taskValidation.updateTask), _checkUserOfDeal["default"], _user.taskController.update)
/**
 * deleteTaskById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.taskValidation.deleteTaskById), _user.taskController.remove);
router.route('/taskDocument/:taskDocumentId')["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.taskValidation.deleteTaskDocument), _user.taskController.removeTaskDocument);
var _default = exports["default"] = router;