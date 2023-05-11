/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { Deal, Invitation, User } from 'models';
import mongoose from 'mongoose';
import _ from 'lodash';
import enumModel from '../models/enum.model';
import { logger } from '../config/logger';

export async function getDealById(id, options = {}) {
  const deal = await Deal.findById(id, options.projection, options);
  return deal;
}

export async function getOne(query, options = {}) {
  const deal = await Deal.findOne(query, options.projection, options).lean();
  return deal;
}

export async function getDealList(filter, options = {}) {
  const deal = await Deal.find(filter, options.projection, options);
  logger.info(`deal: ${JSON.stringify(deal)}`);

  return deal;
}

export async function getDealListWithPagination(filter, options = {}) {
  const deal = await Deal.paginate(filter, options);
  return deal;
}

export async function createDeal(body) {
  if (body.involvedUsers && body.involvedUsers.advisors) {
    const advisor = body.involvedUsers.advisors;
    const advisors = await User.find({ _id: { $in: advisor } });
    if (advisors.length !== advisor.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'advisors not found!');
    }
  }
  if (body.involvedUsers && body.involvedUsers.lenders) {
    const lender = body.involvedUsers.lenders;
    const lenders = await User.find({ _id: { $in: lender } });
    if (lenders.length !== lender.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'lenders not found!');
    }
  }
  if (body.involvedUsers && body.involvedUsers.borrowers) {
    const borrower = body.involvedUsers.borrowers;
    const borrowers = await User.find({ _id: { $in: borrower } });
    if (borrowers.length !== borrower.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'borrowers not found!');
    }
  }

  const dealId = mongoose.Types.ObjectId();
  const deal = { _id: dealId };
  if (body.dealMembers && body.dealMembers.length) {
    Object.assign(body.involvedUsers, { advisors: body.user });
    const existingUsers = await User.find({ email: { $in: body.dealMembers } });
    Object.assign(body.involvedUsers, { borrowers: existingUsers.map((item) => item._id) });
    if (existingUsers.length) {
      // In existing users we get the user document of the the emails we pass in the dealMembers if it exists in the system so in the below line we are checking now whether the role of the user is 'user' or not
      // If it is not user(borrower) then we'll throw the error as in the deal we can only add borrowers(user)
      if (existingUsers.some((user) => user.role !== enumModel.EnumRoleOfUser.USER)) {
        throw new ApiError(httpStatus.BAD_REQUEST, "Deal members email can be of borrower's only");
      }
      // userEmailNotExist ==> Here,we will get the emails that are not in our system.
      const userEmailNotExists = _.differenceBy(
        body.dealMembers,
        existingUsers.map((item) => item.email)
      );

      if (userEmailNotExists.length) {
        await Invitation.insertMany(
          userEmailNotExists.map((nonExistingEmail) => ({
            deal: deal._id,
            invitedBy: body.user,
            inviteeEmail: nonExistingEmail,
          }))
        );
      }
      // as our existingUsers is array we are using map on it. below line will help us to insert many document in our db at once, and we have passed the object in the map we have to enter in our db
      // so we will get deal id, the user from which we login or who is creating deal their id will go in invitedBy and in emailExists we get the whole document and we just want id of the person which we are inviting the deal so we did emailExists._id
      await Invitation.insertMany(
        existingUsers.map((emailExists) => ({
          deal: deal._id,
          status: 'accepted',
          invitedBy: body.user,
          invitee: emailExists._id,
        }))
      );
    } else {
      await Invitation.insertMany(
        body.dealMembers.map((nonExistingEmail) => ({
          deal: deal._id,
          invitedBy: body.user,
          inviteeEmail: nonExistingEmail,
        }))
      );
    }
  }

  return Deal.create({ ...body, ...deal });
}
export async function updateDeal(filter, body, options = {}) {
  if (body.involvedUsers && body.involvedUsers.advisors) {
    const advisor = body.involvedUsers.advisors;
    const advisors = await User.find({ _id: { $in: advisor } });
    if (advisors.length !== advisor.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'advisors not found!');
    }
  }
  if (body.involvedUsers && body.involvedUsers.lenders) {
    const lender = body.involvedUsers.lenders;
    const lenders = await User.find({ _id: { $in: lender } });
    if (lenders.length !== lender.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'lenders not found!');
    }
  }
  if (body.involvedUsers && body.involvedUsers.borrowers) {
    const borrower = body.involvedUsers.borrowers;
    const borrowers = await User.find({ _id: { $in: borrower } });
    if (borrowers.length !== borrower.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'borrowers not found!');
    }
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

export async function InviteToDeal(body, role) {
  const dealId = { _id: body.deal };
  if (body.email && body.email.length) {
    const existingUsers = await User.find({ email: { $in: body.email } });
    if (existingUsers.length) {
      if (existingUsers.some((user) => user.role !== role)) {
        throw new ApiError(httpStatus.BAD_REQUEST, `You can only add ${role} to the deal`);
      }

      const roleChanged = {
        advisor: 'advisor',
        user: 'borrower',
      };

      const filter = {
        _id: dealId,
        [`involvedUsers.${roleChanged[role]}s`]: { $in: existingUsers.map((item) => item._id) },
      };
      const userAlreadyIncluded = await Deal.findOne(filter);
      if (userAlreadyIncluded) {
        throw new ApiError(httpStatus.BAD_REQUEST, `The ${role} is already part of the deal`);
      }
      await Deal.findByIdAndUpdate(dealId, {
        $addToSet: { [`involvedUsers.${roleChanged[role]}s`]: existingUsers.map((item) => item._id) },
      });
      const userEmailNotExists = _.differenceBy(
        body.email,
        existingUsers.map((item) => item.email)
      );
      if (userEmailNotExists.length) {
        await Invitation.insertMany(
          userEmailNotExists.map((nonExistingEmail) => ({
            deal: dealId,
            invitedBy: body.user,
            inviteeEmail: nonExistingEmail,
          }))
        );
      }
      await Invitation.insertMany(
        existingUsers.map((emailExists) => ({
          deal: dealId,
          status: 'accepted',
          invitedBy: body.user,
          invitee: emailExists._id,
        }))
      );
    } else {
      await Invitation.insertMany(
        body.email.map((nonExistingEmail) => ({
          deal: dealId,
          invitedBy: body.user,
          inviteeEmail: nonExistingEmail,
        }))
      );
    }
  }
}
