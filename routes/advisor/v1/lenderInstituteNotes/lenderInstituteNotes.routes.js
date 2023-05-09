import express from 'express';
import { lenderInstituteNotesController } from 'controllers/advisor';
import { lenderInstituteNotesValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createLenderInstituteNotes
   * */
  .post(
    auth('advisor'),
    validate(lenderInstituteNotesValidation.createLenderInstituteNotes),
    lenderInstituteNotesController.create
  );
router
  .route('/:lenderInstitute')
  /**
   * getLenderInstituteNotes
   * */
  .get(
    auth('advisor'),
    validate(lenderInstituteNotesValidation.getLenderInstituteNotes),
    lenderInstituteNotesController.list
  );
router
  .route('/:lenderInstituteNotesId')
  /**
   * updateLenderInstituteNotes
   * */
  .put(
    auth('advisor'),
    validate(lenderInstituteNotesValidation.updateLenderInstituteNotes),
    lenderInstituteNotesController.update
  )
  /**
   * deleteLenderInstituteNotesById
   * */
  .delete(
    auth('advisor'),
    validate(lenderInstituteNotesValidation.deleteLenderInstituteNotesById),
    lenderInstituteNotesController.remove
  );
export default router;
