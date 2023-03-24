/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { s3Service, taskService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import FileFieldValidationEnum from 'models/fileFieldValidation.model';
import mongoose from 'mongoose';
import TempS3 from 'models/tempS3.model';
import { asyncForEach } from 'utils/common';
import { pick } from '../../utils/pick';
import { Deal } from '../../models';
import ApiError from '../../utils/ApiError';

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user;
  body.updatedBy = req.user;
  const { user } = req;
  const moveFileObj = {
    ...(body.taskDocuments && { taskDocuments: body.taskDocuments }),
  };
  const dealId = body.deal;
  const dealObj = await Deal.findById(dealId);
  if (!dealObj) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Deal doesn't exist");
  }
  body._id = mongoose.Types.ObjectId();
  await moveFiles({ body, user, moveFileObj });
  const options = {};
  const taskResult = await taskService.createTask(body, options);
  if (taskResult) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(...taskResult.taskDocuments);
    await TempS3.updateMany({ url: { $in: uploadedFileUrls } }, { active: true });
  }
  return res.status(httpStatus.CREATED).send({ results: taskResult });
});

const moveFileAndUpdateTempS3 = async ({ url, newFilePath }) => {
  const newUrl = await s3Service.moveFile({ key: url, newFilePath });
  await TempS3.findOneAndUpdate({ url }, { url: newUrl });
  return newUrl;
};
// this is used to move file to new specified path as shown in basePath, used in create and update controller.
const moveFiles = async ({ body, user, moveFileObj }) => {
  await asyncForEach(Object.keys(moveFileObj), async (key) => {
    const fieldValidation = FileFieldValidationEnum[`${key}OfTask`];
    const basePath = `users/${user._id}/task/${body._id}/${key}/${mongoose.Types.ObjectId()}/`;
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
  const { taskId } = req.params;
  const filter = {
    _id: taskId,
  };
  const options = {};
  const task = await taskService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: task });
});

export const list = catchAsync(async (req, res) => {
  const filter = {};
  const options = {};
  const task = await taskService.getTaskList(filter, options);
  return res.status(httpStatus.OK).send({ results: task });
});

export const paginate = catchAsync(async (req, res) => {
  const { query } = req;
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {};
  const options = {
    sort: sortObj,
    ...pick(query, ['limit', 'page']),
  };
  const task = await taskService.getTaskListWithPagination(filter, options);
  task.results = task.results.map((taskObject) => ({
    createdAt: taskObject.createdAt,
    ...taskObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: task });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { taskId } = req.params;
  const { user } = req;
  const moveFileObj = {
    ...(body.taskDocuments && { taskDocuments: body.taskDocuments }),
  };
  body._id = taskId;
  await moveFiles({ body, user, moveFileObj });
  const filter = {
    _id: taskId,
  };
  const options = { new: true };
  const taskResult = await taskService.updateTask(filter, body, options);
  // tempS3
  if (taskResult) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(...taskResult.taskDocuments);
    await TempS3.updateMany({ url: { $in: uploadedFileUrls } }, { active: true });
  }
  return res.status(httpStatus.OK).send({ results: taskResult });
});

export const remove = catchAsync(async (req, res) => {
  const { taskId } = req.params;
  const filter = {
    _id: taskId,
  };
  const task = await taskService.removeTask(filter);
  return res.status(httpStatus.OK).send({ results: task });
});
