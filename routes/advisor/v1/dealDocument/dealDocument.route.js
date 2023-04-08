import express from 'express';
import { dealDocumentController } from 'controllers/advisor';
import { dealDocumentValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';
import checkAccessOfDeal from 'middlewares/checkUserOfDeal';

const router = express.Router();
router
  .route('/')
  /**
   * createDealDocument
   * */
  .post(
    auth('advisor'),
    validate(dealDocumentValidation.createDealDocument),
    checkAccessOfDeal,
    dealDocumentController.create
  );
router
  .route('/deal/:dealId')
  /**
   * getDealDocument
   * */
  .get(auth('advisor'), validate(dealDocumentValidation.getDealDocument), checkAccessOfDeal, dealDocumentController.list);
router
  .route('/paginated')
  /**
   * getDealDocumentPaginated
   * */
  .get(auth('advisor'), validate(dealDocumentValidation.paginatedDealDocument), dealDocumentController.paginate);
router
  .route('/:dealDocumentId')
  /**
   * getDealDocumentById
   * */
  .get(auth('advisor'), validate(dealDocumentValidation.getDealDocumentById), dealDocumentController.get)
  /**
   * updateDealDocument
   * */
  .put(
    auth('advisor'),
    validate(dealDocumentValidation.updateDealDocument),
    checkAccessOfDeal,
    dealDocumentController.update
  )
  .delete(auth('advisor'), validate(dealDocumentValidation.deleteDealDocumentById), dealDocumentController.remove);
export default router;
