import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { dealSummaryService, s3Service, sponsorService } from '../../services';
import { catchAsync } from '../../utils/catchAsync';
import TempS3 from '../../models/tempS3.model';
import {
  addIndexForCustomBlocks,
  addSymbolInData,
  asyncForEach,
  encodeUrl,
  removeFalsyValueFromDealSummery,
  validateLoanAmount,
  removeNullFields,
} from '../../utils/common';
import FileFieldValidationEnum from '../../models/fileFieldValidation.model';
import { EnumOfDynamicFieldType } from '../../models/enum.model';
import { importTableDataFromExcel } from '../../utils/importExcel';

// eslint-disable-next-line import/prefer-default-export
const moveFileAndUpdateTempS3 = async ({ url, newFilePath }) => {
  const newUrl = await s3Service.moveFile({ key: url, newFilePath });
  await TempS3.findOneAndUpdate({ url }, { url: newUrl });
  return newUrl;
};
// this is used to move file to new specified path as shown in basePath, used in create and update controller.
const moveFiles = async ({ body, user, moveFileObj }) => {
  await asyncForEach(Object.keys(moveFileObj), async (key) => {
    const fieldValidation = FileFieldValidationEnum[`${key}OfDealSummary`];
    const basePath = `users/${user._id}/dealSummary/${key}/${mongoose.Types.ObjectId()}/`;
    if (Array.isArray(moveFileObj[key])) {
      const newUrlsArray = [];
      moveFileObj[key].map(async (ele) => {
        const filePath = `${mongoose.Types.ObjectId()}_${ele.split('/').pop()}`;
        newUrlsArray.push(moveFileAndUpdateTempS3({ url: ele, newFilePath: basePath + filePath }));
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
export const importFileForDealSummary = catchAsync(async (req, res) => {
  const { query } = req;
  query.createdBy = req.user._id;
  query.updatedBy = req.user._id;
  const dealSummary = await dealSummaryService.importFileForDealSummary({
    url: query.url,
    deal: query.deal,
  });
  res.status(httpStatus.OK).send({ results: dealSummary });
});

/**
 * @deprecated
 * This function is no longer in use as we are not exporting file for deal summary.
 */
export const exportFileForDealSummary = catchAsync(async (req, res) => {
  const { body } = req;
  const { dealSummaryId } = req.params;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const outPath = await dealSummaryService.updateExcelFromDealSummery(body, dealSummaryId);
  res.status(httpStatus.OK).sendFile(outPath);
});

export const get = catchAsync(async (req, res) => {
  const { dealSummaryId } = req.params;
  const filter = {
    _id: dealSummaryId,
  };
  const options = {
    populate: [{ path: 'deal', select: { sponsor: 1 }, populate: { path: 'sponsor', select: { name: 1, description: 1 } } }],
  };
  const dealSummary = await dealSummaryService.getDealSummaryById(filter, options);
  return res.status(httpStatus.OK).send({ results: dealSummary });
});

export const create = catchAsync(async (req, res) => {
  let { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  body.user = req.user._id;
  const options = {};

  // if we have not value inside body fields than no need to create that field in db.
  body = removeFalsyValueFromDealSummery(body);
  // Validates the consistency of the requested loan amount across Sources, Deal Metrics and Financing Request
  validateLoanAmount(body);

  // add the index for the dynamicFields from reference section
  if (body.dynamicField && body.dynamicField.length) {
    body.dynamicField = addIndexForCustomBlocks(body.dynamicField);
  }
  const dealSummary = await dealSummaryService.createDealSummary(body, options);

  return res.status(httpStatus.CREATED).send({ results: dealSummary });
});

export const update = catchAsync(async (req, res) => {
  let { body } = req;
  // this for unsetting the field whose value is null in the body and also for the object that's in the body's object
  removeNullFields(body);
  const { otherPhotos, sponsor, sponsorOverview } = body;
  body.updatedBy = req.user.id;
  const { dealSummaryId } = req.params;
  const { user } = req;
  // Validates the consistency of the requested loan amount across Sources, Deal Metrics and Financing Request
  validateLoanAmount(body);
  const moveFileObj = {
    ...(body.otherPhotos && { otherPhotos: body.otherPhotos.map((item) => item.url) }),
  };
  await moveFiles({ body, user, moveFileObj });
  const filter = {
    _id: dealSummaryId,
  };

  if (body.otherPhotos) {
    const fileName = otherPhotos.map((item) => item.fileName);
    body.otherPhotos = body.otherPhotos.map((item, index) => {
      return { url: encodeUrl(item), fileName: fileName[index] };
    });
  }

  // if we have not value inside body fields than no need to create that field in db.
  body = removeFalsyValueFromDealSummery(body);

  if (body.dynamicField && body.dynamicField.length) {
    body.dynamicField = addIndexForCustomBlocks(body.dynamicField);
    // find the table type fields
    const tableTypeDynamicFields = body.dynamicField.filter((block) => block.type === EnumOfDynamicFieldType.TABLE);
    // if isUpdated field true then ,call importExcelFile function and import the data for each table type fields & update that data into tableData field
    await Promise.all(
      tableTypeDynamicFields.map(async (block) => {
        if (block.isUpdated) {
          const importDataFromFile = await importTableDataFromExcel(block.response.fileUrl, block.name);
          Object.assign(block.response, { tableData: addSymbolInData(importDataFromFile.customTableData) });
          // update the name if found in the import data
          if (importDataFromFile.customTableTitle) {
            Object.assign(block, { name: importDataFromFile.customTableTitle });
          }
        }
      })
    );
  }
  // update the sponsor description
  if (sponsor && sponsorOverview) {
    await sponsorService.updateSponsor({ _id: sponsor }, { description: sponsorOverview });
  }
  const options = { new: true };

  const dealSummary = await dealSummaryService.updateDealSummary(filter, body, options);
  // tempS3
  if (dealSummary) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(...dealSummary.otherPhotos);
    // eslint-disable-next-line no-shadow
    const uploadedFileUrl = uploadedFileUrls.map((data) => data.url);
    await TempS3.updateMany({ url: { $in: uploadedFileUrl } }, { active: true });
  }
  return res.status(httpStatus.OK).send({ results: dealSummary });
});
