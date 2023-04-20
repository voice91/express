/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { lenderContactService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';

const getLenderContactFilterQuery = (query) => {
  const filter = pick(query, ['lenderInstitute']);
  if (query.search) {
    filter.$or = [{ firstName: new RegExp(query.search, 'i') }, { lastName: new RegExp(query.search, 'i') }];
  }
  return filter;
};
export const get = catchAsync(async (req, res) => {
  const { lenderContactId } = req.params;
  const filter = {
    _id: lenderContactId,
  };
  const options = {};
  const lenderContact = await lenderContactService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: lenderContact });
});

export const list = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getLenderContactFilterQuery(query);
  const filter = {
    ...queryParams,
  };
  const options = {
    ...pick(query, ['sort', 'limit', 'page']),
  };
  const lenderContact = await lenderContactService.getLenderContactList(filter, options);
  return res.status(httpStatus.OK).send({ results: lenderContact });
});

export const paginate = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getLenderContactFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {
    ...queryParams,
  };
  const options = {
    sort: sortObj,
    ...pick(query, ['limit', 'page']),
  };
  const lenderContact = await lenderContactService.getLenderContactListWithPagination(filter, options);
  lenderContact.results = lenderContact.results.map((lenderContactObject) => ({
    createdAt: lenderContactObject.createdAt,
    ...lenderContactObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: lenderContact });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const options = {};
  const lenderContact = await lenderContactService.createLenderContact(body, options);
  return res.status(httpStatus.CREATED).send({ results: lenderContact });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { lenderContactId } = req.params;
  const filter = {
    _id: lenderContactId,
  };
  const options = { new: true };
  const lenderContact = await lenderContactService.updateLenderContact(filter, body, options);
  return res.status(httpStatus.OK).send({ results: lenderContact });
});

export const remove = catchAsync(async (req, res) => {
  const { lenderContactId } = req.params;
  const filter = {
    _id: lenderContactId,
  };
  const lenderContact = await lenderContactService.removeLenderContact(filter);
  return res.status(httpStatus.OK).send({ results: lenderContact });
});
