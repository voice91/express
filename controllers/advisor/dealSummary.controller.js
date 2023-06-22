import httpStatus from 'http-status';
import { dealSummaryService } from '../../services';
import { catchAsync } from '../../utils/catchAsync';

// eslint-disable-next-line import/prefer-default-export
export async function create(req, res) {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const dealSummary = await dealSummaryService.createDealSummary(body);
  res.status(httpStatus.OK).send({ results: dealSummary });
}

export const get = catchAsync(async (req, res) => {
  const { dealSummaryId } = req.params;
  const filter = {
    _id: dealSummaryId,
  };
  const options = {};
  const dealSummary = await dealSummaryService.getDealSummaryById(filter, options);
  return res.status(httpStatus.OK).send({ results: dealSummary });
});
