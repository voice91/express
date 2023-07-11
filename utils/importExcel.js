import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import { logger } from '../config/logger';
import { EnumOfTypeOfValue } from '../models/enum.model';

const axios = require('axios');
const ExcelJS = require('exceljs');
const XLSX = require('xlsx');
// eslint-disable-next-line import/no-extraneous-dependencies
const math = require('mathjs');

const workbook = new ExcelJS.Workbook();

function formatMathFormulaFormValue(val) {
  if (val && typeof val === 'object') {
    if (val.formula) {
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
    const worksheet = workbook.getWorksheet(Workbook.SheetNames[0]);
    const workbookSheetName = Workbook.SheetNames[0];
    const workbookSheet = Workbook.Sheets[workbookSheetName];

    // PropertySummary
    const PropertySummaryValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Property Summary');
    const propertySummary = [];
    if (PropertySummaryValue) {
      let currentCell = worksheet.getCell(PropertySummaryValue[0]);
      while (true) {
        const property = {};
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        // eslint-disable-next-line no-shadow
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);
        const result = formatMathFormulaFormValue(value.value);
        if (result) {
          property.type = typeOfValue(result, '');
        }
        if (key.value) {
          property.key = key.value;
          property.value = result;
        }

        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
        propertySummary.push(property);
      }
    }
    // dealMetrics
    const dealMetricsValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Deal Metrics');
    const dealMetrics = [];
    if (dealMetricsValue) {
      let currentCell = worksheet.getCell(dealMetricsValue[0]);
      while (true) {
        const metrics = {};
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        // eslint-disable-next-line no-shadow
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);
        let result = formatMathFormulaFormValue(value.value);
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

        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
        dealMetrics.push(metrics);
      }
    }

    // financingRequest
    const financingRequestValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Financing Request');
    const financingRequest = [];
    if (financingRequestValue) {
      let currentCell = worksheet.getCell(financingRequestValue[0]);
      while (true) {
        const financeRequest = {};
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        // eslint-disable-next-line no-shadow
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);
        let result = formatMathFormulaFormValue(value.value);
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

        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
        financingRequest.push(financeRequest);
      }
    }

    // Sources and Uses
    const sourcesUsesValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Sources and Uses');
    const sourcesAndUses = {};
    const sources = [];
    const uses = [];
    if (sourcesUsesValue) {
      let currentCell = worksheet.getCell(sourcesUsesValue[0]);
      while (true) {
        const sourceObj = {};
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);
        let valueResult = formatMathFormulaFormValue(value.value);

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

        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
      }

      sourcesAndUses.sources = sources;

      const UsesValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Uses');

      if (UsesValue) {
        let currentCellForUses = worksheet.getCell(UsesValue[0]);
        while (true) {
          const usesObj = {};
          const key = worksheet.getCell(currentCellForUses.row + 1, currentCellForUses.col);

          const value = worksheet.getCell(currentCellForUses.row + 1, currentCellForUses.col + 1);
          let valueResult = formatMathFormulaFormValue(value.value);

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

          currentCellForUses = worksheet.getCell(currentCellForUses.row + 1, currentCellForUses.col);
          if (!key.value || !value.value || key.value === null || value.value === null) {
            break;
          }
        }
        sourcesAndUses.uses = uses;
      }
    }

    const sheet = workbook.getWorksheet(Workbook.SheetNames[1]);
    const sheetName = Workbook.SheetNames[1];
    const workbookSheet2 = Workbook.Sheets[sheetName];

    const rentRollSummaryValue = Object.entries(workbookSheet2).find(([, value]) => value.v === 'Rent Roll Summary');
    const rentRollSummary = [];
    if (rentRollSummaryValue) {
      let currentCell = sheet.getCell(rentRollSummaryValue[0]);
      const columnHeaders = [];
      const columnHeaderRow = currentCell.row + 1;

      // Retrieve column headers dynamically
      while (true) {
        const columnHeaderCell = sheet.getCell(columnHeaderRow, currentCell.col);
        if (!columnHeaderCell.value) break;
        columnHeaders.push(columnHeaderCell.value);
        currentCell = sheet.getCell(currentCell.row, currentCell.col + 1);
      }

      currentCell = sheet.getCell(rentRollSummaryValue[0]);
      let dataRow = columnHeaderRow + 1;

      // Process data rows dynamically
      while (true) {
        const rowData = [];
        let hasData = false;

        // Iterate through each column dynamically
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < columnHeaders.length; i++) {
          const rentRollData = {};
          const columnValueCell = sheet.getCell(dataRow, currentCell.col + i);
          let columnValue = formatMathFormulaFormValue(columnValueCell.value);
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
        const checkEmptyCell = sheet.getCell(dataRow, currentCell.col);

        // Break the loop if the row is empty
        if (!checkEmptyCell.value) {
          break;
        }
      }
    }

    const secondSheet = workbook.getWorksheet(Workbook.SheetNames[2]);
    const secondSheetName = Workbook.SheetNames[2];
    const testSheet2 = Workbook.Sheets[secondSheetName];

    const financialSummaryValue = Object.entries(testSheet2).find(([, value]) => value.v === 'Financial Summary');
    const financialSummary = {};
    if (financialSummaryValue) {
      let currentCell = secondSheet.getCell(financialSummaryValue[0]);
      const totalRevenue = [];
      const headerOne = secondSheet.getCell(currentCell.row + 1, currentCell.col + 1);
      const headerTwo = secondSheet.getCell(currentCell.row + 1, currentCell.col + 2);

      while (true) {
        // eslint-disable-next-line no-shadow
        const data = {};
        const key = secondSheet.getCell(currentCell.row + 1, currentCell.col);
        const value = secondSheet.getCell(currentCell.row + 1, currentCell.col + 1);
        let result = formatMathFormulaFormValue(value.value);

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
            const valueOfSecond = secondSheet.getCell(currentCell.row + 1, currentCell.col + 2);
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
            const valueOfSecond = secondSheet.getCell(currentCell.row + 1, currentCell.col + 2);
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
        currentCell = secondSheet.getCell(currentCell.row + 1, currentCell.col);

        if (!key.value || key.value === null) {
          break;
        }
        if (Object.keys(data).length) {
          totalRevenue.push(data);
        }
      }
      financialSummary.revenue = totalRevenue;
      const startingCell = secondSheet.getCell(currentCell.row + 1, currentCell.col);

      const expensesValue = Object.entries(testSheet2).find(([, value]) => value.v === 'Expenses');
      if (expensesValue) {
        const expenses = [];
        let currentCellForExpense = secondSheet.getCell(expensesValue[0]);

        while (currentCellForExpense.address !== startingCell.address) {
          currentCellForExpense = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
        }

        while (true) {
          const expenseData = {};
          const key = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
          const value = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 1);
          let result = formatMathFormulaFormValue(value.value);

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
                data.stabilizedType = typeOfValue(result, value.numFmt);
              }
              if (value.numFmt) {
                if (value.numFmt.includes('%')) {
                  result *= 100;
                }
              }
              expenseData.stabilizedValue = result;
            }
            if (headerTwo.value && headerTwo.value === 'Stabilized') {
              const valueOfSecond = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 2);
              expenseData.stabilizedValue = formatMathFormulaFormValue(valueOfSecond.value);

              if (valueOfSecond.numFmt) {
                if (expenseData.stabilizedValue) {
                  expenseData.stabilizedType = typeOfValue(expenseData.stabilizedValue, valueOfSecond.numFmt);
                }
                if (valueOfSecond.numFmt.includes('%')) {
                  expenseData.stabilizedValue *= 100;
                }
              }
            } else if (headerTwo.value && headerTwo.value === 'In-Place') {
              const valueOfSecond = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 2);
              expenseData.inPlaceValue = formatMathFormulaFormValue(valueOfSecond.value);
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
          currentCellForExpense = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);

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
    data.propertySummary = propertySummary;
    data.dealMetrics = dealMetrics;
    data.financingRequest = financingRequest;
    data.sourcesAndUses = sourcesAndUses;
    data.rentRollSummary = rentRollSummary;
    data.financialSummary = financialSummary;
    return data;
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to read XLSheet');
  }
};
