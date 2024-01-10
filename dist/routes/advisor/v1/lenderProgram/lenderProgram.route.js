import express from 'express';
import { lenderProgramController } from "../../../../controllers/advisor";
import { lenderProgramValidation } from "../../../../validations/advisor";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createLenderProgram
 * */.post(auth('advisor'), validate(lenderProgramValidation.createLenderProgram), lenderProgramController.create)
/**
 * getLenderProgram
 * */.get(auth('advisor'), validate(lenderProgramValidation.getLenderProgram), lenderProgramController.list);
router.route('/add-lender')
/**
 * Add Lender
 */.post(auth('advisor'), validate(lenderProgramValidation.addLender), lenderProgramController.addLender);
router.route('/edit-lender/:lenderInstitute')
/**
 * Edit Lender
 */.put(auth('advisor'), validate(lenderProgramValidation.editLender), lenderProgramController.editLender);
router.route('/paginated')
/**
 * getLenderProgramPaginated
 * */.get(auth('advisor'), validate(lenderProgramValidation.paginatedLenderProgram), lenderProgramController.paginate);
router.route('/listProgram/:lenderInstitute')
/**
 * getLenderProgramByLenderInstitute
 * */.get(auth('advisor'), validate(lenderProgramValidation.listLenderProgramByInstitute), lenderProgramController.listLenderProgramByInstitute);
router.route('/:lenderProgramId')
/**
 * getLenderProgramById
 * */.get(auth('advisor'), validate(lenderProgramValidation.getLenderProgramById), lenderProgramController.get)
/**
 * updateLenderProgram
 * */.put(auth('advisor'), validate(lenderProgramValidation.updateLenderProgram), lenderProgramController.update)
/**
 * deleteLenderProgramById
 * */.delete(auth('advisor'), validate(lenderProgramValidation.deleteLenderProgramById), lenderProgramController.remove);
export default router;