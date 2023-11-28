import express from 'express';
import { feedbackController } from 'controllers/lender';
import { feedbackValidation } from 'validations/lender';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createFeedback
   * */
  .post(auth('lender'), validate(feedbackValidation.createFeedback), feedbackController.create);
export default router;
