/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
import httpStatus from 'http-status';
import { catchAsync } from "../../utils/catchAsync";
import { s3Service } from "../../services";
// eslint-disable-next-line import/prefer-default-export
export const preSignedPutUrl = catchAsync(async (req, res) => {
  const {
    body,
    user
  } = req;
  const s3PutObject = await s3Service.validateExtensionForPutObject(body, user);
  return res.status(httpStatus.OK).send({
    results: s3PutObject
  });
});

/**
 * Route handler for generating a signed URL to access an object in Amazon S3.
 * This function takes a "key" from the request query and uses it to generate a signed URL to access the S3 object.
 */
export const getSignedUrl = catchAsync(async (req, res) => {
  const {
    key
  } = req.query;
  const s3GetObject = await s3Service.getSignedUrl(key);
  return res.status(httpStatus.OK).send({
    results: s3GetObject
  });
});