import express from 'express';
import { dealSummaryController } from 'controllers/user';
import { dealSummaryValidation } from 'validations/user';
import auth from 'middlewares/auth';
import validate from 'middlewares/validate';

const router = express();

router
  .route('/')
  /**
   * importFileForDealSummary
   * */
  .post(
    auth('user'),
    validate(dealSummaryValidation.importFileForDealSummary),
    dealSummaryController.importFileForDealSummary
  );
router
  .route('/create')
  /**
   * createDealSummary
   * */
  .post(auth('user'), validate(dealSummaryValidation.createDealSummary), dealSummaryController.create);
router
  .route('/:dealSummaryId')
  /**
   * getDealSummaryById
   * */
  .get(auth('user'), validate(dealSummaryValidation.getDealSummaryById), dealSummaryController.get)
  /**
   * updateDealSummary
   * */
  .put(auth('user'), validate(dealSummaryValidation.updateDealSummary), dealSummaryController.update);
module.exports = router;
