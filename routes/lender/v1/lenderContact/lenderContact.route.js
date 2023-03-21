import express from 'express';
import { lenderContactController } from 'controllers/lender';
import { lenderContactValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createLenderContact
   * */
  .post(auth('lender'), validate(lenderContactValidation.createLenderContact), lenderContactController.create)
  /**
   * getLenderContact
   * */
  .get(auth('lender'), validate(lenderContactValidation.getLenderContact), lenderContactController.list);
router
  .route('/paginated')
  /**
   * getLenderContactPaginated
   * */
  .get(auth('lender'), validate(lenderContactValidation.paginatedLenderContact), lenderContactController.paginate);
router
  .route('/:lenderContactId')
  /**
   * getLenderContactById
   * */
  .get(auth('lender'), validate(lenderContactValidation.getLenderContactById), lenderContactController.get)
  /**
   * updateLenderContact
   * */
  .put(auth('lender'), validate(lenderContactValidation.updateLenderContact), lenderContactController.update)
  /**
   * deleteLenderContactById
   * */
  .delete(auth('lender'), validate(lenderContactValidation.deleteLenderContactById), lenderContactController.remove);
export default router;
