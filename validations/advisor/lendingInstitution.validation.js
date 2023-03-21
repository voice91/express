/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
import enumFields from 'models/enum.model';

Joi.objectId = require('joi-objectid')(Joi);

export const createLendingInstitution = {
  body: Joi.object().keys({
    lenderNameVisible: Joi.string().required(),
    lenderNameInternal: Joi.string().required(),
    lenderType: Joi.string()
      .valid(...Object.values(enumFields.EnumLenderTypeOfLendingInstitution))
      .required(),
    lenderPrograms: Joi.array().items(Joi.objectId()).required(),
    contacts: Joi.objectId().required(),
  }),
};

export const updateLendingInstitution = {
  body: Joi.object().keys({
    lenderNameVisible: Joi.string(),
    lenderNameInternal: Joi.string(),
    lenderType: Joi.string().valid(...Object.values(enumFields.EnumLenderTypeOfLendingInstitution)),
    lenderPrograms: Joi.array().items(Joi.objectId()),
    contacts: Joi.objectId(),
  }),
  params: Joi.object().keys({
    lendingInstitutionId: Joi.objectId().required(),
  }),
};

export const getLendingInstitutionById = {
  params: Joi.object().keys({
    lendingInstitutionId: Joi.objectId().required(),
  }),
};

export const deleteLendingInstitutionById = {
  params: Joi.object().keys({
    lendingInstitutionId: Joi.objectId().required(),
  }),
};

export const getLendingInstitution = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.string(),
      limit: Joi.string(),
      sort: Joi.string(),
      search: Joi.string(),
    })
    .unknown(true),
};

export const paginatedLendingInstitution = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
    })
    .unknown(true),
};
