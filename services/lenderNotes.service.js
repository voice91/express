/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { LenderNotes, Deal } from 'models';

export async function getLenderNotesById(id, options = {}) {
  const lenderNotes = await LenderNotes.findById(id, options.projection, options);
  return lenderNotes;
}

export async function getOne(query, options = {}) {
  const lenderNotes = await LenderNotes.findOne(query, options.projection, options);
  return lenderNotes;
}

export async function getLenderNotesList(filter, options = {}) {
  const lenderNotes = await LenderNotes.find(filter, options.projection, options);
  return lenderNotes;
}

export async function getLenderNotesListWithPagination(filter, options = {}) {
  const lenderNotes = await LenderNotes.paginate(filter, options);
  return lenderNotes;
}

export async function createLenderNotes(body) {
  if (body.deal) {
    const deal = await Deal.findOne({ _id: body.deal });
    if (!deal) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'field deal is not valid');
    }
  }
  const lenderNotes = await LenderNotes.create(body);
  return lenderNotes;
}

export async function updateLenderNotes(filter, body, options = {}) {
  if (body.deal) {
    const deal = await Deal.findOne({ _id: body.deal });
    if (!deal) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'field deal is not valid');
    }
  }
  const lenderNotes = await LenderNotes.findOneAndUpdate(filter, body, options);
  return lenderNotes;
}

export async function updateManyLenderNotes(filter, body, options = {}) {
  const lenderNotes = await LenderNotes.updateMany(filter, body, options);
  return lenderNotes;
}

export async function removeLenderNotes(filter) {
  const lenderNotes = await LenderNotes.findOneAndRemove(filter);
  return lenderNotes;
}

export async function removeManyLenderNotes(filter) {
  const lenderNotes = await LenderNotes.deleteMany(filter);
  return lenderNotes;
}