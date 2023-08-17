import express from 'express';
import { lenderPlacementController } from 'controllers/advisor';
import { lenderPlacementValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createLenderPlacement
   * */
  .post(auth('advisor'), validate(lenderPlacementValidation.createLenderPlacement), lenderPlacementController.create)
  /**
   * getLenderPlacement
   * */
  .get(auth('advisor'), validate(lenderPlacementValidation.getLenderPlacement), lenderPlacementController.list);
router
  .route('/paginated')
  /**
   * getLenderPlacementPaginated
   * */
  .get(auth('advisor'), validate(lenderPlacementValidation.paginatedLenderPlacement), lenderPlacementController.paginate);

router
  .route('/update')
  /**
   * updateManyLenderPlacements
   * */
  .put(auth('advisor'), validate(lenderPlacementValidation.updateManyLenderPlacement), lenderPlacementController.updateMany);

router
  .route('/remove')
  /**
   * removeLenderPlacement
   * */
  .delete(
    auth('advisor'),
    validate(lenderPlacementValidation.removeLenderPlacement),
    lenderPlacementController.removeByDealAndLendingInstitution
  );
router
  .route('/:lenderPlacementId/document/:documentId')
  /**
   * remove document from message
   * */
  .delete(auth('advisor'), validate(lenderPlacementValidation.removeDocument), lenderPlacementController.removeDocument);
router
  .route('/:lenderPlacementId')
  /**
   * getLenderPlacementById
   * */
  .get(auth('advisor'), validate(lenderPlacementValidation.getLenderPlacementById), lenderPlacementController.get)
  /**
   * updateLenderPlacement
   * */
  .put(auth('advisor'), validate(lenderPlacementValidation.updateLenderPlacement), lenderPlacementController.update)
  /**
   * deleteLenderPlacementById
   * */
  .delete(auth('advisor'), validate(lenderPlacementValidation.deleteLenderPlacementById), lenderPlacementController.remove);

router
  .route('/sendDeal')
  /**
   * Create Template or sendDeal
   * */
  .post(auth('advisor'), validate(lenderPlacementValidation.sendDeal), lenderPlacementController.sendDeal);

router
  .route('/message/:lenderPlacementId')
  /**
   * email lender
   * */
  .post(auth('advisor'), validate(lenderPlacementValidation.sendMessage), lenderPlacementController.sendMessage)
  .get(auth('advisor'), validate(lenderPlacementValidation.getMessages), lenderPlacementController.getMessages);

router
  .route('/v2/send-deal')
  /**
   * Create Template and sendDeal
   * This route is also used for followUp
   * */
  .post(auth('advisor'), validate(lenderPlacementValidation.sendDealV2), lenderPlacementController.sendDealV2);

router
  .route('/sendDeal/get-all-email-template-placement-id/:lenderPlacement')
  /**
   * Create Template or sendDeal
   * */
  .get(
    auth('advisor'),
    validate(lenderPlacementValidation.getEmailTemplatesByLanderPlacementId),
    lenderPlacementController.getEmailTemplatesByLanderPlacementId
  );

router
  .route('/sendDeal/:emailTemplateId')
  /**
   * getTemplateByTemplateId
   * */
  .get(
    auth('advisor'),
    validate(lenderPlacementValidation.getEmailTemplateId),
    lenderPlacementController.getTemplateByTemplateId
  )
  /**
   * sendTestMail or sendEmail
   * */
  .post(auth('advisor'), validate(lenderPlacementValidation.sendEmail), lenderPlacementController.sendEmail);
router
  .route('/update-sendDeal/:emailTemplateId')
  /**
   * Update and Save Template
   * */
  .post(
    auth('advisor'),
    validate(lenderPlacementValidation.updateAndSaveInitialEmailContent),
    lenderPlacementController.updateAndSaveInitialEmailContent
  );
export default router;
