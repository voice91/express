/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import Joi from 'joi';
import enumFields from 'models/enum.model';

Joi.objectId = require('joi-objectid')(Joi);

const extensionsSchema = Joi.object().keys({
  extensionOption: Joi.object().keys({
    value: Joi.number(),
    extensionTime: Joi.string().valid(...Object.values(enumFields.EnumofExtension)),
  }),
  extensionFee: Joi.string(),
});
const documentSchema = Joi.object().keys({
  url: Joi.string().required(),
  fileName: Joi.string().required(),
  fileType: Joi.string(),
});
const termsEmbed = Joi.object().keys({
  initialFunding: Joi.number().integer().required(),
  futureFunding: Joi.number().integer(),
  totalLoanAmount: Joi.number().integer(),
  interestRateType: Joi.string().valid(...Object.values(enumFields.EnumInterestRateTypeOfTerms)),
  interestRateIndexValue: Joi.string(),
  interestRateIndexDate: Joi.date(),
  spread: Joi.string(),
  totalRate: Joi.string(),
  rateNotes: Joi.string(),
  initialTerm: Joi.object().keys({
    value: Joi.number(),
    extensionTime: Joi.string().valid(...Object.values(enumFields.EnumofExtension)),
  }),
  interestRateIndex: Joi.string(),
  extensions: Joi.array().items(extensionsSchema),
  LTC: Joi.string(),
  termNotes: Joi.string(),
  prePaymentPeriod: Joi.object().keys({
    value: Joi.number(),
    extensionTime: Joi.string().valid(...Object.values(enumFields.EnumofExtension)),
  }),
  IO: Joi.object().keys({
    value: Joi.number(),
    extensionTime: Joi.string().valid(...Object.values(enumFields.EnumofExtension)),
  }),
  amortization: Joi.object().keys({
    value: Joi.number(),
    extensionTime: Joi.string().valid(...Object.values(enumFields.EnumofExtension)),
  }),
  originationFee: Joi.string(),
  exitFee: Joi.string(),
  recourse: Joi.string().valid(...Object.values(enumFields.EnumOfRecourse)),
  asIsLTV: Joi.string(),
  stabilizedLTV: Joi.string(),
  asIsDY: Joi.string(),
  stabilizedDY: Joi.string(),
  asIsDSCR: Joi.string(),
  generalNotes: Joi.string(),
  prePaymentType: Joi.string().valid(...Object.values(enumFields.EnumPrePaymentTypeOfTerms)),
  stabilizedDSCR: Joi.string(),
  penaltySchedule: Joi.string(),
});
const TermSheetSchema = Joi.object().keys({
  url: Joi.string(),
  fileName: Joi.string(),
});
export const createLenderPlacement = {
  body: Joi.object().keys({
    lendingDetails: Joi.array()
      .items(
        Joi.object()
          .keys({
            lendingInstitution: Joi.objectId().required(),
            deal: Joi.objectId().required(),
          })
          .required()
      )
      .required(),
    lenderContact: Joi.objectId(),
    notes: Joi.array().items(Joi.string()),
    stage: Joi.string().valid(...Object.values(enumFields.EnumStageOfLenderPlacement)),
    terms: termsEmbed,
    termSheet: TermSheetSchema,
    isEmailSent: Joi.string().valid(...Object.values(enumFields.EnumOfEmailStatus)),
    followOnDate: Joi.date(),
    postmarkMessageId: Joi.array().items(Joi.string()),
  }),
};

export const updateLenderPlacement = {
  body: Joi.object().keys({
    lendingInstitution: Joi.objectId(),
    lenderContact: Joi.objectId(),
    nextStep: Joi.string(),
    notes: Joi.array().items(Joi.string()),
    stage: Joi.string().valid(...Object.values(enumFields.EnumStageOfLenderPlacement)),
    terms: termsEmbed,
    termSheet: TermSheetSchema,
  }),
  params: Joi.object().keys({
    lenderPlacementId: Joi.objectId().required(),
  }),
};

export const getLenderPlacementById = {
  params: Joi.object().keys({
    lenderPlacementId: Joi.objectId().required(),
  }),
};

export const deleteLenderPlacementById = {
  params: Joi.object().keys({
    lenderPlacementId: Joi.objectId().required(),
  }),
};

export const getLenderPlacement = {
  body: Joi.object().keys({}).unknown(true),
};

export const updateManyLenderPlacement = {
  body: Joi.object().keys({
    lenderPlacementIds: Joi.array().items(Joi.objectId()).required(),
    update: Joi.object().keys({
      isFavourite: Joi.boolean(),
      isArchived: Joi.boolean(),
    }),
  }),
};

export const removeLenderPlacement = {
  query: Joi.object().keys({
    lendingInstitution: Joi.objectId().required(),
    deal: Joi.objectId().required(),
  }),
};

export const paginatedLenderPlacement = {
  body: Joi.object().keys({}).unknown(true),
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
    })
    .unknown(true),
};

export const sendDeal = {
  body: Joi.object().keys({
    lenderInstitute: Joi.array().items(Joi.objectId()).required(),
    deal: Joi.objectId().required(),
    lenderPlacement: Joi.objectId().required(),
  }),
};

export const sendDealV2 = {
  body: Joi.object().keys({
    deals: Joi.array().items(
      Joi.object().keys({
        lenderInstitute: Joi.objectId().required(),
        deal: Joi.objectId().required(),
        lenderPlacement: Joi.objectId().required(),
        followUpContent: Joi.string(),
      })
    ),
  }),
  query: Joi.object().keys({
    isFollowUp: Joi.boolean(),
  }),
};

export const getEmailTemplateId = {
  params: Joi.object().keys({
    emailTemplateId: Joi.objectId().required(),
  }),
};

export const sendEmail = {
  params: Joi.object().keys({
    emailTemplateId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    getEmailTemplate: Joi.object().keys({
      from: Joi.string().email(),
      contact: Joi.array().items(
        Joi.object().keys({
          sendTo: Joi.string().email(),
          name: Joi.string(),
        })
      ),
      sendTo: Joi.array().items(Joi.string().email()),
      name: Joi.string(),
      ccList: Joi.array().items(Joi.string().email()),
      bccList: Joi.array().items(Joi.string().email()),
      subject: Joi.string(),
      dealDocument: Joi.array().items(Joi.objectId()),
      lenderPlacement: Joi.objectId(),
      emailContent: Joi.string(),
      deal: Joi.objectId(),
      emailAttachments: Joi.array().items(Joi.object()),
      totalLoanAmount: Joi.number(),
      templateName: Joi.string(),
      advisorName: Joi.string(),
    }),
    sendToAdvisor: Joi.boolean(),
  }),
};

export const getEmailTemplatesByLanderPlacementId = {
  params: Joi.object().keys({
    lenderPlacement: Joi.objectId().required(),
  }),
};

export const sendMessage = {
  params: Joi.object().keys({
    lenderPlacementId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    message: Joi.string(),
    documents: Joi.array().items(documentSchema),
  }),
};

export const getMessages = {
  params: Joi.object().keys({
    lenderPlacementId: Joi.objectId().required(),
  }),
};

export const updateAndSaveInitialEmailContent = {
  params: Joi.object().keys({
    emailTemplateId: Joi.objectId().required(),
  }),
  body: Joi.object().keys({
    from: Joi.string().email(),
    contact: Joi.array().items(
      Joi.object().keys({
        sendTo: Joi.string().email(),
        name: Joi.string(),
      })
    ),
    sendTo: Joi.array().items(Joi.string().email()),
    name: Joi.string(),
    ccList: Joi.array().items(Joi.string().email()),
    bccList: Joi.array().items(Joi.string().email()),
    subject: Joi.string(),
    dealDocument: Joi.array().items(Joi.objectId()),
    lenderPlacement: Joi.objectId(),
    emailContent: Joi.string(),
    deal: Joi.objectId(),
    emailAttachments: Joi.array().items(Joi.object()),
    totalLoanAmount: Joi.number(),
    templateName: Joi.string(),
    advisorName: Joi.string(),
  }),
};
