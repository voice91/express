import express from 'express';
import { dealController } from 'controllers/advisor';
import { dealValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createDeal
   * */
  .post(auth('advisor'), validate(dealValidation.createDeal), dealController.create)
  /**
   * getDeal
   * */
  .get(auth('advisor'), validate(dealValidation.getDeal), dealController.list);
router
  .route('/paginated')
  /**
   * getDealPaginated
   * */
  .get(auth('advisor'), validate(dealValidation.paginatedDeal), dealController.paginate);
router
  .route('/:dealId')
  /**
   * getDealById
   * */
  .get(auth('advisor'), validate(dealValidation.getDealById), dealController.get)
  /**
   * updateDeal
   * */
  .put(auth('advisor'), validate(dealValidation.updateDeal), dealController.update)
  /**
   * deleteDealById
   * */
  .delete(auth('advisor'), validate(dealValidation.deleteDealById), dealController.remove);
export default router;
