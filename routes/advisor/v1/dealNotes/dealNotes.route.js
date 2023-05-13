import express from 'express';
import { dealNotesController } from 'controllers/advisor';
import { dealNotesValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';
import checkAccessOfDeal from '../../../../middlewares/checkUserOfDeal';

const router = express.Router();
router
  .route('/')
  /**
   * createDealNotes
   * */
  .post(auth('advisor'), validate(dealNotesValidation.createDealNotes), checkAccessOfDeal, dealNotesController.create);

router
  .route('/deal/list-all-notes/:dealId')
  /**
   * getDealNotes
   * */
  .get(auth('advisor'), validate(dealNotesValidation.getAllDealNotes), dealNotesController.listAllDealNotes);
router
  .route('/deal/:dealId')
  /**
   * getDealNotes
   * */
  .get(auth('advisor'), validate(dealNotesValidation.getDealNotes), checkAccessOfDeal, dealNotesController.list);
router
  .route('/deal/:dealId/paginated')
  /**
   * getDealNotesPaginated
   * */
  .get(auth('advisor'), validate(dealNotesValidation.paginatedDealNotes), checkAccessOfDeal, dealNotesController.paginate);
router
  .route('/deal/:dealId/paginated')
  /**
   * getDealNotesPaginated
   * */
  .get(auth('advisor'), validate(dealNotesValidation.paginatedDealNotes), checkAccessOfDeal, dealNotesController.paginate);
router
  .route('/:dealNotesId')
  /**
   * getDealNotesById
   * */
  .get(auth('advisor'), validate(dealNotesValidation.getDealNotesById), checkAccessOfDeal, dealNotesController.get)
  /**
   * updateDealNotes
   * */
  .put(auth('advisor'), validate(dealNotesValidation.updateDealNotes), checkAccessOfDeal, dealNotesController.update)
  /**
   * deleteDealNotesById
   * */
  .delete(auth('advisor'), validate(dealNotesValidation.deleteDealNotesById), dealNotesController.remove);
export default router;
