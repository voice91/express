import express from 'express';
import { lenderPlacementController } from 'controllers/user';
import { lenderPlacementValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createLenderPlacement
   * */
  .post(auth('user'), validate(lenderPlacementValidation.createLenderPlacement), lenderPlacementController.create)
  /**
   * getLenderPlacement
   * */
  .get(auth('user'), validate(lenderPlacementValidation.getLenderPlacement), lenderPlacementController.list);
router
  .route('/paginated')
  /**
   * getLenderPlacementPaginated
   * */
  .get(auth('user'), validate(lenderPlacementValidation.paginatedLenderPlacement), lenderPlacementController.paginate);
router
  .route('/documents/:lenderPlacementId')
  /**
   * getDocumentsUploadedInMessages
   * */
  /**
   * @deprecated
   * This route is no longer in use as borrower don't have access to messages.
   */
  .get(
    auth('user'),
    validate(lenderPlacementValidation.getDocumentsOfMessages),
    lenderPlacementController.getDocumentsOfMessages
  );
router
  .route('/remove')
  /**
   * removeLenderPlacement
   * */
  /**
   * @deprecated
   * This route is no longer in use as borrower don't have access to remove placements from the deal.
   */
  .delete(
    auth('user'),
    validate(lenderPlacementValidation.removeLenderPlacement),
    lenderPlacementController.removeByDealAndLendingInstitution
  );
router
  .route('/update')
  /**
   * updateManyLenderPlacements
   * */
  .put(auth('user'), validate(lenderPlacementValidation.updateManyLenderPlacement), lenderPlacementController.updateMany);
router
  .route('/:lenderPlacementId')
  /**
   * getLenderPlacementById
   * */
  .get(auth('user'), validate(lenderPlacementValidation.getLenderPlacementById), lenderPlacementController.get)
  /**
   * deleteLenderPlacementById
   * */
  .delete(auth('user'), validate(lenderPlacementValidation.deleteLenderPlacementById), lenderPlacementController.remove);
export default router;
