import express from 'express';
import { emailTemplateController } from 'controllers/user';
import { emailTemplateValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createEmailTemplate
   * */
  .post(auth('user'), validate(emailTemplateValidation.createEmailTemplate), emailTemplateController.create)
  /**
   * getEmailTemplate
   * */
  .get(auth('user'), validate(emailTemplateValidation.getEmailTemplate), emailTemplateController.list);
router
  .route('/paginated')
  /**
   * getEmailTemplatePaginated
   * */
  .get(auth('user'), validate(emailTemplateValidation.paginatedEmailTemplate), emailTemplateController.paginate);
router
  .route('/:emailTemplateId')
  /**
   * getEmailTemplateById
   * */
  .get(auth('user'), validate(emailTemplateValidation.getEmailTemplateById), emailTemplateController.get)
  /**
   * updateEmailTemplate
   * */
  .put(auth('user'), validate(emailTemplateValidation.updateEmailTemplate), emailTemplateController.update)
  /**
   * deleteEmailTemplateById
   * */
  .delete(auth('user'), validate(emailTemplateValidation.deleteEmailTemplateById), emailTemplateController.remove);
export default router;
