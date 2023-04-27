/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { lenderNotesService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';

const getLenderNotesFilterQuery = (query) => {
  const filter = pick(query, ['lenderPlacement']);
  if (query.search) {
    filter.$or = [];
  }
  return filter;
};
export const get = catchAsync(async (req, res) => {
  const { lenderNotesId } = req.params;
  const user = req.user._id;
  const filter = {
    _id: lenderNotesId,
    user,
  };
  const options = {};
  const lenderNotes = await lenderNotesService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: lenderNotes });
});

export const list = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getLenderNotesFilterQuery(query);
  const filter = {
    lenderInstitute: req.params.lenderInstituteId,
    ...queryParams,
  };
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const options = {
    ...pick(query, ['limit', 'page']),
    populate: { path: 'user' },
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const lenderNotes = await lenderNotesService.getLenderNotesList(filter, options);
  return res.status(httpStatus.OK).send({ results: lenderNotes });
});

export const paginate = catchAsync(async (req, res) => {
  const { query } = req;
  const user = req.user._id;
  const queryParams = getLenderNotesFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {
    user,
    ...queryParams,
  };
  const options = {
    ...pick(query, ['limit', 'page']),
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const lenderNotes = await lenderNotesService.getLenderNotesListWithPagination(filter, options);
  lenderNotes.results = lenderNotes.results.map((lenderNotesObject) => ({
    createdAt: lenderNotesObject.createdAt,
    ...lenderNotesObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: lenderNotes });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  body.user = req.user._id;
  const options = {};
  const lenderNotes = await lenderNotesService.createLenderNotes(body, options);
  return res.status(httpStatus.CREATED).send({ results: lenderNotes });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { lenderNotesId } = req.params;
  body.user = req.user._id;
  const user = req.user._id;
  const filter = {
    _id: lenderNotesId,
    user,
  };
  const options = { new: true };
  const lenderNotes = await lenderNotesService.updateLenderNotes(filter, body, options);
  return res.status(httpStatus.OK).send({ results: lenderNotes });
});

export const remove = catchAsync(async (req, res) => {
  const { lenderNotesId } = req.params;
  const user = req.user._id;
  const filter = {
    _id: lenderNotesId,
    user,
  };
  const lenderNotes = await lenderNotesService.removeLenderNotes(filter);
  return res.status(httpStatus.OK).send({ results: lenderNotes });
});
