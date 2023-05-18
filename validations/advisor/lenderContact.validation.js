/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
import enumFields from '../../models/enum.model';

Joi.objectId = require('joi-objectid')(Joi);

export const createLenderContact = {
  body: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    nickName: Joi.string(),
    email: Joi.string().email().required(),
    phoneNumberDirect: Joi.string(),
    phoneNumberOffice: Joi.string(),
    phoneNumberCell: Joi.string(),
    title: Joi.string(),
    officeStreetAddress: Joi.string(),
    city: Joi.string(),
    state: Joi.string().valid(...Object.values(enumFields.EnumStatesOfDeal)),
    zipcode: Joi.number().integer().min(10000).max(99999),
    note: Joi.string(),
    lenderInstitute: Joi.objectId().required(),
  }),
};

export const updateLenderContact = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    nickName: Joi.string(),
    email: Joi.string().email(),
    phoneNumberDirect: Joi.string(),
    phoneNumberOffice: Joi.string(),
    phoneNumberCell: Joi.string(),
    title: Joi.string(),
    officeStreetAddress: Joi.string(),
    city: Joi.string(),
    state: Joi.string().valid(...Object.values(enumFields.EnumStatesOfDeal)),
    zipcode: Joi.number().integer().min(10000).max(99999),
    note: Joi.string(),
  }),
  params: Joi.object().keys({
    lenderContactId: Joi.objectId().required(),
  }),
};

export const getLenderContactById = {
  params: Joi.object().keys({
    lenderContactId: Joi.objectId().required(),
  }),
};

export const deleteLenderContactById = {
  params: Joi.object().keys({
    lenderContactId: Joi.objectId().required(),
  }),
};

export const getLenderContact = {
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

export const paginatedLenderContact = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
    })
    .unknown(true),
};
