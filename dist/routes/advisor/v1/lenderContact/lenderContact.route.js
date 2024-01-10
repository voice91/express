import express from 'express';
import { lenderContactController } from "../../../../controllers/advisor";
import { lenderContactValidation } from "../../../../validations/advisor";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createLenderContact
 * */.post(auth('advisor'), validate(lenderContactValidation.createLenderContact), lenderContactController.create)
/**
 * getLenderContact
 * */.get(auth('advisor'), validate(lenderContactValidation.getLenderContact), lenderContactController.list);
router.route('/paginated')
/**
 * getLenderContactPaginated
 * */.get(auth('advisor'), validate(lenderContactValidation.paginatedLenderContact), lenderContactController.paginate);
router.route('/:lenderContactId')
/**
 * getLenderContactById
 * */.get(auth('advisor'), validate(lenderContactValidation.getLenderContactById), lenderContactController.get)
/**
 * updateLenderContact
 * */.put(auth('advisor'), validate(lenderContactValidation.updateLenderContact), lenderContactController.update)
/**
 * deleteLenderContactById
 * */.delete(auth('advisor'), validate(lenderContactValidation.deleteLenderContactById), lenderContactController.remove);
export default router;