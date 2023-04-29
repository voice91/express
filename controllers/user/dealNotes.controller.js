/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { dealNotesService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';

const getDealNotesFilterQuery = (query) => {
  const filter = pick(query, ['deal']);
  if (query.search) {
    filter.$or = [];
  }
  return filter;
};

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
  const dealNotes = await dealNotesService.getDealNotesListWithPagination(filter, options);
  dealNotes.results = dealNotes.results.map((dealNotesObject) => ({
    createdAt: dealNotesObject.createdAt,
    ...dealNotesObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: dealNotes });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user;
  body.updatedBy = req.user;
  body.user = req.user._id;
  const options = {};
  const dealNotes = await dealNotesService.createDealNotes(body, options);
  return res.status(httpStatus.CREATED).send({ results: dealNotes });
});

export const list = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getDealNotesFilterQuery(query);
  const filter = {
    deal: req.params.dealId,
    ...queryParams,
  };
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const options = {
    ...pick(query, ['limit', 'page']),
    populate: [{ path: 'user' }],
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const dealNotes = await dealNotesService.getDealNotesList(filter, options);
  return res.status(httpStatus.OK).send({ results: dealNotes });
});

export const get = catchAsync(async (req, res) => {
  const { dealNotesId } = req.params;
  const user = req.user._id;
  const filter = {
    _id: dealNotesId,
    user,
  };
  const options = {};
  const dealNotes = await dealNotesService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: dealNotes });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { dealNotesId } = req.params;
  body.user = req.user._id;
  const user = req.user._id;
  const filter = {
    _id: dealNotesId,
    user,
  };
  const options = { new: true };
  const dealNotes = await dealNotesService.updateDealNotes(filter, body, options);
  return res.status(httpStatus.OK).send({ results: dealNotes });
});

export const remove = catchAsync(async (req, res) => {
  const { dealNotesId } = req.params;
  const user = req.user._id;
  const filter = {
    _id: dealNotesId,
    user,
  };
  const dealNotes = await dealNotesService.removeDealNotes(filter);
  return res.status(httpStatus.OK).send({ results: dealNotes });
});
