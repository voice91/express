import { Deal } from 'models';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const checkAccessOfDeal = async (req, res, next) => {
  const user = req.user._id;
  const filter = {
    $or: [
      { user },
      { 'involvedUsers.advisors': user },
      { 'involvedUsers.borrowers': user },
      { 'involvedUsers.lenders': user },
    ],
  };
  const deal = await Deal.findOne(filter);
  if (!deal) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'You are not a part of the deal');
  }
  next();
};

module.exports = checkAccessOfDeal;
