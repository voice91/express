/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
import enumFields from "../../models/enum.model";
Joi.objectId = require('joi-objectid')(Joi);
export const createLenderProgram = {
  body: Joi.object().keys({
    lenderProgramType: Joi.string().required(),
    statesArray: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumStatesOfDeal))),
    statesArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
    minLoanSize: Joi.number().integer().min(100000).max(1000000000).allow(null),
    minLoanTag: Joi.number().integer().default(1),
    maxLoanSize: Joi.number().integer().min(100000).max(1000000000).allow(null),
    maxLoanTag: Joi.number().integer().default(1),
    propertyType: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumAssetTypeOfDeal))),
    propTypeArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
    doesNotLandOn: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumAssetTypeOfDeal))),
    doesNotLandOnArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
    loanType: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumLoanTypeOfDeal))),
    loanTypeArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
    lenderInstitute: Joi.objectId().required(),
    indexUsed: Joi.string().allow(''),
    spreadEstimate: Joi.string().allow(''),
    counties: Joi.array().items(Joi.string()).allow(null),
    recourseRequired: Joi.string().default('No').allow(''),
    nonRecourseLTV: Joi.string().allow('')
  })
};
export const addLender = {
  body: Joi.object().keys({
    lender: Joi.object().keys({
      lenderNameVisible: Joi.string().required(),
      lenderType: Joi.string().valid(...Object.values(enumFields.EnumLenderTypeOfLendingInstitution)).required()
    }),
    lenderProgram: Joi.array().items(Joi.object().keys({
      lenderProgramType: Joi.string(),
      statesArray: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumStatesOfDeal))),
      statesArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
      minLoanSize: Joi.number().integer().min(100000).max(1000000000).allow(null),
      minLoanTag: Joi.number().integer().allow('').default(1),
      maxLoanSize: Joi.number().integer().min(100000).max(1000000000).allow(null),
      maxLoanTag: Joi.number().integer().allow('').default(1),
      propertyType: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumAssetTypeOfDeal))),
      propTypeArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
      doesNotLandOn: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumAssetTypeOfDeal))),
      doesNotLandOnArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
      loanType: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumLoanTypeOfDeal))),
      loanTypeArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
      indexUsed: Joi.string().allow('').allow(null),
      spreadEstimate: Joi.number().allow('').allow(null),
      counties: Joi.array().items(Joi.string()).allow(null),
      recourseRequired: Joi.string().default('No').allow('').allow(null),
      nonRecourseLTV: Joi.string().allow('').allow(null)
    }))
  })
};
export const editLender = {
  body: Joi.object().keys({
    lender: Joi.object().keys({
      lenderNameVisible: Joi.string(),
      lenderType: Joi.string().valid(...Object.values(enumFields.EnumLenderTypeOfLendingInstitution))
    }),
    lenderProgram: Joi.array().items(Joi.object().keys({
      id: Joi.objectId().allow(''),
      lenderProgramType: Joi.string(),
      statesArray: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumStatesOfDeal))),
      statesArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
      minLoanSize: Joi.number().integer().min(100000).max(1000000000).allow(null),
      minLoanTag: Joi.number().integer().allow('').default(1),
      maxLoanSize: Joi.number().integer().min(100000).max(1000000000).allow(null),
      maxLoanTag: Joi.number().integer().allow('').default(1),
      propertyType: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumAssetTypeOfDeal))),
      propTypeArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
      doesNotLandOn: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumAssetTypeOfDeal))),
      doesNotLandOnArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
      loanType: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumLoanTypeOfDeal))),
      loanTypeArrTag: Joi.array().items(Joi.number().integer()).allow('').default(1),
      indexUsed: Joi.string().allow('').allow(null),
      spreadEstimate: Joi.number().allow('').allow(null),
      counties: Joi.array().items(Joi.string().allow(null)).allow(null),
      recourseRequired: Joi.string().default('No').allow('').allow(null),
      nonRecourseLTV: Joi.string().allow('').allow(null),
      lenderInstitute: Joi.objectId()
    }))
  }),
  params: Joi.object().keys({
    lenderInstitute: Joi.objectId().required()
  })
};
export const updateLenderProgram = {
  body: Joi.object().keys({
    lenderProgramType: Joi.string(),
    statesArray: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumStatesOfDeal))),
    statesArrTag: Joi.array().items(Joi.number().integer()).allow(''),
    minLoanSize: Joi.number().integer(),
    minLoanTag: Joi.number().integer(),
    maxLoanSize: Joi.number().integer(),
    maxLoanTag: Joi.number().integer(),
    propertyType: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumAssetTypeOfDeal))),
    propTypeArrTag: Joi.array().items(Joi.number().integer()).allow(''),
    doesNotLandOn: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumAssetTypeOfDeal))),
    doesNotLandOnArrTag: Joi.array().items(Joi.number().integer()).allow(''),
    loanType: Joi.array().items(Joi.string().valid(...Object.values(enumFields.EnumLoanTypeOfDeal))),
    loanTypeArrTag: Joi.array().items(Joi.number().integer()).allow(''),
    indexUsed: Joi.string().allow(''),
    spreadEstimate: Joi.string().allow(''),
    counties: Joi.array().items(Joi.string()).allow(null),
    recourseRequired: Joi.string().default('No').allow(''),
    nonRecourseLTV: Joi.string().allow('')
  }),
  params: Joi.object().keys({
    lenderProgramId: Joi.objectId().required()
  })
};
export const getLenderProgramById = {
  params: Joi.object().keys({
    lenderProgramId: Joi.objectId().required()
  })
};
export const deleteLenderProgramById = {
  params: Joi.object().keys({
    lenderProgramId: Joi.objectId().required()
  })
};
export const getLenderProgram = {
  body: Joi.object().keys({}).unknown(true)
};
export const paginatedLenderProgram = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(10).max(100),
    loanType: Joi.string(),
    propertyType: Joi.string(),
    statesArray: Joi.string(),
    lenderInstitute: Joi.string(),
    loanSize: Joi.number(),
    lenderType: Joi.string(),
    lenderNameVisible: Joi.string(),
    sort: Joi.string().valid('loanType', 'propertyType', 'statesArray', 'lenderInstitute', 'loanSize', 'lenderType', 'lenderNameVisible')
  })
};
export const listLenderProgramByInstitute = {
  params: Joi.object().keys({
    lenderInstitute: Joi.objectId().required()
  })
};