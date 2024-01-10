/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { activityLogService } from "../../services";
import { catchAsync } from "../../utils/catchAsync";
import { flatMap, uniq } from 'lodash';
import { pick } from "../../utils/pick";
import { Deal } from "../../models";
export const get = catchAsync(async (req, res) => {
  const {
    activityLogId
  } = req.params;
  const filter = {
    _id: activityLogId
  };
  const options = {};
  const activityLog = await activityLogService.getOne(filter, options);
  return res.status(httpStatus.OK).send({
    results: activityLog
  });
});
const getActivityLogFilterQuery = query => {
  const filter = pick(query, []);
  if (query.search) {
    filter.$or = [{
      firstName: new RegExp(query.search, 'i')
    }, {
      lastName: new RegExp(query.search, 'i')
    }];
  }
  return filter;
};
export const list = catchAsync(async (req, res) => {
  const {
    query
  } = req;
  const userId = req.user._id;
  const queryParams = getActivityLogFilterQuery(query);
  const filter = {
    ...queryParams
  };
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    isPinned: 'desc',
    [sortingObj.sort]: sortingObj.order
  };
  const options = {
    ...pick(query, ['limit', 'page']),
    populate: [{
      path: 'deal',
      select: ['dealName']
    }]
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const getallDeals = await Deal.find({
    user: userId
  }).select('involvedUsers _id');
  const getAlldealId = getallDeals.map(item => item._id).map(item => item.toString());
  const getAllInvolvedUserIds = uniq(flatMap(getallDeals.map(item => {
    return [item.involvedUsers.lenders, item.involvedUsers.borrowers, item.involvedUsers.advisors];
  }).flat()).map(item => item.toString()));
  if (!getAllInvolvedUserIds) {
    getAllInvolvedUserIds.push(userId);
  }
  const activityLog = await activityLogService.getActivityLogList({
    createdBy: {
      $in: getAllInvolvedUserIds
    },
    deal: {
      $in: getAlldealId
    },
    ...filter
  }, options);
  return res.status(httpStatus.OK).send({
    results: activityLog
  });
});
export const paginate = catchAsync(async (req, res) => {
  const {
    query
  } = req;
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order
  };
  const filter = {};
  const options = {
    ...pick(query, ['limit', 'page'])
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const activityLog = await activityLogService.getActivityLogListWithPagination(filter, options);
  activityLog.results = activityLog.results.map(activityLogObject => ({
    createdAt: activityLogObject.createdAt,
    ...activityLogObject.toJSON()
  }));
  return res.status(httpStatus.OK).send({
    results: activityLog
  });
});
export const create = catchAsync(async (req, res) => {
  const {
    body
  } = req;
  body.createdBy = req.user;
  body.updatedBy = req.user;
  const options = {};
  const activityLog = await activityLogService.createActivityLog(body, options);
  return res.status(httpStatus.CREATED).send({
    results: activityLog
  });
});
export const update = catchAsync(async (req, res) => {
  const {
    body
  } = req;
  body.updatedBy = req.user._id;
  const {
    activityLogId
  } = req.params;
  const filter = {
    _id: activityLogId
  };
  const options = {
    new: true
  };
  const activityLog = await activityLogService.updateActivityLog(filter, body, options);
  return res.status(httpStatus.OK).send({
    results: activityLog
  });
});
export const remove = catchAsync(async (req, res) => {
  const {
    activityLogId
  } = req.params;
  const filter = {
    _id: activityLogId
  };
  const activityLog = await activityLogService.removeActivityLog(filter);
  return res.status(httpStatus.OK).send({
    results: activityLog
  });
});