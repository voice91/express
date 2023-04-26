import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import { pick } from '../../utils/pick';
import { dealService } from '../../services';

// eslint-disable-next-line import/prefer-default-export
export const getDealsAndLendersForUniversalSearch = catchAsync(async (req, res) => {
  const { query } = req;
  const user = req.user._id;
  const fields = pick(query, ['dealName']);

  const filter = {
    $or: [
      { user },
      { 'involvedUsers.advisors': user },
      { 'involvedUsers.borrowers': user },
      { 'involvedUsers.lenders': user },
    ],
    dealName: new RegExp(fields.dealName, 'i'),
  };
  const deals = await dealService.getDealList(filter);
  // TODO: sending empty array as lender's flow is not clear yet, asked the client waiting for his response.
  return res.status(httpStatus.OK).send({ results: { deals, lenders: [] } });
});
