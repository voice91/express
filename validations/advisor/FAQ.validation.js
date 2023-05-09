/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

// eslint-disable-next-line import/prefer-default-export
export const sendMail = {
  body: Joi.object().keys({
    question: Joi.string().required(),
  }),
};