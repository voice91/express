/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { emailService, feedbackService } from 'services';
import { catchAsync } from 'utils/catchAsync';
import config from '../../config/config';
import { User } from '../../models';

// eslint-disable-next-line import/prefer-default-export
export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const options = {};

  const getUser = await User.findOne({ _id: req.user._id });
  const { emailPresentingPostmark } = getUser;
  const attachments = await Promise.all(
    body.images.map(async (item) => {
      return {
        fileName: item.fileName,
        path: item.path,
        fileType: item.fileType,
      };
    })
  );

  const feedback = await feedbackService.createFeedback(body, options);

  await emailService.sendFeedbackEmail({
    ...(emailPresentingPostmark && { from: req.user.email }),
    to: config.adminEmailId,
    subject: body.subject,
    description: body.description,
    name: req.user.firstName,
    attachments,
  });
  return res.status(httpStatus.CREATED).send({ results: feedback });
});