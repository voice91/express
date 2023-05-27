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
import { pick } from '../../utils/pick';

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
