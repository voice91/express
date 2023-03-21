import express from 'express';
import { dealNotesController } from 'controllers/advisor';
import { dealNotesValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createDealNotes
   * */
  .post(auth('advisor'), validate(dealNotesValidation.createDealNotes), dealNotesController.create)
  /**
   * getDealNotes
   * */
  .get(auth('advisor'), validate(dealNotesValidation.getDealNotes), dealNotesController.list);
router
  .route('/paginated')
  /**
   * getDealNotesPaginated
   * */
  .get(auth('advisor'), validate(dealNotesValidation.paginatedDealNotes), dealNotesController.paginate);
router
  .route('/:dealNotesId')
  /**
   * getDealNotesById
   * */
  .get(auth('advisor'), validate(dealNotesValidation.getDealNotesById), dealNotesController.get)
  /**
   * updateDealNotes
   * */
  .put(auth('advisor'), validate(dealNotesValidation.updateDealNotes), dealNotesController.update)
  /**
   * deleteDealNotesById
   * */
  .delete(auth('advisor'), validate(dealNotesValidation.deleteDealNotesById), dealNotesController.remove);
export default router;
