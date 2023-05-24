/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

const taskDocumentSchema = Joi.object().keys({
  url: Joi.string().required(),
  fileName: Joi.string().required(),
});
export const updateTask = {
  body: Joi.object().keys({
    deal: Joi.objectId().required(),
    taskAnswer: Joi.string().allow(null),
    taskDocuments: Joi.array().items(taskDocumentSchema),
  }),
  params: Joi.object().keys({
    taskId: Joi.objectId().required(),
  }),
};

export const getTaskById = {
  params: Joi.object().keys({
    taskId: Joi.objectId().required(),
  }),
};

export const deleteTaskById = {
  params: Joi.object().keys({
    taskId: Joi.objectId().required(),
  }),
};

export const getTask = {
  body: Joi.object().keys({}).unknown(true),
};

export const paginatedTask = {
  body: Joi.object().keys({}).unknown(true),
  params: Joi.object().keys({
    dealId: Joi.objectId().required(),
  }),
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
    })
    .unknown(true),
};

export const deleteTaskDocument = {
  params: Joi.object().keys({
    taskDocumentId: Joi.objectId().required(),
  }),
};
