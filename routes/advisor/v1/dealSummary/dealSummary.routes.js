import express from 'express';
import { dealSummaryController } from 'controllers/advisor';
import { dealSummaryValidation } from 'validations/advisor';
import auth from 'middlewares/auth';
import validate from 'middlewares/validate';

const router = express();

router
  .route('/')
  /**
   * createDealSummary
   * */
  .post(auth('advisor'), validate(dealSummaryValidation.createDealSummary), dealSummaryController.create);
router
  .route('/:dealSummaryId')
  /**
   * getDealSummaryById
   * */
  .get(auth('advisor'), validate(dealSummaryValidation.getDealSummaryById), dealSummaryController.get)
  /**
   * updateDealSummary
   * */
  .put(auth('advisor'), validate(dealSummaryValidation.updateDealSummary), dealSummaryController.update);
module.exports = router;
