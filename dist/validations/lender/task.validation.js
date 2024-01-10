/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);
export const getTaskById = {
  params: Joi.object().keys({
    taskId: Joi.objectId().required()
  })
};
export const getTask = {
  body: Joi.object().keys({}).unknown(true)
};
export const paginatedTask = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(10).max(100)
  }).unknown(true)
};