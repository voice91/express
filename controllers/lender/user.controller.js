/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { userService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';
import { removeNullFields } from '../../utils/common';

const getUserFilterQuery = (query) => {
  const filter = pick(query, []);
  if (query.search) {
    filter.$or = [{ firstName: new RegExp(query.search, 'i') }, { lastName: new RegExp(query.search, 'i') }];
  }
  return filter;
};
export const get = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const filter = {
    _id: userId,
  };
  const options = {};
  const user = await userService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: user });
});

export const list = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getUserFilterQuery(query);
  const filter = {
    ...queryParams,
  };
  const options = {
    ...pick(query, ['sort', 'limit', 'page']),
  };
  const user = await userService.getUserList(filter, options);
  return res.status(httpStatus.OK).send({ results: user });
});

export const paginate = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getUserFilterQuery(query);
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
  const user = await userService.getUserListWithPagination(filter, options);
  user.results = user.results.map((userObject) => ({
    createdAt: userObject.createdAt,
    ...userObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: user });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  const options = {};
  const user = await userService.createUser(body, options);
  return res.status(httpStatus.CREATED).send({ results: user });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  // this for unsetting the field whose value is null in the body
  removeNullFields(body);
  // updating user who's logged in
  const userId = req.user._id;
  const filter = {
    _id: userId,
  };
  const options = { new: true };
  const user = await userService.updateUser(filter, body, options);
  return res.status(httpStatus.OK).send({ results: user });
});

export const remove = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const filter = {
    _id: userId,
  };
  const user = await userService.removeUser(filter);
  return res.status(httpStatus.OK).send({ results: user });
});
