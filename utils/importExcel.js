import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import { logger } from '../config/logger';
import { EnumOfTypeOfValue } from '../models/enum.model';
import { validateLoanAmount } from './common';

const axios = require('axios');
const ExcelJS = require('exceljs');
const XLSX = require('xlsx');
// eslint-disable-next-line import/no-extraneous-dependencies
const math = require('mathjs');

const workbook = new ExcelJS.Workbook();

function formatMathFormulaFormValue({ val, key, tableName }) {
  if (val && typeof val === 'object') {
    if (val.formula) {
      if (val.result && val.result.error) {
        throw new Error(`Error in dataSheet in table "${tableName}" in key "${key}" : ${val.result.error}`);
      }
      const expression = val.formula.replace(val.formula, val.result);
      return math.evaluate(expression);
    }
    if (val.sharedFormula) {
      const expression = val.sharedFormula.replace(val.sharedFormula, val.result);
      return math.evaluate(expression);
    }
    const expression = val.formula.replace(val.result);
    return math.evaluate(expression);
  }
  return val;
}

function typeOfValue(val, valueFromExcel) {
  if (typeof val === 'number') {
    if (valueFromExcel.includes('$')) {
      return EnumOfTypeOfValue.CURRENCY;
    }
    if (valueFromExcel.includes('%')) {
      return EnumOfTypeOfValue.PERCENTAGE;
    }
    return EnumOfTypeOfValue.NUMBER;
  }
  if (typeof val === 'string') {
    return EnumOfTypeOfValue.STRING;
  }
}

// eslint-disable-next-line import/prefer-default-export
export const importExcelFile = async (url) => {
  try {
    const data = {};
    // Download the Excel file using the pre-signed URL
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    const Workbook = XLSX.read(buffer, { type: 'buffer' });

    await workbook.xlsx.load(buffer);
    const propertySummary = [];
    const dealMetrics = [];
    const financingRequest = [];
    const sourcesAndUses = {};
    const rentRollSummary = [];
    const financialSummary = {};

    workbook.eachSheet((excelSheetData) => {
      if (excelSheetData.name === 'Summary') {
        const summaryData = Workbook.Sheets[excelSheetData.name];

        // PropertySummary
        const PropertySummaryValue = Object.entries(summaryData).find(([, value]) => value.v === 'Property Summary');
        if (PropertySummaryValue) {
          let currentCell = excelSheetData.getCell(PropertySummaryValue[0]);
          while (true) {
            const property = {};
            const key = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
            // eslint-disable-next-line no-shadow
            const value = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);
            const result = formatMathFormulaFormValue({ val: value.value, key: key.value, tableName: 'Property Summary' });
            if (result) {
              property.type = typeOfValue(result, '');
            }
            if (key.value) {
              property.key = key.value;
              property.value = result;
            }

            currentCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
            if (!key.value || !value.value || key.value === null || value.value === null) {
              break;
            }
            propertySummary.push(property);
          }
        }

        // dealMetrics
        const dealMetricsValue = Object.entries(summaryData).find(([, value]) => value.v === 'Deal Metrics');
        if (dealMetricsValue) {
          let currentCell = excelSheetData.getCell(dealMetricsValue[0]);
          while (true) {
            const metrics = {};
            const key = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
            // eslint-disable-next-line no-shadow
            const value = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);
            let result = formatMathFormulaFormValue({ val: value.value, key: key.value, tableName: 'Deal Metrics' });
            if (result) {
              metrics.type = typeOfValue(result, value.numFmt);
            }
            if (value.numFmt) {
              if (value.numFmt.includes('%')) {
                result *= 100;
              }
            }
            if (key.value) {
              metrics.key = key.value;
              metrics.value = result;
            }

            currentCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
            if (!key.value || !value.value || key.value === null || value.value === null) {
              break;
            }
            dealMetrics.push(metrics);
          }
        }

        // financingRequest
        const financingRequestValue = Object.entries(summaryData).find(([, value]) => value.v === 'Financing Request');
        if (financingRequestValue) {
          let currentCell = excelSheetData.getCell(financingRequestValue[0]);
          while (true) {
            const financeRequest = {};
            const key = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
            // eslint-disable-next-line no-shadow
            const value = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);
            let result = formatMathFormulaFormValue({ val: value.value, key: key.value, tableName: 'Financing Request' });
            if (result) {
              financeRequest.type = typeOfValue(result, value.numFmt);
            }
            if (value.numFmt) {
              if (typeof result === 'number' && value.numFmt.includes('%')) {
                result *= 100;
              }
            }
            if (key.value) {
              financeRequest.key = key.value;
              financeRequest.value = result;
            }

            currentCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
            if (!key.value || !value.value || key.value === null || value.value === null) {
              break;
            }
            financingRequest.push(financeRequest);
          }
        }

        // Sources and Uses
        const sourcesUsesValue = Object.entries(summaryData).find(([, value]) => value.v === 'Sources and Uses');
        const sources = [];
        const uses = [];
        if (sourcesUsesValue) {
          let currentCell = excelSheetData.getCell(sourcesUsesValue[0]);
          while (true) {
            const sourceObj = {};
            const key = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
            const value = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);
            let valueResult = formatMathFormulaFormValue({
              val: value.value,
              key: key.value,
              tableName: 'Sources and Uses',
            });

            if (key.value) {
              if (key.value !== 'Sources') {
                sourceObj.key = key.value;
                sourceObj.value = valueResult;
                if (valueResult) {
                  sourceObj.type = typeOfValue(valueResult, value.numFmt);
                }
                if (value.numFmt) {
                  if (value.numFmt.includes('%')) {
                    valueResult *= 100;
                  }
                }
              }
            }

            if (Object.keys(sourceObj).length) {
              sources.push(sourceObj);
            }

            currentCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
            if (!key.value || !value.value || key.value === null || value.value === null) {
              break;
            }
          }

          sourcesAndUses.sources = sources;

          const UsesValue = Object.entries(summaryData).find(([, value]) => value.v === 'Uses');

          if (UsesValue) {
            let currentCellForUses = excelSheetData.getCell(UsesValue[0]);
            while (true) {
              const usesObj = {};
              const key = excelSheetData.getCell(currentCellForUses.row + 1, currentCellForUses.col);

              const value = excelSheetData.getCell(currentCellForUses.row + 1, currentCellForUses.col + 1);
              let valueResult = formatMathFormulaFormValue({ val: value.value, key: key.value, tableName: 'Uses' });

              if (valueResult) {
                usesObj.type = typeOfValue(valueResult, value.numFmt);
              }
              if (value.numFmt) {
                if (value.numFmt.includes('%')) {
                  valueResult *= 100;
                }
              }
              if (key.value) {
                if (key.value !== 'Sources') {
                  usesObj.key = key.value;
                  usesObj.value = valueResult;
                }
              }

              if (Object.keys(usesObj).length) {
                uses.push(usesObj);
              }

              currentCellForUses = excelSheetData.getCell(currentCellForUses.row + 1, currentCellForUses.col);
              if (!key.value || !value.value || key.value === null || value.value === null) {
                break;
              }
            }
            sourcesAndUses.uses = uses;
          }
        }
      } else if (excelSheetData.name === 'NOI') {
        const noIData = Workbook.Sheets[excelSheetData.name];
        const financialSummaryValue = Object.entries(noIData).find(([, value]) => value.v === 'Financial Summary');
        if (financialSummaryValue) {
          let currentCell = excelSheetData.getCell(financialSummaryValue[0]);
          const totalRevenue = [];
          const headerOne = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);
          const headerTwo = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 2);

          if (!headerOne.value) {
            headerOne.value = 'In-Place';
          }

          while (true) {
            // eslint-disable-next-line no-shadow
            const data = {};
            const key = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
            const value = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);
            let result = formatMathFormulaFormValue({ val: value.value, key: key.value, tableName: 'Financial Summary' });

            if (value.value !== 'In-Place' && value.value !== 'Stabilized') {
              data.key = key.value;
              if (headerOne.value === 'In-Place') {
                if (result) {
                  data.inPlaceType = typeOfValue(result, value.numFmt);
                }
                if (value.numFmt) {
                  if (value.numFmt.includes('%')) {
                    result *= 100;
                  }
                }
                data.inPlaceValue = result;
              } else if (headerOne.value === 'Stabilized') {
                if (result) {
                  data.stabilizedType = typeOfValue(result, value.numFmt);
                }
                if (value.numFmt) {
                  if (value.numFmt.includes('%')) {
                    result *= 100;
                  }
                }
                data.stabilizedValue = result;
              }
              if (headerTwo.value && headerTwo.value === 'Stabilized') {
                const valueOfSecond = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 2);
                data.stabilizedValue = formatMathFormulaFormValue(valueOfSecond.value);
                if (valueOfSecond.numFmt) {
                  if (data.stabilizedValue) {
                    data.stabilizedType = typeOfValue(data.stabilizedValue, valueOfSecond.numFmt);
                  }
                  if (valueOfSecond.numFmt.includes('%')) {
                    data.stabilizedValue *= 100;
                  }
                }
              } else if (headerTwo.value && headerTwo.value === 'In-Place') {
                const valueOfSecond = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 2);
                data.inPlaceValue = formatMathFormulaFormValue(valueOfSecond.value);
                if (valueOfSecond.numFmt) {
                  if (data.inPlaceValue) {
                    data.inPlaceType = typeOfValue(data.inPlaceValue, valueOfSecond.numFmt);
                  }
                  if (valueOfSecond.numFmt.includes('%')) {
                    data.inPlaceValue *= 100;
                  }
                }
              }
            }
            currentCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);

            if (!key.value || key.value === null) {
              break;
            }
            if (Object.keys(data).length) {
              totalRevenue.push(data);
            }
          }
          financialSummary.revenue = totalRevenue;
          const startingCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);

          const expensesValue = Object.entries(noIData).find(([, value]) => value.v === 'Expenses');
          if (expensesValue) {
            const expenses = [];
            let currentCellForExpense = excelSheetData.getCell(expensesValue[0]);

            while (currentCellForExpense.address !== startingCell.address) {
              currentCellForExpense = excelSheetData.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
            }

            while (true) {
              const expenseData = {};
              const key = excelSheetData.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
              const value = excelSheetData.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 1);
              let result = formatMathFormulaFormValue({ val: value.value, key: key.value, tableName: 'Expenses' });

              if (value.value !== 'In-Place' && value.value !== 'Stabilized') {
                expenseData.key = key.value;
                if (headerOne.value === 'In-Place') {
                  if (result) {
                    expenseData.inPlaceType = typeOfValue(result, value.numFmt);
                  }
                  if (value.numFmt) {
                    if (value.numFmt.includes('%')) {
                      result *= 100;
                    }
                  }
                  expenseData.inPlaceValue = result;
                } else if (headerOne.value === 'Stabilized') {
                  if (result) {
                    expenseData.stabilizedType = typeOfValue(result, value.numFmt);
                  }
                  if (value.numFmt) {
                    if (value.numFmt.includes('%')) {
                      result *= 100;
                    }
                  }
                  expenseData.stabilizedValue = result;
                }
                if (headerTwo.value && headerTwo.value === 'Stabilized') {
                  const valueOfSecond = excelSheetData.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 2);
                  expenseData.stabilizedValue = formatMathFormulaFormValue({
                    val: valueOfSecond.value,
                    key: key.value,
                    tableName: 'Stabilized',
                  });

                  if (valueOfSecond.numFmt) {
                    if (expenseData.stabilizedValue) {
                      expenseData.stabilizedType = typeOfValue(expenseData.stabilizedValue, valueOfSecond.numFmt);
                    }
                    if (valueOfSecond.numFmt.includes('%')) {
                      expenseData.stabilizedValue *= 100;
                    }
                  }
                } else if (headerTwo.value && headerTwo.value === 'In-Place') {
                  const valueOfSecond = excelSheetData.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 2);
                  expenseData.inPlaceValue = formatMathFormulaFormValue({
                    val: valueOfSecond.value,
                    key: key.value,
                    tableName: 'In-Place',
                  });
                  if (valueOfSecond.numFmt) {
                    if (expenseData.inPlaceValue) {
                      expenseData.inPlaceType = typeOfValue(expenseData.inPlaceValue, valueOfSecond.numFmt);
                    }
                    if (valueOfSecond.numFmt.includes('%')) {
                      expenseData.inPlaceValue *= 100;
                    }
                  }
                }
              }
              currentCellForExpense = excelSheetData.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);

              if (!key.value || key.value === null) {
                break;
              }
              if (Object.keys(expenseData).length) {
                expenses.push(expenseData);
              }
            }
            financialSummary.expenses = expenses;
            const effectiveGrossIncomeInPlace = totalRevenue.find(
              (revenue) => revenue.key === 'Effective Gross Income'
            ).inPlaceValue;
            const effectiveGrossIncomeStabilized = totalRevenue.find(
              (revenue) => revenue.key === 'Effective Gross Income'
            ).stabilizedValue;

            const totalOperatingExpensesInPlace = expenses.find(
              (expense) => expense.key === 'Total Operating Expneses'
            ).inPlaceValue;

            const totalOperatingExpensesStabilized = expenses.find(
              (expense) => expense.key === 'Total Operating Expneses'
            ).stabilizedValue;

            // eslint-disable-next-line no-restricted-globals
            if (!isNaN(effectiveGrossIncomeInPlace) && !isNaN(totalOperatingExpensesInPlace)) {
              financialSummary.netOperatingIncome = {
                inPlaceValue: `$${effectiveGrossIncomeInPlace - totalOperatingExpensesInPlace}`,
              };
            }
            // eslint-disable-next-line no-restricted-globals
            if (!isNaN(effectiveGrossIncomeStabilized) && !isNaN(totalOperatingExpensesStabilized)) {
              financialSummary.netOperatingIncome = {
                ...financialSummary.netOperatingIncome,
                stabilizedValue: `$${effectiveGrossIncomeStabilized - totalOperatingExpensesStabilized}`,
              };
            }
          }
        }
      } else if (excelSheetData.name === 'Rent Roll') {
        const rentRollSheetData = Workbook.Sheets[excelSheetData.name];

        const rentRollSummaryValue = Object.entries(rentRollSheetData).find(([, value]) => value.v === 'Rent Roll Summary');
        if (rentRollSummaryValue) {
          let currentCell = excelSheetData.getCell(rentRollSummaryValue[0]);
          const columnHeaders = [];
          const columnHeaderRow = currentCell.row + 1;

          // Retrieve column headers dynamically
          while (true) {
            const columnHeaderCell = excelSheetData.getCell(columnHeaderRow, currentCell.col);
            if (!columnHeaderCell.value) break;
            columnHeaders.push(columnHeaderCell.value);
            currentCell = excelSheetData.getCell(currentCell.row, currentCell.col + 1);
          }

          currentCell = excelSheetData.getCell(rentRollSummaryValue[0]);
          let dataRow = columnHeaderRow + 1;

          // Process data rows dynamically
          while (true) {
            const rowData = [];
            let hasData = false;

            // Iterate through each column dynamically
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < columnHeaders.length; i++) {
              const rentRollData = {};
              const columnValueCell = excelSheetData.getCell(dataRow, currentCell.col + i);
              let columnValue = formatMathFormulaFormValue({
                val: columnValueCell.value,
                key: 'Rent Roll',
                tableName: 'Rent Roll',
              });
              if (columnValue !== 'Type' && columnValue !== null) {
                rowData[columnHeaders[i]] = columnValue;
                rentRollData.key = columnHeaders[i];
                rentRollData.value = columnValue;
                if (columnValue) {
                  rentRollData.type = typeOfValue(columnValue, columnValueCell.numFmt ? columnValueCell.numFmt : '');
                }
                if (columnValueCell.numFmt) {
                  if (columnValueCell.numFmt.includes('%')) {
                    columnValue *= 100;
                  }
                }
                rowData.push(rentRollData);
                hasData = true;
              }
            }

            if (hasData) {
              rentRollSummary.push(rowData);
            }
            // eslint-disable-next-line no-plusplus
            dataRow++;
            const checkEmptyCell = excelSheetData.getCell(dataRow, currentCell.col);

            // Break the loop if the row is empty
            if (!checkEmptyCell.value) {
              break;
            }
          }
        }
      }
    });

    data.propertySummary = propertySummary;
    data.dealMetrics = dealMetrics;
    data.financingRequest = financingRequest;
    data.sourcesAndUses = sourcesAndUses;
    data.rentRollSummary = rentRollSummary;
    data.financialSummary = financialSummary;
    // checks for the amount of Loan for sources ,
    validateLoanAmount(data);
    return data;
  } catch (error) {
    logger.error(error.message);
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to read XLSheet: ${error.message}`);
  }
};
