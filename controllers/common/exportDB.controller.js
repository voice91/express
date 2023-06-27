// eslint-disable-next-line import/no-extraneous-dependencies
import httpStatus from 'http-status';
import { logger } from '../../config/logger';
import { LenderContact, LenderProgram, LendingInstitution } from '../../models';

const os = require('os');
const path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
const excel = require('exceljs');

// eslint-disable-next-line import/prefer-default-export
export async function exportToExcel(req, res) {
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
    const row = LenderContactsheet.addRow(); // Create a new row

    row.getCell('A').value = item._id;
    row.getCell('B').value = lender.lenderNameVisible;
    row.getCell('C').value = lender._id;
    row.getCell('D').value = item.firstName;
    row.getCell('E').value = item.lastName;
    row.getCell('F').value = item.nickName;
    row.getCell('G').value = item.programs;
    row.getCell('H').value = item.email;
    row.getCell('I').value = item.emailTag;
    row.getCell('J').value = item.contactTag;
    row.getCell('K').value = item.phoneNumberDirect;
    row.getCell('L').value = item.phoneNumberCell;
    row.getCell('M').value = item.phoneNumberOffice;
    row.getCell('N').value = item.title;
    row.getCell('O').value = item.city;
    row.getCell('P').value = item.state;
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
    const row = LenderProgramsheet.addRow(); // Create a new row

    row.getCell('A').value = item._id;
    row.getCell('B').value = lender.lenderNameVisible;
    row.getCell('C').value = lender.lenderType;
    row.getCell('D').value = lender._id;
    row.getCell('E').value = item.lenderProgramType;
    row.getCell('F').value = item.statesArray;
    row.getCell('G').value = item.statesArrTag;
    row.getCell('H').value = item.minLoanSize;
    row.getCell('I').value = item.minLoanTag;
    row.getCell('J').value = item.maxLoanSize;
    row.getCell('K').value = item.maxLoanTag;
    row.getCell('L').value = item.propertyType;
    row.getCell('M').value = item.propTypeArrTag;
    row.getCell('N').value = item.doesNotLandOn;
    row.getCell('O').value = item.doesNotLandOnArrTag;
    row.getCell('P').value = item.loanType;
    row.getCell('Q').value = item.loanTypeArrTag;
    row.getCell('R').value = item.indexUsed;
    row.getCell('S').value = item.spreadEstimate;
    row.getCell('T').value = item.counties;
    row.getCell('U').value = item.recourseRequired;
    row.getCell('V').value = item.nonRecourseLTV;
  });

  // Save the workbook as an Excel file when all rows have been processed
  // Get the user's home directory path
  const downloadDir = path.join(os.homedir(), 'Downloads');
  // Set the file path with the download directory
  const fileName = 'LenderData.xlsx';
  const filePath = path.join(downloadDir, fileName);

  workbook.xlsx
    .writeFile(filePath)
    .then(() => {
      logger.info('Excel file created successfully');
      return res.status(httpStatus.OK).send({ message: 'Export Database to ExcelSheet Successfully..' });
    })
    // eslint-disable-next-line no-shadow
    .catch((err) => {
      res.status(500).send(`Error while creating Excel file: ${err}`);
    });
}
