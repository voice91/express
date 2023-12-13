// eslint-disable-next-line import/no-extraneous-dependencies
import httpStatus from 'http-status';
import _ from 'lodash';
import { LenderContact, LenderInstituteNotes, LenderProgram, LendingInstitution } from 'models';
import {
  CsvReverseLenderLoanTypeMapping,
  CsvReverseLenderPropertyTypeMapping,
  CsvReverseLenderTypeMapping,
  CsvStatesArrayMapping,
} from 'utils/common';
import { catchAsync } from 'utils/catchAsync';
import { defaulAssetTypeOfDeal, EnumAssetTypeOfDeal } from '../../models/enum.model';

const homedir = require('os').homedir();

const basePath = `${homedir}`;
const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const excel = require('exceljs');

/**
 * Converts a 0-based index to an Excel-style column reference.
 *
 * @param {number} index - 0-based index representing the column position.
 * @returns {string} - String representing the Excel-style column reference (A,B,...,Z,AA,AB,..).
 */
function getColumnReference(index) {
  let dividend = index + 1;
  let columnName = '';

  while (dividend > 0) {
    const modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / 26);
  }

  return columnName;
}

/**
 * Converts a column name to its corresponding Excel-style column reference.
 *
 * @param {string[]} columnsArray - Array of column names (strings).
 * @param {string} columnName - Specific column name for which to find the reference.
 * @returns {string} - String representing the Excel-style column reference.
 */
function getColumnReferenceFromColumnName(columnsArray, columnName) {
  return getColumnReference(columnsArray.indexOf(columnName));
}
// Function for old values that are saved in the form of %
// As now as we set the format for this field and multiplying the value by 100 to show it in % format, the already % value stored in db also getting multiply by 100
function processNonRecursiveLTV(value) {
  if (typeof value === 'string' && value.includes('%')) {
    if (parseFloat(value) > 1) {
      return parseFloat(value) / 100;
    }
  }
  return parseFloat(value);
}
// eslint-disable-next-line import/prefer-default-export
export const exportToExcel = catchAsync(async (req, res) => {
  // Create a new workbook
  const workbook = new excel.Workbook();
  const LenderContactsheet = workbook.addWorksheet('CLEAN_CONTACTS');

  const fieldNamesofLenderContact = [
    'Lender',
    'First Name',
    'Last Name',
    'Program(s)',
    'Nick Name',
    'Email',
    'Main Phone',
    'Mobile Phone',
    'Office Phone',
    'Title',
    'City',
    'State',
    'contactTag',
    'Email Tag',
    'ContactId',
    'LenderId',
  ];

  // Write field names to Excel sheet
  fieldNamesofLenderContact.forEach((fieldName, columnIndex) => {
    const cell = LenderContactsheet.getCell(`${getColumnReference(columnIndex)}1`);
    cell.value = fieldName;
    cell.font = { bold: true };
  });

  const lenderInstitution = await LendingInstitution.find().lean();
  const lenderNotes = await LenderInstituteNotes.find({}, {}, { populate: 'createdBy' }).lean();

  const lenderContact = await LenderContact.find().lean();
  const contactDataRows = [];
  lenderContact.forEach((item) => {
    const lender = lenderInstitution.find((lenderItem) => lenderItem._id.toString() === item.lenderInstitute.toString());

    const rowValues = [];
    rowValues[1] = lender.lenderNameVisible;
    rowValues[2] = item.firstName;
    rowValues[3] = item.lastName;
    rowValues[4] = item.programs ? item.programs.join(', ') : item.programs;
    rowValues[5] = item.nickName;
    rowValues[6] = item.email;
    rowValues[7] = item.phoneNumberDirect;
    rowValues[8] = item.phoneNumberCell;
    rowValues[9] = item.phoneNumberOffice;
    rowValues[10] = item.title;
    rowValues[11] = item.city;
    rowValues[12] = item.state;
    rowValues[13] = item.contactTag;
    rowValues[14] = item.emailTag;
    rowValues[15] = `${item._id}`;
    rowValues[16] = `${lender._id}`;
    contactDataRows.push(rowValues);
  });
  // sort the data in the asc order of Lender Name
  contactDataRows.sort((a, b) => a[1].localeCompare(b[1]));
  // add rows to sheet one by one
  contactDataRows.forEach((row) => {
    LenderContactsheet.addRow(row);
  });

  const LenderProgramsheet = workbook.addWorksheet('CLEAN_LENDERS');

  const fieldNamesofLenderProgram = [
    'Lender Name',
    'Lender Type',
    'Program Name',
    'Min',
    'Min Tag',
    'Max',
    'Max Tag',
    'States Array',
    'States Tag',
    'Property Type Array',
    'Property Type Tag',
    'Does Not Do',
    'Does Not Do Tag',
    'Loan Type Array',
    'Loan Type Tag',
    'Index Used',
    'Spread Estimate',
    'Counties',
    'Recourse Required',
    'Non-Recourse LTV',
    'Description',
    'Headquarters',
    'Website',
    'Ranking',
    'Note 1 Date',
    'Note 1 Content',
    'Note 1 Person',
    'Note 2 Date',
    'Note 2 Content',
    'Note 2 Person',
    'Note 3 Date',
    'Note 3 Content',
    'Note 3 Person',
    'Note 4 Date',
    'Note 4 Content',
    'Note 4 Person',
    'Note 5 Date',
    'Note 5 Content',
    'Note 5 Person',
    'ProgramId',
    'LenderInstituteId',
    'Note 1 Id',
    'Note 2 Id',
    'Note 3 Id',
    'Note 4 Id',
    'Note 5 Id',
  ];

  // Write field names to Excel sheet
  fieldNamesofLenderProgram.forEach((fieldName, columnIndex) => {
    const cell = LenderProgramsheet.getCell(`${getColumnReference(columnIndex)}1`);
    cell.value = fieldName;
    cell.font = { bold: true };
  });

  const lenderProgram = await LenderProgram.find().lean();
  const programDataRows = [];
  lenderProgram.forEach((item) => {
    const lender = lenderInstitution.find((lenderItem) => lenderItem._id.toString() === item.lenderInstitute.toString());
    // eslint-disable-next-line no-shadow
    const notes = lenderNotes
      .filter((note) => note.lenderInstitute.toString() === lender._id.toString())
      .sort((a, b) => b.createdAt - a.createdAt);
    let { statesArray } = item;
    const result = _.intersection(statesArray, CsvStatesArrayMapping.Nationwide);
    if (result.length >= CsvStatesArrayMapping.Nationwide.length) {
      statesArray = ['Nationwide'];
    }

    function returnPropertyArrayAsExcelSheet(propertyArray) {
      // eslint-disable-next-line no-shadow
      const propertyMappingValue = propertyArray.map((item) => CsvReverseLenderPropertyTypeMapping[item]);
      return propertyMappingValue.join(', ');
    }

    let property;
    if (item.propertyType.length >= defaulAssetTypeOfDeal.length) {
      if (item.propertyType.length === defaulAssetTypeOfDeal.length) {
        if (JSON.stringify(item.propertyType.sort()) === JSON.stringify(defaulAssetTypeOfDeal.sort())) {
          property = 'Default';
        } else {
          property = returnPropertyArrayAsExcelSheet(item.propertyType);
        }
      } else if (Object.values(EnumAssetTypeOfDeal).length === item.propertyType.length) {
        if (JSON.stringify(item.propertyType.sort()) === JSON.stringify(Object.values(EnumAssetTypeOfDeal).sort())) {
          property = 'All';
        }
      } else if (defaulAssetTypeOfDeal.every((value) => item.propertyType.includes(value))) {
        const diffValues = item.propertyType.filter((value) => !defaulAssetTypeOfDeal.includes(value)).filter(Boolean);
        // eslint-disable-next-line no-shadow
        const diffMappingValue = diffValues.map((item) => CsvReverseLenderPropertyTypeMapping[item]);
        property = `Default+${diffMappingValue.join('+')}`;
      } else {
        property = returnPropertyArrayAsExcelSheet(item.propertyType);
      }
    } else {
      property = returnPropertyArrayAsExcelSheet(item.propertyType);
    }
    const rowValues = [];
    rowValues[1] = lender.lenderNameVisible;
    rowValues[2] = CsvReverseLenderTypeMapping[lender.lenderType];
    rowValues[3] = item.lenderProgramType;
    rowValues[4] = item.minLoanSize ? item.minLoanSize : '';
    rowValues[5] = item.minLoanTag;
    rowValues[6] = item.maxLoanSize ? item.maxLoanSize : '';
    rowValues[7] = item.maxLoanTag;
    rowValues[8] = statesArray.join(', ');
    rowValues[9] = item.statesArrTag.join(', ');
    rowValues[10] = property;
    rowValues[11] = item.propTypeArrTag.join(', ');
    rowValues[12] = item.doesNotLandOn.map((val) => CsvReverseLenderPropertyTypeMapping[val]).join(', ');
    rowValues[13] = item.doesNotLandOnArrTag.join(', ');
    rowValues[14] = item.loanType.map((val) => CsvReverseLenderLoanTypeMapping[val]).join(', ');
    rowValues[15] = item.loanTypeArrTag.join(', ');
    rowValues[16] = item.indexUsed;
    rowValues[17] = item.spreadEstimate;
    rowValues[18] = item.counties ? item.counties.join(', ') : '';
    rowValues[19] = item.recourseRequired;
    rowValues[20] = item.nonRecourseLTV ? processNonRecursiveLTV(item.nonRecourseLTV) : ''; // we formatted cell as percentage so need the value as number
    // rowValues[20] = item.nonRecourseLTV ? parseFloat(item.nonRecourseLTV) : ''; // we formatted cell as percentage so need the value as number
    rowValues[21] = lender.description;
    rowValues[22] = lender.headquarter;
    rowValues[23] = lender.website;
    rowValues[24] = lender.creRanking;
    if (notes.length) {
      let refCellNumber = 25;
      for (let i = 0; i < notes.length && i <= 4; i += 1) {
        rowValues[refCellNumber] = notes[i].updatedAt;
        refCellNumber += 1;
        rowValues[refCellNumber] = notes[i].content;
        refCellNumber += 1;
        rowValues[refCellNumber] = notes[i].createdBy && notes[i].createdBy.firstName ? notes[i].createdBy.firstName : '';
        refCellNumber += 1;
      }
    }
    rowValues[40] = `${item._id}`;
    rowValues[41] = `${lender._id}`;
    if (notes.length) {
      for (let i = 0; notes[i] && i <= 4; i += 1) {
        rowValues[42 + i] = `${notes[i]._id}`;
      }
    }
    programDataRows.push(rowValues);
  });

  // sort the data in the asc order of Lender Name
  programDataRows.sort((a, b) => a[1].localeCompare(b[1]));
  // add rows to sheet one by one
  programDataRows.forEach((row) => {
    LenderProgramsheet.addRow(row);
  });

  const lastRow = LenderProgramsheet.getColumn('A').worksheet.rowCount || 999;
  // set the format of cell
  for (let i = 2; i <= lastRow; i += 1) {
    LenderProgramsheet.getCell(`${getColumnReferenceFromColumnName(fieldNamesofLenderProgram, 'Min')}${i}`).numFmt =
      '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"??_);_(@_)'; // format cell of min amount as number with $
    LenderProgramsheet.getCell(`${getColumnReferenceFromColumnName(fieldNamesofLenderProgram, 'Max')}${i}`).numFmt =
      '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"??_);_(@_)'; //  format cell of max amount as number with $
    LenderProgramsheet.getCell(
      `${getColumnReferenceFromColumnName(fieldNamesofLenderProgram, 'Non-Recourse LTV')}${i}`
    ).numFmt = '0%'; //  format cell of nonRecourseLTV as percentage
  }

  // Save the workbook as an Excel file when all rows have been processed
  // Get the user's home directory path
  // Set the file path with the download directory
  const fileName = '/LenderData.xlsx';
  // todo : this can be dynamic so we have to change it

  const filePath = path.join(basePath, fileName);
  await workbook.xlsx.writeFile(filePath);
  const outPath = `${filePath}`;
  // res.sendFile(outPath);
  return res.status(httpStatus.OK).sendFile(outPath);
});
