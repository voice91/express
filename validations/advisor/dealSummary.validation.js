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
    propertySummary: Joi.array().items(
      Joi.object().keys({
        key: Joi.string(),
        value: Joi.any(),
        type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
      })
    ),
    dealMetrics: Joi.array().items(
      Joi.object().keys({
        key: Joi.string(),
        value: Joi.any(),
        type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
      })
    ),
    financingRequest: Joi.array().items(
      Joi.object().keys({
        key: Joi.string(),
        value: Joi.any(),
        type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
      })
    ),
    sourcesAndUses: Joi.object().keys({
      sources: Joi.array().items(
        Joi.object().keys({
          key: Joi.string(),
          value: Joi.string(),
          type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      ),
      uses: Joi.array().items(
        Joi.object().keys({
          key: Joi.string(),
          value: Joi.string(),
          type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      ),
    }),
    rentRollSummary: Joi.array().items(
      Joi.array().items(
        Joi.object().keys({
          key: Joi.string(),
          value: Joi.any(),
          type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      )
    ),
    financialSummary: Joi.object().keys({
      revenue: Joi.array().items(
        Joi.object().keys({
          key: Joi.string(),
          stabilizedValue: Joi.string(),
          inPlaceValue: Joi.alternatives().try(Joi.string(), Joi.number()),
          stabilizedType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
          inPlaceType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
          note: Joi.string(),
        })
      ),
      expenses: Joi.array().items(
        Joi.object().keys({
          key: Joi.string(),
          stabilizedValue: Joi.string(),
          inPlaceValue: Joi.alternatives().try(Joi.string(), Joi.number()),
          stabilizedType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
          inPlaceType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
          note: Joi.string(),
        })
      ),
      netOperatingIncome: Joi.object().keys({
        inPlaceValue: Joi.alternatives().try(Joi.string(), Joi.number()),
      }),
    }),
    executiveSummary: Joi.string(),
    dealHighLights: Joi.array().items(Joi.string()),
    marketSummary: Joi.string(),
    url: Joi.string(),
    sponserOverview: Joi.string(),
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
     */
    dynamicField: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string()
          .valid(...Object.values(enumFields.EnumOfDynamicFieldType))
          .required(),
        response: Joi.object()
          .when('type', {
            is: enumFields.EnumOfDynamicFieldType.BULLET,
            then: Joi.object({
              bulletPoints: Joi.array().items(Joi.string()).min(1).required(),
            }).required(),
            otherwise: Joi.object().when('type', {
              is: enumFields.EnumOfDynamicFieldType.TEXT,
              then: Joi.object({
                bulletPoints: Joi.optional(),
                text: Joi.string().required(),
              }).required(),
              otherwise: Joi.object().when('type', {
                is: enumFields.EnumOfDynamicFieldType.BULLET_TEXT,
                then: Joi.object({
                  bulletPoints: Joi.array().items(Joi.string()).min(1).required(),
                  text: Joi.string().required(),
                }).required(),
                otherwise: Joi.object().when('type', {
                  is: enumFields.EnumOfDynamicFieldType.FILE,
                  then: Joi.object({
                    bulletPoints: Joi.optional(),
                    fileUrl: Joi.string().uri().required(),
                    fileName: Joi.string().required(),
                  }).required(),
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
    propertySummary: Joi.array()
      .items(
        Joi.object().keys({
          key: Joi.string(),
          value: Joi.any(),
          type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      )
      .allow(''),
    dealMetrics: Joi.array()
      .items(
        Joi.object().keys({
          key: Joi.string(),
          value: Joi.any(),
          type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      )
      .allow(''),
    financingRequest: Joi.array()
      .items(
        Joi.object().keys({
          key: Joi.string(),
          value: Joi.any(),
          type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      )
      .allow(''),
    sourcesAndUses: Joi.object()
      .keys({
        sources: Joi.array().items(
          Joi.object().keys({
            key: Joi.string(),
            value: Joi.string(),
            type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
          })
        ),
        uses: Joi.array().items(
          Joi.object().keys({
            key: Joi.string(),
            value: Joi.string(),
            type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
          })
        ),
      })
      .allow(''),
    rentRollSummary: Joi.array()
      .items(
        Joi.array().items(
          Joi.object().keys({
            key: Joi.string(),
            value: Joi.any(),
            type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
          })
        )
      )
      .allow(''),
    financialSummary: Joi.object()
      .keys({
        revenue: Joi.array().items(
          Joi.object().keys({
            key: Joi.string(),
            stabilizedValue: Joi.string(),
            inPlaceValue: Joi.string(),
            stabilizedType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
            inPlaceType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
            note: Joi.string(),
          })
        ),
        expenses: Joi.array().items(
          Joi.object().keys({
            key: Joi.string(),
            stabilizedValue: Joi.string(),
            inPlaceValue: Joi.string(),
            stabilizedType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
            inPlaceType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
            note: Joi.string(),
          })
        ),
      })
      .allow(''),
    executiveSummary: Joi.string().allow(null),
    url: Joi.string(),
    dealHighLights: Joi.array().items(Joi.string()).allow(''),
    marketSummary: Joi.string().allow(''),
    sponserOverview: Joi.string().allow(null),
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
     */
    dynamicField: Joi.array().items(
      Joi.object().keys({
        name: Joi.string().required(),
        type: Joi.string()
          .valid(...Object.values(enumFields.EnumOfDynamicFieldType))
          .required(),
        response: Joi.object()
          .when('type', {
            is: enumFields.EnumOfDynamicFieldType.BULLET,
            then: Joi.object({
              bulletPoints: Joi.array().items(Joi.string()).min(1).required(),
            }).required(),
            otherwise: Joi.object().when('type', {
              is: enumFields.EnumOfDynamicFieldType.TEXT,
              then: Joi.object({
                bulletPoints: Joi.optional(),
                text: Joi.string().required(),
              }).required(),
              otherwise: Joi.object().when('type', {
                is: enumFields.EnumOfDynamicFieldType.BULLET_TEXT,
                then: Joi.object({
                  bulletPoints: Joi.array().items(Joi.string()).min(1).required(),
                  text: Joi.string().required(),
                }).required(),
                otherwise: Joi.object().when('type', {
                  is: enumFields.EnumOfDynamicFieldType.FILE,
                  then: Joi.object({
                    bulletPoints: Joi.optional(),
                    fileUrl: Joi.string().uri().required(),
                    fileName: Joi.string().required(),
                  }).required(),
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
  params: Joi.object().keys({
    dealSummaryId: Joi.objectId().required(),
  }),
};
