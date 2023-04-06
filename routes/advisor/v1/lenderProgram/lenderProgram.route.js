import express from 'express';
import { lenderProgramController } from 'controllers/advisor';
import { lenderProgramValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';
import checkUserOfDeal from '../../../../middlewares/checkUserOfDeal';

const router = express.Router();
router
  .route('/')
  /**
   * createLenderProgram
   * */
  .post(
    auth('advisor'),
    validate(lenderProgramValidation.createLenderProgram),
    checkUserOfDeal,
    lenderProgramController.create
  )
  /**
   * getLenderProgram
   * */
  .get(auth('advisor'), validate(lenderProgramValidation.getLenderProgram), lenderProgramController.list);
router
  .route('/paginated')
  /**
   * getLenderProgramPaginated
   * */
  .get(auth('advisor'), validate(lenderProgramValidation.paginatedLenderProgram), lenderProgramController.paginate);
router
  .route('/:lenderProgramId')
  /**
   * getLenderProgramById
   * */
  .get(auth('advisor'), validate(lenderProgramValidation.getLenderProgramById), lenderProgramController.get)
  /**
   * updateLenderProgram
   * */
  .put(auth('advisor'), validate(lenderProgramValidation.updateLenderProgram), lenderProgramController.update)
  /**
   * deleteLenderProgramById
   * */
  .delete(auth('advisor'), validate(lenderProgramValidation.deleteLenderProgramById), lenderProgramController.remove);
export default router;
