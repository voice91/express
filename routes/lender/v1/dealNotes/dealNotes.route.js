import express from 'express';
import { dealNotesController } from 'controllers/lender';
import { dealNotesValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/paginated')
  /**
   * getDealNotesPaginated
   * */
  .get(auth('lender'), validate(dealNotesValidation.paginatedDealNotes), dealNotesController.paginate);
export default router;
