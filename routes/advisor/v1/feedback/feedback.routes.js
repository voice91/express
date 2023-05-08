import express from 'express';
import { feedbackController } from 'controllers/advisor';
import { feedbackValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createActivityLog
   * */
  .post(auth('advisor'), validate(feedbackValidation.createFeedback), feedbackController.create);
export default router;
