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
  .route('/remove')
  /**
   * removeLenderPlacement
   * */
  .delete(
    auth('user'),
    validate(lenderPlacementValidation.removeLenderPlacement),
    lenderPlacementController.removeByDealAndLendingInstitution
  );
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
