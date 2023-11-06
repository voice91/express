import express from 'express';
import { userController } from 'controllers/lender';
import { userValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from '../../../../middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createUser
   * */
  .post(auth('lender'), validate(userValidation.createUser), userController.create)
  /**
   * getUser
   * */
  .get(auth('lender'), validate(userValidation.getUser), userController.list)
  /**
   * updateUser
   * */
  .put(auth('lender'), validate(userValidation.updateUser), userController.update);
router
  .route('/paginated')
  /**
   * getUserPaginated
   * */
  .get(auth('lender'), validate(userValidation.paginatedUser), userController.paginate);
router
  .route('/:userId')
  /**
   * getUserById
   * */
  .get(auth('lender'), validate(userValidation.getUserById), userController.get)
  /**
   * deleteUserById
   * */
  .delete(auth('lender'), validate(userValidation.deleteUserById), userController.remove);
export default router;
