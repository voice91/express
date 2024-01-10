/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { s3Service, dealDocumentService } from "../../services";
import { catchAsync } from "../../utils/catchAsync";
import FileFieldValidationEnum from "../../models/fileFieldValidation.model";
import mongoose from 'mongoose';
import TempS3 from "../../models/tempS3.model";
import { asyncForEach, encodeUrl, removeNullFields } from "../../utils/common";
import { flatMap } from 'lodash';
import { pick } from "../../utils/pick";
import { Deal, DealDocument } from "../../models";
import ApiError from "../../utils/ApiError";
import config from "../../config/config";
const moveFileAndUpdateTempS3 = async ({
  url,
  newFilePath
}) => {
  const newUrl = await s3Service.moveFile({
    key: url,
    newFilePath,
    isPrivate: config.aws.enablePrivateAccess
  });
  await TempS3.findOneAndUpdate({
    url
  }, {
    url: newUrl
  });
  return newUrl;
};
// this is used to move file to new specified path as shown in basePath, used in create and update controller.
const moveFiles = async ({
  body,
  user,
  moveFileObj
}) => {
  await asyncForEach(Object.keys(moveFileObj), async key => {
    const fieldValidation = FileFieldValidationEnum[`${key}OfDealdocument`];
    const basePath = `users/${user._id}/dealDocument/${body._id}/${key}/${mongoose.Types.ObjectId()}/`;
    if (Array.isArray(moveFileObj[key])) {
      const newUrlsArray = [];
      moveFileObj[key].map(async ele => {
        const filePath = `${ele.split('/').pop()}`;
        newUrlsArray.push(moveFileAndUpdateTempS3({
          url: ele,
          newFilePath: basePath + filePath
        }));
      });
      Object.assign(body, {
        ...body,
        [key]: await Promise.all(newUrlsArray)
      });
    } else {
      const filePath = `${moveFileObj[key].split('/').pop()}`;
      Object.assign(body, {
        ...body,
        [key]: await moveFileAndUpdateTempS3({
          url: moveFileObj[key],
          newFilePath: basePath + filePath
        })
      });
      if (fieldValidation.generateThumbnails) {
        Object.assign(body, {
          ...body,
          [`thumbOf${key}`]: await s3Service.createThumbnails({
            url: moveFileObj[key],
            resolutions: fieldValidation.thumbnailResolutions
          })
        });
      }
    }
  });
};
export const get = catchAsync(async (req, res) => {
  const {
    dealDocumentId
  } = req.params;
  const filter = {
    _id: dealDocumentId
  };
  const options = {};
  const dealDocument = await dealDocumentService.getOne(filter, options);
  return res.status(httpStatus.OK).send({
    results: dealDocument
  });
});
/**
 * @deprecated
 * This function is no longer in use instead we are using '/v2/deal/:dealId'.
 */
export const getDealDocumentByDeal = catchAsync(async (req, res) => {
  const filter = {
    deal: req.params.dealId
  };
  const options = {};
  const dealDocument = await dealDocumentService.getOne(filter, options);
  return res.status(httpStatus.OK).send({
    results: dealDocument
  });
});
export const getDealDocumentByDealV2 = catchAsync(async (req, res) => {
  const filter = {
    deal: req.params.dealId
  };
  const options = {};
  const dealDocument = await dealDocumentService.getDealDocumentList(filter, options);
  return res.status(httpStatus.OK).send({
    results: dealDocument
  });
});
export const paginate = catchAsync(async (req, res) => {
  const {
    query
  } = req;
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order
  };
  const filter = {};
  const options = {
    ...pick(query, ['limit', 'page'])
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const dealDocument = await dealDocumentService.getDealDocumentListWithPagination(filter, options);
  dealDocument.results = dealDocument.results.map(dealDocumentObject => ({
    createdAt: dealDocumentObject.createdAt,
    ...dealDocumentObject.toJSON()
  }));
  return res.status(httpStatus.OK).send({
    results: dealDocument
  });
});

/**
 * @deprecated
 * This function is no longer in use instead we are using '/v2/add' as we now have functionality of 'add recommended file' also we can add comment with the docs.
 */
export const create = catchAsync(async (req, res) => {
  const {
    body
  } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const uploadedBy = req.user.role;
  const fileName = body.documents.map(item => item.fileName);
  const documentType = body.documents.map(item => item.documentType);
  const {
    user
  } = req;
  const moveFileObj = {
    ...(body.documents && {
      documents: body.documents.map(item => item.url)
    })
  };
  const filter = {
    deal: body.deal
  };
  const update = {
    deal: body.deal,
    // when we use $push than it will not take createdAt field, so we have to add it manually
    $push: {
      documents: body.documents.map(document => ({
        ...document,
        createdAt: new Date(),
        uploadedBy
      }))
    }
  };
  await moveFiles({
    body,
    user,
    moveFileObj
  });
  const options = {
    new: true,
    upsert: true
  };
  if (body.documents) {
    body.documents = body.documents.map((item, index) => {
      return {
        url: encodeUrl(item),
        fileName: fileName[index],
        documentType: documentType[index],
        uploadedBy
      };
    });
  }
  const dealDocuments = await DealDocument.find(filter);
  const documents = flatMap(dealDocuments.map(item => item.documents));
  const dealDocumentsAvailableInDb = documents.length;
  if (dealDocumentsAvailableInDb === 6 || dealDocumentsAvailableInDb > 6) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You can Add only 6 Documents..!');
  } else if (dealDocumentsAvailableInDb + body.documents.length > 6) {
    throw new ApiError(httpStatus.BAD_REQUEST, `${dealDocumentsAvailableInDb} document present in db,
     ${6 - dealDocumentsAvailableInDb} document can be added`);
  } else {
    const dealDocumentResult = await dealDocumentService.updateDealDocument(filter, update, options);
    if (dealDocumentResult) {
      const uploadedFileUrls = [];
      uploadedFileUrls.push(dealDocumentResult.file);
      await TempS3.updateMany({
        url: {
          $in: uploadedFileUrls
        }
      }, {
        active: true
      });
    }
    return res.status(httpStatus.CREATED).send({
      results: dealDocumentResult
    });
  }
});
export const createV2 = catchAsync(async (req, res) => {
  const {
    body
  } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const uploadedBy = req.user.role;
  const {
    user
  } = req;
  const moveFileObj = {
    ...(body.documents && {
      documents: body.documents.map(item => item.url)
    })
  };
  // const filter = {
  //   deal: body.deal,
  // };
  let fileName = [];
  let documentType = [];
  let fileType = [];
  if (body.documents) {
    fileName = body.documents.map(item => item.fileName);
    documentType = body.documents.map(item => item.documentType);
    fileType = body.documents.map(item => item.fileType);
  }
  body._id = mongoose.Types.ObjectId();
  body.uploadedBy = uploadedBy;
  await moveFiles({
    body,
    user,
    moveFileObj
  });
  if (body.documents) {
    body.documents = body.documents.map((item, index) => {
      return {
        url: encodeUrl(item),
        fileName: fileName[index],
        documentType: documentType[index],
        fileType: fileType[index],
        uploadedBy
      };
    });
  }
  // todo: Uncomment below code for limiting max documents of a deal.
  // const dealDocuments = await DealDocument.find(filter);
  //
  // const documents = flatMap(dealDocuments.map((item) => item.documents));
  // const dealDocumentsAvailableInDb = documents.length;
  // if (dealDocumentsAvailableInDb === 6 || dealDocumentsAvailableInDb > 6) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'You can Add only 6 Documents..!');
  // } else if (body.documents && dealDocumentsAvailableInDb + body.documents.length > 6) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     `${dealDocumentsAvailableInDb} document present in db,
  //    ${6 - dealDocumentsAvailableInDb} document can be added`
  //   );
  // } else {
  const dealDocumentResult = await dealDocumentService.createDealDocument(body);
  if (body.documents && dealDocumentResult) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(dealDocumentResult.file);
    await TempS3.updateMany({
      url: {
        $in: uploadedFileUrls
      }
    }, {
      active: true
    });
  }
  return res.status(httpStatus.CREATED).send({
    results: dealDocumentResult
  });
  // }
});
export const update = catchAsync(async (req, res) => {
  const {
    body
  } = req;
  // this for unsetting the field whose value is null in the body
  removeNullFields(body);
  body.updatedBy = req.user;
  const {
    dealDocumentId
  } = req.params;
  const {
    user
  } = req;
  const moveFileObj = {
    ...(body.documents && {
      documents: body.documents.map(item => item.url)
    })
  };
  const dealId = body.deal;
  let fileName = [];
  let documentType = [];
  let fileType = [];
  let uploadedBy = [];
  if (body.documents) {
    fileName = body.documents.map(item => item.fileName);
    documentType = body.documents.map(item => item.documentType);
    fileType = body.documents.map(item => item.fileType);
    uploadedBy = body.documents.map(item => item.uploadedBy);
  }
  const dealObj = await Deal.findById(dealId);
  if (!dealObj) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Deal doesn't exist");
  }
  body._id = dealDocumentId;
  await moveFiles({
    body,
    user,
    moveFileObj
  });
  if (body.documents) {
    body.documents = body.documents.map((item, index) => {
      return {
        url: encodeUrl(item),
        fileName: fileName[index],
        documentType: documentType[index],
        fileType: fileType[index],
        uploadedBy: uploadedBy[index]
      };
    });
  }

  // todo: Uncomment below code for limiting max documents of a deal.
  // const dealDocuments = await DealDocument.find({ deal: dealId });
  // const documents = flatMap(dealDocuments.map((item) => item.documents));
  // const dealDocumentsAvailableInDb = documents.length;
  // if (dealDocumentsAvailableInDb === 6 || dealDocumentsAvailableInDb > 6) {
  //   throw new ApiError(httpStatus.BAD_REQUEST, 'You can Add only 6 Documents..!');
  // } else if (body.documents && dealDocumentsAvailableInDb + body.documents.length > 6) {
  //   throw new ApiError(
  //     httpStatus.BAD_REQUEST,
  //     `${dealDocumentsAvailableInDb} document present in db,
  //    ${6 - dealDocumentsAvailableInDb} document can be added`
  //   );
  // }
  const filter = {
    _id: dealDocumentId
  };
  const options = {
    new: true
  };
  const dealDocumentResult = await dealDocumentService.updateDealDocument(filter, body, options);
  // tempS3
  if (dealDocumentResult) {
    const uploadedFileUrls = [];
    uploadedFileUrls.push(dealDocumentResult.file);
    await TempS3.updateMany({
      url: {
        $in: uploadedFileUrls
      }
    }, {
      active: true
    });
  }
  return res.status(httpStatus.OK).send({
    results: dealDocumentResult
  });
});

// removing single document from documents array
export const removeDocument = catchAsync(async (req, res) => {
  const {
    documentId
  } = req.params;
  const filter = {
    'documents._id': documentId
  };
  const updateDocument = {
    $pull: {
      documents: {
        _id: documentId
      }
    }
  };
  const options = {
    new: true
  };
  const dealDocument = await dealDocumentService.updateDealDocument(filter, updateDocument, options);
  return res.status(httpStatus.OK).send({
    results: dealDocument
  });
});
export const remove = catchAsync(async (req, res) => {
  const {
    dealDocumentId
  } = req.params;
  const filter = {
    _id: dealDocumentId
  };
  const dealDocument = await dealDocumentService.removeDealDocument(filter);
  return res.status(httpStatus.OK).send({
    results: dealDocument
  });
});