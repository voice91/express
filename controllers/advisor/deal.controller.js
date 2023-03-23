/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { dealService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';

const getDealFilterQuery = (query) => {
  const filter = pick(query, []);
  if (query.search) {
    filter.$or = [{ dealName: new RegExp(query.search, 'i') }];
  }
  return filter;
};
export const get = catchAsync(async (req, res) => {
  const { dealId } = req.params;
  const user = req.user._id;
  const filter = {
    _id: dealId,
    user,
  };
  const options = {};
  const deal = await dealService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: deal });
});

export const list = catchAsync(async (req, res) => {
  const { query } = req;
  const user = req.user._id;
  const queryParams = getDealFilterQuery(query);
  const filter = {
    $or: [
      { user },
      { 'involvedUsers.advisors': user },
      { 'involvedUsers.borrowers': user },
      { 'involvedUsers.lenders': user },
    ],
    ...queryParams,
  };
  const options = {
    ...pick(query, ['sort', 'limit', 'page']),
    populate: [{ path: 'notes' }, { path: 'documents' }],
  };
  const deal = await dealService.getDealList(filter, options);
  return res.status(httpStatus.OK).send({ results: deal });
});

export const paginate = catchAsync(async (req, res) => {
  const { query } = req;
  const user = req.user._id;
  const queryParams = getDealFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {
    $or: [
      { user },
      { 'involvedUsers.advisors': user },
      { 'involvedUsers.borrowers': user },
      { 'involvedUsers.lenders': user },
    ],
    ...queryParams,
  };
  const options = {
    sort: sortObj,
    ...pick(query, ['limit', 'page']),
    populate: [{ path: 'notes' }, { path: 'documents' }],
  };
  const deal = await dealService.getDealListWithPagination(filter, options);
  deal.results = deal.results.map((dealObject) => ({
    createdAt: dealObject.createdAt,
    ...dealObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: deal });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user;
  body.updatedBy = req.user;
  body.user = req.user._id;
  const options = {};
  const deal = await dealService.createDeal(body, options);
  return res.status(httpStatus.CREATED).send({ results: deal });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { dealId } = req.params;
  body.user = req.user._id;
  const user = req.user._id;
  const filter = {
    _id: dealId,
    user,
  };
  const options = { new: true };
  const deal = await dealService.updateDeal(filter, body, options);
  return res.status(httpStatus.OK).send({ results: deal });
});

export const remove = catchAsync(async (req, res) => {
  const { dealId } = req.params;
  const user = req.user._id;
  const filter = {
    _id: dealId,
    user,
  };
  const deal = await dealService.removeDeal(filter);
  return res.status(httpStatus.OK).send({ results: deal });
});
