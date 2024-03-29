/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import { LenderContact, LendingInstitution } from 'models';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

export async function getLenderContactById(id, options = {}) {
  const lenderContact = await LenderContact.findById(id, options.projection, options);
  return lenderContact;
}

export async function getOne(query, options = {}) {
  const lenderContact = await LenderContact.findOne(query, options.projection, options);
  return lenderContact;
}

export async function getLenderContactList(filter, options = {}) {
  const lenderContact = await LenderContact.find(filter, options.projection, options);
  return lenderContact;
}

export async function getLenderContactListWithPagination(filter, options = {}) {
  const lenderContact = await LenderContact.paginate(filter, options);
  return lenderContact;
}

export async function createLenderContact(body) {
  const lenderInstitute = await LendingInstitution.findOne({ _id: body.lenderInstitute });
  if (!lenderInstitute) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field lenderInstitute is not valid');
  }
  if (await LenderContact.isEmailTaken(body.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const lenderContact = await LenderContact.create(body);
  return lenderContact;
}

export async function updateLenderContact(filter, body, options = {}) {
  const lenderContactData = await getOne(filter, {});
  if (!lenderContactData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Lender Contact not found');
  }
  if (body.email && (await LenderContact.isEmailTaken(body.email, lenderContactData.id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  const lenderContact = await LenderContact.findOneAndUpdate(filter, body, options);
  return lenderContact;
}

export async function updateManyLenderContact(filter, body, options = {}) {
  const lenderContact = await LenderContact.updateMany(filter, body, options);
  return lenderContact;
}

export async function removeLenderContact(filter) {
  const lenderContact = await LenderContact.findOneAndRemove(filter);
  return lenderContact;
}

export async function removeManyLenderContact(filter) {
  const lenderContact = await LenderContact.deleteMany(filter);
  return lenderContact;
}

export async function listLenderContactByLenderInstitute(filter) {
  const lenderContact = await LenderContact.find(filter);
  return lenderContact;
}
