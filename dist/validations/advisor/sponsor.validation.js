/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);
const FileSchema = Joi.object().keys({
  url: Joi.string().required(),
  fileName: Joi.string(),
  fileType: Joi.string(),
  fileDescription: Joi.string()
});
export const createSponsor = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    website: Joi.string(),
    borrowersEmails: Joi.array().items(Joi.string().email()).min(1).required(),
    headquarter: Joi.string().allow(null),
    description: Joi.string().allow(null),
    photo: FileSchema.allow(null),
    portfolio: Joi.array()
  })
};
export const updateSponsor = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    borrowersEmails: Joi.array().items(Joi.string().email()).min(1),
    borrowers: Joi.array().items(Joi.string()),
    website: Joi.string().allow(null),
    headquarter: Joi.string().allow(null),
    description: Joi.string().allow(null),
    photo: FileSchema.allow(null),
    documents: Joi.array().items(FileSchema),
    portfolio: Joi.array(),
    advisor: Joi.string()
  }),
  params: Joi.object().keys({
    sponsorId: Joi.objectId().required()
  })
};
export const getSponsorById = {
  params: Joi.object().keys({
    sponsorId: Joi.objectId().required()
  })
};
export const deleteSponsorById = {
  params: Joi.object().keys({
    sponsorId: Joi.objectId().required()
  })
};
export const getSponsor = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object().keys({
    page: Joi.number(),
    limit: Joi.number(),
    sort: Joi.string().valid('name'),
    order: Joi.string().valid('asc', 'desc').default('asc'),
    search: Joi.string()
  }).unknown(true)
};
export const paginatedSponsor = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object().keys({
    page: Joi.number().default(1),
    limit: Joi.number().default(10).max(100),
    sort: Joi.string().valid('name'),
    order: Joi.string().valid('asc', 'desc').default('asc')
  }).unknown(true)
};