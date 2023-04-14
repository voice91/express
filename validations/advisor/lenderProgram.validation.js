/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
import enumFields from 'models/enum.model';

Joi.objectId = require('joi-objectid')(Joi);

export const createLenderProgram = {
  body: Joi.object().keys({
    lenderProgramType: Joi.string()
      .valid(...Object.values(enumFields.EnumLenderProgramTypeOfLenderProgram))
      .required(),
    statesArray: Joi.array().items(Joi.string()),
    minLoanSize: Joi.number().integer(),
    maxLoanSize: Joi.number().integer(),
    lenderInstitute: Joi.objectId().required(),
  }),
};

export const updateLenderProgram = {
  body: Joi.object().keys({
    lenderProgramType: Joi.string().valid(...Object.values(enumFields.EnumLenderProgramTypeOfLenderProgram)),
    statesArray: Joi.array().items(Joi.string()),
    minLoanSize: Joi.number().integer(),
    maxLoanSize: Joi.number().integer(),
    lenderInstitute: Joi.objectId().required(),
  }),
  params: Joi.object().keys({
    lenderProgramId: Joi.objectId().required(),
  }),
};

export const getLenderProgramById = {
  params: Joi.object().keys({
    lenderProgramId: Joi.objectId().required(),
  }),
};

export const deleteLenderProgramById = {
  params: Joi.object().keys({
    lenderProgramId: Joi.objectId().required(),
  }),
};

export const getLenderProgram = {
  body: Joi.object().keys({}).unknown(true),
};

export const paginatedLenderProgram = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
    })
    .unknown(true),
};

export const listLenderProgramByInstitute = {
  params: Joi.object().keys({
    lenderInstitute: Joi.objectId().required(),
  }),
};
