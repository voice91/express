import express from 'express';
import { lenderNotesController } from 'controllers/advisor';
import { lenderNotesValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';
import checkAccessOfDeal from '../../../../middlewares/checkUserOfDeal';

const router = express.Router();
router
  .route('/')
  /**
   * createLenderNotes
   * */
  .post(auth('advisor'), validate(lenderNotesValidation.createLenderNotes), checkAccessOfDeal, lenderNotesController.create);
router
  .route('/deal/:dealId')
  /**
   * getLenderNotes
   * */
  .get(auth('advisor'), validate(lenderNotesValidation.getLenderNotes), checkAccessOfDeal, lenderNotesController.list);
router
  .route('/deal/:dealId/paginated')
  /**
   * getLenderNotesPaginated
   * */
  .get(auth('advisor'), validate(lenderNotesValidation.paginatedLenderNotes), lenderNotesController.paginate);
router
  .route('/:lenderNotesId')
  /**
   * getLenderNotesById
   * */
  .get(auth('advisor'), validate(lenderNotesValidation.getLenderNotesById), lenderNotesController.get)
  /**
   * updateLenderNotes
   * */
  .put(auth('advisor'), validate(lenderNotesValidation.updateLenderNotes), lenderNotesController.update)
  /**
   * deleteLenderNotesById
   * */
  .delete(auth('advisor'), validate(lenderNotesValidation.deleteLenderNotesById), lenderNotesController.remove);
export default router;
