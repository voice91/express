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
import { Task } from '../../models';
import ApiError from '../../utils/ApiError';

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
  const filter = {
    deal: req.params.dealId,
  };
  const options = {
    ...pick(query, ['limit', 'page']),
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const task = await taskService.getTaskListWithPagination(filter, options);
  task.results = task.results.map((taskObject) => ({
    createdAt: taskObject.createdAt,
    ...taskObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: task });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user;
  body.updatedBy = req.user;
  const { user } = req;
  const moveFileObj = {
    ...(body.taskDocuments && { taskDocuments: body.taskDocuments }),
  };
  body._id = mongoose.Types.ObjectId();
  // eslint-disable-next-line no-use-before-define
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

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  const { taskDocuments } = body;
  body.updatedBy = req.user;
  const { taskId } = req.params;
  const { user } = req;
  const moveFileObj = {
    ...(body.taskDocuments && { taskDocuments: body.taskDocuments.map((item) => item.url) }),
  };
  body._id = taskId;
  await moveFiles({ body, user, moveFileObj });
  const filter = {
    _id: taskId,
  };
  const filterForQuestion = {
    _id: taskId,
    createdBy: { $in: [req.user._id] },
  };
  const questionAskedBy = await Task.findOne(filterForQuestion);

  if (questionAskedBy) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You can't give response to your own question");
  }

  if (taskDocuments) {
    body.$push = { taskDocuments };
    // taskDocument is also in taskResult and $push so it gets confuse which task document to choose so using delete for it.
    // Without delete we'll get the error: "Updating the path 'taskDocuments' would create a conflict at 'taskDocuments'"
    delete body.taskDocuments;
  }
  const options = { new: true };
  const taskResult = await taskService.updateTask(filter, body, options);
  // tempS3
  if (taskResult) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(...taskResult.taskDocuments);
    const uploadedFileUrl = uploadedFileUrls.map((data) => data.url);
    await TempS3.updateMany({ url: { $in: uploadedFileUrl } }, { active: true });
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
