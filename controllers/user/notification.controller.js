/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { notificationService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';
import { Deal, Notifications } from '../../models';

const getNotificationFilterQuery = (query) => {
  const filter = pick(query, []);
  if (query.search) {
    filter.$or = [{ firstName: new RegExp(query.search, 'i') }, { lastName: new RegExp(query.search, 'i') }];
  }
  return filter;
};

export const list = catchAsync(async (req, res) => {
  const { query } = req;
  const userId = req.user._id;
  const queryParams = getNotificationFilterQuery(query);
  const filter = {
    ...queryParams,
  };
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    isPinned: 'desc',
    [sortingObj.sort]: sortingObj.order,
  };
  const options = {
    ...pick(query, ['limit', 'page']),
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }

  const getallDeals = await Deal.find({ 'involvedUsers.borrowers': userId }).select('involvedUsers _id');

  const getAllDealId = getallDeals.map((deal) => deal._id);

  const notification = await notificationService.getNotificationList(
    { deal: { $in: getAllDealId }, isClear: false, ...filter },
    options
  );
  return res.status(httpStatus.OK).send({ results: notification });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user;
  body.updatedBy = req.user;
  const options = {};
  const notification = await notificationService.createNotification(body, options);
  return res.status(httpStatus.CREATED).send({ results: notification });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user._id;
  const userId = req.user._id;
  const filter = {};
  const getallDeals = await Deal.find({ 'involvedUsers.borrowers': userId }).select('involvedUsers _id');

  const getAllDealId = getallDeals.map((deal) => deal._id);

  await notificationService.updateManyNotification(
    { deal: { $in: getAllDealId }, ...filter },
    { isReadable: body.isReadable, ...(body.isClear && { isClear: body.isClear }) }
  );
  const notification = await Notifications.find({
    deal: { $in: getAllDealId },
    ...filter,
  });
  return res.status(httpStatus.OK).send({ results: notification });
});
