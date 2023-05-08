/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { lendingInstitutionService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import { pick } from '../../utils/pick';

const getLendingInstitutionFilterQuery = (query) => {
  const filter = pick(query, []);
  if (query.search) {
    filter.$or = [
      { lenderNameVisible: new RegExp(query.search, 'i') },
      { lenderNameInternal: new RegExp(query.search, 'i') },
    ];
  }
  return filter;
};
export const get = catchAsync(async (req, res) => {
  const { lendingInstitutionId } = req.params;
  const filter = {
    _id: lendingInstitutionId,
  };
  const options = {};
  const lendingInstitution = await lendingInstitutionService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: lendingInstitution });
});

export const list = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getLendingInstitutionFilterQuery(query);
  const filter = {
    ...queryParams,
  };
  const options = {
    ...pick(query, ['sort', 'limit', 'page']),
  };
  const lendingInstitution = await lendingInstitutionService.getLendingInstitutionList(filter, options);
  return res.status(httpStatus.OK).send({ results: lendingInstitution });
});

export const paginate = catchAsync(async (req, res) => {
  const { query } = req;
  const queryParams = getLendingInstitutionFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {
    ...queryParams,
  };
  const options = {
    ...pick(query, ['limit', 'page']),
    populate: { path: 'lenderProgram' },
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const lendingInstitution = await lendingInstitutionService.getLendingInstitutionListWithPagination(filter, options);
  lendingInstitution.results = lendingInstitution.results.map((lendingInstitutionObject) => {
    const programs = lendingInstitutionObject.lenderProgram;
    return {
      createdAt: lendingInstitutionObject.createdAt,
      ...lendingInstitutionObject.toJSON(),
      lenderProgram: {
        minLoanSize: Math.min(...programs.map((program) => program.minLoanSize)),
        maxLoanSize: Math.max(...programs.map((program) => program.maxLoanSize)),
        propertyTypes: [...new Set(programs.flatMap((program) => program.propertyType))],
        loanTypes: [...new Set(programs.flatMap((program) => program.loanType))],
        statesArray: [...new Set(programs.flatMap((program) => program.statesArray))],
        lenderProgramTypes: [...new Set(programs.flatMap((program) => program.lenderProgramType))],
      },
    };
  });

  return res.status(httpStatus.OK).send({ results: lendingInstitution });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const options = {};
  const lendingInstitution = await lendingInstitutionService.createLendingInstitution(body, options);
  return res.status(httpStatus.CREATED).send({ results: lendingInstitution });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { lendingInstitutionId } = req.params;
  const filter = {
    _id: lendingInstitutionId,
  };
  const options = { new: true };
  const lendingInstitution = await lendingInstitutionService.updateLendingInstitution(filter, body, options);
  return res.status(httpStatus.OK).send({ results: lendingInstitution });
});

export const remove = catchAsync(async (req, res) => {
  const { lendingInstitutionId } = req.params;
  const filter = {
    _id: lendingInstitutionId,
  };
  const lendingInstitution = await lendingInstitutionService.removeLendingInstitution(filter);
  return res.status(httpStatus.OK).send({ results: lendingInstitution });
});
