import httpStatus from 'http-status';
import config from "../../config/config";
import { catchAsync } from "../../utils/catchAsync";
import ApiError from "../../utils/ApiError";
import { userService } from "../../services";

// eslint-disable-next-line import/prefer-default-export
export const addUser = catchAsync(async (req, res) => {
  const {
    body
  } = req;
  const userEmail = req.user.email;
  const options = {};
  const {
    adminEmails
  } = config;
  if (!adminEmails.includes(userEmail)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "You don't have access to add the users to the database");
  }
  body.emailVerified = true;
  const user = await userService.createUser(body, options);
  return res.status(httpStatus.CREATED).send({
    results: user
  });
});