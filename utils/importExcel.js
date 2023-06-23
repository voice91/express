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

    // PropertyInformation
    const PropertyInformationValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Property Information');
    const propertyInformation = {};
    if (PropertyInformationValue) {
      let currentCell = worksheet.getCell(PropertyInformationValue[0]);
      while (true) {
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        // eslint-disable-next-line no-shadow
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);

        const result = formatMathFormulaFormValue(value.value);
        if (key.value) {
          propertyInformation[key.value] = result;
        }

        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
      }
    }

    // loanMetrics
    const loanMetricsValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Loan Metrics');
    const loanMetrics = {};
    if (loanMetricsValue) {
      let currentCell = worksheet.getCell(loanMetricsValue[0]);
      while (true) {
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        // eslint-disable-next-line no-shadow
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);

        const result = formatMathFormulaFormValue(value.value);
        if (key.value) {
          loanMetrics[key.value] = result;
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

        const result = formatMathFormulaFormValue(value.value);
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
        const valueResult = formatMathFormulaFormValue(value.value);
        if (key.value) {
          if (key.value !== 'Sources') {
            sourceObj.Amount = valueResult;
            sourceObj.Sources = key.value;
          }
          const secondValue = worksheet.getCell(currentCell.row + 1, currentCell.col + 2);
          const secondValueResult = formatMathFormulaFormValue(secondValue.value);
          if (key.value !== 'Sources') {
            sourceObj.percentage = secondValueResult;
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
          if (key.value) {
            const valueResult = formatMathFormulaFormValue(value.value);
            if (key.value !== 'Sources') {
              usesObj.Amount = valueResult;
              usesObj.Sources = key.value;
            }
            const secondValue = worksheet.getCell(currentCellForUses.row + 1, currentCellForUses.col + 2);
            const secondValueResult = formatMathFormulaFormValue(secondValue.value);
            if (key.value !== 'Sources') {
              usesObj.percentage = secondValueResult;
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
      while (true) {
        const objValueOfRentRollSummary = {};
        const type = sheet.getCell(currentCell.row + 1, currentCell.col);
        const typeResult = formatMathFormulaFormValue(type.value);
        if (typeResult !== 'Type') {
          objValueOfRentRollSummary.Type = typeResult;
        }
        const count = sheet.getCell(currentCell.row + 1, currentCell.col + 1);
        const countResult = formatMathFormulaFormValue(count.value);
        if (typeResult !== 'Type') {
          objValueOfRentRollSummary.unitCount = countResult;
        }
        const totalSF = sheet.getCell(currentCell.row + 1, currentCell.col + 2);
        const totalSfResult = formatMathFormulaFormValue(totalSF.value);
        if (typeResult !== 'Type') {
          objValueOfRentRollSummary.totalSF = totalSfResult;
        }
        const avgSF = sheet.getCell(currentCell.row + 1, currentCell.col + 3);
        const avgSFResult = formatMathFormulaFormValue(avgSF.value);
        if (typeResult !== 'Type') {
          objValueOfRentRollSummary.avgSF = avgSFResult;
        }
        const annualRent = sheet.getCell(currentCell.row + 1, currentCell.col + 4);
        const annualRentSFResult = formatMathFormulaFormValue(annualRent.value);
        if (typeResult !== 'Type') {
          objValueOfRentRollSummary.totalAnnualRent = annualRentSFResult;
        }
        const monthlyRent = sheet.getCell(currentCell.row + 1, currentCell.col + 5);
        const monthlyRentResult = formatMathFormulaFormValue(monthlyRent.value);
        if (typeResult !== 'Type') {
          objValueOfRentRollSummary.monthlyRent = monthlyRentResult;
        }
        const psf = sheet.getCell(currentCell.row + 1, currentCell.col + 6);
        const psfResult = formatMathFormulaFormValue(psf.value);
        if (typeResult !== 'Type') {
          objValueOfRentRollSummary.psf = psfResult;
        }
        if (typeResult !== 'Type' && typeResult !== null) {
          rentRollSummary.push(objValueOfRentRollSummary);
        }
        currentCell = sheet.getCell(currentCell.row + 1, currentCell.col);
        if (!type.value || !count.value || type.value === null || count.value === null) {
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
      const totalRevenue = {};
      while (true) {
        const key = secondSheet.getCell(currentCell.row + 1, currentCell.col);
        const value = secondSheet.getCell(currentCell.row + 1, currentCell.col + 2);
        const result = formatMathFormulaFormValue(value.value);
        if (key.value) {
          totalRevenue[key.value] = result;
        }
        currentCell = secondSheet.getCell(currentCell.row + 1, currentCell.col);

        if (!key.value || key.value === null) {
          break;
        }
      }
      financialSummary.totalRevenue = totalRevenue;

      const startingCell = secondSheet.getCell(currentCell.row + 1, currentCell.col);

      const expensesValue = Object.entries(testSheet2).find(([, value]) => value.v === 'Expenses');
      if (expensesValue) {
        const expenses = {};
        let currentCellforExpense = secondSheet.getCell(expensesValue[0]);

        while (currentCellforExpense.address !== startingCell.address) {
          currentCellforExpense = secondSheet.getCell(currentCellforExpense.row + 1, currentCellforExpense.col);
        }

        while (true) {
          const key = secondSheet.getCell(currentCellforExpense.row + 1, currentCellforExpense.col);
          const value = secondSheet.getCell(currentCellforExpense.row + 1, currentCellforExpense.col + 2);
          const result = formatMathFormulaFormValue(value.value);
          if (key.value) {
            expenses[key.value] = result;
          }
          currentCellforExpense = secondSheet.getCell(currentCellforExpense.row + 1, currentCellforExpense.col);

          if (!key.value || key.value === null) {
            break;
          }
        }
        financialSummary.expenses = expenses;
        financialSummary.netOperatingIncome = totalRevenue['Effective Gross Income'] - expenses['Total Operating Expneses'];
      }
    }
    data.propertySummary = propertySummary;
    data.propertyInformation = propertyInformation;
    data.loanMetrics = loanMetrics;
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
