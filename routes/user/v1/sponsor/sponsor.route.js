import express from 'express';
import { sponsorController } from 'controllers/user';
import { sponsorValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * getSponsor
   * */
  .get(auth('user'), validate(sponsorValidation.getSponsor), sponsorController.listSponsor);

router
  .route('/:sponsorId')
  /**
   * getSponsorById
   * */
  .get(auth('user'), validate(sponsorValidation.getSponsorById), sponsorController.getSponsor);
export default router;
