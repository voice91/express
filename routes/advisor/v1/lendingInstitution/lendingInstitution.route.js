import express from 'express';
import { lendingInstitutionController } from 'controllers/advisor';
import { lendingInstitutionValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createLendingInstitution
   * */
  .post(
    auth('advisor'),
    validate(lendingInstitutionValidation.createLendingInstitution),
    lendingInstitutionController.create
  )
  /**
   * getLendingInstitution
   * */
  .get(auth('advisor'), validate(lendingInstitutionValidation.getLendingInstitution), lendingInstitutionController.list);
router
  .route('/paginated')
  /**
   * getLendingInstitutionPaginated
   * */
  .get(
    auth('advisor'),
    validate(lendingInstitutionValidation.paginatedLendingInstitution),
    lendingInstitutionController.paginate
  );
router
  .route('/:lendingInstitutionId')
  /**
   * getLendingInstitutionById
   * */
  .get(auth('advisor'), validate(lendingInstitutionValidation.getLendingInstitutionById), lendingInstitutionController.get)
  /**
   * updateLendingInstitution
   * */
  .put(auth('advisor'), validate(lendingInstitutionValidation.updateLendingInstitution), lendingInstitutionController.update)
  /**
   * deleteLendingInstitutionById
   * */
  .delete(
    auth('advisor'),
    validate(lendingInstitutionValidation.deleteLendingInstitutionById),
    lendingInstitutionController.remove
  );

router
  .route('/:lendingInstitutionId/feed-back')
  /**
   * getLendingInstitutionById
   * */
  .get(
    auth('advisor'),
    validate(lendingInstitutionValidation.getLendingInstitutionFeedBack),
    lendingInstitutionController.getLendingInstitutionFeedBack
  );

export default router;
