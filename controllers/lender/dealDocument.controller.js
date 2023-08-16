/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { s3Service, dealDocumentService } from 'services';
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
// eslint-disable-next-line no-unused-vars
const moveFiles = async ({ body, user, moveFileObj }) => {
  await asyncForEach(Object.keys(moveFileObj), async (key) => {
    const fieldValidation = FileFieldValidationEnum[`${key}OfDealDocument`];
    const basePath = `users/${user._id}/dealDocument/${body._id}/${key}/${mongoose.Types.ObjectId()}/`;
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
  const { dealDocumentId } = req.params;
  const filter = {
    _id: dealDocumentId,
  };
  const options = {};
  const dealDocument = await dealDocumentService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: dealDocument });
});

export const getDealDocumentByDealV2 = catchAsync(async (req, res) => {
  const filter = {
    deal: req.params.dealId,
  };
  const options = {};
  const dealDocument = await dealDocumentService.getDealDocumentList(filter, options);
  return res.status(httpStatus.OK).send({ results: dealDocument });
});

export const list = catchAsync(async (req, res) => {
  const filter = {};
  const options = {};
  const dealDocument = await dealDocumentService.getDealDocumentList(filter, options);
  return res.status(httpStatus.OK).send({ results: dealDocument });
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
  const dealDocument = await dealDocumentService.getDealDocumentListWithPagination(filter, options);
  dealDocument.results = dealDocument.results.map((dealDocumentObject) => ({
    createdAt: dealDocumentObject.createdAt,
    ...dealDocumentObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: dealDocument });
});
