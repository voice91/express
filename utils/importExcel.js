import httpStatus from 'http-status';
import ApiError from 'utils/ApiError';
import { logger } from '../config/logger';
import {
  EnumColumnNameOfFinancialSummary,
  EnumOfTypeOfValue,
  EnumSheetNameOfUw,
  EnumTableNameInUwSheet,
} from '../models/enum.model';
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
      // if result of val is string type then no need to evaluate using math.evaluate
      if (typeof val.result === 'string') {
        return val.result;
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

/**
 * This function determines the type of a given value based on its characteristics and context.
 *
 * @param {any} val - The value to be analyzed.
 * @param {string} valueFromExcel - A string from Excel used to help identify the value type.
 * @param {string} key - Name of field in the excel.
 * @returns {string} - A string representing the determined type of the value.
 */
function typeOfValue(val, valueFromExcel, key = '') {
  if (typeof val === 'number') {
    if (valueFromExcel.includes('$')) {
      return EnumOfTypeOfValue.CURRENCY;
    }
    if (valueFromExcel.includes('%')) {
      return EnumOfTypeOfValue.PERCENTAGE;
    }
    // Year type has been implemented, ensuring that values categorized as such will not have comma separators added to them.
    if (key.includes('Year')) {
      return EnumOfTypeOfValue.YEAR;
    }
    return EnumOfTypeOfValue.NUMBER;
  }
  if (typeof val === 'string') {
    return EnumOfTypeOfValue.STRING;
  }
}

/**
 * Retrieves and formats values from an Excel sheet for a specified table.
 * @param {Object} params - Input parameters.
 * @param {Object} params.excelSheetData - Excel sheet data object.
 * @param {Object} params.currentCell - Current cell in the Excel sheet.
 * @param {string} params.tableName - Name of the table being processed.
 * @return {Array} resultArray - Array of retrieved and formatted data.
 */
function retrieveAndFormatTableValues({ excelSheetData, currentCell, tableName }) {
  const resultArray = [];
  while (true) {
    const data = {};
    const key = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
    const value = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);

    let result = formatMathFormulaFormValue({ val: value.value, key: key.value, tableName });

    if (result) {
      data.type = typeOfValue(result, value.numFmt ? value.numFmt : '', key.value || '');
    }

    if (value.numFmt && value.numFmt.includes('%') && data.type === 'percentage') {
      result *= 100;
    }

    if (key.value) {
      data.key = key.value;
      data.value = result;
    }

    // eslint-disable-next-line no-param-reassign
    currentCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);

    if (!key.value || !value.value || key.value === null || value.value === null) {
      break;
    }
    resultArray.push(data);
  }
  return resultArray;
}

/**
 * Processes data for a simple table from an Excel sheet based on the table name.
 * @param {Object} params - Input parameters.
 * @param {Object} params.summaryData - Summary data containing information about tables.
 * @param {string} params.tableName - Name of the table being processed.
 * @param {Object} params.excelSheetData - Excel sheet data object.
 * @return {Array} resultArray - Array of retrieved and formatted data.
 */
function processSimpleTableData({ summaryData, tableName, excelSheetData }) {
  let resultArray = [];
  const tableValue = Object.entries(summaryData).find(([, value]) => value.v === tableName);

  if (tableValue) {
    const currentCell = excelSheetData.getCell(tableValue[0]);
    resultArray = retrieveAndFormatTableValues({ excelSheetData, currentCell, tableName });
  }
  return resultArray;
}

/**
 * Retrieves column headers of a table from an Excel sheet dynamically.
 * @param {Object} excelSheetData - Excel sheet data object.
 * @param {Object} currentCell - Current cell in the Excel sheet.
 * @returns {Array} - Array of column headers.
 */
function getHeadersOfTable(excelSheetData, currentCell) {
  const columnHeaders = [];
  const columnHeaderRow = currentCell.row + 1;
  // Retrieve column headers dynamically
  while (true) {
    // Get the cell for the current column header
    const columnHeaderCell = excelSheetData.getCell(columnHeaderRow, currentCell.col);
    // Break the loop if there are no more column headers
    if (!columnHeaderCell.value) {
      break;
    }
    // Add the column header to the array
    columnHeaders.push(columnHeaderCell.value);
    // Move to the next column
    // eslint-disable-next-line no-param-reassign
    currentCell = excelSheetData.getCell(currentCell.row, currentCell.col + 1);
  }
  return columnHeaders;
}

/**
 * Processes financial summary data from an Excel sheet.
 * @param {Object} params - Input parameters.
 * @param {Object} params.excelSheetData - Excel sheet data object.
 * @param {Object} params.currentCell - Current cell in the Excel sheet.
 * @param {Object} params.headerOne - First header for financial summary data.
 * @param {Object} params.headerTwo - Second header for financial summary data.
 * @param {Object} params.headerThree - Third header for financial summary data.
 * @returns {Object} - Processed data and updated current cell.
 */
function processFinancialSummaryData({ excelSheetData, currentCell, headerOne, headerTwo, headerThree }) {
  const resultArray = [];
  while (true) {
    // eslint-disable-next-line no-shadow
    const data = {};
    const key = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
    const value = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);
    let cellValue = formatMathFormulaFormValue({
      val: value.value,
      key: key.value,
      tableName: EnumTableNameInUwSheet.FINANCIAL_SUMMARY,
    });

    if (
      value.value !== EnumColumnNameOfFinancialSummary.IN_PLACE &&
      value.value !== EnumColumnNameOfFinancialSummary.STABILIZED
    ) {
      data.key = key.value;
      if (headerOne.value === EnumColumnNameOfFinancialSummary.IN_PLACE) {
        if (cellValue) {
          data.inPlaceType = typeOfValue(cellValue, value.numFmt);
        }
        if (value.numFmt) {
          if (value.numFmt.includes('%')) {
            cellValue *= 100;
          }
        }
        data.inPlaceValue = cellValue;
      } else if (headerOne.value === EnumColumnNameOfFinancialSummary.STABILIZED) {
        if (cellValue) {
          data.stabilizedType = typeOfValue(cellValue, value.numFmt);
        }
        if (value.numFmt) {
          if (value.numFmt.includes('%')) {
            cellValue *= 100;
          }
        }
        data.stabilizedValue = cellValue;
      }
      if (headerTwo.value && headerTwo.value === EnumColumnNameOfFinancialSummary.STABILIZED) {
        const valueOfSecond = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 2);
        // Condition for if the value is there then only proceed
        if (valueOfSecond.value) {
          // passing all the values in the function
          data.stabilizedValue = formatMathFormulaFormValue({
            val: valueOfSecond.value,
            key: key.value,
            tableName: EnumTableNameInUwSheet.FINANCIAL_SUMMARY,
          });
          if (valueOfSecond.numFmt) {
            if (data.stabilizedValue) {
              data.stabilizedType = typeOfValue(data.stabilizedValue, valueOfSecond.numFmt);
            }
            if (valueOfSecond.numFmt.includes('%')) {
              data.stabilizedValue *= 100;
            }
          }
        }
      } else if (headerTwo.value && headerTwo.value === EnumColumnNameOfFinancialSummary.IN_PLACE) {
        const valueOfSecond = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 2);
        if (valueOfSecond.value) {
          data.inPlaceValue = formatMathFormulaFormValue({
            val: valueOfSecond.value,
            key: key.value,
            tableName: EnumTableNameInUwSheet.FINANCIAL_SUMMARY,
          });
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
      // adding condition for notes if it's in second header
      else if (headerTwo.value && headerTwo.value === EnumColumnNameOfFinancialSummary.NOTES) {
        const valueOfNotes = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 2);
        if (valueOfNotes.value) {
          // check for the type , if type is string assign as it is, else convert to string
          data.note = typeof valueOfNotes.value === 'string' ? valueOfNotes.value : `${valueOfNotes.value}`;
        }
      }
      // adding condition for notes if it's in third header as notes can be either in 2nd or 3rd column only
      if (headerThree.value && headerThree.value === EnumColumnNameOfFinancialSummary.NOTES) {
        const valueOfNotes = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 3);
        if (valueOfNotes.value) {
          // check for the type , if type is string assign as it is, else convert to string
          data.note = typeof valueOfNotes.value === 'string' ? valueOfNotes.value : `${valueOfNotes.value}`;
        }
      }
    }
    // eslint-disable-next-line no-param-reassign
    currentCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);

    if (!key.value || key.value === null) {
      break;
    }
    if (Object.keys(data).length) {
      resultArray.push(data);
    }
  }
  return { processedData: resultArray, currentCell };
}

/**
 * Imports and processes an Excel file from a given URL.
 * @param {string} url - URL of the Excel file.
 * @returns {Object} - Processed data from the Excel file.
 * @throws {ApiError} - Throws an error if there's an issue with file reading or processing.
 */
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
      if (excelSheetData.name === EnumSheetNameOfUw.SUMMARY) {
        const summaryData = Workbook.Sheets[excelSheetData.name];

        // Property Summary
        const processedPropertySummary = processSimpleTableData({
          summaryData,
          tableName: EnumTableNameInUwSheet.PROPERTY_SUMMARY,
          excelSheetData,
        });
        propertySummary.push(...processedPropertySummary);
        logger.info(`${propertySummary.length} rows imported for ${EnumTableNameInUwSheet.PROPERTY_SUMMARY}`);

        // Deal Metrics
        const processedDealMetrics = processSimpleTableData({
          summaryData,
          tableName: EnumTableNameInUwSheet.DEAL_METRICS,
          excelSheetData,
        });
        dealMetrics.push(...processedDealMetrics);
        logger.info(`${dealMetrics.length} rows imported for ${EnumTableNameInUwSheet.DEAL_METRICS}`);

        // Financing Request
        const processedFinancingRequest = processSimpleTableData({
          summaryData,
          tableName: EnumTableNameInUwSheet.FINANCING_REQUEST,
          excelSheetData,
        });
        financingRequest.push(...processedFinancingRequest);
        logger.info(`${financingRequest.length} rows imported for ${EnumTableNameInUwSheet.FINANCING_REQUEST}`);

        // Sources and Uses
        const sourcesUsesValue = Object.entries(summaryData).find(
          ([, value]) => value.v === EnumTableNameInUwSheet.SOURCES_AND_USES
        );
        const sources = [];
        const uses = [];
        if (sourcesUsesValue) {
          const processedSources = processSimpleTableData({
            summaryData,
            tableName: EnumTableNameInUwSheet.SOURCES,
            excelSheetData,
            dataArray: sources,
          });
          sources.push(...processedSources);
          sourcesAndUses.sources = sources;
          logger.info(`${sources.length} rows imported for ${EnumTableNameInUwSheet.SOURCES}`);
          const processedUses = processSimpleTableData({
            summaryData,
            tableName: EnumTableNameInUwSheet.USES,
            excelSheetData,
            dataArray: uses,
          });
          uses.push(...processedUses);
          sourcesAndUses.uses = uses;
          logger.info(`${uses.length} rows imported for ${EnumTableNameInUwSheet.USES}`);
        }
      } else if (excelSheetData.name === EnumSheetNameOfUw.NOI) {
        const noIData = Workbook.Sheets[excelSheetData.name];
        const financialSummaryValue = Object.entries(noIData).find(
          ([, value]) => value.v === EnumTableNameInUwSheet.FINANCIAL_SUMMARY
        );
        // Financial Summary
        if (financialSummaryValue) {
          let currentCell = excelSheetData.getCell(financialSummaryValue[0]);
          // Getting cell for all the three headers In-Place, Stabilized and Notes
          const headerOne = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);
          const headerTwo = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 2);
          const headerThree = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 3);

          if (!headerOne.value) {
            headerOne.value = EnumColumnNameOfFinancialSummary.IN_PLACE;
          }
          const processedData = processFinancialSummaryData({
            excelSheetData,
            currentCell,
            headerOne,
            headerTwo,
            headerThree,
          });
          const totalRevenue = processedData.processedData;
          currentCell = processedData.currentCell;
          financialSummary.revenue = totalRevenue;
          logger.info(
            `${totalRevenue.length} rows imported for ${EnumTableNameInUwSheet.REVENUE} in ${EnumTableNameInUwSheet.FINANCIAL_SUMMARY}`
          );
          const startingCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);

          const expensesValue = Object.entries(noIData).find(([, value]) => value.v === EnumTableNameInUwSheet.EXPENSES);
          if (expensesValue) {
            let currentCellForExpense = excelSheetData.getCell(expensesValue[0]);

            while (currentCellForExpense.address !== startingCell.address) {
              currentCellForExpense = excelSheetData.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
            }

            const processedExpenseData = processFinancialSummaryData({
              excelSheetData,
              currentCell: currentCellForExpense,
              headerOne,
              headerTwo,
              headerThree,
            });
            const expenses = processedExpenseData.processedData;
            currentCell = processedExpenseData.currentCell;
            financialSummary.expenses = expenses;
            logger.info(
              `${expenses.length} rows imported for ${EnumTableNameInUwSheet.EXPENSES} in ${EnumTableNameInUwSheet.FINANCIAL_SUMMARY}`
            );
            const effectiveGrossIncomeInPlace = totalRevenue.find(
              (revenue) => revenue.key === EnumColumnNameOfFinancialSummary.EFFECTIVE_GROSS_INCOME
            ).inPlaceValue;
            const effectiveGrossIncomeStabilized = totalRevenue.find(
              (revenue) => revenue.key === EnumColumnNameOfFinancialSummary.EFFECTIVE_GROSS_INCOME
            ).stabilizedValue;

            const totalOperatingExpensesInPlace = expenses.find(
              (expense) => expense.key === EnumColumnNameOfFinancialSummary.TOTAL_OPERATING_EXPNESES
            ).inPlaceValue;

            const totalOperatingExpensesStabilized = expenses.find(
              (expense) => expense.key === EnumColumnNameOfFinancialSummary.TOTAL_OPERATING_EXPNESES
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
      } else if (excelSheetData.name === EnumSheetNameOfUw.RENT_ROLL) {
        const rentRollSheetData = Workbook.Sheets[excelSheetData.name];

        const rentRollSummaryValue = Object.entries(rentRollSheetData).find(
          ([, value]) => value.v === EnumTableNameInUwSheet.RENT_ROLL_SUMMARY
        );
        // Rent Roll Summary
        if (rentRollSummaryValue) {
          let currentCell = excelSheetData.getCell(rentRollSummaryValue[0]);
          const columnHeaders = getHeadersOfTable(excelSheetData, currentCell);
          const columnHeaderRow = currentCell.row + 1;
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
                key: columnHeaders[i],
                tableName: EnumTableNameInUwSheet.RENT_ROLL_SUMMARY,
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
          logger.info(`${rentRollSummary.length} rows imported for ${EnumTableNameInUwSheet.RENT_ROLL_SUMMARY}`);
        }
      }
    });
    data.propertySummary = propertySummary;
    data.dealMetrics = dealMetrics;
    data.financingRequest = financingRequest;
    data.sourcesAndUses = sourcesAndUses;
    data.rentRollSummary = rentRollSummary;
    data.financialSummary = financialSummary;

    // Validates the consistency of the requested loan amount across Sources, Deal Metrics and Financing Request
    validateLoanAmount(data);
    return data;
  } catch (error) {
    logger.error(error);
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to read XLSheet: ${error.message}`);
  }
};

export const importTableDataFromExcel = async (url, keyToMatch) => {
  try {
    const data = {};
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    const Workbook = XLSX.read(buffer, { type: 'buffer' });
    const customTableData = [];
    await workbook.xlsx.load(buffer);
    workbook.eachSheet((excelSheetData) => {
      const customBlockTableData = Workbook.Sheets[excelSheetData.name];
      // Find the starting point in the sheet (skip the first entry which is usually "!" in Excel)
      let startingPoint = Object.entries(customBlockTableData)[1];

      const matchingPair = Object.keys(customBlockTableData).filter((key) => customBlockTableData[key].v === keyToMatch);
      if (matchingPair && matchingPair.length === 1) {
        const titleIndex = matchingPair[0];
        const matchingKeyValuePair = { [titleIndex]: customBlockTableData[titleIndex] };
        [startingPoint] = Object.entries(matchingKeyValuePair);
      } else if (matchingPair.length > 1) {
        throw new ApiError(httpStatus.BAD_REQUEST, `Multiple titles present in the sheet`);
      } else {
        throw new ApiError(httpStatus.BAD_REQUEST, `Title not found in the sheet `);
      }

      if (startingPoint) {
        // Initialize the current cell to the starting point
        let currentCell = excelSheetData.getCell(startingPoint[0]);
        const belowCellValue = excelSheetData.getCell(currentCell.row + 1, currentCell.col).value;
        if (!belowCellValue) {
          throw new ApiError(httpStatus.BAD_REQUEST, `No data found below title.`);
        }
        const customTableTitle = currentCell.value; //  store the title of the customTable
        const columnHeaders = getHeadersOfTable(excelSheetData, currentCell);
        const columnHeaderRow = currentCell.row + 1;

        // Reset the current cell to the starting point
        currentCell = excelSheetData.getCell(startingPoint[0]);
        // Start processing data rows below the column headers
        let dataRow = columnHeaderRow + 1;

        // Process data rows dynamically
        while (true) {
          const rowData = [];
          let hasData = false;

          // Iterate through each column dynamically
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < columnHeaders.length; i++) {
            const rowDataObject = {};
            const columnValueCell = excelSheetData.getCell(dataRow, currentCell.col + i);
            let columnValue = formatMathFormulaFormValue({
              // if columnValueCell has not value then add dash (-)
              val: columnValueCell.value ? columnValueCell.value : '-',
              key: 'customTable',
              tableName: 'customTable',
            });
            if (columnValue !== null) {
              rowDataObject.key = columnHeaders[i];
              rowDataObject.value = columnValue;
              if (columnValue) {
                rowDataObject.type = typeOfValue(columnValue, columnValueCell.numFmt ? columnValueCell.numFmt : '');
              }
              if (columnValueCell.numFmt) {
                if (columnValueCell.numFmt.includes('%')) {
                  columnValue *= 100;
                  rowDataObject.value = columnValue;
                }
              }
              rowData.push(rowDataObject);
              hasData = true;
            }
          }

          if (hasData) {
            customTableData.push(rowData);
          }
          // eslint-disable-next-line no-plusplus
          dataRow++;
          const nextRow = [];
          // get the values of nextRow and push into an array for checking break condition
          for (let i = 0; i < columnHeaders.length; i += 1) {
            const cellValue = excelSheetData.getCell(dataRow, currentCell.col + i).value;
            if (cellValue) {
              nextRow.push(cellValue);
            }
          }

          // Break the loop if the next row is empty
          if (!nextRow.length) {
            break;
          }
        }
        // Throw an error if only headers row present in sheet, no data rows present
        if (customTableData.length < 1) {
          throw new ApiError(httpStatus.BAD_REQUEST, `Table has insufficient data`);
        }
        logger.info(`${customTableData.length} rows imported for table ${customTableTitle}`);
        data.customTableTitle = customTableTitle;
        data.customTableData = customTableData;
      }
    });
    return data;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Failed to read data from file: ${error.message}`);
  }
};
