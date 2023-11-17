/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import { Sponsor } from 'models';
import httpStatus from 'http-status';
import { EnumRoleOfUser } from '../models/enum.model';
import { checkForExistingUsers } from './user.service';
import { userService } from './index';
import ApiError from '../utils/ApiError';

export async function getSponsorById(id, options = {}) {
  const sponsor = await Sponsor.findById(id, options.projection, options);
  return sponsor;
}

export async function getOne(query, options = {}) {
  const sponsor = await Sponsor.findOne(query, options.projection, options);
  return sponsor;
}

export async function getSponsorList(filter, options = {}) {
  const sponsor = await Sponsor.find(filter, options.projection, options);
  return sponsor;
}

export async function getSponsorListWithPagination(filter, options = {}) {
  const sponsor = await Sponsor.paginate(filter, options);
  return sponsor;
}

/**
 * Checks if a list of borrowers' emails is already attached to a sponsor in the system.
 *
 * @param {string[]} borrowers - An array of borrowers id to check , ids are converted to string from objectId to validate more efficiently.
 * @throws {ApiError} If any of the provided borrower id are already attached to a sponsor.
 */
export async function validateBorrowersNotAttachedToSponsor(borrowers) {
  // Retrieve a list of sponsors that include any of the provided borrowers' emails
  const filteredSponsorsIncludedBorrowers = await getSponsorList(
    {},
    {
      populate: {
        path: 'borrowers',
        match: {
          _id: {
            $in: borrowers,
          },
        },
        select: { _id: 1, email: 1 },
      },
    }
  ).then((sponsors) => sponsors.filter((sponsor) => sponsor.borrowers.length));

  if (filteredSponsorsIncludedBorrowers.length) {
    const alreadyAttachedBorrowers = [];
    // Iterate through sponsors and check for common emails with provided borrowers
    filteredSponsorsIncludedBorrowers.forEach((sponsor) => {
      const commonBorrowers = sponsor.borrowers.filter((borrower) => borrowers.includes(borrower._id.toString()));
      alreadyAttachedBorrowers.push(...commonBorrowers.map((borrower) => borrower.email));
    });
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      // [...new Set(alreadyAttachedBorrowers)] make array with unique emails (remove repeated emails from array)
      `${[...new Set(alreadyAttachedBorrowers)].join(', ')} is already attached to another Sponsor`
    );
  }
}

export async function createSponsor(body) {
  if (body.borrowersEmails && body.borrowersEmails.length) {
    const borrowers = await checkForExistingUsers(body.borrowersEmails, EnumRoleOfUser.USER);
    Object.assign(body, { borrowers: borrowers.map((user) => user._id.toString()) });
    // check if borrower is attached with any other sponsor.
    await validateBorrowersNotAttachedToSponsor(body.borrowers);
  }
  const sponsor = await Sponsor.create(body);
  return sponsor;
}

export async function updateSponsor(filter, body, options = {}) {
  if (body.borrowersEmails && body.borrowersEmails.length) {
    const borrowers = await checkForExistingUsers(body.borrowersEmails, EnumRoleOfUser.USER);
    Object.assign(body, { borrowers: borrowers.map((user) => user._id) });
  }
  // Verify whether the borrower emails have been modified.
  // Locate the associated sponsor and compare their list of borrower emails.
  // If the borrower emails have changed, identify the removed borrowers, and eliminate the sponsor's association from their records
  // If the borrower emails have changed, identify the added borrowers, and update the sponsor's association with their records
  const sponsor = await getOne(filter, { populate: { path: 'borrowers' } });
  const existingBorrowerIds = sponsor.borrowers ? sponsor.borrowers.map((borrower) => borrower._id.toString()) : [];
  const updatedBorrowerIds = body.borrowers ? body.borrowers.map((id) => id.toString()) : [];
  if (existingBorrowerIds.length && updatedBorrowerIds.length && existingBorrowerIds !== updatedBorrowerIds) {
    const removedBorrowers = existingBorrowerIds.filter((id) => !updatedBorrowerIds.includes(id));
    const addedBorrowers = updatedBorrowerIds.filter((id) => !existingBorrowerIds.includes(id));
    if (addedBorrowers && addedBorrowers.length) {
      await validateBorrowersNotAttachedToSponsor(addedBorrowers);
    }
    if (removedBorrowers && removedBorrowers.length) {
      await userService.updateManyUser({ _id: { $in: removedBorrowers } }, { $unset: { sponsor: '' } });
    }
  }
  const updatedSponsor = await Sponsor.findOneAndUpdate(filter, body, options);
  return updatedSponsor;
}

export async function updateManySponsor(filter, body, options = {}) {
  const sponsor = await Sponsor.updateMany(filter, body, options);
  return sponsor;
}

export async function removeSponsor(filter) {
  const sponsor = await Sponsor.findOneAndRemove(filter);
  return sponsor;
}

export async function removeManySponsor(filter) {
  const sponsor = await Sponsor.deleteMany(filter);
  return sponsor;
}

export async function aggregateSponsor(query) {
  const sponsor = await Sponsor.aggregate(query);
  return sponsor;
}

export async function aggregateSponsorWithPagination(query, options = {}) {
  const aggregate = Sponsor.aggregate();
  // eslint-disable-next-line array-callback-return
  query.map((obj) => {
    aggregate._pipeline.push(obj);
  });
  const sponsor = await Sponsor.aggregatePaginate(aggregate, options);
  return sponsor;
}
