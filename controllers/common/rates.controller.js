import { catchAsync } from '../../utils/catchAsync';
import { ratesService } from '../../services';

// eslint-disable-next-line import/prefer-default-export
export const rates = catchAsync(async (res, next) => {
  await ratesService.ratesList(next);
});
