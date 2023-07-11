import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { dealSummaryService, s3Service } from '../../services';
import { catchAsync } from '../../utils/catchAsync';
import TempS3 from '../../models/tempS3.model';
import { asyncForEach, encodeUrl } from '../../utils/common';
import FileFieldValidationEnum from '../../models/fileFieldValidation.model';

// eslint-disable-next-line import/prefer-default-export
const moveFileAndUpdateTempS3 = async ({ url, newFilePath }) => {
  const newUrl = await s3Service.moveFile({ key: url, newFilePath });
  await TempS3.findOneAndUpdate({ url }, { url: newUrl });
  return newUrl;
};
// this is used to move file to new specified path as shown in basePath, used in create and update controller.
const moveFiles = async ({ body, user, moveFileObj }) => {
  await asyncForEach(Object.keys(moveFileObj), async (key) => {
    const fieldValidation = FileFieldValidationEnum[`${key}OfDealSummary`];
    const basePath = `users/${user._id}/dealSummary/${key}/${mongoose.Types.ObjectId()}/`;
    if (Array.isArray(moveFileObj[key])) {
      const newUrlsArray = [];
      moveFileObj[key].map(async (ele) => {
        const filePath = `${mongoose.Types.ObjectId()}_${ele.split('/').pop()}`;
        newUrlsArray.push(moveFileAndUpdateTempS3({ url: ele, newFilePath: basePath + filePath }));
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
export const importFileForDealSummary = catchAsync(async (req, res) => {
  const { url, deal } = req.query;
  const dealSummary = await dealSummaryService.importFileForDealSummary({
    url,
    deal,
  });
  res.status(httpStatus.OK).send({ results: dealSummary });
});

export const get = catchAsync(async (req, res) => {
  const { dealSummaryId } = req.params;
  const filter = {
    _id: dealSummaryId,
  };
  const options = {};
  const dealSummary = await dealSummaryService.getDealSummaryById(filter, options);
  return res.status(httpStatus.OK).send({ results: dealSummary });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  body.user = req.user._id;
  const options = {};

  const dealSummary = await dealSummaryService.createDealSummary(body, options);

  return res.status(httpStatus.CREATED).send({ results: dealSummary });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  const { otherPhotos } = body;
  body.updatedBy = req.user;
  const { dealSummaryId } = req.params;
  const { user } = req;
  const moveFileObj = {
    ...(body.otherPhotos && { otherPhotos: body.otherPhotos.map((item) => item.url) }),
  };
  await moveFiles({ body, user, moveFileObj });
  const filter = {
    _id: dealSummaryId,
  };

  if (body.otherPhotos) {
    const fileName = otherPhotos.map((item) => item.fileName);
    body.otherPhotos = body.otherPhotos.map((item, index) => {
      return { url: encodeUrl(item), fileName: fileName[index] };
    });
  }

  const options = { new: true };

  const dealSummary = await dealSummaryService.updateDealSummary(filter, body, options);
  // tempS3
  if (dealSummary) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(...dealSummary.otherPhotos);
    // eslint-disable-next-line no-shadow
    const uploadedFileUrl = uploadedFileUrls.map((data) => data.url);
    await TempS3.updateMany({ url: { $in: uploadedFileUrl } }, { active: true });
  }
  return res.status(httpStatus.OK).send({ results: dealSummary });
});
