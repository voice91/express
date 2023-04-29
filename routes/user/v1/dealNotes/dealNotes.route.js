import express from 'express';
import { dealNotesController } from 'controllers/user';
import { dealNotesValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';
import checkAccessOfDeal from '../../../../middlewares/checkUserOfDeal';

const router = express.Router();
router
  .route('/')
  /**
   * createDealNotes
   * */
  .post(auth('user'), validate(dealNotesValidation.createDealNotes), checkAccessOfDeal, dealNotesController.create);
router
  .route('/deal/:dealId/paginated')
  /**
   * getDealNotesPaginated
   * */
  .get(auth('user'), validate(dealNotesValidation.paginatedDealNotes), checkAccessOfDeal, dealNotesController.paginate);
router
  .route('/deal/:dealId')
  /**
   * getDealNotes
   * */
  .get(auth('user'), validate(dealNotesValidation.getDealNotes), checkAccessOfDeal, dealNotesController.list);
router
  .route('/:dealNotesId')
  /**
   * getDealNotesById
   * */
  .get(auth('user'), validate(dealNotesValidation.getDealNotesById), dealNotesController.get)
  /**
   * updateDealNotes
   * */
  .put(auth('user'), validate(dealNotesValidation.updateDealNotes), checkAccessOfDeal, dealNotesController.update)
  /**
   * deleteDealNotesById
   * */
  .delete(auth('user'), validate(dealNotesValidation.deleteDealNotesById), dealNotesController.remove);
export default router;
