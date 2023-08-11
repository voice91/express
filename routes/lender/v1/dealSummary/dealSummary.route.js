import express from 'express';
import { dealSummaryController } from 'controllers/lender';
import { dealSummaryValidation } from 'validations/lender';
import auth from 'middlewares/auth';
import validate from 'middlewares/validate';

const router = express();

router
  .route('/:dealSummaryId')
  /**
   * getDealSummaryById
   * */
  .get(auth('lender'), validate(dealSummaryValidation.getDealSummaryById), dealSummaryController.get);
module.exports = router;
