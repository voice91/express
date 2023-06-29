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
    const cell = LenderContactsheet.getCell(`${String.fromCharCode(65 + columnIndex)}1`);
    cell.value = fieldName;
    cell.font = { bold: true };
  });

  const lenderInstitution = await LendingInstitution.find().lean();
  const lenderNotes = await LenderInstituteNotes.find().lean();

  const lenderContact = await LenderContact.find().lean();

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
    LenderContactsheet.addRow(rowValues);
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
    'Notes',
    'NotesId',
    'ProgramId',
    'LenderInstituteId',
  ];

  // Write field names to Excel sheet
  fieldNamesofLenderProgram.forEach((fieldName, columnIndex) => {
    const cell = LenderProgramsheet.getCell(`${String.fromCharCode(65 + columnIndex)}1`);
    cell.value = fieldName;
    cell.font = { bold: true };
  });

  const lenderProgram = await LenderProgram.find().lean();

  lenderProgram.forEach((item) => {
    const lender = lenderInstitution.find((lenderItem) => lenderItem._id.toString() === item.lenderInstitute.toString());
    // eslint-disable-next-line no-shadow
    const notes = lenderNotes.find((notes) => notes.lenderInstitute.toString() === lender._id.toString());
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
    rowValues[4] = `$${item.minLoanSize}`;
    rowValues[5] = item.minLoanTag;
    rowValues[6] = `$${item.maxLoanSize}`;
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
    rowValues[18] = item.counties;
    rowValues[19] = item.recourseRequired;
    rowValues[20] = item.nonRecourseLTV;
    if (notes) {
      rowValues[21] = notes.content;
      rowValues[22] = `${notes._id}`;
    }
    rowValues[23] = `${item._id}`;
    rowValues[24] = `${lender._id}`;

    LenderProgramsheet.addRow(rowValues);
  });

  // Save the workbook as an Excel file when all rows have been processed
  // Get the user's home directory path
  // Set the file path with the download directory
  const fileName = '/LenderData.xlsx';
  // todo : this can be dynamic so we have to change it

  const filePath = path.join(basePath, fileName);
  await workbook.xlsx.writeFile(filePath);
  const outPath = `${filePath}`;
  res.sendFile(outPath);
  return res.status(httpStatus.OK).sendFile(outPath);
});
