/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import { LenderProgram, LendingInstitution } from 'models';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

export async function getLenderProgramById(id, options = {}) {
  const lenderProgram = await LenderProgram.findById(id, options.projection, options);
  return lenderProgram;
}

export async function getOne(query, options = {}) {
  const lenderProgram = await LenderProgram.findOne(query, options.projection, options);
  return lenderProgram;
}

export async function getLenderProgramList(filter, options = {}) {
  const lenderProgram = await LenderProgram.find(filter, options.projection, options);
  return lenderProgram;
}

export async function getLenderProgramListWithPagination(filter, options = {}) {
  const lenderProgram = await LenderProgram.paginate(filter, options);
  return lenderProgram;
}

export async function createLenderProgram(body) {
  const lenderInstitute = await LendingInstitution.find({ _id: { $in: body.lenderInstitute } });
  if (!lenderInstitute.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field lenderInstitute is not valid');
  }
  const lenderProgram = await LenderProgram.create(body);
  return lenderProgram;
}

export async function updateLenderProgram(filter, body, options = {}) {
  const lenderProgram = await LenderProgram.findOneAndUpdate(filter, body, options);
  return lenderProgram;
}

export async function updateManyLenderProgram(filter, body, options = {}) {
  const lenderProgram = await LenderProgram.updateMany(filter, body, options);
  return lenderProgram;
}

export async function removeLenderProgram(filter) {
  const lenderProgram = await LenderProgram.findOneAndRemove(filter);
  return lenderProgram;
}

export async function removeManyLenderProgram(filter) {
  const lenderProgram = await LenderProgram.deleteMany(filter);
  return lenderProgram;
}
