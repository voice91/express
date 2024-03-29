/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { Deal, User } from 'models';
import mongoose from 'mongoose';
import _ from 'lodash';
import { userService } from './index';
import config from '../config/config';
import { invitationToDeal, manageDealStageTimeline } from '../utils/common';
import { lenderPlacementStageToStageNumberMapping } from '../utils/enumStageOfLenderPlacement';
import { stageOfDealWithNumber } from '../utils/enumStageForDeal';
import { detailsInDeal } from '../utils/detailsInDeal';
import { logger } from '../config/logger';

/**
 * Validates the list of involved users for a specific role in a given request body.
 *
 * @param {Object} body - The request body containing information about involved users.
 * @param {string} role - The role for which the involved users need to be validated.
 * @throws {ApiError} Throws a BAD_REQUEST error if any user for the specified role is not found.
 * @returns {Promise<void>} - Resolves if validation is successful.
 */
const validateInvolvedUsers = async (body, role) => {
  // Check if the involved users for the specified role exist in the body.
  if (body.involvedUsers && body.involvedUsers[role] && body.involvedUsers[role].length) {
    const users = await userService.getUserList({ _id: { $in: body.involvedUsers[role] } });
    // Check if the number of retrieved users matches the number of specified user IDs.
    if (users.length !== body.involvedUsers[role].length) {
      // Find the user IDs that were not found in the userService response.
      const usersNotFound = _.differenceBy(
        body.involvedUsers[role].map((userId) => userId.toString()),
        users.map((user) => user._id.toString())
      );
      throw new ApiError(httpStatus.BAD_REQUEST, `${role} not found for id ${usersNotFound.join(', ')}`);
    }
  }
};

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
  return deal;
}

export async function getDealListWithPagination(filter, options = {}) {
  const deal = await Deal.paginate(filter, options);
  return deal;
}

export async function createDeal(body) {
  const getUser = await userService.getOne({ _id: body.user });
  const { firstName: userName, sendEmailFrom: fromEmail, appPassword: pass } = getUser;

  await Promise.all([
    validateInvolvedUsers(body, 'advisors'),
    validateInvolvedUsers(body, 'lenders'),
    validateInvolvedUsers(body, 'borrowers'),
  ]);

  const dealId = mongoose.Types.ObjectId();
  const deal = { _id: dealId };
  if (body.dealMembers && body.dealMembers.length) {
    Object.assign(body.involvedUsers, { advisors: body.user });
    const existingUsers = await User.find({ email: { $in: body.dealMembers } });
    Object.assign(body.involvedUsers, { borrowers: existingUsers.map((item) => item._id) });
    await invitationToDeal({
      existingUsers,
      fromEmail,
      pass,
      userName,
      dealName: body.dealName,
      deal: deal._id,
      body,
      isDealCreated: true,
    });
  }

  const dealCreate = await Deal.create({ ...body, ...deal });

  const { defaultAdvisorToAddDeal } = config;
  await Promise.all(
    defaultAdvisorToAddDeal.map(async (item) => {
      const user = await User.findOne({ email: item });
      if (!dealCreate.involvedUsers.advisors.includes(user._id)) {
        const existingUsers = await User.find({ email: { $in: item } });
        await invitationToDeal({
          existingUsers,
          fromEmail,
          pass,
          userName,
          dealName: body.dealName,
          deal: deal._id,
          body,
          isDefaultAdvisor: true,
        });
      }
    })
  );
  return dealCreate;
}
export async function updateDeal(filter, body, options = {}) {
  await Promise.all([
    validateInvolvedUsers(body, 'advisors'),
    validateInvolvedUsers(body, 'lenders'),
    validateInvolvedUsers(body, 'borrowers'),
  ]);
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

/**
 * Updates the deal stage along with the placement stage based on certain conditions.
 *
 * @param {Object} params - The parameters object.
 * @param {string} params.dealId - The ID of the deal to be updated.
 * @param {string} params.dealStage - The current stage of the deal.
 * @param {string} params.placementStage - The target placement stage to compare.
 * @param {Array} params.lenderPlacementsAssociatedWithDeal - Array of lender placements associated with the deal.
 * @param {Object} params.lenderPlacementResult - Result of updated lender placement.
 */
export async function updateDealStageWithPlacementStage({
  dealId,
  dealStage,
  placementStage,
  lenderPlacementsAssociatedWithDeal,
  lenderPlacementResult,
}) {
  // Filter placements with a stage lower than the target placement stage
  const placementWithTargetStage = lenderPlacementsAssociatedWithDeal.filter(
    (placement) =>
      lenderPlacementStageToStageNumberMapping.get(placement.stage) <
      lenderPlacementStageToStageNumberMapping.get(placementStage)
  );
  // If there are no placements with the target stage, update the deal stage
  if (!placementWithTargetStage.length) {
    await updateDeal(
      { _id: dealId },
      {
        stage: dealStage,
        orderOfStage: stageOfDealWithNumber(dealStage),
        timeLine: manageDealStageTimeline(lenderPlacementResult.deal.stage, dealStage, lenderPlacementResult.deal.timeLine),
        details: await detailsInDeal(dealStage, dealId),
      }
    );
    logger.info(`Deal stage updated to ${dealStage}`);
  }
}
