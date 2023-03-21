import express from 'express';
import { dealDocumentController } from 'controllers/user';
import { dealDocumentValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createDealDocument
   * */
  .post(auth('user'), validate(dealDocumentValidation.createDealDocument), dealDocumentController.create)
  /**
   * getDealDocument
   * */
  .get(auth('user'), validate(dealDocumentValidation.getDealDocument), dealDocumentController.list);
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
  .put(auth('user'), validate(dealDocumentValidation.updateDealDocument), dealDocumentController.update);
export default router;
