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
  .post(auth('advisor'), validate(lenderPlacementValidation.getEmailTemplateId), lenderPlacementController.sendEmail);
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
router
  .route('/sendDeal-findByPlatement/:lenderPlacement')
  /**
   * ListTemplateByLenderPlacement
   * */
  .get(
    auth('advisor'),
    validate(lenderPlacementValidation.listTemplateByLenderPlacement),
    lenderPlacementController.listTemplateByLenderPlacement
  );
export default router;
