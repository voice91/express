/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { DealDocument, LenderContact, LenderPlacement, LendingInstitution } from 'models';

export async function getLenderPlacementById(id, options = {}) {
  const lenderPlacement = await LenderPlacement.findById(id, options.projection, options).populate('lendingInstitution');
  return lenderPlacement;
}

export async function getOne(query, options = {}) {
  const lenderPlacement = await LenderPlacement.findOne(query, options.projection, options);
  return lenderPlacement;
}

export async function getLenderPlacementList(filter, options = {}) {
  const lenderPlacement = await LenderPlacement.find(filter, options.projection, options).populate([
    {
      path: 'lendingInstitution',
    },
    {
      path: 'lenderContact',
    },
  ]);
  return lenderPlacement;
}

export async function getLenderPlacementListWithPagination(filter, options = {}) {
  const lenderPlacement = await LenderPlacement.paginate(filter, options);
  return lenderPlacement;
}

export async function createLenderPlacement(body) {
  if (body.lendingInstitution && body.lenderProgram) {
    const lenderPlacement = await LenderPlacement.findOne({
      lendingInstitution: body.lendingInstitution,
      lenderProgram: body.lenderProgram,
      deal: body.deal,
    });
    if (lenderPlacement) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Some lending institute are part of deal');
    }
  }
  const lendingInstitution = await LendingInstitution.findOne({ _id: body.lendingInstitution });
  if (body.lendingInstitution && !lendingInstitution) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field lendingInstitution is not valid');
  }
  const lenderPlacement = await LenderPlacement.create(body);
  return lenderPlacement;
}

export async function updateLenderPlacement(filter, body, options = {}) {
  const lendingInstitution = await LendingInstitution.findOne({ _id: body.lendingInstitution });
  if (body.lendingInstitution && !lendingInstitution) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field lendingInstitution is not valid');
  }
  const lenderPlacement = await LenderPlacement.findOneAndUpdate(filter, body, options);
  return lenderPlacement;
}

export async function updateManyLenderPlacement(filter, body, options = {}) {
  const lenderPlacement = await LenderPlacement.updateMany(filter, body, options);
  return lenderPlacement;
}

export async function removeLenderPlacement(filter) {
  const lenderPlacement = await LenderPlacement.findOneAndRemove(filter);
  return lenderPlacement;
}

export async function removeManyLenderPlacement(filter) {
  const lenderPlacement = await LenderPlacement.deleteMany(filter);
  return lenderPlacement;
}

export async function sendDeal(filterToFindContact, filterToFindPlacement, filterToFindDeal) {
  const lenderContact = await LenderContact.find(filterToFindContact).populate([
    {
      path: 'lenderInstitute',
    },
  ]);
  const lenderPlacement = await LenderPlacement.findOne(filterToFindPlacement).populate([
    {
      path: 'lendingInstitution',
    },
  ]);
  const dealDoc = await DealDocument.find(filterToFindDeal).populate([
    {
      path: 'deal',
    },
  ]);
  const docIds = await dealDoc.map((data) => data._id);

  return { lenderContact, lenderPlacement, dealDoc, docIds };
}
