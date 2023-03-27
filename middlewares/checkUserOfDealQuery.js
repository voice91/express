import { Deal } from 'models';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const checkAccessOfDealQuery = async (req, res, next) => {
  try {
    const user = req.user._id;
    const filter = {
      $and: [
        { _id: req.params.dealId },
        {
          $or: [
            { user },
            { 'involvedUsers.advisors': user },
            { 'involvedUsers.borrowers': user },
            { 'involvedUsers.lenders': user },
          ],
        },
      ],
    };

    const deal = await Deal.findOne(filter);

    if (!deal) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You are not a part of the deal');
    }
    next();
  } catch (error) {
    res.status(httpStatus.OK).send({ message: error.message });
  }
};

module.exports = checkAccessOfDealQuery;
