import express from 'express';
import { dealController } from 'controllers/lender';
import { dealValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * getDeal
   * */
  .get(auth('lender'), validate(dealValidation.getDeal), dealController.list);
router
  .route('/paginated')
  /**
   * getDealPaginated
   * */
  /**
   * @deprecated
   * Not using this route anymore, as per the latest requirement we need placement stage and timeline on lender page
   * */
  .get(auth('lender'), validate(dealValidation.paginatedDeal), dealController.paginate);
router
  .route('/:dealId')
  /**
   * getDealById
   * */
  .get(auth('lender'), validate(dealValidation.getDealById), dealController.get)
  /**
   * deleteDealById
   * */
  .delete(auth('lender'), validate(dealValidation.deleteDealById), dealController.remove);
export default router;
