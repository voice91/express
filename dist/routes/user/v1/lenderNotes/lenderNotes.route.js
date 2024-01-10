import express from 'express';
import { lenderNotesController } from "../../../../controllers/user";
import { lenderNotesValidation } from "../../../../validations/user";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createLenderNotes
 * */.post(auth('user'), validate(lenderNotesValidation.createLenderNotes), lenderNotesController.create)
/**
 * getLenderNotes
 * */.get(auth('user'), validate(lenderNotesValidation.getLenderNotes), lenderNotesController.list);
router.route('/paginated')
/**
 * getLenderNotesPaginated
 * */.get(auth('user'), validate(lenderNotesValidation.paginatedLenderNotes), lenderNotesController.paginate);
router.route('/:lenderNotesId')
/**
 * getLenderNotesById
 * */.get(auth('user'), validate(lenderNotesValidation.getLenderNotesById), lenderNotesController.get)
/**
 * updateLenderNotes
 * */.put(auth('user'), validate(lenderNotesValidation.updateLenderNotes), lenderNotesController.update)
/**
 * deleteLenderNotesById
 * */.delete(auth('user'), validate(lenderNotesValidation.deleteLenderNotesById), lenderNotesController.remove);
export default router;