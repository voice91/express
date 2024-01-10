import express from 'express';
import { dealController } from "../../../../controllers/user";
import { dealValidation } from "../../../../validations/user";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
import checkAccessOfDeal from "../../../../middlewares/checkUserOfDeal";
const router = express.Router();
router.route('/')
/**
 * getDeal
 * */.get(auth('user'), validate(dealValidation.getDeal), dealController.list);
router.route('/paginated')
/**
 * getDealPaginated
 * */.get(auth('user'), validate(dealValidation.paginatedDeal), dealController.paginate);
router.route('/:dealId')
/**
 * getDealById
 * */.get(auth('user'), validate(dealValidation.getDealById), dealController.get)
/**
 * deleteDealById
 * */.delete(auth('user'), validate(dealValidation.deleteDealById), dealController.remove);
router.route('/invitation')
/**
 * @deprecated
 * This route is no longer in use as borrowers don't have access to send invitation to other borrowers in the deal anymore.
 */.post(auth('user'), validate(dealValidation.invitationToDeal), checkAccessOfDeal, dealController.dealInvitation);
export default router;