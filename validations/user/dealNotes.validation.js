/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

export const createDealNotes = {
  body: Joi.object().keys({
    deal: Joi.objectId().required(),
    content: Joi.string().required(),
    lastReadBy: Joi.array().items(Joi.objectId()),
  }),
};

export const paginatedDealNotes = {
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

export const getDealNotes = {
  body: Joi.object().keys({}).unknown(true),
  params: Joi.object().keys({
    dealId: Joi.objectId().required(),
  }),
  query: Joi.object()
    .keys({
      page: Joi.string(),
      limit: Joi.string(),
      sort: Joi.string(),
      order: Joi.string().valid('asc', 'desc').default('asc'),
    })
    .unknown(true),
};

export const getDealNotesById = {
  params: Joi.object().keys({
    dealNotesId: Joi.objectId().required(),
  }),
};

export const updateDealNotes = {
  body: Joi.object().keys({
    deal: Joi.objectId(),
    isPinned: Joi.boolean(),
    isFlagged: Joi.boolean(),
    content: Joi.string(),
    lastReadBy: Joi.array().items(Joi.objectId()),
  }),
  params: Joi.object().keys({
    dealNotesId: Joi.objectId().required(),
  }),
};

export const deleteDealNotesById = {
  params: Joi.object().keys({
    dealNotesId: Joi.objectId().required(),
  }),
};
