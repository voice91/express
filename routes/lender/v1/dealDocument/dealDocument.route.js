import express from 'express';
import { dealDocumentController } from 'controllers/lender';
import { dealDocumentValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * getDealDocument
   * */
  .get(auth('lender'), validate(dealDocumentValidation.getDealDocument), dealDocumentController.list);
router
  .route('/paginated')
  /**
   * getDealDocumentPaginated
   * */
  .get(auth('lender'), validate(dealDocumentValidation.paginatedDealDocument), dealDocumentController.paginate);
router
  .route('/:dealDocumentId')
  /**
   * getDealDocumentById
   * */
  .get(auth('lender'), validate(dealDocumentValidation.getDealDocumentById), dealDocumentController.get);
export default router;
