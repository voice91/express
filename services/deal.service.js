/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { Deal, User, Task, DealNotes, DealDocument, LenderPlacement } from 'models';

export async function getDealById(id, options = {}) {
  const deal = await Deal.findById(id, options.projection, options);
  return deal;
}

export async function getOne(query, options = {}) {
  const deal = await Deal.findOne(query, options.projection, options);
  return deal;
}

export async function getDealList(filter, options = {}) {
  const deal = await Deal.find(filter, options.projection, options);
  return deal;
}

export async function getDealListWithPagination(filter, options = {}) {
  const deal = await Deal.paginate(filter, options);
  return deal;
}

export async function createDeal(body, options = {}) {
  const lendersArr = body.involvedUsers.map((item) => item.lenders);
  const lenders = await User.find({ _id: { $in: lendersArr } });
  if (lenders.length !== lendersArr.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'lenders not found!');
  }
  const borrowersArr = body.involvedUsers.map((item) => item.borrowers);
  const borrowers = await User.find({ _id: { $in: borrowersArr } });
  if (borrowers.length !== borrowersArr.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'borrowers not found!');
  }
  const advisorsArr = body.involvedUsers.map((item) => item.advisors);
  const advisors = await User.find({ _id: { $in: advisorsArr } });
  if (advisors.length !== advisorsArr.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'advisors not found!');
  }
  const tasks = await Task.find({ _id: { $in: body.tasks } });
  if (!tasks) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field tasks is not valid');
  }
  const dealNotes = await DealNotes.find({ _id: { $in: body.dealNotes } });
  if (!dealNotes) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field dealNotes is not valid');
  }
  const user = await User.findOne({ _id: body.user });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field user is not valid');
  }
  const documents = await DealDocument.find({ _id: { $in: body.documents } });
  if (!documents) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field documents is not valid');
  }
  const lenderPlacement = await LenderPlacement.find({ _id: { $in: body.lenderPlacement } });
  if (!lenderPlacement.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field lenderPlacement is not valid');
  }
  const deal = await Deal.create(body);
  return deal;
}

export async function updateDeal(filter, body, options = {}) {
  const lendersArr = body.involvedUsers.map((item) => item.lenders);
  const lenders = await User.find({ _id: { $in: lendersArr } });
  if (lenders.length !== lendersArr.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'lenders not found!');
  }
  const borrowersArr = body.involvedUsers.map((item) => item.borrowers);
  const borrowers = await User.find({ _id: { $in: borrowersArr } });
  if (borrowers.length !== borrowersArr.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'borrowers not found!');
  }
  const advisorsArr = body.involvedUsers.map((item) => item.advisors);
  const advisors = await User.find({ _id: { $in: advisorsArr } });
  if (advisors.length !== advisorsArr.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'advisors not found!');
  }
  const tasks = await Task.find({ _id: { $in: body.tasks } });
  if (!tasks) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field tasks is not valid');
  }
  const dealNotes = await DealNotes.find({ _id: { $in: body.dealNotes } });
  if (!dealNotes) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field dealNotes is not valid');
  }
  const user = await User.findOne({ _id: body.user });
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field user is not valid');
  }
  const documents = await DealDocument.find({ _id: { $in: body.documents } });
  if (!documents) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field documents is not valid');
  }
  const lenderPlacement = await LenderPlacement.find({ _id: { $in: body.lenderPlacement } });
  if (!lenderPlacement.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field lenderPlacement is not valid');
  }
  const deal = await Deal.findOneAndUpdate(filter, body, options);
  return deal;
}

export async function updateManyDeal(filter, body, options = {}) {
  const deal = await Deal.updateMany(filter, body, options);
  return deal;
}

export async function removeDeal(filter) {
  const deal = await Deal.findOneAndRemove(filter);
  return deal;
}

export async function removeManyDeal(filter) {
  const deal = await Deal.deleteMany(filter);
  return deal;
}
