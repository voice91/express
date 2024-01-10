/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { emailService } from "../../services";
import { catchAsync } from "../../utils/catchAsync";
import { FAQ } from "../../models";

/**
 * @deprecated
 * This function is no longer in use as it's been removed from the UI.
 */
// eslint-disable-next-line import/prefer-default-export
export const sendMail = catchAsync(async (req, res) => {
  const {
    question
  } = req.body;
  const from = req.user.email;
  const {
    name
  } = req.user;
  await emailService.FAQTemplate({
    from,
    name,
    question
  });
  await FAQ.create({
    question,
    userId: from
  });
  return res.status(httpStatus.OK).send({
    results: 'Email sent....'
  });
});