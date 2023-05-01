/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { dealService, emailService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';
import { Invitation, Task } from '../../models';

const getDealFilterQuery = (query) => {
  const filter = pick(query, []);
  if (query.search) {
    filter.$or = [{ dealName: new RegExp(query.search, 'i') }];
  }
  return filter;
};
export const get = catchAsync(async (req, res) => {
  const { dealId } = req.params;
  const filter = {
    _id: dealId,
  };
  const options = {
    populate: [
      { path: 'involvedUsers.advisors' },
      { path: 'involvedUsers.borrowers' }, // added this as we need details of all the involved users in the deal for the info/setting tab.
    ],
  };

  const deal = await dealService.getOne(filter, options);
  const dealMembers = deal.involvedUsers.borrowers.concat(deal.involvedUsers.advisors);
  const InvitationFilter = {
    deal: deal._id,
    invitee: { $in: dealMembers.map((item) => item._id) },
  };
  const userInInvitation = await Invitation.find(InvitationFilter);
  deal.involvedUsers.borrowers = deal.involvedUsers.borrowers.map((item) => {
    const invitation = userInInvitation.find((value) => value.invitee.equals(item._id));
    return {
      ...item,
      updatedAt: invitation.updatedAt,
    };
  });
  deal.involvedUsers.advisors = deal.involvedUsers.advisors.map((item) => {
    const invitation = userInInvitation.find((value) => value.invitee.equals(item._id));
    return {
      ...item,
      updatedAt: invitation ? invitation.updatedAt : deal.createdAt,
    };
  });

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
    populate: [{ path: 'notes' }, { path: 'documents' }, { path: 'task' }],
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
    ...pick(query, ['limit', 'page']),
    populate: [
      {
        path: 'notes',
        populate: { path: 'user' },
      },
      { path: 'documents' },
      { path: 'task' },
    ],
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const deal = await dealService.getDealListWithPagination(filter, options);
  deal.results = await Promise.all(
    deal.results.map(async (dealObject) => {
      const outstandingTaskCount = await Task.find({ deal: dealObject._id, taskAnswer: { $exists: false } }).count();
      return {
        createdAt: dealObject.createdAt,
        ...dealObject.toJSON(),
        outstandingTask: outstandingTaskCount,
      };
    })
  );
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

export const dealInvitation = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  body.user = req.user._id;
  const { email } = req.body;
  const { role } = body;

  await dealService.InviteToDeal(body, role);
  await Promise.allSettled(
    email.map((user) => {
      return emailService.sendInvitationEmail(user).then().catch();
    })
  );
  return res.status(httpStatus.OK).send({ results: 'Invitation email sent' });
});
