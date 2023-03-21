import express from 'express';
import { dealController } from 'controllers/user';
import { dealValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * getDeal
   * */
  .get(auth('user'), validate(dealValidation.getDeal), dealController.list);
router
  .route('/paginated')
  /**
   * getDealPaginated
   * */
  .get(auth('user'), validate(dealValidation.paginatedDeal), dealController.paginate);
router
  .route('/:dealId')
  /**
   * getDealById
   * */
  .get(auth('user'), validate(dealValidation.getDealById), dealController.get)
  /**
   * deleteDealById
   * */
  .delete(auth('user'), validate(dealValidation.deleteDealById), dealController.remove);
export default router;
