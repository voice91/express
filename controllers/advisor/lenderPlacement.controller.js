/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { s3Service, lenderPlacementService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import FileFieldValidationEnum from 'models/fileFieldValidation.model';
import mongoose from 'mongoose';
import TempS3 from 'models/tempS3.model';
import { asyncForEach } from 'utils/common';
import _ from 'lodash';
import { pick } from '../../utils/pick';
import ApiError from '../../utils/ApiError';
import { EmailTemplate } from '../../models';
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
  const moveFileObj = {
    ...(body.termSheet && { termSheet: body.termSheet }),
  };
  body._id = lenderPlacementId;
  await moveFiles({ body, user, moveFileObj });
  const filter = {
    _id: lenderPlacementId,
  };
  const options = { new: true };
  const lenderPlacementResult = await lenderPlacementService.updateLenderPlacement(filter, body, options);
  // tempS3
  if (lenderPlacementResult) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(lenderPlacementResult.termSheet);
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
  const {
    lenderInstitute,
    // template,
    deal,
  } = req.body;
  // const advisorName = req.user.name;
  const advisorEmail = req.user.email;
  // const from = req.user.email;
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

  if (lenderContact.lenderPlacement) {
    totalLoanAmount = lenderContact.lenderPlacement.terms.totalLoanAmount;
    totalLoanAmount /= 1000000;
  }

  const files = lenderContact.dealDoc.map((doc) => doc.file);

  await asyncForEach(lenderContact.lenderContact, async (data) => {
    email = data.email;
    firstName = data.firstName;
    const tempalatData = sendDealTemplate1Text();
    const templateData = await EmailTemplate.create({
      sendTo: email,
      ccList: email,
      bccList: email,
      from: advisorEmail,
      name: firstName,
      subject: 'PFG Cold Storage Industrial - $9.1m Acquisition Financing',
      dealDocument: docIds,
      emailContent: tempalatData,
      deal,
      emailAttachments: files,
      isFirstTime: true,
      totalLoanAmount,
    });

    createTemplates.push(templateData);
  });

  // todo : need this code for send email to user for template that getting from user tabel
  // await Promise.all(
  //   // eslint-disable-next-line array-callback-return
  //   Object.values(lenderContact).map(async (data) => {
  //     // eslint-disable-next-line array-callback-return
  //     await data.map(async (item) => {
  //       if (item.email || item.firstName) {
  //         email = item.email;
  //         firstName = item.firstName;
  //       } else if (item.terms) {
  //         totalLoanAmount = item.terms.totalLoanAmount;
  //         totalLoanAmount /= 1000000;
  //       } else if (item.file) {
  //         file.push(item.file);
  //       }
  //
  //       const tempalatData = sendDealTemplate1Text({
  //         email,
  //         firstName,
  //         totalLoanAmount,
  //         file,
  //         advisorName,
  //         from,
  //       });
  //       const emailTemplateData = await EmailTemplate.create({
  //         sendTo: email,
  //         ccList: email,
  //         bccList: email,
  //         from: advisorEmail,
  //         name: firstName,
  //         subject: 'PFG Cold Storage Industrial - $9.1m Acquisition Financing',
  //         dealDocument: docIds,
  //         emailContent: tempalatData,
  //         deal,
  //         emailAttachments: file,
  //         isFirstTime: true,
  //       });
  //
  //       console.log(`====emailTemplateData>`, emailTemplateData);
  //
  //       createdEmailTemplates.push(emailTemplateData);
  //
  //       // todo : need to mmove this code, in other api from where we send email
  //       // if (template === EnumTypeOfTemplate.SENDDEALTEMPLATE1)
  //       //   return emailService.sendDealTemplate1({ email, firstName, totalLoanAmount, file, advisorName, from }).then().catch();
  //       // if (template === EnumTypeOfTemplate.SENDDEALTEMPLATE2) {
  //       //   // todo : currently we are sending sendDealTemplate1 as we have to design sendDealTemplate2 after completion that we have to chenge it here
  //       //   return emailService
  //       //     .sendDealTemplate1({
  //       //       email,
  //       //       firstName,
  //       //       totalLoanAmount,
  //       //       file,
  //       //       advisorName,
  //       //       from,
  //       //     })
  //       //     .then()
  //       //     .catch();
  //       // }
  //       // if (template === EnumTypeOfTemplate.SENDDEALTEMPLATE3) {
  //       //   // todo : currently we are sending sendDealTemplate1 as we have to design sendDealTemplate2 after completion that we have to chenge it here
  //       //   return emailService
  //       //     .sendDealTemplate1({
  //       //       email,
  //       //       firstName,
  //       //       totalLoanAmount,
  //       //       file,
  //       //       advisorName,
  //       //       from,
  //       //     })
  //       //     .then()
  //       //     .catch();
  //       // }
  //       // toddo : fix this after adding other templates
  //       // throw new ApiError(httpStatus.BAD_REQUEST, `please enter correct template type: ${lenderInstitute}`);
  //     });
  //   })
  // );

  return res.status(httpStatus.OK).send({ createTemplates });
});

export const getSendDealById = catchAsync(async (req, res) => {
  const { getSendDealIdId } = req.params;

  const filter = {
    _id: getSendDealIdId,
  };
  const getEmailTemplate = await EmailTemplate.findOne(filter);
  if (!getEmailTemplate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'no EmailTemplate found with this id!');
  }
  return res.status(httpStatus.OK).send({ getEmailTemplate });
});

export const updateAndSaveInitialEmailContent = catchAsync(async (req, res) => {
  const { getSendDealIdId } = req.params;

  const filter = {
    _id: getSendDealIdId,
  };
  const getEmailTemplate = await EmailTemplate.findOne(filter).lean();
  if (!getEmailTemplate) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'no EmailTemplate found with this id!');
  }

  const body = {
    ...getEmailTemplate,
  };
  delete body._id;

  const updatedBody = {
    ...body,
    ...req.body,
  };

  const templateData = await EmailTemplate.create(updatedBody);

  return res.status(httpStatus.OK).send({ templateData });
});
