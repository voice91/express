/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
import enumFields from '../../models/enum.model';

Joi.objectId = require('joi-objectid')(Joi);

const PhotosSchema = Joi.object().keys({
  url: Joi.string(),
  fileName: Joi.string(),
});

// validation for all the values in the heading field
const headingSchema = Joi.object().keys({
  dealName: Joi.string().allow(null),
  cityState: Joi.string().allow(null),
  dealInfo: Joi.string().allow(null),
});

// TODO : use this embed schema validation to reduce code duplication
// dynamic field schema for repetitive code in create and update deal summary
const dealSummaryDynamicFieldSchema = Joi.object().keys({
  key: Joi.string(),
  value: Joi.any(),
  type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
});

// dynamic field schema for repetitive code in create and update financial summary in deal summary
const financialSummaryDynamicFieldSchema = Joi.object().keys({
  key: Joi.string(),
  stabilizedValue: Joi.string(),
  inPlaceValue: Joi.string(),
  stabilizedType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
  inPlaceType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
  note: Joi.string(),
});

// eslint-disable-next-line import/prefer-default-export
export const importFileForDealSummary = {
  query: Joi.object().keys({
    url: Joi.string().required(),
    deal: Joi.objectId().required(),
  }),
};

export const exportFileForDealSummary = {
  body: Joi.object().keys({
    url: Joi.string().required(),
  }),
  params: Joi.object().keys({
    dealSummaryId: Joi.objectId().required(),
  }),
};

export const getDealSummaryById = {
  params: Joi.object().keys({
    dealSummaryId: Joi.objectId().required(),
  }),
};

export const createDealSummary = {
  body: Joi.object().keys({
    propertySummary: Joi.array().items(dealSummaryDynamicFieldSchema),
    dealMetrics: Joi.array().items(dealSummaryDynamicFieldSchema),
    financingRequest: Joi.array().items(dealSummaryDynamicFieldSchema),
    sourcesAndUses: Joi.object().keys({
      sources: Joi.array().items(dealSummaryDynamicFieldSchema),
      uses: Joi.array().items(dealSummaryDynamicFieldSchema),
    }),
    rentRollSummary: Joi.array().items(Joi.array().items(dealSummaryDynamicFieldSchema)),
    financialSummary: Joi.object().keys({
      revenue: Joi.array().items(financialSummaryDynamicFieldSchema),
      expenses: Joi.array().items(financialSummaryDynamicFieldSchema),
      netOperatingIncome: Joi.object().keys({
        inPlaceValue: Joi.alternatives().try(Joi.string(), Joi.number()),
      }),
    }),
    executiveSummary: Joi.string(),
    dealHighLights: Joi.array().items(Joi.string()),
    marketSummary: Joi.string(),
    url: Joi.string(),
    sponsorOverview: Joi.string(),
    deal: Joi.objectId().required(),
    mainPhoto: PhotosSchema,
    dataSheet: PhotosSchema,
    otherPhotos: Joi.array().items(PhotosSchema),
    map: Joi.object().keys({
      lat: Joi.number(),
      lng: Joi.number(),
    }),
    documents: Joi.array().items(PhotosSchema),
    /**
     * if type is bullet then in the response bulletPoints is required ,
     * if type is text then in the response text is required ,
     * if type is bulletText then in the response bulletPoints and text are required ,
     * if type is file then in the response fileUrl and fileName are required ,
     * if type is table then in the response fileUrl is required
     */
    dynamicField: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string()
          .valid(...Object.values(enumFields.EnumOfDynamicFieldType))
          .required(),
        // for tableType fields, if fileUrl is updated then isUpdated come true from FE, else false
        isUpdated: Joi.boolean(),
        // Added the tableData field as optional in validation of response in all(except table) type of dynamicField.
        // Because get default added empty array in the response as it is defined in schema as array
        response: Joi.object()
          .when('type', {
            is: enumFields.EnumOfDynamicFieldType.BULLET,
            then: Joi.object({
              tableData: Joi.optional(),
              bulletPoints: Joi.array().items(Joi.string()).min(1).required(),
            }).required(),
            otherwise: Joi.object().when('type', {
              is: enumFields.EnumOfDynamicFieldType.TEXT,
              then: Joi.object({
                bulletPoints: Joi.optional(),
                tableData: Joi.optional(),
                text: Joi.string().required(),
              }).required(),
              otherwise: Joi.object().when('type', {
                is: enumFields.EnumOfDynamicFieldType.BULLET_TEXT,
                then: Joi.object({
                  tableData: Joi.optional(),
                  bulletPoints: Joi.array().items(Joi.string()).min(1).required(),
                  text: Joi.string().required(),
                }).required(),
                otherwise: Joi.object().when('type', {
                  is: enumFields.EnumOfDynamicFieldType.FILE,
                  then: Joi.object({
                    tableData: Joi.optional(),
                    bulletPoints: Joi.optional(),
                    fileUrl: Joi.string().uri().required(),
                    fileName: Joi.string().required(),
                  }).required(),
                  otherwise: Joi.object().when('type', {
                    is: enumFields.EnumOfDynamicFieldType.TABLE,
                    then: Joi.object({
                      bulletPoints: Joi.optional(),
                      fileUrl: Joi.string().uri().required(),
                      fileName: Joi.string(),
                      tableData: Joi.array().items(Joi.array().items(dealSummaryDynamicFieldSchema)),
                    }).required(),
                  }),
                }),
              }),
            }),
          })
          .required(),
        sectionName: Joi.string().valid(...Object.values(enumFields.EnumOfSectionName)),
        index: Joi.number(),
      })
    ),
    isDealSummaryAddedFromDeal: Joi.boolean(),
  }),
};

export const updateDealSummary = {
  body: Joi.object().keys({
    propertySummary: Joi.array().items(dealSummaryDynamicFieldSchema).allow(''),
    dealMetrics: Joi.array().items(dealSummaryDynamicFieldSchema).allow(''),
    financingRequest: Joi.array().items(dealSummaryDynamicFieldSchema).allow(''),
    sourcesAndUses: Joi.object()
      .keys({
        sources: Joi.array().items(dealSummaryDynamicFieldSchema),
        uses: Joi.array().items(dealSummaryDynamicFieldSchema),
      })
      .allow(''),
    rentRollSummary: Joi.array().items(Joi.array().items(dealSummaryDynamicFieldSchema)).allow(''),
    financialSummary: Joi.object()
      .keys({
        revenue: Joi.array().items(financialSummaryDynamicFieldSchema),
        expenses: Joi.array().items(financialSummaryDynamicFieldSchema),
      })
      .allow(''),
    executiveSummary: Joi.string().allow(null),
    url: Joi.string(),
    dealHighLights: Joi.array().items(Joi.string()).allow(''),
    marketSummary: Joi.string().allow(''),
    sponsorOverview: Joi.string().allow(null),
    mainPhoto: PhotosSchema,
    dataSheet: PhotosSchema,
    otherPhotos: Joi.array().items(PhotosSchema),
    map: Joi.object().keys({
      lat: Joi.number(),
      lng: Joi.number(),
    }),
    documents: Joi.array().items(PhotosSchema),
    /**
     * if type is bullet then in the response bulletPoints is required ,
     * if type is text then in the response text is required ,
     * if type is bulletText then in the response bulletPoints and text are required ,
     * if type is file then in the response fileUrl and fileName are required ,
     * if type is table then in the response fileUrl is required ,
     */
    dynamicField: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string()
          .valid(...Object.values(enumFields.EnumOfDynamicFieldType))
          .required(),
        // for tableType fields, if fileUrl is updated then isUpdated come true from FE, else false
        isUpdated: Joi.boolean(),
        // Added the tableData field as optional in validation of response in all(except table) type of dynamicField.
        // Because get default added empty array in the response as it is defined in schema as array
        response: Joi.object()
          .when('type', {
            is: enumFields.EnumOfDynamicFieldType.BULLET,
            then: Joi.object({
              tableData: Joi.optional(),
              bulletPoints: Joi.array().items(Joi.string()).min(1).required(),
            }).required(),
            otherwise: Joi.object().when('type', {
              is: enumFields.EnumOfDynamicFieldType.TEXT,
              then: Joi.object({
                tableData: Joi.optional(),
                bulletPoints: Joi.optional(),
                text: Joi.string().required(),
              }).required(),
              otherwise: Joi.object().when('type', {
                is: enumFields.EnumOfDynamicFieldType.BULLET_TEXT,
                then: Joi.object({
                  tableData: Joi.optional(),
                  bulletPoints: Joi.array().items(Joi.string()).min(1).required(),
                  text: Joi.string().required(),
                }).required(),
                otherwise: Joi.object().when('type', {
                  is: enumFields.EnumOfDynamicFieldType.FILE,
                  then: Joi.object({
                    tableData: Joi.optional(),
                    bulletPoints: Joi.optional(),
                    fileUrl: Joi.string().uri().required(),
                    fileName: Joi.string().required(),
                  }).required(),
                  otherwise: Joi.object().when('type', {
                    is: enumFields.EnumOfDynamicFieldType.TABLE,
                    then: Joi.object({
                      bulletPoints: Joi.optional(),
                      fileUrl: Joi.string().uri().required(),
                      fileName: Joi.string(),
                      tableData: Joi.array().items(Joi.array().items(dealSummaryDynamicFieldSchema)),
                    }).required(),
                  }),
                }),
              }),
            }),
          })
          .required(),
        sectionName: Joi.string().valid(...Object.values(enumFields.EnumOfSectionName)),
        index: Joi.number(),
      })
    ),
    isDealSummaryAddedFromDeal: Joi.boolean(),
    heading: headingSchema.required().min(1),
    sponsor: Joi.objectId().allow(null),
  }),
  params: Joi.object().keys({
    dealSummaryId: Joi.objectId().required(),
  }),
};
