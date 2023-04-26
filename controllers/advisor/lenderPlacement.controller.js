/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { s3Service, lenderPlacementService, emailService, emailTemplateService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import FileFieldValidationEnum from 'models/fileFieldValidation.model';
import mongoose from 'mongoose';
import TempS3 from 'models/tempS3.model';
import { asyncForEach, encodeUrl } from 'utils/common';
import _ from 'lodash';
import { pick } from '../../utils/pick';
import ApiError from '../../utils/ApiError';
import { EmailTemplate, LenderPlacement } from '../../models';
import { sendDealTemplate1Text } from '../../utils/emailContent';

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
  const options = {};
  const lenderPlacement = await lenderPlacementService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: lenderPlacement });
});

export const list = catchAsync(async (req, res) => {
  const filter = {};
  const options = {};
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
    sort: sortObj,
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
  const lenderPlacement = await lenderPlacementService.getLenderPlacementListWithPagination(filter, options);
  lenderPlacement.results = lenderPlacement.results.map((lenderPlacementObject) => ({
    createdAt: lenderPlacementObject.createdAt,
    ...lenderPlacementObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: lenderPlacement });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user;
  body.updatedBy = req.user;
  const { user } = req;
  const moveFileObj = {
    ...(body.termSheet && { termSheet: body.termSheet }),
  };
  body._id = mongoose.Types.ObjectId();
  await moveFiles({ body, user, moveFileObj });
  const options = {};
  await Promise.all(
    body.lendingDetails.map(async (lendingInstitute) => {
      const lenderPlacementResult = await lenderPlacementService.createLenderPlacement(lendingInstitute, options);
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
  body.updatedBy = req.user;
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
  const options = { new: true };
  const lenderPlacementResult = await lenderPlacementService.updateLenderPlacement(filter, body, options);
  // tempS3
  if (lenderPlacementResult.termSheet) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(lenderPlacementResult.termSheet.url);
    await TempS3.updateMany({ url: { $in: uploadedFileUrls } }, { active: true });
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

  if (_.isEmpty(lenderContact.lenderContact)) {
    throw new ApiError(httpStatus.BAD_REQUEST, `can not find lenderContact with this id: ${lenderInstitute}`);
  }

  let totalLoanAmount = 0;
  let email;
  let firstName;
  const { docIds } = lenderContact;
  const createTemplates = [];

  if (!lenderContact.lenderPlacement.terms) {
    totalLoanAmount = 0;
  } else {
    totalLoanAmount = lenderContact.lenderPlacement.terms.totalLoanAmount;
    totalLoanAmount /= 1000000;
  }

  const files = lenderContact.dealDoc.map((doc) => {
    const data = doc.file;
    const fileName = data.split('/').pop();
    return {
      fileName,
      path: data,
    };
  });
  if (lenderPlacement) {
    await asyncForEach(lenderContact.lenderContact, async (data) => {
      email = data.email;
      firstName = data.firstName;
      const tempalatData = sendDealTemplate1Text();

      let templateData = await EmailTemplate.findOne({
        lenderPlacement,
        isFirstTime: true,
      });
      if (!templateData) {
        templateData = await EmailTemplate.create({
          sendTo: email,
          ccList: email,
          bccList: email,
          from: advisorEmail,
          name: firstName,
          advisorName,
          subject: '547 Valley Road - $1.5m Acquisition Financing',
          dealDocument: docIds,
          emailContent: tempalatData,
          lenderPlacement,
          deal,
          emailAttachments: files,
          isFirstTime: true,
          isEmailSent: false,
          totalLoanAmount,
          templateName: 'defaultTemplate',
        });
      }
      createTemplates.push(templateData);
    });
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
  const getEmailTemplate = await EmailTemplate.findOne(filter);
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

  const body = {
    ...getEmailTemplate,
  };
  delete body._id;

  const updatedBody = {
    ...body,
    ...req.body,
    ...{ isFirstTime: false },
  };

  const templateData = await EmailTemplate.create(updatedBody);

  return res.status(httpStatus.OK).send({ templateData });
});

export const sendEmail = catchAsync(async (req, res) => {
  const { emailTemplateId } = req.params;
  const { sendToAdvisor } = req.body;
  const filter = {
    _id: emailTemplateId,
  };
  const getEmailTemplate = await EmailTemplate.findOne(filter);

  const placementId = getEmailTemplate.lenderPlacement;

  const ccList = getEmailTemplate.ccList.map((item) => item);

  const bccList = getEmailTemplate.bccList.map((item) => item);

  const attachment = getEmailTemplate.emailAttachments.map((item) => item);

  if (sendToAdvisor) {
    const isAdvisor = _.template(getEmailTemplate.emailContent)({
      userFirstName: getEmailTemplate.advisorName,
      totalLoanAmount: getEmailTemplate.totalLoanAmount,
      advisorName: getEmailTemplate.advisorName,
      advisorEmail: getEmailTemplate.from,
    });
    await emailService.sendEmail({
      sendTo: getEmailTemplate.from,
      cc: ccList,
      bcc: bccList,
      subject: 'TEST - PFG Property...',
      from: getEmailTemplate.from,
      text: isAdvisor,
      attachments: attachment,
      isHtml: true,
    });
  } else {
    const data = _.template(getEmailTemplate.emailContent)({
      userFirstName: getEmailTemplate.name,
      totalLoanAmount: getEmailTemplate.totalLoanAmount,
      advisorName: getEmailTemplate.advisorName,
      advisorEmail: getEmailTemplate.from,
    });

    await getEmailTemplate.sendTo.map(async (item) => {
      await emailService.sendEmail({
        sendTo: item,
        cc: ccList,
        bcc: bccList,
        subject: getEmailTemplate.subject,
        from: getEmailTemplate.from,
        text: data,
        attachments: attachment,
        isHtml: true,
      });
    });
  }
  await LenderPlacement.findByIdAndUpdate(placementId, { isEmailSent: true });
  return res.status(httpStatus.OK).send({ results: 'Email sent....' });
});
