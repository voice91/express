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
export default router;
