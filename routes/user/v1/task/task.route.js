import express from 'express';
import { taskController } from 'controllers/user';
import { taskValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';
import checkAccessOfDeal from '../../../../middlewares/checkUserOfDeal';

const router = express.Router();
router
  .route('/')
  /**
   * createTask
   * */
  .post(auth('user'), validate(taskValidation.createTask), checkAccessOfDeal, taskController.create)
  /**
   * getTask
   * */
  .get(auth('user'), validate(taskValidation.getTask), checkAccessOfDeal, taskController.list);

router
  .route('/paginated')
  /**
   * getTaskPaginated
   * */
  .get(auth('user'), validate(taskValidation.paginatedTask), checkAccessOfDeal, taskController.paginate);
router
  .route('/:taskId')
  /**
   * getTaskById
   * */
  .get(auth('user'), validate(taskValidation.getTaskById), taskController.get)
  /**
   * updateTask
   * */
  .put(auth('user'), validate(taskValidation.updateTask), checkAccessOfDeal, taskController.update)
  /**
   * deleteTaskById
   * */
  .delete(auth('user'), validate(taskValidation.deleteTaskById), taskController.remove);
export default router;
