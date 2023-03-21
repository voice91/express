import express from 'express';
import { taskController } from 'controllers/lender';
import { taskValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * getTask
   * */
  .get(auth('lender'), validate(taskValidation.getTask), taskController.list);
router
  .route('/paginated')
  /**
   * getTaskPaginated
   * */
  .get(auth('lender'), validate(taskValidation.paginatedTask), taskController.paginate);
router
  .route('/:taskId')
  /**
   * getTaskById
   * */
  .get(auth('lender'), validate(taskValidation.getTaskById), taskController.get);
export default router;
