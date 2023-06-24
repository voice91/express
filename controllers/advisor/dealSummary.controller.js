import httpStatus from 'http-status';
import { dealSummaryService } from '../../services';
import { catchAsync } from '../../utils/catchAsync';

// eslint-disable-next-line import/prefer-default-export
export const create = catchAsync(async (req, res) => {
  const { body } = req;
  body.createdBy = req.user._id;
  body.updatedBy = req.user._id;
  const dealSummary = await dealSummaryService.createDealSummary(body);
  res.status(httpStatus.OK).send({ results: dealSummary });
});

export const get = catchAsync(async (req, res) => {
  const { dealSummaryId } = req.params;
  const filter = {
    _id: dealSummaryId,
  };
  const options = {};
  const dealSummary = await dealSummaryService.getDealSummaryById(filter, options);
  return res.status(httpStatus.OK).send({ results: dealSummary });
});

export const update = catchAsync(async (req, res) => {
  const { body } = req;
  body.updatedBy = req.user;
  const { dealSummaryId } = req.params;
  const filter = {
    _id: dealSummaryId,
  };
  const options = { new: true };
  const dealSummary = await dealSummaryService.updateDealSummary(filter, body, options);
  return res.status(httpStatus.OK).send({ results: dealSummary });
});
