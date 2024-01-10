import express from 'express';
import { dealNotesController } from "../../../../controllers/lender";
import { dealNotesValidation } from "../../../../validations/lender";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/paginated')
/**
 * getDealNotesPaginated
 * */
/**
 * @deprecated
 * This route is no longer in use as in lender page we are not showing deal notes anymore.
 */.get(auth('lender'), validate(dealNotesValidation.paginatedDealNotes), dealNotesController.paginate);
export default router;