// import axios from 'axios';
import httpStatus from 'http-status';
import { Rates } from '../models';

const moment = require('moment');

function calculateSumAndAverageByNames(records) {
  const sumByNames = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < records.length; i++) {
    const { name, current } = records[i];
    // If the name already exists in the sumByNames object, update the sum and count
    if (sumByNames[name]) {
      sumByNames[name].sum += current;
      // eslint-disable-next-line no-plusplus
      sumByNames[name].count++;
    } else {
      // If the name doesn't exist, initialize it with the current value and count of 1
      sumByNames[name] = { sum: current, count: 1 };
    }
  }
  // Calculate average for each name
  const averageByNames = {};
  // eslint-disable-next-line guard-for-in,no-restricted-syntax
  for (const name in sumByNames) {
    const { sum, count } = sumByNames[name];
    const average = sum / count;
    averageByNames[name] = average;
  }
  return averageByNames;
}
// eslint-disable-next-line import/prefer-default-export
export async function ratesList(res, req, next) {
  try {
    // Calculate the date for the last 24 hours
    const last24Hours = moment().subtract(24, 'hours').toDate();
    // Find rates from the last 24 hours and sort them in descending order by createdAt
    const rates = await Rates.find({ createdAt: { $gte: last24Hours } }).sort({ createdAt: -1 });

    // Calculate the date for the last week
    const lastWeekDate = moment().subtract(7, 'days').toDate();
    // Find rates from the last week and sort them in descending order by createdAt
    const lastWeekRecord = await Rates.find({
      createdAt: {
        $gte: lastWeekDate,
      },
    }).sort({ createdAt: -1 });

    // Calculate the sum and average for each name in the last week
    const lastWeek = calculateSumAndAverageByNames(lastWeekRecord);

    // Calculate the date for the last month
    const lastMonthDate = moment().subtract(1, 'months').startOf('day').toDate();
    // Find rates from the last month and sort them in descending order by createdAt
    const lastMonthRecord = await Rates.find({
      createdAt: {
        $gte: lastMonthDate,
      },
    }).sort({ createdAt: -1 });

    // Calculate the sum and average for each name in the last month
    const lastMonth = calculateSumAndAverageByNames(lastMonthRecord);

    // Combine rates with lastMonth and lastWeek data
    const filalResult = rates.map((item) => {
      return {
        ...item._doc,
        lastMonth: lastMonth[item.name],
        lastWeek: lastWeek[item.name],
      };
    });

    return res.status(httpStatus.OK).send({ results: filalResult });
  } catch (error) {
    return next(error);
  }
}
