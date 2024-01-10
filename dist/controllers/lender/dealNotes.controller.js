/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import httpStatus from 'http-status';
import { dealNotesService } from "../../services";
import { catchAsync } from "../../utils/catchAsync";
import { pick } from "../../utils/pick";
const getDealNotesFilterQuery = query => {
  const filter = pick(query, ['deal']);
  if (query.search) {
    filter.$or = [];
  }
  return filter;
};
/**
 * @deprecated
 * This function is no longer in use as in lender page we are not showing deal notes anymore.
 */
// eslint-disable-next-line import/prefer-default-export
export const paginate = catchAsync(async (req, res) => {
  const {
    query
  } = req;
  const user = req.user._id;
  const queryParams = getDealNotesFilterQuery(query);
  const sortingObj = pick(query, ['sort', 'order']);
  const sortObj = {
    [sortingObj.sort]: sortingObj.order
  };
  const filter = {
    user,
    ...queryParams
  };
  const options = {
    ...pick(query, ['limit', 'page'])
  };
  if (sortingObj.sort) {
    options.sort = sortObj;
  }
  const dealNotes = await dealNotesService.getDealNotesListWithPagination(filter, options);
  dealNotes.results = dealNotes.results.map(dealNotesObject => ({
    createdAt: dealNotesObject.createdAt,
    ...dealNotesObject.toJSON()
  }));
  return res.status(httpStatus.OK).send({
    results: dealNotes
  });
});