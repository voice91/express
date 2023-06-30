/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { lenderProgramService, lendingInstitutionService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import mongoose from 'mongoose';
import { pick } from '../../utils/pick';
import { LenderProgram, LendingInstitution } from '../../models';
import ApiError from '../../utils/ApiError';

const checkUniqueProgramNames = (body) => {
  const programNames = body.lenderProgram.map((item) => item.lenderProgramType);
  const uniqueProgramNames = [...new Set(programNames)];

  if (programNames.length !== uniqueProgramNames.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Lender program name should be unique');
  }
};

export const get = catchAsync(async (req, res) => {
  const { lenderProgramId } = req.params;
  const filter = {
    _id: lenderProgramId,
  };
  const options = {};
  const lenderProgram = await lenderProgramService.getOne(filter, options);
  return res.status(httpStatus.OK).send({ results: lenderProgram });
});

export const list = catchAsync(async (req, res) => {
  const filter = {};
  const options = {
    populate: { path: 'lenderInstitute' },
  };
  const lenderProgram = await lenderProgramService.getLenderProgramList(filter, options);
  return res.status(httpStatus.OK).send({ results: lenderProgram });
});

export const paginate = catchAsync(async (req, res) => {
  const { query } = req;
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {};
  const fields = pick(query, [
    'loanType',
    'propertyType',
    'statesArray',
    'lenderInstitute',
    'loanSize',
    'lenderType',
    'lenderNameVisible',
  ]);

  let lenderInstitute = [];
  if (fields.lenderType || fields.lenderNameVisible) {
    const filterLenderInstitute = {};
    if (fields.lenderNameVisible) {
      filterLenderInstitute.lenderNameVisible = new RegExp(fields.lenderNameVisible, 'i');
    }
    if (fields.lenderType) {
      filterLenderInstitute.lenderType = query.lenderType;
    }
    lenderInstitute = await LendingInstitution.find(filterLenderInstitute);
  }
  Object.keys(fields).forEach((field) => {
    if (field === 'loanSize') {
      filter.$and = [{ minLoanSize: { $lte: fields[field] } }, { maxLoanSize: { $gte: fields[field] } }];
    } else if (field === 'lenderType' || field === 'lenderNameVisible') {
      filter.lenderInstitute = { $in: lenderInstitute.map((item) => item._id) };
    } else {
      filter[field] = { $in: [fields[field]] };
    }
  });
  const options = {
    ...pick(query, ['limit', 'page']),
    populate: [{ path: 'lenderInstitute' }],
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const lenderProgram = await lenderProgramService.getLenderProgramListWithPagination(filter, options);
  lenderProgram.results = lenderProgram.results.map((lenderProgramObject) => ({
    createdAt: lenderProgramObject.createdAt,
    ...lenderProgramObject.toJSON(),
  }));
  return res.status(httpStatus.OK).send({ results: lenderProgram });
});

export const addLender = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;

  checkUniqueProgramNames(body);

  const getlenderInstitute = await LendingInstitution.findOne({ lenderNameVisible: body.lender.lenderNameVisible });
  let lenderInstitute;
  if (getlenderInstitute === null) {
    const createLenderBody = {
      createdBy: req.user._id,
      updatedBy: req.user._id,
      lenderNameVisible: body.lender.lenderNameVisible,
      lenderType: body.lender.lenderType,
    };
    lenderInstitute = await lendingInstitutionService.createLendingInstitution(createLenderBody);
  }

  const result = body.lenderProgram.map((item) => {
    if (item.minLoanSize && item.maxLoanSize) {
      if (item.minLoanSize >= item.maxLoanSize) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Minimum Loan Amount is Greater than Maximum Loan Amount..!!');
      }
    } else if (item.minLoanSize > 100000) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'The minimum loan amount should be less than 100000');
    } else if (item.minLoanSize && !item.maxLoanSize) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Please, Add Maximum Loan Amount..!!');
    }
    return {
      createdBy: req.user._id,
      updatedBy: req.user._id,
      lenderProgramType: item.lenderProgramType,
      statesArray: item.statesArray,
      statesArrTag: item.statesArrTag,
      minLoanSize: item.minLoanSize,
      minLoanTag: item.minLoanTag,
      maxLoanSize: item.maxLoanSize,
      maxLoanTag: item.maxLoanTag,
      propertyType: item.propertyType,
      propTypeArrTag: item.propTypeArrTag,
      doesNotLandOn: item.doesNotLandOn,
      doesNotLandOnArrTag: item.doesNotLandOnArrTag,
      loanType: item.loanType,
      loanTypeArrTag: item.loanTypeArrTag,
      indexUsed: item.indexUsed,
      spreadEstimate: item.spreadEstimate,
      counties: item.counties,
      recourseRequired: item.recourseRequired,
      nonRecourseLTV: item.nonRecourseLTV,
      lenderInstitute: getlenderInstitute && getlenderInstitute._id ? getlenderInstitute._id : lenderInstitute._id,
    };
  });
  const lenderProgram = await lenderProgramService.addLender(result);
  return res.status(httpStatus.CREATED).send({ results: lenderProgram });
});

export const editLender = catchAsync(async (req, res) => {
  const { body } = req;
  const { lenderInstitute } = req.params;
  body.updatedBy = req.user;

  checkUniqueProgramNames(body);

  const getlenderInstitute = await LendingInstitution.findOne({ _id: lenderInstitute });

  if (!getlenderInstitute) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'This LenderInstitute is not Exist..!!');
  }
  await LendingInstitution.findOneAndUpdate({ _id: lenderInstitute }, { lenderType: body.lender.lenderType });

  const lenderProgram = await Promise.all(
    body.lenderProgram.map(async (item) => {
      if (item.minLoanSize && item.maxLoanSize) {
        if (item.minLoanSize >= item.maxLoanSize) {
          throw new ApiError(httpStatus.BAD_REQUEST, 'Minimum Loan Amount is Greater than Maximum Loan Amount..!!');
        }
      } else if (item.minLoanSize > 100000) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'The minimum loan amount should be less than 100000');
      } else if (item.minLoanSize && !item.maxLoanSize) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Please, Add Maximum Loan Amount..!!');
      }
      if (!item.lenderInstitute) {
        // eslint-disable-next-line no-param-reassign
        item.lenderInstitute = lenderInstitute;
      }
      return LenderProgram.findOneAndUpdate({ _id: item.id || mongoose.Types.ObjectId() }, item, {
        upsert: true,
        new: true,
      });
    })
  );
  return res.status(httpStatus.OK).send({ results: lenderProgram });
});

export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const options = {};
  const lenderProgram = await lenderProgramService.createLenderProgram(body, options);
  return res.status(httpStatus.CREATED).send({ results: lenderProgram });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { lenderProgramId } = req.params;
  const filter = {
    _id: lenderProgramId,
  };
  const options = { new: true };
  const lenderProgram = await lenderProgramService.updateLenderProgram(filter, body, options);
  return res.status(httpStatus.OK).send({ results: lenderProgram });
});

export const remove = catchAsync(async (req, res) => {
  const { lenderProgramId } = req.params;
  const filter = {
    _id: lenderProgramId,
  };
  const lenderProgram = await lenderProgramService.removeLenderProgram(filter);
  return res.status(httpStatus.OK).send({ results: lenderProgram });
});

export const listLenderProgramByInstitute = catchAsync(async (req, res) => {
  const lendingInstitution = req.params.lenderInstitute;
  const filter = {
    lenderInstitute: lendingInstitution,
  };
  const lenderPlacement = await lenderProgramService.getListLenderProgram(filter);
  return res.status(httpStatus.OK).send({ results: lenderPlacement });
});
