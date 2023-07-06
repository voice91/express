/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';

Joi.objectId = require('joi-objectid')(Joi);

const PhotosSchema = Joi.object().keys({
  url: Joi.string().required(),
  fileName: Joi.string().required(),
});

// eslint-disable-next-line import/prefer-default-export
export const importFileForDealSummary = {
  body: Joi.object().keys({
    url: Joi.string().required(),
    deal: Joi.objectId().required(),
  }),
};

export const getDealSummaryById = {
  params: Joi.object().keys({
    dealSummaryId: Joi.objectId().required(),
  }),
};

export const createDealSummary = {
  body: Joi.object().keys({
    propertySummary: Joi.object(),
    dealMetrics: Joi.object(),
    financingRequest: Joi.object(),
    sourcesAndUses: Joi.object().keys({
      sources: Joi.array(),
      uses: Joi.array(),
    }),
    financialSummary: Joi.array(),
    executiveSummary: Joi.string(),
    dealHighLights: Joi.array().items(Joi.string()),
    marketSummary: Joi.string(),
    sponserOverview: Joi.string(),
    deal: Joi.objectId().required(),
    mainPhoto: PhotosSchema,
    otherPhotos: Joi.array().items(PhotosSchema),
    map: Joi.object().keys({
      latitude: Joi.number(),
      longitude: Joi.number(),
    }),
  }),
};

export const updateDealSummary = {
  body: Joi.object().keys({
    propertySummary: Joi.object(),
    dealMetrics: Joi.object(),
    financingRequest: Joi.object(),
    sourcesAndUses: Joi.object().keys({
      sources: Joi.array(),
      uses: Joi.array(),
    }),
    rentRollSummary: Joi.array(),
    financialSummary: Joi.array(),
    executiveSummary: Joi.string(),
    dealHighLights: Joi.array().items(Joi.string()),
    marketSummary: Joi.string(),
    sponserOverview: Joi.string(),
    mainPhoto: PhotosSchema,
    otherPhotos: Joi.array().items(PhotosSchema),
    map: Joi.object().keys({
      latitude: Joi.number(),
      longitude: Joi.number(),
    }),
    // TODO: Need to implement this for custom field
    // dynamicField: Joi.array().items(
    //   Joi.object().keys({
    //     name: Joi.string(),
    //     type: Joi.string().valid(...Object.values(enumFields.EnumOfDynamicFieldType)),
    //     options: Joi.array().items(
    //       Joi.object().keys({
    //         name: Joi.string(),
    //         value: Joi.any(),
    //       })
    //     ),
    //   })
    // ),
    // dynamicResponseField: Joi.array().items(
    //   Joi.object().keys({
    //     dynamicFieldId: Joi.objectId(),
    //     response: Joi.any(),
    //   })
    // ),
  }),
  params: Joi.object().keys({
    dealSummaryId: Joi.objectId().required(),
  }),
};
