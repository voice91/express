import express from 'express';
import { emailTemplateController } from 'controllers/advisor';
import { emailTemplateValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createEmailTemplate
   * */
  .post(auth('advisor'), validate(emailTemplateValidation.createEmailTemplate), emailTemplateController.create)
  /**
   * getEmailTemplate
   * */
  .get(auth('advisor'), validate(emailTemplateValidation.getEmailTemplate), emailTemplateController.list);
router
  .route('/paginated')
  /**
   * getEmailTemplatePaginated
   * */
  .get(auth('advisor'), validate(emailTemplateValidation.paginatedEmailTemplate), emailTemplateController.paginate);
router
  .route('/:emailTemplateId')
  /**
   * getEmailTemplateById
   * */
  .get(auth('advisor'), validate(emailTemplateValidation.getEmailTemplateById), emailTemplateController.get)
  /**
   * updateEmailTemplate
   * */
  .put(auth('advisor'), validate(emailTemplateValidation.updateEmailTemplate), emailTemplateController.update)
  /**
   * deleteEmailTemplateById
   * */
  .delete(auth('advisor'), validate(emailTemplateValidation.deleteEmailTemplateById), emailTemplateController.remove);
export default router;
