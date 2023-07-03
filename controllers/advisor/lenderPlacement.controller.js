/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import {
  s3Service,
  lenderPlacementService,
  emailService,
  emailTemplateService,
  activityLogService,
  lenderContactService,
} from 'services';
import { catchAsync } from 'utils/catchAsync';
import FileFieldValidationEnum from 'models/fileFieldValidation.model';
import mongoose from 'mongoose';
import TempS3 from 'models/tempS3.model';
import { asyncForEach, encodeUrl } from 'utils/common';
import _ from 'lodash';
import { pick } from '../../utils/pick';
import ApiError from '../../utils/ApiError';
import { Deal, EmailTemplate, LenderPlacement, User } from '../../models';
import { sendDealTemplate1Text } from '../../utils/emailContent';
import enumModel, {
  EnumOfActivityType,
  EnumOfEmailStatus,
  EnumStageOfDeal,
  EnumStageOfLenderPlacement,
} from '../../models/enum.model';
import config from '../../config/config';
import { stageOfLenderPlacementWithNumber } from '../../utils/enumStageOfLenderPlacement';
import { detailsInDeal } from '../../utils/detailsInDeal';

// eslint-disable-next-line import/no-extraneous-dependencies
const he = require('he');

const moveFileAndUpdateTempS3 = async ({ url, newFilePath }) => {
  const newUrl = await s3Service.moveFile({ key: url, newFilePath });
  await TempS3.findOneAndUpdate({ url }, { url: newUrl });
  return newUrl;
};
// this is used to move file to new specified path as shown in basePath, used in create and update controller.
const moveFiles = async ({ body, user, moveFileObj }) => {
  await asyncForEach(Object.keys(moveFileObj), async (key) => {
    const fieldValidation = FileFieldValidationEnum[`${key}OfLenderPlacement`];
    const basePath = `users/${user._id}/lenderPlacement/${body._id}/${key}/${mongoose.Types.ObjectId()}/`;
    if (Array.isArray(moveFileObj[key])) {
      const newUrlsArray = [];
      moveFileObj[key].map(async (ele) => {
        const filePath = `${mongoose.Types.ObjectId()}_${ele.split('/').pop()}`;
        newUrlsArray.push(await moveFileAndUpdateTempS3({ url: ele, newFilePath: basePath + filePath }));
      });
      Object.assign(body, { ...body, [key]: await Promise.all(newUrlsArray) });
    } else {
      const filePath = `${mongoose.Types.ObjectId()}_${moveFileObj[key].split('/').pop()}`;
      Object.assign(body, {
        ...body,
        [key]: await moveFileAndUpdateTempS3({
          url: moveFileObj[key],
          newFilePath: basePath + filePath,
        }),
      });
      if (fieldValidation.generateThumbnails) {
        Object.assign(body, {
          ...body,
          [`thumbOf${key}`]: await s3Service.createThumbnails({
            url: moveFileObj[key],
            resolutions: fieldValidation.thumbnailResolutions,
          }),
        });
      }
    }
  });
};
export const get = catchAsync(async (req, res) => {
  const { lenderPlacementId } = req.params;
  const filter = {
    _id: lenderPlacementId,
  };
  const options = {
    populate: { path: 'lendingInstitution' },
  };
  const lenderPlacement = await lenderPlacementService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: lenderPlacement });
});
const getLenderPlacementFilterQuery = (query) => {
  const filter = pick(query, ['deal']);
  if (query.search) {
    filter.$or = [{ firstName: new RegExp(query.search, 'i') }, { lastName: new RegExp(query.search, 'i') }];
  }
  return filter;
};
export const list = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getLenderPlacementFilterQuery(query);

  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };

  const filter = {
    ...queryParams,
    stage: { $ne: EnumStageOfLenderPlacement.ARCHIVE },
  };
  const options = {
    ...pick(query, ['sort', 'limit', 'page']),
    populate: [
      {
        path: 'lendingInstitution',
      },
      {
        path: 'lenderContact',
      },
      {
        path: 'lenderAllContacts',
      },
      {
        path: 'notes',
        populate: [{ path: 'user' }],
        match: { notesType: enumModel.EnumOfNotesTypeOfLenderNotes.EXTERNAL_NOTE },
      },
      {
        path: 'internalNotes',
        populate: [{ path: 'user' }],
        match: { notesType: enumModel.EnumOfNotesTypeOfLenderNotes.INTERNAL_NOTE },
      },
    ],
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
    options.collation = { locale: 'en', caseLevel: false }; // Case-insensitive sorting
  }
  const lenderPlacement = await lenderPlacementService.getLenderPlacementList(filter, options);
  return res.status(httpStatus.OK).send({ results: lenderPlacement });
});

export const paginate = catchAsync(async (req, res) => {
  const { query } = req;
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = { ...pick(query, ['deal']) };
  const options = {
    ...pick(query, ['limit', 'page']),
    populate: [
      {
        path: 'lendingInstitution',
      },
      {
        path: 'lenderContact',
      },
      {
        path: 'lenderAllContacts',
      },
      {
        path: 'notes',
      },
    ],
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const lenderPlacement = await lenderPlacementService.getLenderPlacementListWithPagination(filter, options);
  lenderPlacement.results = lenderPlacement.results.map((lenderPlacementObject) => ({
    createdAt: lenderPlacementObject.createdAt,
    ...lenderPlacementObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: lenderPlacement });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const { user } = req;
  const moveFileObj = {
    ...(body.termSheet && { termSheet: body.termSheet }),
  };
  if (body.stage) {
    body.stageEnumWiseNumber = stageOfLenderPlacementWithNumber(body.stage);
  }

  body._id = mongoose.Types.ObjectId();
  await moveFiles({ body, user, moveFileObj });
  const options = {};
  // Before it wasn't allowing other institute to add as well even if one is already added, so using promise.all so that it'll throw error for one but will allow others to get added in deal
  await Promise.all(
    body.lendingDetails.map(async (lendingInstitute) => {
      const placement = {
        ...lendingInstitute,
        createdBy: body.createdBy,
        updatedBy: body.updatedBy,
      };
      const lenderPlacementResult = await lenderPlacementService.createLenderPlacement(placement, options);

      if (lenderPlacementResult) {
        const uploadedFileUrls = [];
        uploadedFileUrls.push(lenderPlacementResult.termSheet);
        await TempS3.updateMany({ url: { $in: uploadedFileUrls } }, { active: true });
      }
    })
  );
  return res.status(httpStatus.CREATED).send({ results: 'Lender added to the deal' });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user._id;
  const { lenderPlacementId } = req.params;
  const { user } = req;
  const termsheet = body.termSheet;
  const moveFileObj = {
    ...(body.termSheet && { termSheet: body.termSheet.url }),
  };
  body._id = lenderPlacementId;
  await moveFiles({ body, user, moveFileObj });
  const filter = {
    _id: lenderPlacementId,
  };
  if (body.termSheet) {
    const { fileName } = termsheet;
    body.termSheet = encodeUrl(body.termSheet);
    body.termSheet = { url: body.termSheet, fileName };
  }
  if (body.terms) {
    const futureFunding = body.terms.futureFunding ? body.terms.futureFunding : 0;
    body.terms.totalLoanAmount = body.terms.initialFunding + futureFunding;
  }

  if (body.stage) {
    body.stageEnumWiseNumber = stageOfLenderPlacementWithNumber(body.stage);
  }

  const options = {
    new: true,
    populate: [
      { path: 'lendingInstitution' },
      { path: 'lenderContact' },
      { path: 'notes' },
      { path: 'lenderAllContacts' },
      { path: 'deal' },
    ],
  };
  const beforeLenderPlacementResult = await lenderPlacementService.getLenderPlacementById(lenderPlacementId);

  const oldStage = beforeLenderPlacementResult.stage;

  if (oldStage !== EnumStageOfLenderPlacement.CLOSED && body.stage === EnumStageOfLenderPlacement.ARCHIVE) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only Archive possible when status changed from Closed to Archive..');
  }
  if (oldStage === EnumStageOfLenderPlacement.CLOSED && body.stage === EnumStageOfLenderPlacement.ARCHIVE) {
    await LenderPlacement.findByIdAndUpdate(lenderPlacementId, {
      stage: EnumStageOfLenderPlacement.ARCHIVE,
    });
  }
  const lenderPlacementResult = await lenderPlacementService.updateLenderPlacement(filter, body, options);
  const dealId = lenderPlacementResult.deal;
  if (lenderPlacementResult.stage === enumModel.EnumStageOfLenderPlacement.CLOSING) {
    const stage = enumModel.EnumStageOfDeal.CLOSING;
    await Deal.findByIdAndUpdate(dealId, {
      stage,
      details: await detailsInDeal(stage, dealId),
    });
    const createActivityLogBody = {
      createdBy: req.user._id,
      updatedBy: req.user._id,
      update: `${lenderPlacementResult.deal.dealName} moved into closing with ${lenderPlacementResult.lendingInstitution.lenderNameVisible}`,
      deal: dealId,
      type: EnumOfActivityType.ACTIVITY,
      user: config.activitySystemUser || 'system',
    };
    if (createActivityLogBody.update) {
      await activityLogService.createActivityLog(createActivityLogBody);
    }
  }
  // tempS3
  if (lenderPlacementResult.termSheet) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(lenderPlacementResult.termSheet.url);
    await TempS3.updateMany({ url: { $in: uploadedFileUrls } }, { active: true });
  }
  // if termSheet added for first time than only we add activity logs and update lenderPlacement stage to termSheet Received
  if (!beforeLenderPlacementResult.termSheet && body.termSheet) {
    const createActivityLogBody = {
      createdBy: req.user._id,
      updatedBy: req.user._id,
      update: `${beforeLenderPlacementResult.lendingInstitution.lenderNameVisible} posted a term sheet on ${lenderPlacementResult.deal.dealName}`,
      deal: lenderPlacementResult.deal,
      lender: lenderPlacementResult.lendingInstitution,
      type: EnumOfActivityType.ACTIVITY,
      user: config.activitySystemUser || 'system',
    };
    await activityLogService.createActivityLog(createActivityLogBody);

    const stage = EnumStageOfLenderPlacement.TERMS_SHEET_RECEIVED;
    await LenderPlacement.findByIdAndUpdate(lenderPlacementId, {
      stage,
      stageEnumWiseNumber: stageOfLenderPlacementWithNumber(stage),
    });
  }

  // if terms added for first time than only we add activity logs and update lenderPlacement stage to terms Received
  if (!beforeLenderPlacementResult.terms && body.terms) {
    const createActivityLogBody = {
      createdBy: req.user._id,
      updatedBy: req.user._id,
      update: `${beforeLenderPlacementResult.lendingInstitution.lenderNameVisible} sent over terms`,
      deal: lenderPlacementResult.deal,
      lender: lenderPlacementResult.lendingInstitution,
      type: EnumOfActivityType.ACTIVITY,
      user: config.activitySystemUser || 'system',
    };
    await activityLogService.createActivityLog(createActivityLogBody);

    const stage = EnumStageOfLenderPlacement.TERMS_RECEIVED;
    await LenderPlacement.findByIdAndUpdate(lenderPlacementId, {
      stage,
      stageEnumWiseNumber: stageOfLenderPlacementWithNumber(stage),
    });
  }

  return res.status(httpStatus.OK).send({ results: lenderPlacementResult });
});

export const remove = catchAsync(async (req, res) => {
  const { lenderPlacementId } = req.params;
  const filter = {
    _id: lenderPlacementId,
  };
  const lenderPlacement = await lenderPlacementService.removeLenderPlacement(filter);
  return res.status(httpStatus.OK).send({ results: lenderPlacement });
});

export const sendDeal = catchAsync(async (req, res) => {
  const { lenderInstitute, deal, lenderPlacement } = req.body;
  const advisorName = req.user.name;
  const advisorEmail = req.user.email;
  const filterToFindContact = {
    lenderInstitute,
  };
  const filterToFindPlacement = {
    lendingInstitution: lenderInstitute,
  };
  const filterToFindDeal = {
    deal,
  };
  const lenderContact = await lenderPlacementService.sendDeal(filterToFindContact, filterToFindPlacement, filterToFindDeal);

  let lenderName;
  if (lenderContact.lenderPlacement.lendingInstitution) {
    lenderName = lenderContact.lenderPlacement.lendingInstitution.lenderNameVisible;
  }

  let totalLoanAmount = 0;
  const { docIds } = lenderContact;
  const createTemplates = [];

  if (!lenderContact.lenderPlacement.terms) {
    totalLoanAmount = 0;
  } else {
    totalLoanAmount = lenderContact.lenderPlacement.terms.totalLoanAmount;
    totalLoanAmount /= 1000000;
    totalLoanAmount = totalLoanAmount.toFixed(2);
  }

  if (lenderPlacement) {
    const contact = lenderContact.lenderContact.map((lc) => {
      return {
        sendTo: lc.email,
        name: lc.firstName,
      };
    });

    const staticEmailTemplateData = sendDealTemplate1Text();
    const templateData = await EmailTemplate.find({
      lenderPlacement,
      isFirstTime: true,
    });
    if (!templateData.length) {
      const defaultTemplate = await EmailTemplate.create({
        from: advisorEmail,
        advisorName,
        contact,
        subject: '547 Valley Road - $1.5m Acquisition Financing',
        dealDocument: docIds,
        emailContent: staticEmailTemplateData,
        lenderPlacement,
        deal,
        emailAttachments: [],
        isFirstTime: true,
        isEmailSent: false,
        totalLoanAmount,
        templateName: `defaultTemplate - ${lenderName}`,
      });
      const blankTemplate = await EmailTemplate.create({
        from: advisorEmail,
        advisorName,
        contact,
        subject: '',
        dealDocument: docIds,
        emailContent: '',
        lenderPlacement,
        deal,
        emailAttachments: [],
        isFirstTime: true,
        isEmailSent: false,
        isBlankTemplate: true,
        templateName: `blankTemplate - ${lenderName}`,
      });
      createTemplates.push(defaultTemplate, blankTemplate);
    }
  }
  return res.status(httpStatus.OK).send({ createTemplates });
});

export const getEmailTemplatesByLanderPlacementId = catchAsync(async (req, res) => {
  const { lenderPlacement } = req.params;
  const filter = {
    lenderPlacement,
  };

  const emailTemplate = await emailTemplateService.getEmailTemplateList(filter);
  return res.status(httpStatus.OK).send({ results: emailTemplate });
});

export const getTemplateByTemplateId = catchAsync(async (req, res) => {
  const { emailTemplateId } = req.params;

  const filter = {
    _id: emailTemplateId,
  };
  const getEmailTemplate = await EmailTemplate.findOne(filter).populate('deal');
  if (!getEmailTemplate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'no EmailTemplate found with this id!');
  }
  return res.status(httpStatus.OK).send({ getEmailTemplate });
});

export const updateAndSaveInitialEmailContent = catchAsync(async (req, res) => {
  const { emailTemplateId } = req.params;

  const filter = {
    _id: emailTemplateId,
  };
  const getEmailTemplate = await EmailTemplate.findOne(filter).lean();
  if (!getEmailTemplate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'no EmailTemplate found with this id..!!');
  }

  if (req.body.templateName === getEmailTemplate.templateName) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'A template with the same name already exists..');
  }

  const body = {
    ...getEmailTemplate,
  };
  delete body._id;

  const emailContent = req.body.emailContent ? req.body.emailContent : body.emailContent;

  const updatedBody = {
    ...body,
    ...req.body,
    ...{ lenderPlacement: getEmailTemplate.lenderPlacement },
    ...{ isFirstTime: false },
    ...{
      /*
       * he (for “HTML entities”) is a robust HTML entity encoder/decoder written in JavaScript
       * */
      emailContent: he.decode(emailContent),
    },
  };

  if (updatedBody.emailAttachments) {
    const emailAttachments = updatedBody.emailAttachments.map((item) => {
      return {
        fileName: item.fileName,
        path: item.url ? item.url : item.path,
        fileType: item.fileType,
      };
    });
    delete updatedBody.emailAttachments;
    updatedBody.emailAttachments = emailAttachments;
  }
  if (updatedBody.sendTo) {
    const result = updatedBody.sendTo.map((item) => {
      return {
        sendTo: item,
      };
    });
    if (updatedBody.contact) {
      // eslint-disable-next-line array-callback-return
      const data = await Promise.all(
        result.map(async (item) => {
          const getRecordFromContact = updatedBody.contact.find((value) => item.sendTo === value.sendTo);
          if (getRecordFromContact) {
            return getRecordFromContact;
          }

          // eslint-disable-next-line no-shadow
          const filter = {
            email: item.sendTo,
          };
          const lenderContact = await lenderContactService.getOne(filter);
          if (!lenderContact) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'First, Add this Email in Lender Contact');
          }
          // eslint-disable-next-line no-param-reassign
          item.name = lenderContact.firstName;
          return item;
        })
      );

      updatedBody.contact = data;
    } else {
      updatedBody.contact = result;
    }
    delete updatedBody.sendTo;
  }

  const templateData = await EmailTemplate.create(updatedBody);

  return res.status(httpStatus.OK).send({ templateData });
});

export const sendEmail = catchAsync(async (req, res) => {
  const { emailTemplateId } = req.params;
  const { sendToAdvisor } = req.body;
  const filter = {
    _id: emailTemplateId,
  };
  const getUser = await User.findOne({ _id: req.user._id });
  const { emailPresentingPostmark } = getUser;
  const emailTemplate = await EmailTemplate.findOne(filter).lean().populate('deal');

  if (!emailTemplate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'no EmailTemplate found with this id..!!');
  }

  let getEmailTemplate;
  if (req.body.getEmailTemplate) {
    getEmailTemplate = req.body.getEmailTemplate;
    const result = getEmailTemplate.sendTo.map((item) => {
      return {
        sendTo: item,
      };
    });
    if (emailTemplate.contact) {
      // eslint-disable-next-line array-callback-return
      const data = await Promise.all(
        result.map(async (item) => {
          const getRecordFromContact = emailTemplate.contact.find((value) => item.sendTo === value.sendTo);
          if (getRecordFromContact) {
            return getRecordFromContact;
          }
          // eslint-disable-next-line no-shadow
          const filter = {
            email: item.sendTo,
          };
          const lenderContact = await lenderContactService.getOne(filter);

          if (!lenderContact) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'First, Add this Email in Lender Contact');
          }
          // eslint-disable-next-line no-param-reassign
          item.name = lenderContact.firstName;
          return item;
        })
      );

      getEmailTemplate.contact = data;
    } else {
      getEmailTemplate.contact = result;
    }
    delete getEmailTemplate.sendTo;
    if (getEmailTemplate.emailContent) {
      getEmailTemplate.emailContent = he.decode(getEmailTemplate.emailContent);
    }
  } else {
    getEmailTemplate = emailTemplate;
  }

  const placementId = getEmailTemplate.lenderPlacement;

  const dealId = emailTemplate.deal._id;

  const ccList = getEmailTemplate.ccList.map((item) => item);

  const bccList = getEmailTemplate.bccList.map((item) => item);

  const headers = [
    {
      Value: `${placementId}`,
    },
  ];

  const sendToIsEmpty = getEmailTemplate.contact.map((item) => item.sendTo);
  _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
  if (sendToIsEmpty.length === 0) {
    return res.status(httpStatus.OK).send({ results: 'No email addresses to send to.' });
  }
  if (sendToAdvisor) {
    const isAdvisor = _.template(getEmailTemplate.emailContent)({
      userFirstName: req.user.firstName,
      totalLoanAmount: getEmailTemplate.totalLoanAmount,
      advisorName: req.user.firstName,
      advisorEmail: req.user.email,
    });
    const emailAttachments = getEmailTemplate.emailAttachments.map((item) => {
      return {
        fileName: item.fileName,
        path: item.url ? item.url : item.path,
        fileType: item.fileType,
      };
    });

    await emailService.sendEmail({
      to: req.user.email,
      subject: `TEST - ${getEmailTemplate.subject}`,
      ...(emailPresentingPostmark && { from: req.user.email }),
      text: isAdvisor,
      attachments: emailAttachments,
      isHtml: true,
      headers,
    });
    return res.status(httpStatus.OK).send({ results: 'Test-mail sent..' });
  }
  const getText = (userFirstName, totalLoanAmount, advisorName, advisorEmail) => {
    const data = _.template(getEmailTemplate.emailContent)({
      userFirstName,
      totalLoanAmount,
      advisorName,
      advisorEmail,
    });
    return data;
  };

  // todo : make function for this one, and make synchronize so we can handle error coming from that.
  await Promise.allSettled(
    getEmailTemplate.contact.map((item) => {
      return emailService.sendEmail({
        to: item.sendTo,
        cc: ccList,
        bcc: bccList,
        subject: getEmailTemplate.subject,
        ...(emailPresentingPostmark && { from: req.user.email }),
        text: getText(item.name, getEmailTemplate.totalLoanAmount, getEmailTemplate.advisorName, getEmailTemplate.from),
        // eslint-disable-next-line no-shadow
        attachments: getEmailTemplate.emailAttachments.map((item) => {
          return {
            fileName: item.fileName,
            path: item.url ? item.url : item.path,
            fileType: item.fileType,
          };
        }),
        isHtml: true,
        headers,
      });
    })
  );

  const result = await LenderPlacement.findOne({ _id: placementId });

  if (result.isEmailSent === EnumOfEmailStatus.SEND_DEAL) {
    const stage = EnumStageOfLenderPlacement.SENT;
    await LenderPlacement.findByIdAndUpdate(placementId, {
      followOnDate: new Date(Date.now() + config.followUpTimeForSendEmail),
      isEmailSent: EnumOfEmailStatus.EMAIL_SENT,
      isEmailSentFirstTime: true,
      stage,
      stageEnumWiseNumber: stageOfLenderPlacementWithNumber(stage),
    });
  } else {
    await LenderPlacement.findByIdAndUpdate(placementId, {
      followOnDate: new Date(Date.now() + config.followUpTimeForSendEmail),
      isEmailSent: EnumOfEmailStatus.EMAIL_SENT,
      isEmailSentFirstTime: false,
    });
  }
  const stage = EnumStageOfDeal.OUT_IN_MARKET;
  await Deal.findByIdAndUpdate(dealId, {
    stage,
    details: await detailsInDeal(stage, dealId),
  });
  const deal = await Deal.findById(dealId);
  const createActivityLogBody = {
    createdBy: req.user._id,
    updatedBy: req.user._id,
    update: `${deal.dealName} was sent out to lenders`,
    deal: dealId,
    type: EnumOfActivityType.ACTIVITY,
    user: config.activitySystemUser || 'system',
  };
  if (createActivityLogBody.update) {
    await activityLogService.createActivityLog(createActivityLogBody);
  }
  return res.status(httpStatus.OK).send({ results: 'Email sent....' });
});
