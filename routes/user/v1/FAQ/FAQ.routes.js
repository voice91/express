import express from 'express';
import { FAQController } from 'controllers/user';
import { FAQValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/sendMail-to-support')
  /**
   * send Email to Support Team
   * */
  .post(auth('user'), validate(FAQValidation.sendMail), FAQController.sendMail);
export default router;
