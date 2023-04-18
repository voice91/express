/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
import enumFields from 'models/enum.model';

Joi.objectId = require('joi-objectid')(Joi);

const locationSchema = Joi.object().keys({
  type: Joi.string().equal('Point').required(),
  coordinates: Joi.array().required(),
});
const involvedUsersEmbed = Joi.object().keys({
  lenders: Joi.array().items(Joi.objectId()),
  borrowers: Joi.array().items(Joi.objectId()),
  advisors: Joi.array().items(Joi.objectId()),
});
export const createDeal = {
  body: Joi.object().keys({
    dealName: Joi.string().required(),
    stage: Joi.string().valid(...Object.values(enumFields.EnumStageOfDeal)),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string()
      .valid(...Object.values(enumFields.EnumStatesOfDeal))
      .required(),
    zipcode: Joi.number().integer().min(100).max(999999).required(),
    mapLocation: locationSchema,
    involvedUsers: involvedUsersEmbed,
    involvedUsersLender: Joi.array().items(Joi.objectId()),
    involvedUsersBorrower: Joi.array().items(Joi.objectId()),
    involvedUsersAdvisor: Joi.array().items(Joi.objectId()),
    assetType: Joi.string()
      .valid(...Object.values(enumFields.EnumAssetTypeOfDeal))
      .required(),
    loanAmount: Joi.number().integer().required(),
    loanPurpose: Joi.string()
      .valid(...Object.values(enumFields.EnumLoanPurposeOfDeal))
      .required(),
    loanType: Joi.string().valid(...Object.values(enumFields.EnumLoanTypeOfDeal)),
    dealMembers: Joi.array().items(Joi.string().email()),
    tasks: Joi.array().items(Joi.objectId()),
    dealNotes: Joi.array().items(Joi.objectId()),
    lenderPlacement: Joi.array().items(Joi.objectId()),
    documents: Joi.array().items(Joi.objectId()),
  }),
};

export const updateDeal = {
  body: Joi.object().keys({
    dealName: Joi.string(),
    stage: Joi.string().valid(...Object.values(enumFields.EnumStageOfDeal)),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string().valid(...Object.values(enumFields.EnumStatesOfDeal)),
    zipcode: Joi.number().integer(),
    mapLocation: locationSchema,
    involvedUsers: involvedUsersEmbed,
    involvedUsersLender: Joi.array().items(Joi.objectId()),
    involvedUsersBorrower: Joi.array().items(Joi.objectId()),
    involvedUsersAdvisor: Joi.array().items(Joi.objectId()),
    assetType: Joi.string().valid(...Object.values(enumFields.EnumAssetTypeOfDeal)),
    loanAmount: Joi.number().integer(),
    loanPurpose: Joi.string().valid(...Object.values(enumFields.EnumLoanPurposeOfDeal)),
    loanType: Joi.string().valid(...Object.values(enumFields.EnumLoanTypeOfDeal)),
    tasks: Joi.array().items(Joi.objectId()),
    dealNotes: Joi.array().items(Joi.objectId()),
    lenderPlacement: Joi.array().items(Joi.objectId()),
    documents: Joi.array().items(Joi.objectId()),
  }),
  params: Joi.object().keys({
    dealId: Joi.objectId().required(),
  }),
};

export const getDealById = {
  params: Joi.object().keys({
    dealId: Joi.objectId().required(),
  }),
};

export const deleteDealById = {
  params: Joi.object().keys({
    dealId: Joi.objectId().required(),
  }),
};

export const getDeal = {
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

export const paginatedDeal = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
    })
    .unknown(true),
};

export const invitationToDeal = {
  body: Joi.object().keys({
    email: Joi.array().items(Joi.string().email().required()),
    deal: Joi.objectId().required(),
  }),
};
