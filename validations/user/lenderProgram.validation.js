/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
import enumFields from '../../models/enum.model';

Joi.objectId = require('joi-objectid')(Joi);

export const updateLenderProgram = {
  body: Joi.object().keys({
    lenderProgramType: Joi.string(),
    statesArray: Joi.object().keys({
      stateswithTag: Joi.array().items(
        Joi.object().keys({
          state: Joi.string().valid(...Object.values(enumFields.EnumStatesOfDeal)),
          statesArrTag: Joi.number(),
        })
      ),
    }),
    minLoanSize: Joi.object().keys({
      minLoan: Joi.number().integer(),
      minLoanTag: Joi.number().integer(),
    }),
    maxLoanSize: Joi.object().keys({
      maxLoan: Joi.number().integer(),
      maxLoanTag: Joi.number().integer(),
    }),
    propertyType: Joi.object().keys({
      property: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumAssetTypeOfDeal))),
      propTypeArrTag: Joi.number().integer(),
    }),
    loanType: Joi.object().keys({
      loan: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumLoanTypeOfDeal))),
      loanTypeArrTag: Joi.number().integer(),
    }),
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
