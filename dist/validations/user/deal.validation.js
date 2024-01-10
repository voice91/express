/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
import enumFields from "../../models/enum.model";
Joi.objectId = require('joi-objectid')(Joi);
export const getDealById = {
  params: Joi.object().keys({
    dealId: Joi.objectId().required()
  })
};
export const deleteDealById = {
  params: Joi.object().keys({
    dealId: Joi.objectId().required()
  })
};
export const getDeal = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object().keys({
    page: Joi.string(),
    limit: Joi.string(),
    sort: Joi.string(),
    search: Joi.string()
  }).unknown(true)
};
export const paginatedDeal = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(10).max(100)
  }).unknown(true)
};
export const invitationToDeal = {
  body: Joi.object().keys({
    email: Joi.array().items(Joi.string().email().required()),
    deal: Joi.objectId().required(),
    role: Joi.string().required().valid(enumFields.EnumRoleOfUser.USER)
  })
};