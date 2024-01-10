import express from 'express';
import { sponsorController } from "../../../../controllers/advisor";
import { sponsorValidation } from "../../../../validations/advisor";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createSponsor
 * */.post(auth('advisor'), validate(sponsorValidation.createSponsor), sponsorController.createSponsor)
/**
 * getSponsor
 * */.get(auth('advisor'), validate(sponsorValidation.getSponsor), sponsorController.listSponsor);
// router
//   .route('/paginated')
//   /**
//    * getSponsorPaginated
//    * */
//   .get(auth('advisor'), validate(sponsorValidation.paginatedSponsor), sponsorController.paginateSponsor);
router.route('/:sponsorId')
/**
 * getSponsorById
 * */.get(auth('advisor'), validate(sponsorValidation.getSponsorById), sponsorController.getSponsor)
/**
 * updateSponsor
 * */.put(auth('advisor'), validate(sponsorValidation.updateSponsor), sponsorController.updateSponsor);
// /**
//  * deleteSponsorById
//  * */
// .delete(auth('advisor'), validate(sponsorValidation.deleteSponsorById), sponsorController.removeSponsor);
export default router;