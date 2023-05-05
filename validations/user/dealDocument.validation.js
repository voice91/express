/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
import enumFields from 'models/enum.model';

Joi.objectId = require('joi-objectid')(Joi);

const documentSchema = Joi.object().keys({
  url: Joi.string().required(),
  fileName: Joi.string().required(),
  documentType: Joi.string()
    .valid(...Object.values(enumFields.EnumDocumentTypeOfDealDocument))
    .required(),
});
export const createDealDocument = {
  body: Joi.object().keys({
    documents: Joi.array().items(documentSchema).required(),
    deal: Joi.objectId().required(),
  }),
};

export const updateDealDocument = {
  body: Joi.object().keys({
    documents: Joi.array().items(documentSchema).required(),
    deal: Joi.objectId().required(),
  }),
  params: Joi.object().keys({
    dealDocumentId: Joi.objectId().required(),
  }),
};

export const getDealDocumentById = {
  params: Joi.object().keys({
    dealDocumentId: Joi.objectId().required(),
  }),
};

export const getDealDocument = {
  params: Joi.object().keys({
    dealId: Joi.objectId().required(),
  }),
};

export const paginatedDealDocument = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
    })
    .unknown(true),
};

export const deleteDocument = {
  params: Joi.object().keys({
    documentId: Joi.objectId().required(),
  }),
};
