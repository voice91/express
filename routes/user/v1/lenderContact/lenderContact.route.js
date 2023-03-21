import express from 'express';
import { lenderContactController } from 'controllers/user';
import { lenderContactValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createLenderContact
   * */
  .post(auth('user'), validate(lenderContactValidation.createLenderContact), lenderContactController.create)
  /**
   * getLenderContact
   * */
  .get(auth('user'), validate(lenderContactValidation.getLenderContact), lenderContactController.list);
router
  .route('/paginated')
  /**
   * getLenderContactPaginated
   * */
  .get(auth('user'), validate(lenderContactValidation.paginatedLenderContact), lenderContactController.paginate);
router
  .route('/:lenderContactId')
  /**
   * getLenderContactById
   * */
  .get(auth('user'), validate(lenderContactValidation.getLenderContactById), lenderContactController.get)
  /**
   * updateLenderContact
   * */
  .put(auth('user'), validate(lenderContactValidation.updateLenderContact), lenderContactController.update)
  /**
   * deleteLenderContactById
   * */
  .delete(auth('user'), validate(lenderContactValidation.deleteLenderContactById), lenderContactController.remove);
export default router;
