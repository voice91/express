/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { activityLogService, dealService, dealSummaryService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import _ from 'lodash';
import { pick } from '../../utils/pick';
import enumModel, { EnumOfActivityType, EnumStageOfDeal } from '../../models/enum.model';
import { Deal, Invitation, LenderPlacement, User } from '../../models';
// eslint-disable-next-line import/named
import { getStageUpdateForActivityLogs } from '../../utils/activityLog';
import config from '../../config/config';
import ApiError from '../../utils/ApiError';
import { stageOfDealWithNumber } from '../../utils/enumStageForDeal';
import { detailsInDeal } from '../../utils/detailsInDeal';
import { dealSummeryDto } from '../../services/dealSummary.service';
import { manageDealStageTimeline } from '../../utils/common';

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
      { path: 'notes' },
      { path: 'dealSummary' },
    ],
  };

  const deal = await dealService.getOne(filter, options);

  if (!deal) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'no deal found this id and user');
  }
  const dealMembers = deal.involvedUsers.borrowers.concat(deal.involvedUsers.advisors);
  const InvitationFilter = {
    deal: deal._id,
    invitee: { $in: dealMembers.map((item) => item._id) },
  };
  const userInInvitation = await Invitation.find(InvitationFilter);

  deal.involvedUsers.borrowers = deal.involvedUsers.borrowers.map((item) => {
    const invitation = userInInvitation.find((value) => value.invitee.equals(item._id));
    if (!invitation) {
      throw new ApiError(`system error, user don/'t have invitation for this deal`);
    }
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

  if (deal.dealSummary) {
    deal.dealSummary = dealSummeryDto(deal.dealSummary);
  }

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
    populate: [{ path: 'notes' }, { path: 'documents' }, { path: 'task' }, { path: 'dealSummary' }],
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
    stage: { $ne: 'archive' },
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
      { path: 'outstandingTaskCount', count: true, match: { isCompleted: false } },
      { path: 'dealSummary' },
    ],
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
    options.collation = { locale: 'en', caseLevel: false }; // Case-insensitive sorting
  }
  const deal = await dealService.getDealListWithPagination(filter, options);
  deal.results = deal.results.map((dealObject) => ({
    createdAt: dealObject.createdAt,
    ...dealObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: deal });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  body.user = req.user._id;
  const filter = {
    dealName: body.dealName,
  };
  const options = {};
  const { dealSummaryBody } = body;
  delete body.dealSummary;
  const dealName = await Deal.findOne(filter);
  if (dealName) {
    throw new ApiError(httpStatus.BAD_REQUEST, `DealName Already Exists..!!`);
  }
  const deal = await dealService.createDeal(body, options);

  if (dealSummaryBody) {
    Object.assign(dealSummaryBody, {
      deal: deal._id,
      isDealSummaryAddedFromDeal: true,
      createdBy: req.user._id,
      updatedBy: req.user._id,
    });
    await dealSummaryService.createDealSummary(dealSummaryBody);
  }
  // here we create activity logs
  // with deal id , and other data as user is this
  const createActivityLogbody = {
    createdBy: req.user._id,
    updatedBy: req.user._id,
    update: `${deal.dealName} was created`,
    deal: deal.id,
    type: EnumOfActivityType.ACTIVITY,
    user: config.activitySystemUser || 'system',
  };
  await activityLogService.createActivityLog(createActivityLogbody);

  return res.status(httpStatus.CREATED).send({ results: deal });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { dealId } = req.params;
  const { dealSummaryBody } = body;
  body.user = req.user._id;
  const user = req.user._id;
  const filter = {
    _id: dealId,
    user,
  };

  const options = { new: true };
  const dealStage = await dealService.getOne(filter);
  const oldStage = dealStage.stage;
  if (oldStage !== EnumStageOfDeal.CLOSED && body.stage === EnumStageOfDeal.ARCHIVE) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Only Archive possible when status changed from Closed to Archive..');
  }
  if (oldStage === EnumStageOfDeal.CLOSED && body.stage === EnumStageOfDeal.ARCHIVE) {
    await Deal.findByIdAndUpdate(dealId, {
      stage: EnumStageOfDeal.ARCHIVE,
    });
  }
  if (body.stage) {
    body.orderOfStage = stageOfDealWithNumber(body.stage);
    body.details = await detailsInDeal(body.stage, dealId);
    body.timeLine = manageDealStageTimeline(oldStage, body.stage, dealStage.timeLine);
  }
  const deal = await dealService.updateDeal(filter, body, options);
  if (dealSummaryBody) {
    await dealSummaryService.updateDealSummary({ _id: dealSummaryBody._id || body.dealSummary }, dealSummaryBody);
  }
  const lenderPlacement = await LenderPlacement.find({ deal: dealId }).populate([{ path: 'lendingInstitution' }]);
  let lenderName;
  let lender;
  if (lenderPlacement.length > 0) {
    lenderName = lenderPlacement.map((lp) => {
      return lp.lendingInstitution.lenderNameVisible;
    });
  }

  const lenders = _.isEmpty(lenderName) ? '' : lenderName;
  if (!_.isEmpty(lenders)) {
    lender = lenders.join(', ');
  }
  const newStage = body.stage;
  if (newStage) {
    const option = {
      dealName: deal.dealName,
      lender,
    };
    const createActivityLogBody = {
      createdBy: req.user._id,
      updatedBy: req.user._id,
      update: getStageUpdateForActivityLogs(oldStage, newStage, option),
      deal: deal.id,
      type: EnumOfActivityType.ACTIVITY,
      user: config.activitySystemUser || 'system',
    };
    if (createActivityLogBody.update) {
      await activityLogService.createActivityLog(createActivityLogBody);
    }
  }

  return res.status(httpStatus.OK).send({ results: 'deal' });
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
  let { role } = body;
  const userName = req.user.firstName;
  const fromEmail = req.user.email;
  const getUser = await User.findOne({ _id: req.user._id });
  const { emailPresentingPostmark } = getUser;
  if (role === enumModel.EnumRoleOfUser.ADVISOR) {
    role = enumModel.EnumRoleOfUser.ADVISOR;
  } else {
    role = enumModel.EnumRoleOfUser.USER;
  }
  const deal = await Deal.findById({ _id: body.deal });
  await dealService.InviteToDeal(fromEmail, body, role, userName, deal, emailPresentingPostmark);
  return res.status(httpStatus.OK).send({ results: 'Invitation email sent' });
});
