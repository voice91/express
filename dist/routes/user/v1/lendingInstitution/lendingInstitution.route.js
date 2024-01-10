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
 * getLendingInstitution
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lendingInstitutionValidation.getLendingInstitution), _user.lendingInstitutionController.list);
router.route('/paginated')
/**
 * getLendingInstitutionPaginated
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lendingInstitutionValidation.paginatedLendingInstitution), _user.lendingInstitutionController.paginate);
router.route('/:lendingInstitutionId')
/**
 * getLendingInstitutionById
 * */.get((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lendingInstitutionValidation.getLendingInstitutionById), _user.lendingInstitutionController.get)
/**
 * updateLendingInstitution
 * */.put((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lendingInstitutionValidation.updateLendingInstitution), _user.lendingInstitutionController.update)
/**
 * deleteLendingInstitutionById
 * */["delete"]((0, _auth["default"])('user'), (0, _validate["default"])(_user2.lendingInstitutionValidation.deleteLendingInstitutionById), _user.lendingInstitutionController.remove);
var _default = exports["default"] = router;