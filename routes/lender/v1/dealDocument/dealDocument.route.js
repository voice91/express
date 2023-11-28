import express from 'express';
import { dealDocumentController } from 'controllers/lender';
import { dealDocumentValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';
import checkAccessOfDeal from '../../../../middlewares/checkUserOfDeal';

const router = express.Router();
router
  .route('/')
  /**
   * getDealDocument
   * */
  /**
   * @deprecated
   * This route is no longer in use instead we are using '/v2/deal/:dealId'.
   */
  .get(auth('lender'), validate(dealDocumentValidation.getDealDocument), dealDocumentController.list);
router
  .route('/v2/deal/:dealId')
  /**
   * getDealDocuments list by deal
   * */
  .get(
    auth('lender'),
    validate(dealDocumentValidation.getDealDocument),
    checkAccessOfDeal,
    dealDocumentController.getDealDocumentByDealV2
  );
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
