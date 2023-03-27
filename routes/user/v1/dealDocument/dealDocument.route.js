import express from 'express';
import { dealDocumentController } from 'controllers/user';
import { dealDocumentValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';
import checkAccessOfDeal from '../../../../middlewares/checkUserOfDeal';
import checkAccessOfDealQuery from '../../../../middlewares/checkUserOfDealQuery';

const router = express.Router();
router
  .route('/')
  /**
   * createDealDocument
   * */
  .post(auth('user'), validate(dealDocumentValidation.createDealDocument), checkAccessOfDeal, dealDocumentController.create);
router
  .route('/:dealId')
  /**
   * getDealDocument
   * */
  .get(auth('user'), validate(dealDocumentValidation.getDealDocument), checkAccessOfDealQuery, dealDocumentController.list);
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
  .put(auth('user'), validate(dealDocumentValidation.updateDealDocument), checkAccessOfDeal, dealDocumentController.update);
export default router;
