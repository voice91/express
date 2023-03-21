import express from 'express';
import { taskController } from 'controllers/advisor';
import { taskValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createTask
   * */
  .post(auth('advisor'), validate(taskValidation.createTask), taskController.create)
  /**
   * getTask
   * */
  .get(auth('advisor'), validate(taskValidation.getTask), taskController.list);
router
  .route('/paginated')
  /**
   * getTaskPaginated
   * */
  .get(auth('advisor'), validate(taskValidation.paginatedTask), taskController.paginate);
router
  .route('/:taskId')
  /**
   * getTaskById
   * */
  .get(auth('advisor'), validate(taskValidation.getTaskById), taskController.get)
  /**
   * updateTask
   * */
  .put(auth('advisor'), validate(taskValidation.updateTask), taskController.update)
  /**
   * deleteTaskById
   * */
  .delete(auth('advisor'), validate(taskValidation.deleteTaskById), taskController.remove);
export default router;
