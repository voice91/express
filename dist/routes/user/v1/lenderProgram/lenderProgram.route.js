import express from 'express';
import { lenderProgramController } from "../../../../controllers/user";
import { lenderProgramValidation } from "../../../../validations/user";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * getLenderProgram
 * */.get(auth('user'), validate(lenderProgramValidation.getLenderProgram), lenderProgramController.list);
router.route('/paginated')
/**
 * getLenderProgramPaginated
 * */.get(auth('user'), validate(lenderProgramValidation.paginatedLenderProgram), lenderProgramController.paginate);
router.route('/listProgram/:lenderInstitute')
/**
 * getLenderProgramByLenderInstitute
 * */
/**
 * @deprecated
 * This route is no longer in use as borrower don't have access to programs.
 */.get(auth('user'), validate(lenderProgramValidation.listLenderProgramByInstitute), lenderProgramController.listLenderProgramByInstitute);
router.route('/:lenderProgramId')
/**
 * getLenderProgramById
 * */.get(auth('user'), validate(lenderProgramValidation.getLenderProgramById), lenderProgramController.get)
/**
 * updateLenderProgram
 * */.put(auth('user'), validate(lenderProgramValidation.updateLenderProgram), lenderProgramController.update)
/**
 * deleteLenderProgramById
 * */.delete(auth('user'), validate(lenderProgramValidation.deleteLenderProgramById), lenderProgramController.remove);
export default router;