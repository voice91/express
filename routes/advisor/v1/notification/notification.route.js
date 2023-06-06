import express from 'express';
import { notificationController } from 'controllers/advisor';
import { notificationValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createNotification
   * */
  .post(auth('advisor'), validate(notificationValidation.createNotification), notificationController.create)
  /**
   * getNotification
   * */
  .get(auth('advisor'), validate(notificationValidation.getNotification), notificationController.list)
  /**
   * UpdateNotification
   * */
  .put(auth('advisor'), notificationController.update);

export default router;
