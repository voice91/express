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
 * createLenderPlacement
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.createLenderPlacement), _advisor.lenderPlacementController.create)
/**
 * getLenderPlacement
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.getLenderPlacement), _advisor.lenderPlacementController.list);
router.route('/paginated')
/**
 * getLenderPlacementPaginated
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.paginatedLenderPlacement), _advisor.lenderPlacementController.paginate);
router.route('/update')
/**
 * updateManyLenderPlacements
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.updateManyLenderPlacement), _advisor.lenderPlacementController.updateMany);
router.route('/remove')
/**
 * removeLenderPlacement
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.removeLenderPlacement), _advisor.lenderPlacementController.removeByDealAndLendingInstitution);
router.route('/:lenderPlacementId/document/:documentId')
/**
 * remove document from message
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.removeDocument), _advisor.lenderPlacementController.removeDocument);
router.route('/:lenderPlacementId')
/**
 * getLenderPlacementById
 * */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.getLenderPlacementById), _advisor.lenderPlacementController.get)
/**
 * updateLenderPlacement
 * */.put((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.updateLenderPlacement), _advisor.lenderPlacementController.update)
/**
 * deleteLenderPlacementById
 * */["delete"]((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.deleteLenderPlacementById), _advisor.lenderPlacementController.remove);
router.route('/sendDeal')
/**
 * Create Template or sendDeal
 * */
/**
 * @deprecated
 * This route is no longer in use instead we are using '/sendDeal/v3' as we only have one template instead of choosing different templates, and also we added functionality of sending deals to multiple lender.
 */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.sendDeal), _advisor.lenderPlacementController.sendDeal);

/**
 * send deal & multiple send deal flow
 */
router.route('/sendDeal/v3')
// send necessary data to FE
.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.getEmailDataV3), _advisor.lenderPlacementController.getEmailDataV3)
// send deal email to lender & also send to multiple lender
.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.sendEmailV3), _advisor.lenderPlacementController.sendEmailV3);
router.route('/message/:lenderPlacementId')
/**
 * email lender
 * */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.sendMessage), _advisor.lenderPlacementController.sendMessage).get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.getMessages), _advisor.lenderPlacementController.getMessages);
router.route('/v2/send-deal')
/**
 * Create Template and sendDeal
 * This route is also used for followUp
 * */
/**
 * @deprecated
 * This route is no longer in use instead we are using '/sendDeal/v3' we added the functionality of sending deal to multiple lenders.
 */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.sendDealV2), _advisor.lenderPlacementController.sendDealV2);
router.route('/sendDeal/get-all-email-template-placement-id/:lenderPlacement')
/**
 * Create Template or sendDeal
 * */
/**
 * @deprecated
 * This route is no longer in use as the functionality of choosing templates for send deal has been removed.
 */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.getEmailTemplatesByLanderPlacementId), _advisor.lenderPlacementController.getEmailTemplatesByLanderPlacementId);
router.route('/sendDeal/:emailTemplateId')
/**
 * getTemplateByTemplateId
 * */
/**
 * @deprecated
 * This route is no longer in use as the functionality of email templates has been removed.
 */.get((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.getEmailTemplateId), _advisor.lenderPlacementController.getTemplateByTemplateId)
/**
 * sendTestMail or sendEmail
 * */
/**
 * @deprecated
 * This route is no longer in use instead we are using '/sendDeal/v3'.
 */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.sendEmail), _advisor.lenderPlacementController.sendEmail);
router.route('/update-sendDeal/:emailTemplateId')
/**
 * Update and Save Template
 * */
/**
 * @deprecated
 * This route is no longer in use as the functionality to choose and update email template has been removed.
 */.post((0, _auth["default"])('advisor'), (0, _validate["default"])(_advisor2.lenderPlacementValidation.updateAndSaveInitialEmailContent), _advisor.lenderPlacementController.updateAndSaveInitialEmailContent);
var _default = exports["default"] = router;