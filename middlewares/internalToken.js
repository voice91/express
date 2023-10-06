import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import config from '../config/config';

const { internalToken } = config;

const validateInternalToken = (req, res, next) => {
  const token = req.headers.internaltoken;

  if (!token || token !== internalToken) {
    return next(new ApiError(httpStatus.UNAUTHORIZED, 'Please Authenticate'));
  }
  next();
};

export default validateInternalToken;
