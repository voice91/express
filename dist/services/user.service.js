/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import ApiError from "../utils/ApiError";
import httpStatus from 'http-status';
import { User } from "../models";
import _ from 'lodash';
import { notificationService } from "./index";

/**
 * Check for existing users based on provided email addresses and role.
 *
 * @param {string[]} emails - Array of email addresses to check.
 * @param {string} role - Role to filter users by.
 * @returns {Promise<Array>} - Array of existing users matching the criteria.
 * @throws {ApiError} - Throws an error if the provided email addresses are not associated with registered users.
 */
export async function checkForExistingUsers(emails, role) {
  const existingUsers = await User.find({
    email: {
      $in: emails
    },
    role
  });
  if (existingUsers.length) {
    const userEmailNotExists = _.differenceBy(emails, existingUsers.map(item => item.email));
    if (userEmailNotExists.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, `${userEmailNotExists} does not correspond to any registered ${role}`);
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, `The provided email address (${emails}) is not associated with any registered ${role}.`);
  }
  return existingUsers;
}
export async function getUserById(id, options = {}) {
  const user = await User.findById(id, options.projection, options);
  return user;
}
export async function getOne(query, options = {}) {
  const user = await User.findOne(query, options.projection, options);
  return user;
}
export async function getUserList(filter, options = {}) {
  const user = await User.find(filter, options.projection, options);
  return user;
}
export async function getUserListWithPagination(filter, options = {}) {
  const user = await User.paginate(filter, options);
  return user;
}
export async function createUser(body = {}) {
  if (await User.isEmailTaken(body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.create(body);
  return user;
}
export async function updateUser(filter, body, options = {}) {
  const userData = await getOne(filter, {});
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user not found');
  }
  if (body.email && (await User.isEmailTaken(body.email, userData.id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const user = await User.findOneAndUpdate(filter, body, options);
  return user;
}
export async function updateManyUser(filter, body, options = {}) {
  const user = await User.updateMany(filter, body, options);
  return user;
}
export async function removeUser(filter) {
  const user = await User.findOneAndRemove(filter);
  return user;
}
export async function removeManyUser(filter) {
  const user = await User.deleteMany(filter);
  return user;
}
export async function addDeviceToken(user, body) {
  const {
    deviceToken,
    platform
  } = body;
  const isFCMValid = await notificationService.verifyFCMToken(deviceToken);
  if (!isFCMValid) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'The FCM Token is invalid!');
  }
  const deviceTokenList = user.deviceTokens.map(data => data.deviceToken);
  if (_.indexOf(deviceTokenList, deviceToken) === -1) {
    user.deviceTokens.push({
      deviceToken,
      platform
    });
    const updateUserBody = {
      ...user._doc
    };
    // we do not want to change password, so we delete from updated body. otherwise it change password for same user.
    delete updateUserBody.password;
    const updatedUser = await updateUser({
      _id: user._id
    }, {
      ...updateUserBody
    });
    return updatedUser;
  }
  return user;
}
export const enforcePassword = async (userId, body) => {
  const {
    password
  } = body;
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!user.enforcePassword) {
    throw new ApiError(httpStatus.NOT_FOUND, 'You were not allowed to set password!');
  }
  // making enforcePassword to false so user can not set pass again.
  Object.assign(user, {
    password,
    enforcePassword: false
  });
  await user.save();
  return user;
};