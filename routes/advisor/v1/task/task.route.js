import express from 'express';
import { taskController } from 'controllers/advisor';
import { taskValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';
import checkAccessOfDeal from '../../../../middlewares/checkUserOfDeal';

const router = express.Router();
router
  .route('/')
  /**
   * createTask
   * */
  .post(auth('advisor'), validate(taskValidation.createTask), checkAccessOfDeal, taskController.create)
  /**
   * getTask
   * */
  .get(auth('advisor'), validate(taskValidation.getTask), checkAccessOfDeal, taskController.list);
router
  .route('/deal/:dealId')
  /**
   * getTaskPaginated
   * */
  .get(auth('advisor'), validate(taskValidation.getTaskByDealId), checkAccessOfDeal, taskController.listByDeal);
router
  .route('/deal/:dealId/paginated')
  /**
   * getTaskPaginated
   * */
  .get(auth('advisor'), validate(taskValidation.paginatedTask), checkAccessOfDeal, taskController.paginate);
router
  .route('/:taskId')
  /**
   * getTaskById
   * */
  .get(auth('advisor'), validate(taskValidation.getTaskById), taskController.get)
  /**
   * updateTask
   * */
  .put(auth('advisor'), validate(taskValidation.updateTask), checkAccessOfDeal, taskController.update)
  /**
   * deleteTaskById
   * */
  .delete(auth('advisor'), validate(taskValidation.deleteTaskById), taskController.remove);
router
  .route('/taskDocument/:taskDocumentId')
  .delete(auth('advisor'), validate(taskValidation.deleteTaskDocument), taskController.removeTaskDocument);
export default router;
