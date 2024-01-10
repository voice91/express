import httpStatus from 'http-status';
import axios from 'axios';
import XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { logger } from "../config/logger";
import ApiError from "./ApiError";
import { DealSummary } from "../models";
const homedir = require('os').homedir();
const basePath = `${homedir}`;
const path = require('path');
const workbook = new ExcelJS.Workbook();

// eslint-disable-next-line import/prefer-default-export
export const updateExcelFromDealSummeryServices = async (url, dealSummary) => {
  try {
    // Download the Excel file using the pre-signed URL
    const response = await axios.get(url, {
      responseType: 'arraybuffer'
    });
    const buffer = Buffer.from(response.data, 'binary');
    const Workbook = XLSX.read(buffer, {
      type: 'buffer'
    });
    await workbook.xlsx.load(buffer);
    const worksheet = workbook.getWorksheet(Workbook.SheetNames[0]);
    const workbookSheetName = Workbook.SheetNames[0];
    const workbookSheet = Workbook.Sheets[workbookSheetName];
    const summary = await DealSummary.findById(dealSummary);
    if (!summary) {
      throw new ApiError(httpStatus.NOT_FOUND, `deal summery not found with this id ${dealSummary}`);
    }
    // PropertySummary
    const PropertySummaryValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Property Summary');
    if (PropertySummaryValue) {
      let currentCell = worksheet.getCell(PropertySummaryValue[0]);
      let i = 0;
      while (summary.propertySummary[i]) {
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        // eslint-disable-next-line no-shadow
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);
        key.value = summary.propertySummary[i].key;
        value.value = summary.propertySummary[i].value;
        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
        i += 1;
      }
    }
    // dealMetrics
    const dealMetricsValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Deal Metrics');
    if (dealMetricsValue) {
      let currentCell = worksheet.getCell(dealMetricsValue[0]);
      let i = 0;
      while (summary.dealMetrics[i]) {
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        // eslint-disable-next-line no-shadow
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);
        key.value = summary.dealMetrics[i].key;
        value.value = summary.dealMetrics[i].value;
        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
        i += 1;
      }
    }

    // financingRequest
    const financingRequestValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Financing Request');
    if (financingRequestValue) {
      let currentCell = worksheet.getCell(financingRequestValue[0]);
      let i = 0;
      while (summary.financingRequest[i]) {
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        // eslint-disable-next-line no-shadow
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);
        key.value = summary.financingRequest[i].key;
        value.value = summary.financingRequest[i].value;
        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
        i += 1;
      }
    }

    // Sources and Uses
    const sourcesUsesValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Sources and Uses');
    if (sourcesUsesValue) {
      let currentCell = worksheet.getCell(sourcesUsesValue[0]);
      let i = 0;
      while (summary.sourcesAndUses.sources[i]) {
        const key = worksheet.getCell(currentCell.row + 1, currentCell.col);
        const value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);
        if (key.value !== 'Sources') {
          if (key.value !== 'Total Sources') {
            key.value = summary.sourcesAndUses.sources[i].key;
            value.value = summary.sourcesAndUses.sources[i].value;
          }
          i += 1;
        }
        currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || !value.value || key.value === null || value.value === null) {
          break;
        }
      }
      const UsesValue = Object.entries(workbookSheet).find(([, value]) => value.v === 'Uses');
      if (UsesValue) {
        let currentCellForUses = worksheet.getCell(UsesValue[0]);
        let j = 0;
        while (summary.sourcesAndUses.uses[j]) {
          const key = worksheet.getCell(currentCellForUses.row + 1, currentCellForUses.col);
          const value = worksheet.getCell(currentCellForUses.row + 1, currentCellForUses.col + 1);
          if (key.value !== 'Total Uses') {
            key.value = summary.sourcesAndUses.uses[j].key;
            value.value = summary.sourcesAndUses.uses[j].value;
          }
          currentCellForUses = worksheet.getCell(currentCellForUses.row + 1, currentCellForUses.col);
          if (!key.value || !value.value || key.value === null || value.value === null) {
            break;
          }
          j += 1;
        }
      }
    }
    const sheet = workbook.getWorksheet(Workbook.SheetNames[1]);
    const sheetName = Workbook.SheetNames[1];
    const workbookSheet2 = Workbook.Sheets[sheetName];
    const rentRollSummaryValue = Object.entries(workbookSheet2).find(([, value]) => value.v === 'Rent Roll Summary');
    if (rentRollSummaryValue) {
      let currentCell = sheet.getCell(rentRollSummaryValue[0]);
      const columnHeaders = [];
      const columnHeaderRow = currentCell.row + 1;
      let j = 0;
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
      while (summary.rentRollSummary.length) {
        // Iterate through each column dynamically
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < columnHeaders.length; i++) {
          const getValueToUpdate = summary.rentRollSummary[j].find(item => item.key === columnHeaders[i]);
          const columnValueCell = sheet.getCell(dataRow, currentCell.col + i);
          if (columnValueCell.value !== 'Type' && columnValueCell.value !== null && getValueToUpdate) {
            columnValueCell.value = getValueToUpdate.value;
          }
        }
        // eslint-disable-next-line no-plusplus
        dataRow++;
        const checkEmptyCell = sheet.getCell(dataRow, currentCell.col);

        // Break the loop if the row is empty
        if (!checkEmptyCell.value) {
          break;
        }
        j += 1;
      }
    }
    const secondSheet = workbook.getWorksheet(Workbook.SheetNames[2]);
    const secondSheetName = Workbook.SheetNames[2];
    const testSheet2 = Workbook.Sheets[secondSheetName];
    const financialSummaryValue = Object.entries(testSheet2).find(([, value]) => value.v === 'Financial Summary');
    const financialSummary = {};
    if (financialSummaryValue) {
      let currentCell = secondSheet.getCell(financialSummaryValue[0]);
      const headerOne = secondSheet.getCell(currentCell.row + 1, currentCell.col + 1);
      const headerTwo = secondSheet.getCell(currentCell.row + 1, currentCell.col + 2);
      let i = 0;
      while (true) {
        // eslint-disable-next-line no-shadow
        const key = secondSheet.getCell(currentCell.row + 1, currentCell.col);
        const value = secondSheet.getCell(currentCell.row + 1, currentCell.col + 1);
        const getValueToUpdate = summary.financialSummary.revenue.find(item => item.key === key.value);
        if (key.value && getValueToUpdate) {
          if (value.value !== 'In-Place' && value.value !== 'Stabilized') {
            key.value = getValueToUpdate.key;
            if (headerOne.value === 'In-Place') {
              value.value = getValueToUpdate.inPlaceValue;
            } else if (headerOne.value === 'Stabilized') {
              value.value = getValueToUpdate.stabilizedValue;
            }
            if (headerTwo.value && headerTwo.value === 'Stabilized') {
              const valueOfSecond = secondSheet.getCell(currentCell.row + 1, currentCell.col + 2);
              valueOfSecond.value = getValueToUpdate.stabilizedValue;
            } else if (headerTwo.value && headerTwo.value === 'In-Place') {
              const valueOfSecond = secondSheet.getCell(currentCell.row + 1, currentCell.col + 2);
              valueOfSecond.value = getValueToUpdate.inPlaceValue;
            }
          }
        }
        currentCell = secondSheet.getCell(currentCell.row + 1, currentCell.col);
        if (!key.value || key.value === null) {
          break;
        }
        // eslint-disable-next-line no-unused-vars
        i += 1;
      }
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
          const getValueToUpdate = summary.financialSummary.expenses.find(item => item.key === key.value);
          if (key.value && getValueToUpdate) {
            if (value.value !== 'In-Place' && value.value !== 'Stabilized') {
              expenseData.expenseName = key.value;
              if (headerOne.value === 'In-Place') {
                value.value = getValueToUpdate.inPlaceValue;
              } else if (headerOne.value === 'Stabilized') {
                value.value = getValueToUpdate.stabilizedValue;
              }
              if (headerTwo.value && headerTwo.value === 'Stabilized') {
                const valueOfSecond = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 2);
                valueOfSecond.value = getValueToUpdate.stabilizedValue;
              } else if (headerTwo.value && headerTwo.value === 'In-Place') {
                const valueOfSecond = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 2);
                valueOfSecond.value = getValueToUpdate.inPlaceValue;
              }
            }
            currentCellForExpense = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
          }
          if (!key.value || key.value === null) {
            break;
          }
          if (Object.keys(expenseData).length) {
            expenses.push(expenseData);
          }
        }
        financialSummary.expenses = expenses;
      }
    }

    // summary._id
    const fileName = `${summary._id}-LenderData.xlsx`;
    const filePath = path.join(basePath, fileName);
    await workbook.xlsx.writeFile(filePath);
    const outPath = `${filePath}`;
    return outPath;
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to write XLSheet');
  }
};