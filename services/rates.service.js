import axios from 'axios';
import httpStatus from 'http-status';

// eslint-disable-next-line import/prefer-default-export
export async function ratesList(res, req, next) {
  try {
    const response = await axios.get('https://thefinancials.com/syndicated/PARALLEL/feed.json');
    return res.status(httpStatus.OK).send({ results: response.data });
  } catch (error) {
    return next(error);
  }
}
