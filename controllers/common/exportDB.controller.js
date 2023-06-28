// eslint-disable-next-line import/no-extraneous-dependencies
import httpStatus from 'http-status';
import _ from 'lodash';
import { LenderContact, LenderProgram, LendingInstitution } from 'models';
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
    'Id',
    'Lender',
    'LenderId',
    'First Name',
    'Last Name',
    'Nick Name',
    'Program(s)',
    'Email',
    'Email Tag',
    'contactTag',
    'Main Phone',
    'Mobile Phone',
    'Office Phone',
    'Title',
    'City',
    'State',
  ];

  // Write field names to Excel sheet
  fieldNamesofLenderContact.forEach((fieldName, columnIndex) => {
    const cell = LenderContactsheet.getCell(`${String.fromCharCode(65 + columnIndex)}1`);
    cell.value = fieldName;
    cell.font = { bold: true };
  });

  const lenderInstitution = await LendingInstitution.find().lean();

  const lenderContact = await LenderContact.find().lean();

  lenderContact.forEach((item) => {
    const lender = lenderInstitution.find((lenderItem) => lenderItem._id.toString() === item.lenderInstitute.toString());

    const rowValues = [];
    rowValues[1] = `${item._id}`;
    rowValues[2] = lender.lenderNameVisible;
    rowValues[3] = `${lender._id}`;
    rowValues[4] = item.firstName;
    rowValues[5] = item.lastName;
    rowValues[6] = item.nickName;
    rowValues[7] = item.programs ? item.programs.join(', ') : item.programs;
    rowValues[8] = item.email;
    rowValues[9] = item.emailTag;
    rowValues[10] = item.contactTag;
    rowValues[11] = item.phoneNumberDirect;
    rowValues[12] = item.phoneNumberCell;
    rowValues[13] = item.phoneNumberOffice;
    rowValues[14] = item.title;
    rowValues[15] = item.city;
    rowValues[16] = item.state;

    LenderContactsheet.addRow(rowValues);
  });

  const LenderProgramsheet = workbook.addWorksheet('CLEAN_LENDERS');

  const fieldNamesofLenderProgram = [
    'Id',
    'Lender Name',
    'Lender Type',
    'LenderInstituteId',
    'Program Name',
    'States Array',
    'StatesArrTag',
    'MinLoanSize',
    'MinLoanTag',
    'MaxLoanSize',
    'MaxLoanTag',
    'Property Type',
    'PropTypeArrTag',
    'DoesNotLandOn',
    'DoesNotLandOnArrTag',
    'Loan Type',
    'LoanTypeArrTag',
    'Index Used',
    'Spread Estimate',
    'Counties',
    'Recourse Required',
    'Non-Recourse LTV',
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
    rowValues[1] = `${item._id}`;
    rowValues[2] = lender.lenderNameVisible;
    rowValues[3] = CsvReverseLenderTypeMapping[lender.lenderType];
    rowValues[4] = `${lender._id}`;
    rowValues[5] = item.lenderProgramType;
    rowValues[6] = statesArray.join(', ');
    rowValues[7] = item.statesArrTag.join(', ');
    rowValues[8] = `$${item.minLoanSize}`;
    rowValues[9] = item.minLoanTag;
    rowValues[10] = `$${item.maxLoanSize}`;
    rowValues[11] = item.maxLoanTag;
    rowValues[12] = property;
    rowValues[13] = item.propTypeArrTag.join(', ');
    rowValues[14] = item.doesNotLandOn.map((val) => CsvReverseLenderPropertyTypeMapping[val]).join(', ');
    rowValues[15] = item.doesNotLandOnArrTag.join(', ');
    rowValues[16] = item.loanType.map((val) => CsvReverseLenderLoanTypeMapping[val]).join(', ');
    rowValues[17] = item.loanTypeArrTag.join(', ');
    rowValues[18] = item.indexUsed;
    rowValues[19] = item.spreadEstimate;
    rowValues[20] = item.counties;
    rowValues[21] = item.recourseRequired;
    rowValues[22] = item.nonRecourseLTV;

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
