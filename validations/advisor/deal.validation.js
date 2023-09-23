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
const photoSchema = Joi.object().keys({
  url: Joi.string(),
  fileName: Joi.string(),
});

// validation for all the values in the heading field
const headingSchema = Joi.object().keys({
  dealName: Joi.string(),
  cityState: Joi.string(),
  dealInfo: Joi.string(),
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
    // zipcode: Joi.number().integer().min(10000).max(99999).required(),
    zipcode: Joi.string().pattern(new RegExp('^[0-9]{5}$')).messages({
      'string.pattern.base': 'zipcode must be 5 digits number',
    }),
    mapLocation: locationSchema,
    involvedUsers: involvedUsersEmbed,
    involvedUsersLender: Joi.array().items(Joi.objectId()),
    involvedUsersBorrower: Joi.array().items(Joi.objectId()),
    involvedUsersAdvisor: Joi.array().items(Joi.objectId()),
    assetType: Joi.string()
      .valid(...Object.values(enumFields.EnumAssetTypeOfDeal))
      .required(),
    loanAmount: Joi.string().required(),
    loanPurpose: Joi.string()
      .valid(...Object.values(enumFields.EnumLoanPurposeOfDeal))
      .required(),
    loanType: Joi.string().valid(...Object.values(enumFields.EnumLoanTypeOfDeal)),
    dealMembers: Joi.array().items(Joi.string().email()),
    tasks: Joi.array().items(Joi.objectId()),
    dealNotes: Joi.array().items(Joi.objectId()),
    lenderPlacement: Joi.array().items(Joi.objectId()),
    documents: Joi.array().items(Joi.objectId()),
    dealSummary: Joi.objectId(),
    squareFootage: Joi.string(),
    unitCount: Joi.number(),
    occupancy: Joi.string(),
    loanInformation: Joi.array().items(
      Joi.object({
        key: Joi.string(),
        value: Joi.any(),
        type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
      })
    ),
    dealSummaryBody: Joi.object({
      heading: headingSchema,
      mainPhoto: photoSchema,
      propertySummary: Joi.array().items(
        Joi.object({
          key: Joi.string(),
          value: Joi.any(),
          type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      ),
      financingRequest: Joi.array().items(
        Joi.object({
          key: Joi.string(),
          value: Joi.any(),
          type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      ),
      dealMetrics: Joi.array().items(
        Joi.object({
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
    }),
  }),
};

export const updateDeal = {
  body: Joi.object().keys({
    dealName: Joi.string(),
    stage: Joi.string().valid(...Object.values(enumFields.EnumStageOfDeal)),
    address: Joi.string(),
    city: Joi.string(),
    state: Joi.string().valid(...Object.values(enumFields.EnumStatesOfDeal)),
    zipcode: Joi.string().pattern(new RegExp('^[0-9]{5}$')).messages({
      'string.pattern.base': 'zipcode must be 5 digits number',
    }),
    mapLocation: locationSchema,
    involvedUsers: involvedUsersEmbed,
    involvedUsersLender: Joi.array().items(Joi.objectId()),
    involvedUsersBorrower: Joi.array().items(Joi.objectId()),
    involvedUsersAdvisor: Joi.array().items(Joi.objectId()),
    assetType: Joi.string().valid(...Object.values(enumFields.EnumAssetTypeOfDeal)),
    loanAmount: Joi.string(),
    loanPurpose: Joi.string().valid(...Object.values(enumFields.EnumLoanPurposeOfDeal)),
    loanType: Joi.string().valid(...Object.values(enumFields.EnumLoanTypeOfDeal)),
    tasks: Joi.array().items(Joi.objectId()),
    dealNotes: Joi.array().items(Joi.objectId()),
    lenderPlacement: Joi.array().items(Joi.objectId()),
    documents: Joi.array().items(Joi.objectId()),
    squareFootage: Joi.string().allow(null),
    unitCount: Joi.number().allow(null),
    occupancy: Joi.string().allow(null),
    loanInformation: Joi.array().items(
      Joi.object({
        key: Joi.string(),
        value: Joi.any(),
        type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
      })
    ),
    dealSummaryBody: Joi.object({
      _id: Joi.objectId(),
      mainPhoto: photoSchema,
      propertySummary: Joi.array().items(
        Joi.object({
          key: Joi.string(),
          value: Joi.any(),
          type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      ),
      financingRequest: Joi.array().items(
        Joi.object({
          key: Joi.string(),
          value: Joi.any(),
          type: Joi.string().valid(...Object.values(enumFields.EnumOfTypeOfValue)),
        })
      ),
      dealMetrics: Joi.array().items(
        Joi.object({
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
    }),
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
    role: Joi.string().required().valid(enumFields.EnumRoleOfUser.ADVISOR, enumFields.EnumRoleOfUser.USER),
  }),
};
