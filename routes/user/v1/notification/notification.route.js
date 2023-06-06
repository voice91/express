import express from 'express';
import { notificationController } from 'controllers/user';
import { notificationValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createActivityLog
   * */
  .post(auth('user'), validate(notificationValidation.createNotification), notificationController.create)
  /**
   * getActivityLog
   * */
  .get(auth('user'), validate(notificationValidation.getNotification), notificationController.list);
export default router;
