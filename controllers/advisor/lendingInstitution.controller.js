/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { lenderPlacementService, lendingInstitutionService, s3Service } from 'services';
import { catchAsync } from 'utils/catchAsync';
import mongoose from 'mongoose';
import { pick } from '../../utils/pick';
import { LenderProgram } from '../../models';
import TempS3 from '../../models/tempS3.model';
import { asyncForEach, encodeUrl } from '../../utils/common';
import FileFieldValidationEnum from '../../models/fileFieldValidation.model';
import { EnumStageOfLenderPlacement } from '../../models/enum.model';

const moveFileAndUpdateTempS3 = async ({ url, newFilePath }) => {
  const newUrl = await s3Service.moveFile({ key: url, newFilePath });
  await TempS3.findOneAndUpdate({ url }, { url: newUrl });
  return newUrl;
};
// this is used to move file to new specified path as shown in basePath, used in create and update controller.
const moveFiles = async ({ body, user, moveFileObj }) => {
  await asyncForEach(Object.keys(moveFileObj), async (key) => {
    const fieldValidation = FileFieldValidationEnum[`${key}OfLendingInstitution`];
    const basePath = `users/${user._id}/lenderInstitution/${body._id}/${key}/${mongoose.Types.ObjectId()}/`;
    if (Array.isArray(moveFileObj[key])) {
      const newUrlsArray = [];
      moveFileObj[key].map(async (ele) => {
        const filePath = `${mongoose.Types.ObjectId()}_${ele.split('/').pop()}`;
        newUrlsArray.push(await moveFileAndUpdateTempS3({ url: ele, newFilePath: basePath + filePath }));
      });
      Object.assign(body, { ...body, [key]: await Promise.all(newUrlsArray) });
    } else {
      const filePath = `${mongoose.Types.ObjectId()}_${moveFileObj[key].split('/').pop()}`;
      Object.assign(body, {
        ...body,
        [key]: await moveFileAndUpdateTempS3({
          url: moveFileObj[key],
          newFilePath: basePath + filePath,
        }),
      });
      if (fieldValidation.generateThumbnails) {
        Object.assign(body, {
          ...body,
          [`thumbOf${key}`]: await s3Service.createThumbnails({
            url: moveFileObj[key],
            resolutions: fieldValidation.thumbnailResolutions,
          }),
        });
      }
    }
  });
};

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
  const { dealId } = query;
  const queryParams = getLendingInstitutionFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {
    ...queryParams,
  };
  const fields = pick(query, [
    'loanType',
    'propertyType',
    'statesArray',
    'lenderInstitute',
    'loanSize',
    'lenderType',
    'lenderNameVisible',
  ]);

  let lenderProgram = [];
  const filterLenderProgram = {};
  // condition to check whether the field in the query are these four ('loanType', 'propertyType', 'statesArray', 'loanSize') only.
  const filterFields = ['loanType', 'propertyType', 'statesArray', 'loanSize'];
  Object.keys(fields).forEach((field) => {
    if (filterFields.includes(field)) {
      if (field === 'loanSize') {
        filterLenderProgram.$and = [{ minLoanSize: { $lte: query.loanSize } }, { maxLoanSize: { $gte: query.loanSize } }];
      } else {
        filterLenderProgram[field] = query[field];
      }
    }
  });
  // This piece of code is for: if the query field is from the four field only then only mongoose query should run else not.
  const isFilterField = Object.keys(fields).some((property) => filterFields.includes(property));
  if (isFilterField) {
    lenderProgram = await LenderProgram.find(filterLenderProgram);
  }
  Object.keys(fields).forEach((field) => {
    if (filterFields.includes(field)) {
      filter._id = { $in: lenderProgram.map((item) => item.lenderInstitute) };
    } else if (field === 'lenderNameVisible') {
      filter[field] = new RegExp(fields.lenderNameVisible, 'i');
    } else if (field === 'lenderType') {
      if (fields[field] === 'bank') {
        filter[field] = new RegExp(`.*bank$`, 'i');
      } else {
        filter[field] = fields[field];
      }
    } else {
      filter[field] = fields[field];
    }
  });
  const options = {
    ...pick(query, ['limit', 'page']),
    populate: { path: 'lenderProgram' },
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const lendingInstitution = await lendingInstitutionService.getLendingInstitutionList(filter, options);
  const lenderPlacements = await lenderPlacementService.getLenderPlacementList({ deal: dealId });
  const lendingInstitutionsWithProgramData = lendingInstitution.map((lendingInstitutionObject) => {
    const programs = lendingInstitutionObject.lenderProgram;
    return {
      // isAlreadyAdded indicates that lender is already added in deal or not
      isAlreadyAdded: lenderPlacements.some(
        (lender) => lender.lendingInstitution.toString() === lendingInstitutionObject._id.toString()
      ),
      createdAt: lendingInstitutionObject.createdAt,
      ...lendingInstitutionObject.toJSON(),
      lenderProgram: {
        minLoanSize: Math.min(...programs.map((program) => program.minLoanSize).filter(Boolean)),
        maxLoanSize: Math.max(...programs.map((program) => program.maxLoanSize).filter(Boolean)),
        propertyTypes: [...new Set(programs.flatMap((program) => program.propertyType))],
        loanTypes: [...new Set(programs.flatMap((program) => program.loanType))],
        statesArray: [...new Set(programs.flatMap((program) => program.statesArray))],
        lenderProgramTypes: [...new Set(programs.flatMap((program) => program.lenderProgramType))],
      },
    };
  });
  return res.status(httpStatus.OK).send({ results: lendingInstitutionsWithProgramData });
});

export const paginate = catchAsync(async (req, res) => {
  const { query } = req;
  const { dealId } = query;
  const queryParams = getLendingInstitutionFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order,
  };
  const filter = {
    ...queryParams,
  };
  const fields = pick(query, [
    'loanType',
    'propertyType',
    'statesArray',
    'lenderInstitute',
    'loanSize',
    'lenderType',
    'lenderNameVisible',
  ]);

  let lenderProgram = [];
  const filterLenderProgram = {};
  // condition to check whether the field in the query are these four ('loanType', 'propertyType', 'statesArray', 'loanSize') only.
  const filterFields = ['loanType', 'propertyType', 'statesArray', 'loanSize'];
  Object.keys(fields).forEach((field) => {
    if (filterFields.includes(field)) {
      if (field === 'loanSize') {
        filterLenderProgram.$and = [{ minLoanSize: { $lte: query.loanSize } }, { maxLoanSize: { $gte: query.loanSize } }];
      } else {
        filterLenderProgram[field] = query[field];
      }
    }
  });
  // This piece of code is for: if the query field is from the four field only then only mongoose query should run else not.
  const isFilterField = Object.keys(fields).some((property) => filterFields.includes(property));
  if (isFilterField) {
    lenderProgram = await LenderProgram.find(filterLenderProgram);
  }
  Object.keys(fields).forEach((field) => {
    if (filterFields.includes(field)) {
      filter._id = { $in: lenderProgram.map((item) => item.lenderInstitute) };
    } else if (field === 'lenderNameVisible') {
      filter[field] = new RegExp(fields.lenderNameVisible, 'i');
    } else if (field === 'lenderType') {
      if (fields[field] === 'bank') {
        filter[field] = new RegExp(`.*bank$`, 'i');
      } else {
        filter[field] = fields[field];
      }
    } else {
      filter[field] = fields[field];
    }
  });
  const options = {
    ...pick(query, ['limit', 'page']),
    populate: { path: 'lenderProgram' },
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const lendingInstitution = await lendingInstitutionService.getLendingInstitutionListWithPagination(filter, options);
  const lenderPlacements = await lenderPlacementService.getLenderPlacementList({ deal: dealId });
  lendingInstitution.results = lendingInstitution.results.map((lendingInstitutionObject) => {
    const programs = lendingInstitutionObject.lenderProgram;
    return {
      // isAlreadyAdded indicates that lender is already added in deal or not
      isAlreadyAdded: lenderPlacements.some(
        (lender) => lender.lendingInstitution.toString() === lendingInstitutionObject._id.toString()
      ),
      createdAt: lendingInstitutionObject.createdAt,
      ...lendingInstitutionObject.toJSON(),
      lenderProgram: {
        minLoanSize: Math.min(...programs.map((program) => program.minLoanSize).filter(Boolean)),
        maxLoanSize: Math.max(...programs.map((program) => program.maxLoanSize).filter(Boolean)),
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
  const { user } = req;
  const { lendingInstitutionId } = req.params;
  const { logo } = body;
  const moveFileObj = {
    ...(body.logo && { logo: body.logo.url }),
  };
  body._id = lendingInstitutionId;
  await moveFiles({ body, user, moveFileObj });
  const filter = {
    _id: lendingInstitutionId,
  };
  if (body.logo) {
    const { fileName } = logo;
    body.logo = { url: encodeUrl(body.logo), fileName };
  }
  const options = { new: true };

  Object.entries(body).forEach(([key, value]) => {
    if (!value) {
      body.$unset = { ...body.$unset, [key]: '' };
      delete body[key];
    }
  });

  const lendingInstitution = await lendingInstitutionService.updateLendingInstitutionDetails(filter, body, options);
  if (lendingInstitution.logo) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(lendingInstitution.logo.url);
    await TempS3.updateMany({ url: { $in: uploadedFileUrls } }, { active: true });
  }
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

export const getLendingInstitutionFeedBack = catchAsync(async (req, res) => {
  const { lendingInstitutionId } = req.params;
  const filter = {
    lendingInstitution: lendingInstitutionId,
    $or: [
      {
        terms: { $exists: true },
      },
      {
        stage: EnumStageOfLenderPlacement.PASS,
      },
    ],
  };
  const options = { populate: { path: 'deal' } };
  let feedBacks = await lenderPlacementService.getLenderPlacementList(filter, options);
  // bcs in some old deals is not finding so need to filter out from here
  feedBacks = feedBacks.filter((feedBack) => feedBack.deal);
  return res.status(httpStatus.OK).send({ results: feedBacks });
});
