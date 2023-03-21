/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
import config from 'config/config';

Joi.objectId = require('joi-objectid')(Joi);

export const createEmailTemplate = {
  body: Joi.object().keys({
    subject: Joi.string().required(),
    ccList: Joi.array().items(Joi.string()),
    textBox: Joi.string().required(),
    emailAttachments: Joi.string().regex(
      new RegExp(
        `https://${config.aws.bucket}.s3.amazonaws.com\\b([-a-zA-Z0-9()@:%_+.~#?&amp;/=]*.(pdf|doc|docx|ppt|pptx|xls|xlsx)$)`
      )
    ),
  }),
};

export const updateEmailTemplate = {
  body: Joi.object().keys({
    subject: Joi.string(),
    ccList: Joi.array().items(Joi.string()),
    textBox: Joi.string(),
    emailAttachments: Joi.string().regex(
      new RegExp(
        `https://${config.aws.bucket}.s3.amazonaws.com\\b([-a-zA-Z0-9()@:%_+.~#?&amp;/=]*.(pdf|doc|docx|ppt|pptx|xls|xlsx)$)`
      )
    ),
  }),
  params: Joi.object().keys({
    emailTemplateId: Joi.objectId().required(),
  }),
};

export const getEmailTemplateById = {
  params: Joi.object().keys({
    emailTemplateId: Joi.objectId().required(),
  }),
};

export const deleteEmailTemplateById = {
  params: Joi.object().keys({
    emailTemplateId: Joi.objectId().required(),
  }),
};

export const getEmailTemplate = {
  body: Joi.object().keys({}).unknown(true),
};

export const paginatedEmailTemplate = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
    })
    .unknown(true),
};
