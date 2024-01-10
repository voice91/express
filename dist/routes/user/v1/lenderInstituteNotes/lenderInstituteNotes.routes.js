import express from 'express';
import { lenderInstituteNotesController } from "../../../../controllers/user";
import { lenderInstituteNotesValidation } from "../../../../validations/user";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createLenderInstituteNotes
 * */.post(auth('user'), validate(lenderInstituteNotesValidation.createLenderInstituteNotes), lenderInstituteNotesController.create);
router.route('/:lenderInstitute')
/**
 * getLenderInstituteNotes
 * */.get(auth('user'), validate(lenderInstituteNotesValidation.getLenderInstituteNotes), lenderInstituteNotesController.list);
router.route('/:lenderInstituteNotesId')
/**
 * updateLenderInstituteNotes
 * */.put(auth('user'), validate(lenderInstituteNotesValidation.updateLenderInstituteNotes), lenderInstituteNotesController.update)
/**
 * deleteLenderInstituteNotesById
 * */.delete(auth('user'), validate(lenderInstituteNotesValidation.deleteLenderInstituteNotesById), lenderInstituteNotesController.remove);
export default router;