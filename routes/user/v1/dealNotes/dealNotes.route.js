import express from 'express';
import { dealNotesController } from 'controllers/user';
import { dealNotesValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createDealNotes
   * */
  .post(auth('user'), validate(dealNotesValidation.createDealNotes), dealNotesController.create);
router
  .route('/paginated')
  /**
   * getDealNotesPaginated
   * */
  .get(auth('user'), validate(dealNotesValidation.paginatedDealNotes), dealNotesController.paginate);
export default router;
