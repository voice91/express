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
  .route('/:lenderPlacementId')
  /**
   * getLenderPlacementById
   * */
  .get(auth('user'), validate(lenderPlacementValidation.getLenderPlacementById), lenderPlacementController.get)
  /**
   * updateLenderPlacement
   * */
  .put(auth('user'), validate(lenderPlacementValidation.updateLenderPlacement), lenderPlacementController.update)
  /**
   * deleteLenderPlacementById
   * */
  .delete(auth('user'), validate(lenderPlacementValidation.deleteLenderPlacementById), lenderPlacementController.remove);
export default router;
