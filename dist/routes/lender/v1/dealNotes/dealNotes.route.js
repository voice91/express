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
router.route('/paginated')
/**
 * getDealNotesPaginated
 * */
/**
 * @deprecated
 * This route is no longer in use as in lender page we are not showing deal notes anymore.
 */.get((0, _auth["default"])('lender'), (0, _validate["default"])(_lender2.dealNotesValidation.paginatedDealNotes), _lender.dealNotesController.paginate);
var _default = exports["default"] = router;