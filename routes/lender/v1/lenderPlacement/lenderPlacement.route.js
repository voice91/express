import express from 'express';
import { lenderPlacementController } from 'controllers/lender';
import { lenderPlacementValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createLenderPlacement
   * */
  .post(auth('lender'), validate(lenderPlacementValidation.createLenderPlacement), lenderPlacementController.create)
  /**
   * getLenderPlacement
   * */
  .get(auth('lender'), validate(lenderPlacementValidation.getLenderPlacement), lenderPlacementController.list);
router
  .route('/paginated')
  /**
   * getLenderPlacementPaginated
   * */
  /**
   * From now on have to use this route for showing deal, status and timeline for the placement.
   * */
  .get(auth('lender'), validate(lenderPlacementValidation.paginatedLenderPlacement), lenderPlacementController.paginate);
router
  .route('/message/:lenderPlacementId')
  /**
   * email lender
   * */
  /**
   * @deprecated
   * This route is no longer in use as lender can't send messages anymore.
   */
  .post(auth('lender'), validate(lenderPlacementValidation.sendMessage), lenderPlacementController.sendMessage)
  .get(auth('lender'), validate(lenderPlacementValidation.getMessages), lenderPlacementController.getMessages);
router
  .route('/:lenderPlacementId/document/:documentId')
  /**
   * remove document from message
   * */
  /**
   * @deprecated
   * This route is no longer in use as lender don't have access to messages anymore.
   */
  .delete(auth('lender'), validate(lenderPlacementValidation.removeDocument), lenderPlacementController.removeDocument);
router
  .route('/:lenderPlacementId')
  /**
   * getLenderPlacementById
   * */
  .get(auth('lender'), validate(lenderPlacementValidation.getLenderPlacementById), lenderPlacementController.get)
  /**
   * updateLenderPlacement
   * */
  .put(auth('lender'), validate(lenderPlacementValidation.updateLenderPlacement), lenderPlacementController.update)
  /**
   * deleteLenderPlacementById
   * */
  .delete(auth('lender'), validate(lenderPlacementValidation.deleteLenderPlacementById), lenderPlacementController.remove);
export default router;
