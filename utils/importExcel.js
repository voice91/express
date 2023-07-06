import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import { logger } from '../config/logger';

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
    const propertySummary = {};
    if (PropertySummaryValue) {
      let currentCell = worksheet.getCell(PropertySummaryValue[0]);
      while (true) {
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        // eslint-disable-next-line no-shadow
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);

        const result = formatMathFormulaFormValue(value.value);
        if (key.value) {
          propertySummary[key.value] = result;
        }

        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
      }
    }

    // dealMetrics
    const dealMetricsValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Deal Metrics');
    const dealMetrics = {};
    if (dealMetricsValue) {
      let currentCell = worksheet.getCell(dealMetricsValue[0]);
      while (true) {
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        // eslint-disable-next-line no-shadow
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);
        let result = formatMathFormulaFormValue(value.value);
        if (value.numFmt) {
          if (value.numFmt.includes('$')) {
            result = `$${result}`;
          } else if (value.numFmt.includes('%')) {
            result *= 100;
            result = `${result}%`;
          }
        }
        if (key.value) {
          dealMetrics[key.value] = result;
        }

        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
      }
    }

    // financingRequest
    const financingRequestValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Financing Request');
    const financingRequest = {};
    if (financingRequestValue) {
      let currentCell = worksheet.getCell(financingRequestValue[0]);
      while (true) {
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        // eslint-disable-next-line no-shadow
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);
        let result = formatMathFormulaFormValue(value.value);
        if (value.numFmt && typeof result === 'number') {
          if (value.numFmt.includes('$')) {
            result = `$${result}`;
          } else if (value.numFmt.includes('%')) {
            result *= 100;
            result = `${result}%`;
          }
        }
        if (key.value) {
          financingRequest[key.value] = result;
        }

        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
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

        if (value.numFmt) {
          if (value.numFmt.includes('$')) {
            valueResult = `$${valueResult}`;
          } else if (value.numFmt.includes('%')) {
            valueResult *= 100;
            valueResult = `${valueResult}%`;
          }
        }

        if (key.value) {
          if (key.value !== 'Sources') {
            sourceObj.Amount = valueResult;
            sourceObj.Sources = key.value;
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

          if (value.numFmt) {
            if (value.numFmt.includes('$')) {
              valueResult = `$${valueResult}`;
            } else if (value.numFmt.includes('%')) {
              valueResult *= 100;
              valueResult = `${valueResult}%`;
            }
          }
          if (key.value) {
            if (key.value !== 'Sources') {
              usesObj.Amount = valueResult;
              usesObj.Uses = key.value;
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
        const rowData = {};
        let hasData = false;

        // Iterate through each column dynamically
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < columnHeaders.length; i++) {
          const columnValueCell = sheet.getCell(dataRow, currentCell.col + i);
          let columnValue = formatMathFormulaFormValue(columnValueCell.value);
          if (columnValueCell.numFmt) {
            if (columnValueCell.numFmt.includes('$')) {
              columnValue = `$${columnValue}`;
            } else if (columnValueCell.numFmt.includes('%')) {
              columnValue *= 100;
              columnValue = `${columnValue}%`;
            }
          }
          if (columnValue !== 'Type' && columnValue !== null) {
            rowData[columnHeaders[i]] = columnValue;
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
      const baseHeader = secondSheet.getCell(currentCell.row + 1, currentCell.col);
      const headerOne = secondSheet.getCell(currentCell.row + 1, currentCell.col + 1);
      const headerTwo = secondSheet.getCell(currentCell.row + 1, currentCell.col + 2);

      while (true) {
        // eslint-disable-next-line no-shadow
        const data = {};
        const key = secondSheet.getCell(currentCell.row + 1, currentCell.col);
        const value = secondSheet.getCell(currentCell.row + 1, currentCell.col + 1);
        let result = formatMathFormulaFormValue(value.value);
        if (value.numFmt) {
          if (value.numFmt.includes('$')) {
            result = `$${result}`;
          } else if (value.numFmt.includes('%')) {
            result *= 100;
            result = `${result}%`;
          }
        }

        if (value.value !== 'In-Place' && value.value !== 'Stabilized') {
          data[baseHeader.value] = key.value;
          data[headerOne.value] = result;
          if (headerTwo.value) {
            const valueOfSecond = secondSheet.getCell(currentCell.row + 1, currentCell.col + 2);
            data[headerTwo.value] = formatMathFormulaFormValue(valueOfSecond.value);
            if (valueOfSecond.numFmt) {
              if (valueOfSecond.numFmt.includes('$')) {
                data[headerTwo.value] = `$${data[headerTwo.value]}`;
              } else if (valueOfSecond.numFmt.includes('%')) {
                data[headerTwo.value] *= 100;
                data[headerTwo.value] = `${data[headerTwo.value]}%`;
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
      financialSummary.totalRevenue = totalRevenue;
      const startingCell = secondSheet.getCell(currentCell.row + 1, currentCell.col);

      const expensesValue = Object.entries(testSheet2).find(([, value]) => value.v === 'Expenses');
      if (expensesValue) {
        const expenses = [];
        let currentCellForExpense = secondSheet.getCell(expensesValue[0]);

        while (currentCellForExpense.address !== startingCell.address) {
          currentCellForExpense = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
        }

        const baseHeaderForExpenses = secondSheet.getCell(currentCellForExpense.row, currentCellForExpense.col);
        while (true) {
          const expenseData = {};
          const key = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
          const value = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 1);
          let result = formatMathFormulaFormValue(value.value);
          if (value.numFmt) {
            if (value.numFmt.includes('$')) {
              result = `$${result}`;
            } else if (value.numFmt.includes('%')) {
              result *= 100;
              result = `${result}%`;
            }
          }
          if (value.value !== 'In-Place' && value.value !== 'Stabilized') {
            expenseData[baseHeaderForExpenses.value] = key.value;
            expenseData[headerOne.value] = result;
            if (headerTwo.value) {
              const valueOfSecond = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 2);
              expenseData[headerTwo.value] = formatMathFormulaFormValue(valueOfSecond.value);

              if (valueOfSecond.numFmt) {
                if (valueOfSecond.numFmt.includes('$')) {
                  expenseData[headerTwo.value] = `$${expenseData[headerTwo.value]}`;
                } else if (valueOfSecond.numFmt.includes('%')) {
                  expenseData[headerTwo.value] *= 100;
                  expenseData[headerTwo.value] = `${expenseData[headerTwo.value]}%`;
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
          (revenue) => revenue[baseHeader.value] === 'Effective Gross Income'
        )['In-Place'];
        const effectiveGrossIncomeStabilized = totalRevenue.find(
          (revenue) => revenue[baseHeader.value] === 'Effective Gross Income'
        ).Stabilized;

        const effectiveGrossIncomeInPlaceValue = parseFloat(effectiveGrossIncomeInPlace.replace(/\$/g, ''));
        const effectiveGrossIncomeStabilizedValue = parseFloat(effectiveGrossIncomeStabilized.replace(/\$/g, ''));

        const totalOperatingExpensesInPlace = expenses.find(
          (expense) => expense[baseHeaderForExpenses.value] === 'Total Operating Expneses'
        )['In-Place'];

        const totalOperatingExpensesStabilized = expenses.find(
          (expense) => expense[baseHeaderForExpenses.value] === 'Total Operating Expneses'
        ).Stabilized;
        const totalOperatingExpensesInPlaceValue = parseFloat(totalOperatingExpensesInPlace.replace(/\$/g, ''));
        const totalOperatingExpensesStabilizedValue = parseFloat(totalOperatingExpensesStabilized.replace(/\$/g, ''));

        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(effectiveGrossIncomeInPlaceValue) && !isNaN(totalOperatingExpensesInPlaceValue)) {
          financialSummary.netOperatingIncome = {
            'In-Place': `$${effectiveGrossIncomeInPlaceValue - totalOperatingExpensesInPlaceValue}`,
          };
        }
        // eslint-disable-next-line no-restricted-globals
        if (!isNaN(effectiveGrossIncomeStabilizedValue) && !isNaN(totalOperatingExpensesStabilizedValue)) {
          financialSummary.netOperatingIncome = {
            ...financialSummary.netOperatingIncome,
            Stabilized: `$${effectiveGrossIncomeStabilizedValue - totalOperatingExpensesStabilizedValue}`,
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
