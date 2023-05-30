// import axios from 'axios';
import httpStatus from 'http-status';
import { Rates } from '../models';

const moment = require('moment');

function calculateSumAndAverageByNames(records) {
  const sumByNames = {};
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < records.length; i++) {
    const { name, current } = records[i];
    if (sumByNames[name]) {
      sumByNames[name].sum += current;
      // eslint-disable-next-line no-plusplus
      sumByNames[name].count++;
    } else {
      sumByNames[name] = { sum: current, count: 1 };
    }
  }
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
    const last24Hours = moment().subtract(24, 'hours').toDate();
    const rates = await Rates.find({ createdAt: { $gte: last24Hours } }).sort({ createdAt: -1 });

    const lastWeekDate = moment().subtract(7, 'days').toDate();
    const lastWeekRecord = await Rates.find({
      createdAt: {
        $gte: lastWeekDate,
      },
    }).sort({ createdAt: -1 });

    const lastWeek = calculateSumAndAverageByNames(lastWeekRecord);

    const lastMonthDate = moment().subtract(1, 'months').startOf('day').toDate();
    const lastMonthRecord = await Rates.find({
      createdAt: {
        $gte: lastMonthDate,
      },
    }).sort({ createdAt: -1 });

    const lastMonth = calculateSumAndAverageByNames(lastMonthRecord);

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
