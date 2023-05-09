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
export default router;
