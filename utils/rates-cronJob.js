import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import cron from 'node-cron';
import { Rates } from '../models';

// eslint-disable-next-line import/prefer-default-export
export const storeRates = async () => {
  try {
    const response = await axios.get('https://thefinancials.com/syndicated/PARALLEL/feed.json');
    await Rates.create(Object.values(response.data));
  } catch (error) {
    console.error('Error occurred during the cron job:', error);
  }
};

cron.schedule('0 0 * * *', () => {
  storeRates();
});
