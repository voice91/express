/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);
export const createNotification = {
  body: Joi.object().keys({
    deal: Joi.objectId().required(),
    message: Joi.string().required()
  })
};
export const updateNotification = {
  body: Joi.object().keys({
    isReadable: Joi.bool(),
    isClear: Joi.bool()
  })
};
export const getNotification = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object().keys({
    page: Joi.string(),
    limit: Joi.string(),
    sort: Joi.string(),
    order: Joi.string().valid('asc', 'desc').default('asc')
  }).unknown(true)
};