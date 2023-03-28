import { Deal } from 'models';
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';

const checkAccessOfDeal = async (req, res, next) => {
  try {
    const user = req.user._id;

    const dealId = req.body.deal || req.params.dealId;
    const filter = {
      $and: [
        { _id: dealId },
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

module.exports = checkAccessOfDeal;
