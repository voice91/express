import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { dealService } from '../../services';
import ApiError from '../../utils/ApiError';
import { dealSummeryDto } from '../../services/dealSummary.service';
/**
 * @deprecated
 * This function is no longer in use as we are creating the OM from FE.
 */
// eslint-disable-next-line import/prefer-default-export
export const dealSummaryOM = catchAsync(async (req, res) => {
  const { dealId } = req.params;
  const filter = {
    _id: dealId,
  };
  const options = {
    populate: [
      { path: 'involvedUsers.advisors' },
      { path: 'involvedUsers.borrowers' },
      { path: 'notes' },
      { path: 'dealSummary' },
    ],
  };

  const deal = await dealService.getOne(filter, options);

  if (!deal) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No deal found with this id');
  }

  if (deal.dealSummary) {
    deal.dealSummary = dealSummeryDto(deal.dealSummary);
  }

  return res.status(httpStatus.OK).send({ results: deal });
});
