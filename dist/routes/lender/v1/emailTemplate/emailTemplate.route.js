import express from 'express';
import { emailTemplateController } from "../../../../controllers/lender";
import { emailTemplateValidation } from "../../../../validations/lender";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createEmailTemplate
 * */.post(auth('lender'), validate(emailTemplateValidation.createEmailTemplate), emailTemplateController.create)
/**
 * getEmailTemplate
 * */.get(auth('lender'), validate(emailTemplateValidation.getEmailTemplate), emailTemplateController.list);
router.route('/paginated')
/**
 * getEmailTemplatePaginated
 * */.get(auth('lender'), validate(emailTemplateValidation.paginatedEmailTemplate), emailTemplateController.paginate);
router.route('/:emailTemplateId')
/**
 * getEmailTemplateById
 * */.get(auth('lender'), validate(emailTemplateValidation.getEmailTemplateById), emailTemplateController.get)
/**
 * updateEmailTemplate
 * */.put(auth('lender'), validate(emailTemplateValidation.updateEmailTemplate), emailTemplateController.update)
/**
 * deleteEmailTemplateById
 * */.delete(auth('lender'), validate(emailTemplateValidation.deleteEmailTemplateById), emailTemplateController.remove);
export default router;