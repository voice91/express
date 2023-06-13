// eslint-disable-next-line import/no-extraneous-dependencies
import httpStatus from 'http-status';
import { logger } from '../../config/logger';
import config from '../../config/config';

// eslint-disable-next-line import/no-extraneous-dependencies
const excel = require('exceljs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { MongoClient } = require('mongodb');

// eslint-disable-next-line import/prefer-default-export
export async function exportToExcel(req, res) {
  // MongoDB connection URL
  const url = config.mongodbHost;
  // Database name
  const dbName = config.mongodb;

  // Connect to MongoDB
  MongoClient.connect(url, (err, client) => {
    if (err) {
      return res.status(500).send('Error connecting to MongoDB');
    }
    logger.info('Database Connected..');
    const db = client.db(dbName);

    // Create a new workbook
    const workbook = new excel.Workbook();
    const LenderInstitutesheet = workbook.addWorksheet('Lender Institute');
    // Collection name
    const collectionName1 = 'LendingInstitution';

    // Define field names
    const fieldNamesofLenderInstitute = ['Id', 'Lender Name', 'Lender Type'];

    // Write field names to Excel sheet
    fieldNamesofLenderInstitute.forEach((fieldName, columnIndex) => {
      const cell = LenderInstitutesheet.getCell(`${String.fromCharCode(65 + columnIndex)}1`);
      cell.value = fieldName;
      cell.font = { bold: true };
    });

    // Fetch the data from MongoDB collection
    db.collection(collectionName1)
      .find()
      // eslint-disable-next-line no-shadow
      .toArray((err, data) => {
        if (err) {
          return res.status(500).send('Error While fetching data from MongoDB');
        }
        // Write data to Excel sheet
        data.forEach((item) => {
          const row = LenderInstitutesheet.addRow(); // Create a new row

          row.getCell('A').value = item._id;
          row.getCell('B').value = item.lenderNameVisible;
          row.getCell('C').value = item.lenderType;
        });

        const LenderContactsheet = workbook.addWorksheet('Lender Contact');

        // Collection name
        const collectionName2 = 'LenderContact';

        // Define field names
        const fieldNamesofLenderContact = [
          'Id',
          'First Name',
          'Last Name',
          'Nick Name',
          'Email',
          'Email Tag',
          'contactTag',
          'Main Phone',
          'Mobile Phone',
          'Office Phone',
          'Title',
          'City',
          'State',
          'Lender',
        ];

        // Write field names to Excel sheet
        fieldNamesofLenderContact.forEach((fieldName, columnIndex) => {
          const cell = LenderContactsheet.getCell(`${String.fromCharCode(65 + columnIndex)}1`);
          cell.value = fieldName;
          cell.font = { bold: true };
        });
        // Fetch the data from MongoDB collection
        db.collection(collectionName2)
          .find()
          // eslint-disable-next-line no-shadow
          .toArray((err, data) => {
            if (err) {
              return res.status(500).send('Error While fetching data from MongoDB');
            }
            // Write data to Excel sheet
            data.forEach((item) => {
              const row = LenderContactsheet.addRow(); // Create a new row

              row.getCell('A').value = item._id;
              row.getCell('B').value = item.firstName;
              row.getCell('C').value = item.lastName;
              row.getCell('D').value = item.nickName;
              row.getCell('E').value = item.email;
              row.getCell('F').value = item.emailTag;
              row.getCell('G').value = item.contactTag;
              row.getCell('H').value = item.phoneNumberDirect;
              row.getCell('I').value = item.phoneNumberCell;
              row.getCell('J').value = item.phoneNumberOffice;
              row.getCell('K').value = item.title;
              row.getCell('L').value = item.city;
              row.getCell('M').value = item.state;
              row.getCell('N').value = item.lenderInstitute;
            });

            const LenderProgramsheet = workbook.addWorksheet('Lender Program');
            const collectionName3 = 'LenderProgram';

            // Define field names
            const fieldNamesofLenderProgram = [
              'Id',
              'Program Name',
              'States Array',
              'StatesArrTag',
              'MinLoanSize',
              'MinLoanTag',
              'MaxLoanSize',
              'MaxLoanTag',
              'Property Type',
              'PropTypeArrTag',
              'Loan Type',
              'LoanTypeArrTag',
              'Lender',
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
            // Fetch the data from MongoDB collection
            db.collection(collectionName3)
              .find()
              // eslint-disable-next-line no-shadow
              .toArray((err, data) => {
                if (err) {
                  return res.status(500).send('Error While fetching data from MongoDB');
                }
                // Write data to Excel sheet
                data.forEach((item) => {
                  const row = LenderProgramsheet.addRow(); // Create a new row

                  row.getCell('A').value = item._id;
                  row.getCell('B').value = item.lenderProgramType;
                  row.getCell('C').value = item.statesArray;
                  row.getCell('D').value = item.statesArrTag;
                  row.getCell('E').value = item.minLoanSize;
                  row.getCell('F').value = item.minLoanTag;
                  row.getCell('G').value = item.maxLoanSize;
                  row.getCell('H').value = item.maxLoanTag;
                  row.getCell('I').value = item.propertyType;
                  row.getCell('J').value = item.propTypeArrTag;
                  row.getCell('K').value = item.loanType;
                  row.getCell('L').value = item.loanTypeArrTag;
                  row.getCell('M').value = item.lenderInstitute;
                  row.getCell('N').value = item.indexUsed;
                  row.getCell('O').value = item.spreadEstimate;
                  row.getCell('P').value = item.counties;
                  row.getCell('Q').value = item.recourseRequired;
                  row.getCell('R').value = item.nonRecourseLTV;
                });

                // Save the workbook as an Excel file
                const filePath = 'LenderData.xlsx';
                workbook.xlsx
                  .writeFile(filePath)
                  .then(() => {
                    logger.info('Excel file created successfully');
                    return res.status(httpStatus.OK).send({ message: 'Export Database to ExcelSheet Successfully..' });
                  })
                  // eslint-disable-next-line no-shadow
                  .catch((err) => {
                    res.status(500).send(`Error While creating Excel file : ${err}`);
                  });
              });
          });
      });
  });
}
