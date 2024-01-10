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
 * createSponsor
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.sponsorValidation.createSponsor), _advisor.sponsorController.createSponsor)
/**
 * getSponsor
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.sponsorValidation.getSponsor), _advisor.sponsorController.listSponsor);
// router
//   .route('/paginated')
//   /**
//    * getSponsorPaginated
//    * */
//   .get(auth('advisor'), validate(sponsorValidation.paginatedSponsor), sponsorController.paginateSponsor);
router.route('/:sponsorId')
/**
 * getSponsorById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.sponsorValidation.getSponsorById), _advisor.sponsorController.getSponsor)
/**
 * updateSponsor
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.sponsorValidation.updateSponsor), _advisor.sponsorController.updateSponsor);
// /**
//  * deleteSponsorById
//  * */
// .delete(auth('advisor'), validate(sponsorValidation.deleteSponsorById), sponsorController.removeSponsor);
var _default = exports["default"] = router;