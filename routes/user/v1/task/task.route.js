import express from 'express';
import { taskController } from 'controllers/user';
import { taskValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * getTask
   * */
  .get(auth('user'), validate(taskValidation.getTask), taskController.list);
router
  .route('/paginated')
  /**
   * getTaskPaginated
   * */
  .get(auth('user'), validate(taskValidation.paginatedTask), taskController.paginate);
router
  .route('/:taskId')
  /**
   * getTaskById
   * */
  .get(auth('user'), validate(taskValidation.getTaskById), taskController.get)
  /**
   * updateTask
   * */
  .put(auth('user'), validate(taskValidation.updateTask), taskController.update)
  /**
   * deleteTaskById
   * */
  .delete(auth('user'), validate(taskValidation.deleteTaskById), taskController.remove);
export default router;
