import express from 'express';
import { dealDocumentController } from 'controllers/user';
import { dealDocumentValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';
import checkAccessOfDeal from '../../../../middlewares/checkUserOfDeal';

const router = express.Router();
router
  .route('/')
  /**
   * createDealDocument
   * */
  /**
   * @deprecated
   * This route is no longer in use instead we are using '/v2/add' as we now have functionality of 'add recommended file' also we can add comment with the docs.
   */
  .post(auth('user'), validate(dealDocumentValidation.createDealDocument), checkAccessOfDeal, dealDocumentController.create);
router
  .route('/deal/:dealId')
  /**
   * getDealDocument
   * */
  /**
   * @deprecated
   * This route is no longer in use instead we are using '/v2/deal/:dealId'.
   */
  .get(
    auth('user'),
    validate(dealDocumentValidation.getDealDocument),
    checkAccessOfDeal,
    dealDocumentController.getDealDocumentByDeal
  );
router
  .route('/v2/add')
  /**
   * createDealDocument updated flow
   * */
  .post(
    auth('user'),
    validate(dealDocumentValidation.createDealDocumentV2),
    checkAccessOfDeal,
    dealDocumentController.createV2
  );
router
  .route('/v2/deal/:dealId')
  /**
   * getDealDocuments list by deal
   * */
  .get(
    auth('user'),
    validate(dealDocumentValidation.getDealDocument),
    checkAccessOfDeal,
    dealDocumentController.getDealDocumentByDealV2
  );
router
  .route('/paginated')
  /**
   * getDealDocumentPaginated
   * */
  .get(auth('user'), validate(dealDocumentValidation.paginatedDealDocument), dealDocumentController.paginate);
router
  .route('/:dealDocumentId')
  /**
   * getDealDocumentById
   * */
  .get(auth('user'), validate(dealDocumentValidation.getDealDocumentById), dealDocumentController.get)
  /**
   * updateDealDocument
   * */
  .put(auth('user'), validate(dealDocumentValidation.updateDealDocument), checkAccessOfDeal, dealDocumentController.update)
  .delete(auth('user'), validate(dealDocumentValidation.removeDealDocumentById), dealDocumentController.remove);
router
  .route('/documents/:documentId')
  .delete(auth('user'), validate(dealDocumentValidation.deleteDocument), dealDocumentController.removeDocuments);
export default router;
