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
  .route('/v2/add')
  /**
   * createDealDocument updated flow
   * */
  .post(
    auth('advisor'),
    validate(dealDocumentValidation.createDealDocumentV2),
    checkAccessOfDeal,
    dealDocumentController.createV2
  );
router
  .route('/deal/:dealId')
  /**
   * getDealDocument
   * */
  .get(
    auth('advisor'),
    validate(dealDocumentValidation.getDealDocument),
    checkAccessOfDeal,
    dealDocumentController.getDealDocumentByDeal
  );

router
  .route('/v2/deal/:dealId')
  /**
   * getDealDocuments list by deal
   * */
  .get(
    auth('advisor'),
    validate(dealDocumentValidation.getDealDocument),
    checkAccessOfDeal,
    dealDocumentController.getDealDocumentByDealV2
  );
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
  );
router
  .route('/documents/:documentId')
  .delete(auth('advisor'), validate(dealDocumentValidation.deleteDocument), dealDocumentController.removeDocument);
export default router;
