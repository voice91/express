/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { lenderInstituteNotesService } from "../../services";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";
const getLenderNotesFilterQuery = query => {
  const filter = pick(query, []);
  if (query.search) {
    filter.$or = [];
  }
  return filter;
};
export const list = catchAsync(async (req, res) => {
  const {
    query
  } = req;
  const {
    lenderInstitute
  } = req.params;
  const queryParams = getLenderNotesFilterQuery(query);
  const filter = {
    lenderInstitute,
    ...queryParams
  };
  const sortingObj = pick(query, ['sort', 'order']);
  // we have to sort the notes on the basis of pinned notes to be at the top and then the notes according to their updatedAt value
  const sortObj = {
    isPinned: 'desc',
    [sortingObj.sort]: sortingObj.order
  };
  const options = {
    ...pick(query, ['limit', 'page']),
    populate: {
      path: 'createdBy'
    }
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const lenderInstituteNotes = await lenderInstituteNotesService.getLenderInstituteNotesList(filter, options);
  return res.status(httpStatus.OK).send({
    results: lenderInstituteNotes
  });
});
export const create = catchAsync(async (req, res) => {
  const {
    body
  } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  body.user = req.user._id;
  const options = {};
  const lenderInstituteNotes = await lenderInstituteNotesService.createLenderInstituteNotes(body, options);
  return res.status(httpStatus.CREATED).send({
    results: lenderInstituteNotes
  });
});
export const update = catchAsync(async (req, res) => {
  const {
    body
  } = req;
  const {
    lenderInstituteNotesId
  } = req.params;
  body.updatedBy = req.user._id;
  const filter = {
    _id: lenderInstituteNotesId
  };
  const options = {
    new: true
  };
  const lenderInstituteNotes = await lenderInstituteNotesService.updateLenderInstituteNotes(filter, body, options);
  return res.status(httpStatus.OK).send({
    results: lenderInstituteNotes
  });
});
export const remove = catchAsync(async (req, res) => {
  const {
    lenderInstituteNotesId
  } = req.params;
  const filter = {
    _id: lenderInstituteNotesId
  };
  const lenderInstituteNotes = await lenderInstituteNotesService.removeLenderInstituteNotes(filter);
  return res.status(httpStatus.OK).send({
    results: lenderInstituteNotes
  });
});