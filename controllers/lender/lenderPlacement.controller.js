/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { s3Service, lenderPlacementService, activityLogService, dealService, lenderContactService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import FileFieldValidationEnum from 'models/fileFieldValidation.model';
import mongoose from 'mongoose';
import TempS3 from 'models/tempS3.model';
import { asyncForEach, encodeUrl, manageLenderPlacementStageTimeline } from 'utils/common';
import { pick } from '../../utils/pick';
import { stageOfLenderPlacementWithNumber } from '../../utils/enumStageOfLenderPlacement';
import enumModel, { EnumOfActivityType, EnumStageOfLenderPlacement } from '../../models/enum.model';
import ApiError from '../../utils/ApiError';
import { detailsInDeal } from '../../utils/detailsInDeal';
import config from '../../config/config';

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
const getLenderPlacementFilterQuery = (query) => {
  const filter = pick(query, ['deal', 'stage', 'isFavourite', 'isArchived']);
  if (query.search) {
    filter.$or = [{ firstName: new RegExp(query.search, 'i') }, { lastName: new RegExp(query.search, 'i') }];
  }
  return filter;
};
export const get = catchAsync(async (req, res) => {
  const { lenderPlacementId } = req.params;
  const filter = {
    _id: lenderPlacementId,
  };
  const options = {
    populate: [{ path: 'lendingInstitution' }],
  };
  const lenderPlacement = await lenderPlacementService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: lenderPlacement });
});

export const list = catchAsync(async (req, res) => {
  const { query } = req;
  const { user } = req;
  const queryParams = getLenderPlacementFilterQuery(query);

  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const lenderContact = await lenderContactService.getOne({ email: user.email });
  const filter = {
    ...queryParams,
    lendingInstitution: lenderContact.lenderInstitute,
  };
  const options = {
    ...pick(query, ['sort', 'limit', 'page']),
    populate: [
      { path: 'lenderAllContacts' },
      {
        path: 'lendingInstitution',
      },
      {
        path: 'lenderContact',
      },
    ],
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
    options.collation = { locale: 'en', caseLevel: false }; // Case-insensitive sorting
  }
  const lenderPlacements = await lenderPlacementService.getLenderPlacementList(filter, options);
  // here finding placements for the particular lender from the all lenderPlacementsList for a deal
  const lenderPlacement = lenderPlacements.filter((placement) =>
    placement.lenderAllContacts.map((contact) => contact.email).includes(req.user.email)
  );
  return res.status(httpStatus.OK).send({ results: lenderPlacement });
});

export const paginate = catchAsync(async (req, res) => {
  const { query } = req;
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {};
  const options = {
    ...pick(query, ['limit', 'page']),
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
  body.createdBy = req.user;
  body.updatedBy = req.user;
  const { user } = req;
  const moveFileObj = {
    ...(body.termSheet && { termSheet: body.termSheet }),
  };
  body._id = mongoose.Types.ObjectId();
  await moveFiles({ body, user, moveFileObj });
  const options = {};
  const lenderPlacementResult = await lenderPlacementService.createLenderPlacement(body, options);
  if (lenderPlacementResult) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(lenderPlacementResult.termSheet);
    await TempS3.updateMany({ url: { $in: uploadedFileUrls } }, { active: true });
  }
  return res.status(httpStatus.CREATED).send({ results: lenderPlacementResult });
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
    body.termSheet = { url: encodeUrl(body.termSheet), fileName };
  }
  if (body.terms) {
    const futureFunding = body.terms.futureFunding ? body.terms.futureFunding : 0;
    body.terms.totalLoanAmount = body.terms.initialFunding + futureFunding;
  }

  const options = {
    new: true,
    populate: [{ path: 'lendingInstitution' }, { path: 'deal' }],
  };
  const beforeLenderPlacementResult = await lenderPlacementService.getLenderPlacementById(lenderPlacementId);

  const oldStage = beforeLenderPlacementResult.stage;

  if (body.stage) {
    body.stageEnumWiseNumber = stageOfLenderPlacementWithNumber(body.stage);
    body.nextStep = body.nextStep ? body.nextStep : enumModel.EnumNextStepOfLenderPlacement[body.stage];
    body.timeLine = manageLenderPlacementStageTimeline(oldStage, body.stage, beforeLenderPlacementResult.timeLine);
  }
  if (oldStage !== EnumStageOfLenderPlacement.CLOSED && body.stage === EnumStageOfLenderPlacement.ARCHIVE) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only Archive possible when status changed from Closed to Archive..');
  }
  if (oldStage === EnumStageOfLenderPlacement.CLOSED && body.stage === EnumStageOfLenderPlacement.ARCHIVE) {
    await lenderPlacementService.updateLenderPlacement(
      { _id: lenderPlacementId },
      {
        stage: EnumStageOfLenderPlacement.ARCHIVE,
      }
    );
  }
  const lenderPlacementResult = await lenderPlacementService.updateLenderPlacement(filter, body, options);
  const dealId = lenderPlacementResult.deal;
  if (lenderPlacementResult.stage === enumModel.EnumStageOfLenderPlacement.CLOSING) {
    const stage = enumModel.EnumStageOfDeal.CLOSING;
    await dealService.updateDeal(
      { _id: dealId },
      {
        stage,
        timeLine: manageLenderPlacementStageTimeline(oldStage, stage, beforeLenderPlacementResult.timeLine),
        details: await detailsInDeal(stage, dealId),
        nextStep: enumModel.EnumNextStepOfLenderPlacement[stage],
      }
    );
    const createActivityLogBody = {
      createdBy: req.user._id,
      updatedBy: req.user._id,
      update: `${lenderPlacementResult.deal.dealName} moved into closing with ${lenderPlacementResult.lendingInstitution.lenderNameVisible}`,
      deal: dealId,
      type: EnumOfActivityType.ACTIVITY,
      user: config.activitySystemUser || 'system',
    };
    await activityLogService.createActivityLog(createActivityLogBody);
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
    await lenderPlacementService.updateLenderPlacement(
      { _id: lenderPlacementId },
      {
        stage,
        stageEnumWiseNumber: stageOfLenderPlacementWithNumber(stage),
        timeLine: manageLenderPlacementStageTimeline(oldStage, stage, beforeLenderPlacementResult.timeLine),
        nextStep: enumModel.EnumNextStepOfLenderPlacement[stage],
      }
    );
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
    await lenderPlacementService.updateLenderPlacement(
      { _id: lenderPlacementId },
      {
        stage,
        stageEnumWiseNumber: stageOfLenderPlacementWithNumber(stage),
        timeLine: manageLenderPlacementStageTimeline(oldStage, stage, beforeLenderPlacementResult.timeLine),
        nextStep: enumModel.EnumNextStepOfLenderPlacement[stage],
      }
    );
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

export const sendMessage = catchAsync(async (req, res) => {
  const { lenderPlacementId } = req.params;
  const lender = req.user;
  const { body } = req;
  await lenderPlacementService.updateLenderPlacement(
    { _id: lenderPlacementId },
    {
      $push: {
        messages: {
          sender: lender.firstName,
          updatedAt: new Date(),
          message: body.message,
          documents: body.documents,
        },
      },
    }
  );
  return res.status(httpStatus.OK).send({ results: 'Message sent...' });
});

export const getMessages = catchAsync(async (req, res) => {
  const { lenderPlacementId } = req.params;
  const filter = {
    _id: lenderPlacementId,
  };
  const options = {
    select: { messages: 1 },
  };
  const lenderPlacement = await lenderPlacementService.getOne(filter, options);

  return res.status(httpStatus.OK).send({ results: lenderPlacement });
});

export const removeDocument = catchAsync(async (req, res) => {
  const { lenderPlacementId, documentId } = req.params;
  const query = {
    _id: lenderPlacementId,
  };
  const updates = {
    $pull: {
      'messages.$[].documents': { _id: documentId }, // Remove the document with this _id from the documents array
    },
  };
  await lenderPlacementService.updateLenderPlacement(query, updates);
  return res.status(httpStatus.OK).send({ results: 'Document removed.' });
});
