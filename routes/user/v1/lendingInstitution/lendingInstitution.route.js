import express from 'express';
import { lendingInstitutionController } from 'controllers/user';
import { lendingInstitutionValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createLendingInstitution
   * */
  .post(auth('user'), validate(lendingInstitutionValidation.createLendingInstitution), lendingInstitutionController.create)
  /**
   * getLendingInstitution
   * */
  .get(auth('user'), validate(lendingInstitutionValidation.getLendingInstitution), lendingInstitutionController.list);
router
  .route('/paginated')
  /**
   * getLendingInstitutionPaginated
   * */
  .get(
    auth('user'),
    validate(lendingInstitutionValidation.paginatedLendingInstitution),
    lendingInstitutionController.paginate
  );
router
  .route('/:lendingInstitutionId')
  /**
   * getLendingInstitutionById
   * */
  .get(auth('user'), validate(lendingInstitutionValidation.getLendingInstitutionById), lendingInstitutionController.get)
  /**
   * updateLendingInstitution
   * */
  .put(auth('user'), validate(lendingInstitutionValidation.updateLendingInstitution), lendingInstitutionController.update)
  /**
   * deleteLendingInstitutionById
   * */
  .delete(
    auth('user'),
    validate(lendingInstitutionValidation.deleteLendingInstitutionById),
    lendingInstitutionController.remove
  );
export default router;
