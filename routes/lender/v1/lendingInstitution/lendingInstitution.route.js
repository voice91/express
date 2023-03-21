import express from 'express';
import { lendingInstitutionController } from 'controllers/lender';
import { lendingInstitutionValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createLendingInstitution
   * */
  .post(auth('lender'), validate(lendingInstitutionValidation.createLendingInstitution), lendingInstitutionController.create)
  /**
   * getLendingInstitution
   * */
  .get(auth('lender'), validate(lendingInstitutionValidation.getLendingInstitution), lendingInstitutionController.list);
router
  .route('/paginated')
  /**
   * getLendingInstitutionPaginated
   * */
  .get(
    auth('lender'),
    validate(lendingInstitutionValidation.paginatedLendingInstitution),
    lendingInstitutionController.paginate
  );
router
  .route('/:lendingInstitutionId')
  /**
   * getLendingInstitutionById
   * */
  .get(auth('lender'), validate(lendingInstitutionValidation.getLendingInstitutionById), lendingInstitutionController.get)
  /**
   * updateLendingInstitution
   * */
  .put(auth('lender'), validate(lendingInstitutionValidation.updateLendingInstitution), lendingInstitutionController.update)
  /**
   * deleteLendingInstitutionById
   * */
  .delete(
    auth('lender'),
    validate(lendingInstitutionValidation.deleteLendingInstitutionById),
    lendingInstitutionController.remove
  );
export default router;
