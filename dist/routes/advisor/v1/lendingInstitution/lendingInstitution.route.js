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
 * createLendingInstitution
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lendingInstitutionValidation.createLendingInstitution), _advisor.lendingInstitutionController.create)
/**
 * getLendingInstitution
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lendingInstitutionValidation.getLendingInstitution), _advisor.lendingInstitutionController.list);
router.route('/paginated')
/**
 * getLendingInstitutionPaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lendingInstitutionValidation.paginatedLendingInstitution), _advisor.lendingInstitutionController.paginate);
router.route('/:lendingInstitutionId')
/**
 * getLendingInstitutionById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lendingInstitutionValidation.getLendingInstitutionById), _advisor.lendingInstitutionController.get)
/**
 * updateLendingInstitution
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lendingInstitutionValidation.updateLendingInstitution), _advisor.lendingInstitutionController.update)
/**
 * deleteLendingInstitutionById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lendingInstitutionValidation.deleteLendingInstitutionById), _advisor.lendingInstitutionController.remove);
router.route('/:lendingInstitutionId/feed-back')
/**
 * getLendingInstitutionById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lendingInstitutionValidation.getLendingInstitutionFeedBack), _advisor.lendingInstitutionController.getLendingInstitutionFeedBack);
var _default = exports["default"] = router;