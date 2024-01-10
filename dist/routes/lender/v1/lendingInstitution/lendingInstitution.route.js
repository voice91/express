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
 * createLendingInstitution
 * */.post((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lendingInstitutionValidation.createLendingInstitution), _lender.lendingInstitutionController.create)
/**
 * getLendingInstitution
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lendingInstitutionValidation.getLendingInstitution), _lender.lendingInstitutionController.list);
router.route('/paginated')
/**
 * getLendingInstitutionPaginated
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lendingInstitutionValidation.paginatedLendingInstitution), _lender.lendingInstitutionController.paginate);
router.route('/:lendingInstitutionId')
/**
 * getLendingInstitutionById
 * */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lendingInstitutionValidation.getLendingInstitutionById), _lender.lendingInstitutionController.get)
/**
 * updateLendingInstitution
 * */.put((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lendingInstitutionValidation.updateLendingInstitution), _lender.lendingInstitutionController.update)
/**
 * deleteLendingInstitutionById
 * */["delete"]((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.lendingInstitutionValidation.deleteLendingInstitutionById), _lender.lendingInstitutionController.remove);
var _default = exports["default"] = router;