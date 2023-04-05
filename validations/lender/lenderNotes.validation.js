/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

export const createLenderNotes = {
  body: Joi.object().keys({
    deal: Joi.objectId().required(),
    pinnedByUsers: Joi.array().items(Joi.objectId()),
    flagedByUser: Joi.array().items(Joi.objectId()),
    content: Joi.string(),
    lastReadBy: Joi.array().items(Joi.objectId()),
  }),
};

export const updateLenderNotes = {
  body: Joi.object().keys({
    deal: Joi.objectId(),
    pinnedByUsers: Joi.array().items(Joi.objectId()),
    flagedByUser: Joi.array().items(Joi.objectId()),
    content: Joi.string(),
    lastReadBy: Joi.array().items(Joi.objectId()),
  }),
  params: Joi.object().keys({
    lenderNotesId: Joi.objectId().required(),
  }),
};

export const getLenderNotesById = {
  params: Joi.object().keys({
    lenderNotesId: Joi.objectId().required(),
  }),
};

export const deleteLenderNotesById = {
  params: Joi.object().keys({
    lenderNotesId: Joi.objectId().required(),
  }),
};

export const getLenderNotes = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.string(),
      limit: Joi.string(),
      sort: Joi.string(),
    })
    .unknown(true),
};

export const paginatedLenderNotes = {
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
