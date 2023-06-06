import express from 'express';
import { notificationController } from 'controllers/user';
import { notificationValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createNotification
   * */
  .post(auth('user'), validate(notificationValidation.createNotification), notificationController.create)
  /**
   * getNotification
   * */
  .get(auth('user'), validate(notificationValidation.getNotification), notificationController.list)
  /**
   * UpdateNotification
   * */
  .put(auth('user'), notificationController.update);
export default router;
