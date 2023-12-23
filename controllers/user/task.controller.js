/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { lenderPlacementService, s3Service, taskService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import FileFieldValidationEnum from 'models/fileFieldValidation.model';
import mongoose from 'mongoose';
import TempS3 from 'models/tempS3.model';
import { asyncForEach, encodeUrl } from 'utils/common';
import { pick } from '../../utils/pick';
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
        const filePath = `${ele.split('/').pop()}`;
        newUrlsArray.push(moveFileAndUpdateTempS3({ url: ele, newFilePath: basePath + filePath }));
      });
      Object.assign(body, { ...body, [key]: await Promise.all(newUrlsArray) });
    } else {
      const filePath = `${moveFileObj[key].split('/').pop()}`;
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
  // populating user's first name as had to display name of user who has given the answer
  const options = {
    populate: [
      { path: 'askingPartyInstitute' },
      { path: 'askingPartyAdvisor' },
      {
        path: 'taskAnswer.answeredBy',
        select: ['firstName'],
      },
    ],
  };
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

  let sortObj;
  if (Array.isArray(sortingObj.sort)) {
    const sort = {};
    sortingObj.sort.forEach((field) => {
      sort[field] = sortingObj.order; // Assuming all fields should be sorted in ascending order (1)
    });
    sortObj = sort;
  } else {
    sortObj = {
      [sortingObj.sort]: sortingObj.order,
    };
  }

  const filter = {
    deal: req.params.dealId,
  };
  const options = {
    ...pick(query, ['limit', 'page']),
    populate: [{ path: 'user' }, { path: 'askingPartyInstitute' }, { path: 'askingPartyAdvisor' }],
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
    // options.collation = { locale: 'en', caseLevel: false }; // Case-insensitive sorting
  }
  let task;
  if (Array.isArray(sortingObj.sort) && sortingObj.sort.includes('askingPartyInstitute.lenderNameVisible')) {
    task = await taskService.getTaskListWithPaginationBasedOnAskingPary(filter, options, sortingObj.order);
  } else {
    task = await taskService.getTaskListWithPagination(filter, options);
    task.results = task.results.map((taskObject) => ({
      createdAt: taskObject.createdAt,
      ...taskObject.toJSON(),
    }));
  }
  return res.status(httpStatus.OK).send({ results: task });
});

export const listByDeal = catchAsync(async (req, res) => {
  const { query } = req;
  const sortingObj = pick(query, ['sort', 'order']); // Extracting the 'sort' and 'order' fields from the query

  let sortObj;
  // Check if 'sort' field is an array
  if (Array.isArray(sortingObj.sort)) {
    const sort = {};
    sortingObj.sort.forEach((field) => {
      sort[field] = sortingObj.order; // Assuming all fields should be sorted in ascending order (1)
    });
    sortObj = sort; // Creating the sort object
  } else {
    sortObj = {
      [sortingObj.sort]: sortingObj.order, // Creating the sort object with single field and order
    };
  }

  const filter = {
    deal: req.params.dealId,
  };
  if (query.lenderPlacement) {
    const lenderPlacement = await lenderPlacementService.getLenderPlacementById(query.lenderPlacement);
    if (lenderPlacement) {
      filter.askingPartyInstitute = lenderPlacement.lendingInstitution._id;
    }
  }
  const options = {
    ...pick(query, ['limit', 'page']),
    // populating user's first name as had to display name of user who has given the answer
    populate: [{ path: 'user' }, { path: 'askingPartyInstitute' }, { path: 'askingPartyAdvisor' }],
  };
  if (sortingObj.sort) {
    options.sort = sortObj; // Setting the sort options in the options object
    // options.collation = { locale: 'en', caseLevel: false }; // Case-insensitive sorting
  }

  let task = await taskService.getTaskList(filter, options); // Call the function to get task list with pagination
  task = task.map((taskObject) => ({
    createdAt: taskObject.createdAt,
    ...taskObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: task });
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
  // before we use to push all the data in the array but instead of integrating the delete api for deleting the documents, we are directly passing the documents in the body while updating the response
  if (body.taskDocuments) {
    const fileName = taskDocuments.map((item) => item.fileName);
    body.taskDocuments = body.taskDocuments.map((item, index) => {
      return { url: encodeUrl(item), fileName: fileName[index] };
    });
  }
  if (body.taskAnswer && body.taskAnswer.length) {
    body.taskAnswer.forEach((answer) => {
      if (!answer.answeredBy) {
        Object.assign(answer, { answeredBy: user._id }); // passing user id instead of name
      }
    });
  }
  // populating user's first name as had to display name of user who has given the answer
  const options = {
    new: true,
    populate: {
      path: 'taskAnswer.answeredBy',
      select: ['firstName'],
    },
  };
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

// removing single document from task-reply's task document
export const removeTaskDocument = catchAsync(async (req, res) => {
  const { taskDocumentId } = req.params;
  const { user } = req;
  const filter = {
    'taskAnswer.taskDocuments._id': taskDocumentId,
  };
  const updateDocument = {
    $pull: { 'taskAnswer.$[].taskDocuments': { _id: taskDocumentId } },
  };
  const options = {
    new: true,
  };
  const task = await taskService.getOne(filter);
  // if the task document is not found in the task
  if (!task) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Task document is not available');
  }
  // finding the task answer which will have the task document in it
  const taskAnswer = task.taskAnswer.find((answer) =>
    answer.taskDocuments.some((doc) => doc._id.toString() === taskDocumentId)
  );

  // if the user who has uploaded the document in the task is not the same then it'll throw the error.
  if (user._id.toString() !== taskAnswer.answeredBy.toString()) {
    throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized to delete this document');
  }
  const updatedTask = await taskService.updateTask(filter, updateDocument, options);
  return res.status(httpStatus.OK).send({ results: updatedTask });
});
