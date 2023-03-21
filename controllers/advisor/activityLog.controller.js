/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { activityLogService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';

export const get = catchAsync(async (req, res) => {
  const { activityLogId } = req.params;
  const filter = {
    _id: activityLogId,
  };
  const options = {};
  const activityLog = await activityLogService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: activityLog });
});

export const list = catchAsync(async (req, res) => {
  const filter = {};
  const options = {};
  const activityLog = await activityLogService.getActivityLogList(filter, options);
  return res.status(httpStatus.OK).send({ results: activityLog });
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
  const activityLog = await activityLogService.getActivityLogListWithPagination(filter, options);
  activityLog.results = activityLog.results.map((activityLogObject) => ({
    createdAt: activityLogObject.createdAt,
    ...activityLogObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: activityLog });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user;
  body.updatedBy = req.user;
  const options = {};
  const activityLog = await activityLogService.createActivityLog(body, options);
  return res.status(httpStatus.CREATED).send({ results: activityLog });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { activityLogId } = req.params;
  const filter = {
    _id: activityLogId,
  };
  const options = { new: true };
  const activityLog = await activityLogService.updateActivityLog(filter, body, options);
  return res.status(httpStatus.OK).send({ results: activityLog });
});

export const remove = catchAsync(async (req, res) => {
  const { activityLogId } = req.params;
  const filter = {
    _id: activityLogId,
  };
  const activityLog = await activityLogService.removeActivityLog(filter);
  return res.status(httpStatus.OK).send({ results: activityLog });
});
