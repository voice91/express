import axios from 'axios';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';

// eslint-disable-next-line import/prefer-default-export
export const rates = catchAsync(async (req, res) => {
  try {
    const response = await axios.get('https://thefinancials.com/syndicated/PARALLEL/feed.json');
    return res.status(httpStatus.OK).send({ results: response.data });
  } catch (error) {
    res.status(500).send('An error occurred while fetching data.');
  }
});
