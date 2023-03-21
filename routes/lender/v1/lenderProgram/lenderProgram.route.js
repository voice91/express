import express from 'express';
import { lenderProgramController } from 'controllers/lender';
import { lenderProgramValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createLenderProgram
   * */
  .post(auth('lender'), validate(lenderProgramValidation.createLenderProgram), lenderProgramController.create)
  /**
   * getLenderProgram
   * */
  .get(auth('lender'), validate(lenderProgramValidation.getLenderProgram), lenderProgramController.list);
router
  .route('/paginated')
  /**
   * getLenderProgramPaginated
   * */
  .get(auth('lender'), validate(lenderProgramValidation.paginatedLenderProgram), lenderProgramController.paginate);
router
  .route('/:lenderProgramId')
  /**
   * getLenderProgramById
   * */
  .get(auth('lender'), validate(lenderProgramValidation.getLenderProgramById), lenderProgramController.get)
  /**
   * updateLenderProgram
   * */
  .put(auth('lender'), validate(lenderProgramValidation.updateLenderProgram), lenderProgramController.update)
  /**
   * deleteLenderProgramById
   * */
  .delete(auth('lender'), validate(lenderProgramValidation.deleteLenderProgramById), lenderProgramController.remove);
export default router;
