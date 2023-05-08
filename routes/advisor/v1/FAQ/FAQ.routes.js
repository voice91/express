import express from 'express';
import { FAQController } from 'controllers/advisor';
import { FAQValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/sendMail-to-support')
  /**
   * send Email to Support Team
   * */
  .post(auth('advisor'), validate(FAQValidation.sendMail), FAQController.sendMail);
export default router;
