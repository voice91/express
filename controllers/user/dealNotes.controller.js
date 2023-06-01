/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { activityLogService, dealNotesService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { flatMap, uniq } from 'lodash';
import { pick } from '../../utils/pick';
import { EnumOfActivityType } from '../../models/enum.model';
import { Deal } from '../../models';

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
  const createActivityLogBody = {
    createdBy: req.user._id,
    updatedBy: req.user._id,
    update: dealNotes.content,
    deal: dealNotes.deal,
    type: EnumOfActivityType.NOTE,
    user: req.user.name,
  };
  await activityLogService.createActivityLog(createActivityLogBody);
  return res.status(httpStatus.CREATED).send({ results: dealNotes });
});

export const list = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getDealNotesFilterQuery(query);
  const userId = req.user._id;
  const filter = {
    deal: req.params.dealId,
    ...queryParams,
  };
  const sortingObj = pick(query, ['sort', 'order']);
  // we have to sort the notes on the basis of pinned notes to be at the top and then the notes according to their updatedAt value
  const sortObj = {
    isPinned: 'desc',
    [sortingObj.sort]: sortingObj.order,
  };
  const options = {
    ...pick(query, ['limit', 'page']),
    populate: [{ path: 'user' }],
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }

  const getDeal = await Deal.find({ _id: req.params.dealId }).select('involvedUsers _id');

  const queryForBorrower = req.query.borrower;
  const queryForAdvisor = req.query.advisor;

  const getAllInvolvedUserIds = uniq(
    flatMap(
      getDeal
        .map((item) => {
          if (queryForBorrower && queryForAdvisor) {
            return [item.involvedUsers.lenders, item.involvedUsers.borrowers, item.involvedUsers.advisors];
          }
          if (queryForAdvisor) {
            return [item.involvedUsers.advisors];
          }
          if (queryForBorrower) {
            return [item.involvedUsers.borrowers];
          }
          return [item.involvedUsers.lenders, item.involvedUsers.borrowers, item.involvedUsers.advisors];
        })
        .flat()
    ).map((item) => item.toString())
  );

  if (!queryForBorrower && !queryForAdvisor) {
    getAllInvolvedUserIds.push(userId);
  }

  const getDealId = getDeal.map((deal) => deal._id);
  const dealNotes = await dealNotesService.getDealNotesList(
    {
      $and: [{ user: { $in: getAllInvolvedUserIds } }, { deal: { $in: getDealId } }],
      ...filter,
    },
    options
  );

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
  body.updatedBy = req.user._id;
  const { dealNotesId } = req.params;
  const filter = {
    _id: dealNotesId,
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
