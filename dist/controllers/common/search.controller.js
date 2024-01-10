import httpStatus from 'http-status';
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";
import { dealService, lendingInstitutionService } from "../../services";

// eslint-disable-next-line import/prefer-default-export
export const getDealsAndLendersForUniversalSearch = catchAsync(async (req, res) => {
  const {
    query
  } = req;
  const user = req.user._id;
  const fields = pick(query, ['searchValue']);
  const filterForDeal = {
    $or: [{
      user
    }, {
      'involvedUsers.advisors': user
    }, {
      'involvedUsers.borrowers': user
    }, {
      'involvedUsers.lenders': user
    }],
    dealName: new RegExp(fields.searchValue, 'i')
  };
  const filterForLenders = {
    lenderNameVisible: new RegExp(fields.searchValue, 'i')
  };
  const deals = await dealService.getDealList(filterForDeal);
  const lenders = await lendingInstitutionService.getLendingInstitutionList(filterForLenders);
  return res.status(httpStatus.OK).send({
    results: {
      deals,
      lenders
    }
  });
});