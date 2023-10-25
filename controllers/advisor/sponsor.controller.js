/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { s3Service, sponsorService, userService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import FileFieldValidationEnum from 'models/fileFieldValidation.model';
import mongoose from 'mongoose';
import TempS3 from 'models/tempS3.model';
import { asyncForEach, encodeUrl } from 'utils/common';
import { pick } from '../../utils/pick';

const moveFileAndUpdateTempS3 = async ({ url, newFilePath }) => {
  const newUrl = await s3Service.moveFile({ key: url, newFilePath });
  await TempS3.findOneAndUpdate({ url }, { url: newUrl });
  return newUrl;
};
// this is used to move file to new specified path as shown in basePath, used in create and update controller.
const moveFiles = async ({ body, user, moveFileObj }) => {
  await asyncForEach(Object.keys(moveFileObj), async (key) => {
    const fieldValidation = FileFieldValidationEnum[`${key}OfSponsor`];
    const basePath = `users/${user._id}/sponsor/${body._id}/${key}/${mongoose.Types.ObjectId()}/`;
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
const getSponsorFilterQuery = (query) => {
  const filter = pick(query, ['name']);
  if (query.search) {
    filter.$or = [{ name: new RegExp(query.search, 'i') }];
  }
  return filter;
};
export const getSponsor = catchAsync(async (req, res) => {
  const { sponsorId } = req.params;
  const filter = {
    _id: sponsorId,
  };
  const options = {};
  const sponsor = await sponsorService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: sponsor });
});

export const listSponsor = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getSponsorFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {
    ...queryParams,
  };
  const options = {
    limit: query.limit,
    skip: (query.page - 1) * query.limit,
    populate: { path: 'sponsor' },
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const sponsor = await sponsorService.getSponsorList(filter, options);
  return res.status(httpStatus.OK).send({ results: sponsor });
});

export const paginateSponsor = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getSponsorFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {
    ...queryParams,
  };
  const options = {
    ...pick(query, ['limit', 'page']),
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const sponsor = await sponsorService.getSponsorListWithPagination(filter, options);
  sponsor.results = sponsor.results.map((sponsorObject) => ({
    createdAt: sponsorObject.createdAt,
    ...sponsorObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: sponsor });
});

export const createSponsor = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const { user } = req;
  const moveFileObj = {
    ...(body.photo && { photo: body.photo.url }),
    ...(body.documents && { documents: body.documents.map((item) => item.url) }),
  };
  body._id = mongoose.Types.ObjectId();
  const photoFileName = body.photo ? body.photo.fileName : '';
  const photoFileType = body.photo ? body.photo.fileType : '';
  const fileName = body.documents ? body.documents.map((item) => item.fileName) : [];
  const fileType = body.documents ? body.documents.map((item) => item.fileType) : [];
  await moveFiles({ body, user, moveFileObj });
  if (body.documents) {
    body.documents = body.documents.map((item, index) => {
      return { url: encodeUrl(item), fileName: fileName[index], fileType: fileType[index] };
    });
  }
  if (body.photo) {
    body.photo = { url: encodeUrl(body.photo), fileName: photoFileName, fileType: photoFileType };
  }
  Object.assign(body, { advisor: user._id });
  const options = {};
  const sponsorResult = await sponsorService.createSponsor(body, options);
  await userService.updateUser({ email: { $in: body.borrowersEmails } }, { $addToSet: { sponsor: sponsorResult._id } });
  if (sponsorResult && (sponsorResult.photo || sponsorResult.documents)) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(sponsorResult.photo.url);
    uploadedFileUrls.push(...sponsorResult.documents.map((doc) => doc.url));
    await TempS3.updateMany({ url: { $in: uploadedFileUrls } }, { active: true });
  }
  return res.status(httpStatus.CREATED).send({ results: sponsorResult });
});

export const updateSponsor = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { sponsorId } = req.params;
  const { user } = req;
  const moveFileObj = {
    ...(body.photo && { photo: body.photo.url }),
    ...(body.documents && { documents: body.documents.map((item) => item.url) }),
  };
  body._id = sponsorId;
  const photoFileName = body.photo ? body.photo.fileName : '';
  const photoFileType = body.photo ? body.photo.fileType : '';
  const fileName = body.documents ? body.documents.map((item) => item.fileName) : [];
  const fileType = body.documents ? body.documents.map((item) => item.fileType) : [];
  await moveFiles({ body, user, moveFileObj });
  if (body.documents) {
    body.documents = body.documents.map((item, index) => {
      return { url: encodeUrl(item), fileName: fileName[index], fileType: fileType[index] };
    });
  }
  if (body.photo) {
    body.photo = { url: encodeUrl(body.photo), fileName: photoFileName, fileType: photoFileType };
  }
  const filter = {
    _id: sponsorId,
  };
  const options = { new: true };
  const sponsorResult = await sponsorService.updateSponsor(filter, body, options);
  await userService.updateUser({ email: { $in: body.borrowersEmails } }, { $addToSet: { sponsor: sponsorResult._id } });
  // tempS3
  if (sponsorResult && (sponsorResult.photo || sponsorResult.documents)) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(sponsorResult.photo.url);
    uploadedFileUrls.push(...sponsorResult.documents.map((doc) => doc.url));
    await TempS3.updateMany({ url: { $in: uploadedFileUrls } }, { active: true });
  }
  return res.status(httpStatus.OK).send({ results: sponsorResult });
});

export const removeSponsor = catchAsync(async (req, res) => {
  const { sponsorId } = req.params;
  const filter = {
    _id: sponsorId,
  };
  const sponsor = await sponsorService.removeSponsor(filter);
  return res.status(httpStatus.OK).send({ results: sponsor });
});
