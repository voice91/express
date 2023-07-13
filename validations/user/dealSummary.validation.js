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
    dealSummary: Joi.objectId().required(),
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
          inPlaceValue: Joi.string(),
          stabilizedType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
          inPlaceType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      ),
      expenses: Joi.array().items(
        Joi.object().keys({
          key: Joi.string(),
          stabilizedValue: Joi.string(),
          inPlaceValue: Joi.string(),
          stabilizedType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
          inPlaceType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      ),
    }),
    executiveSummary: Joi.string(),
    url: Joi.string(),
    dealHighLights: Joi.array().items(Joi.string()),
    marketSummary: Joi.string(),
    sponserOverview: Joi.string(),
    deal: Joi.objectId().required(),
    mainPhoto: PhotosSchema,
    otherPhotos: Joi.array().items(PhotosSchema),
    map: Joi.object().keys({
      lat: Joi.number(),
      lng: Joi.number(),
    }),
    documents: Joi.array().items(PhotosSchema),
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
          })
        ),
        expenses: Joi.array().items(
          Joi.object().keys({
            key: Joi.string(),
            stabilizedValue: Joi.string(),
            inPlaceValue: Joi.string(),
            stabilizedType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
            inPlaceType: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
          })
        ),
      })
      .allow(''),
    executiveSummary: Joi.string().allow(''),
    dealHighLights: Joi.array().items(Joi.string()).allow(''),
    marketSummary: Joi.string().allow(''),
    sponserOverview: Joi.string(),
    url: Joi.string(),
    mainPhoto: PhotosSchema,
    otherPhotos: Joi.array().items(PhotosSchema),
    map: Joi.object().keys({
      lat: Joi.number(),
      lng: Joi.number(),
    }),
    documents: Joi.array().items(PhotosSchema),
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