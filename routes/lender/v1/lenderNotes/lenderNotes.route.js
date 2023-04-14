import express from 'express';
import { lenderNotesController } from 'controllers/lender';
import { lenderNotesValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createLenderNotes
   * */
  .post(auth('lender'), validate(lenderNotesValidation.createLenderNotes), lenderNotesController.create);
router
  .route('/lenderInstitute/:lenderInstituteId')
  /**
   * getLenderNotes
   * */
  .get(auth('lender'), validate(lenderNotesValidation.getLenderNotes), lenderNotesController.list);
router
  .route('/deal/:dealId/paginated')
  /**
   * getLenderNotesPaginated
   * */
  .get(auth('lender'), validate(lenderNotesValidation.paginatedLenderNotes), lenderNotesController.paginate);
router
  .route('/:lenderNotesId')
  /**
   * getLenderNotesById
   * */
  .get(auth('lender'), validate(lenderNotesValidation.getLenderNotesById), lenderNotesController.get)
  /**
   * updateLenderNotes
   * */
  .put(auth('lender'), validate(lenderNotesValidation.updateLenderNotes), lenderNotesController.update)
  /**
   * deleteLenderNotesById
   * */
  .delete(auth('lender'), validate(lenderNotesValidation.deleteLenderNotesById), lenderNotesController.remove);
export default router;
