/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { feedbackService } from 'services';
import { catchAsync } from 'utils/catchAsync';

// eslint-disable-next-line import/prefer-default-export
export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const options = {};
  const feedback = await feedbackService.createFeedback(body, options);
  return res.status(httpStatus.CREATED).send({ results: feedback });
});
