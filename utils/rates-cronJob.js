import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import cron from 'node-cron';
import { Rates } from '../models';
import config from '../config/config';

// eslint-disable-next-line import/prefer-default-export
export const storeRates = async () => {
  try {
    const response = await axios.get(config.getsRatesData);
    await Rates.create(Object.values(response.data));
  } catch (error) {
    console.error('Error occurred during the cron job:', error);
  }
};

cron.schedule('0 0 * * *', () => {
  storeRates();
});
