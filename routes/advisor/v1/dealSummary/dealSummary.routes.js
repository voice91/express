import express from 'express';
import { dealSummaryController } from 'controllers/advisor';
import { dealSummaryValidation } from 'validations/advisor';
import auth from 'middlewares/auth';
import validate from 'middlewares/validate';

const router = express();

router
  .route('/')
  /**
   * importFileForDealSummary
   * */
  .post(
    auth('advisor'),
    validate(dealSummaryValidation.importFileForDealSummary),
    dealSummaryController.importFileForDealSummary
  );
router
  .route('/create')
  /**
   * createDealSummary
   * */
  .post(auth('advisor'), validate(dealSummaryValidation.createDealSummary), dealSummaryController.create);
router
  .route('/:dealSummaryId/update-and-download')
  /**
   * update-and-download DealSummary
   * */
  .post(
    auth('advisor'),
    validate(dealSummaryValidation.exportFileForDealSummary),
    dealSummaryController.exportFileForDealSummary
  );
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
