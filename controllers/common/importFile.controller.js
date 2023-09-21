import _ from 'lodash';
import httpStatus from 'http-status';
import XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import {
  CsvLenderLoanTypeMapping,
  CsvLenderPropertyTypeMapping,
  CsvLenderTypeMapping,
  CsvStatesArrayMapping,
} from 'utils/common';
import { catchAsync } from 'utils/catchAsync';
import { LenderContact, LenderInstituteNotes, LenderProgram, LendingInstitution } from 'models';
import { EnumAssetTypeOfDeal } from 'models/enum.model';
import ApiError from '../../utils/ApiError';

const mongoose = require('mongoose');

const workbook = new ExcelJS.Workbook();

export const LenderWorkBookExcelEnum = {
  PROGRAM_ID: 'ProgramId',
  LENDER_NAME: 'Lender Name',
};

// column mapping for CLEAN_LENDERS sheet
export const LenderWorkBookKeyColMappingForInstitute = {
  LENDER_NAME: 0,
  LENDER_TYPE: 1,
  PROGRAM_NAME: 2,
  PROGRAM_MIN_LOAN_SIZE: 3,
  PROGRAM_MIN_TAG: 4,
  PROGRAM_MAX_LOAN_SIZE: 5,
  PROGRAM_MAX_TAG: 6,
  PROGRAM_STATES: 7,
  PROGRAM_STATE_TAGS: 8,
  PROGRAM_PROPERTY_TYPE: 9,
  PROGRAM_PROPERTY_TYPE_TAGS: 10,
  DOES_NOT_LAND_ON: 11,
  DOES_NOT_LAND_ON_TAGS: 12,
  LOAN_TYPE: 13,
  LOAN_TYPE_TAG: 14,
  INDEX_USED: 15,
  SPREAD_ESTIMATION: 16,
  COUNTIES: 17,
  RECOURSE: 18,
  NON_RECOURSE: 19,
  NOTES: 20,
  NOTES_ID: 21,
  PROGRAM_ID: 22,
  INSTITUTE_ID: 23,
};
// column mapping for CLEAN_CONTACT sheet
export const LenderWorkBookKeyColMappingForContact = {
  LENDER_NAME: 0,
  FIRST_NAME: 1,
  LAST_NAME: 2,
  PROGRAMS: 3,
  NICK_NAME: 4,
  EMAIL: 5,
  MAIN_PHONE_NUMBER: 6,
  MOBILE_PHONE_NUMBER: 7,
  OFFICE_PHONE_NUMBER: 8,
  TITLE: 9,
  CITY: 10,
  STATE: 11,
  CONTACT_TAG: 12,
  EMAIL_TAG: 13,
  CONTACT_ID: 14,
  LENDER_INSTITUTE: 15,
};
// as it was declared twice in the code for if and else condition
export const defaultAssetTypeOfDeal = [
  EnumAssetTypeOfDeal.MULTIFAMILY,
  EnumAssetTypeOfDeal.OFFICE,
  EnumAssetTypeOfDeal.RETAIL,
  EnumAssetTypeOfDeal.INDUSTRIAL,
  EnumAssetTypeOfDeal.SELF_STORAGE,
  EnumAssetTypeOfDeal.STUDENT_HOUSING,
  EnumAssetTypeOfDeal.MOBILE_HOME_PARK,
  EnumAssetTypeOfDeal.FOR_SALE_CONDOS,
  EnumAssetTypeOfDeal.NNN_RETAIL,
];

// common function for getting states array
const getStatesArray = (cellValue) => {
  let statesArray = [];

  if (cellValue) {
    if (cellValue === 'Nationwide') {
      statesArray = CsvStatesArrayMapping.Nationwide;
    } else if (cellValue.includes('Nationwide')) {
      if (cellValue.includes('-')) {
        const valueToRemoveState = CsvStatesArrayMapping.Nationwide;
        // eslint-disable-next-line array-callback-return
        cellValue.split('-').map((item) => {
          if (item !== 'Nationwide') {
            const indexToRemove = valueToRemoveState.indexOf(CsvStatesArrayMapping[item]);
            if (indexToRemove !== -1) {
              valueToRemoveState.splice(indexToRemove, 1);
            }
          }
        });
        statesArray = valueToRemoveState.filter(Boolean);
      }
    } else if (cellValue.includes(', ')) {
      statesArray = cellValue.split(',').map((item) => CsvStatesArrayMapping[item.trim()]);
    } else {
      statesArray = CsvStatesArrayMapping[cellValue];
    }
  }

  return statesArray;
};

// common function for getting property type
const getPropertyType = (propertyValue) => {
  let propertyType = [];

  if (propertyValue) {
    if (propertyValue === 'All') {
      propertyType = CsvLenderPropertyTypeMapping.All;
    } else if (propertyValue === 'Default') {
      propertyType = defaultAssetTypeOfDeal;
    } else if (propertyValue.includes('Default')) {
      if (propertyValue.includes('+')) {
        const valueToAddInProperty = defaultAssetTypeOfDeal;
        // eslint-disable-next-line array-callback-return
        propertyValue.split('+').map((item) => {
          if (item !== 'Default' && !valueToAddInProperty.includes(CsvLenderPropertyTypeMapping[item])) {
            valueToAddInProperty.push(CsvLenderPropertyTypeMapping[item]);
          }
        });
        propertyType = valueToAddInProperty.filter(Boolean);
      } else if (propertyValue.includes('-')) {
        const valueToRemoveProperty = defaultAssetTypeOfDeal;
        // eslint-disable-next-line array-callback-return
        propertyValue.split('-').map((item) => {
          if (item !== 'Default') {
            const indexToRemove = valueToRemoveProperty.indexOf(CsvLenderPropertyTypeMapping[item]);
            if (indexToRemove !== -1) {
              valueToRemoveProperty.splice(indexToRemove, 1);
            }
          }
        });
        propertyType = valueToRemoveProperty.filter(Boolean);
      }
    } else if (propertyValue.includes(', ')) {
      propertyType = propertyValue.split(',').map((item) => CsvLenderPropertyTypeMapping[item.trim()]);
    } else {
      propertyType = CsvLenderPropertyTypeMapping[propertyValue];
    }
  }

  return propertyType;
};

// eslint-disable-next-line import/prefer-default-export
export const importDataFromFile = catchAsync(async (file, res) => {
  try {
    let data;
    if (Object.values(file.files).length) {
      data = Object.values(file.files)[0].data;
    }
    if (_.flatten(Object.values(file.files)).length > 1) {
      throw new Error(httpStatus.BAD_REQUEST, 'You can Upload only one File');
    }
    const lenderWorkbook = XLSX.read(data, { type: 'buffer' });
    await workbook.xlsx.load(data);

    const lenderWorksheet = workbook.getWorksheet(lenderWorkbook.SheetNames[1]);
    const lenderWorkbookSheetName = lenderWorkbook.SheetNames[1];
    const lenderWorkbookSheet = lenderWorkbook.Sheets[lenderWorkbookSheetName];

    const lenderIdValue = Object.entries(lenderWorkbookSheet).find(
      ([, value]) => value.v === LenderWorkBookExcelEnum.PROGRAM_ID
    );
    const programValue = Object.entries(lenderWorkbookSheet).find(
      ([, value]) => value.v === LenderWorkBookExcelEnum.LENDER_NAME
    );

    // common function for getting tags for state, loan type, property type
    const getColumnValueNumber = (row, col, validationMessage) => {
      const tag = lenderWorksheet.getCell(row, col);
      if (typeof tag.value !== 'number') {
        if (tag.value) {
          return tag.value.split(', ').map((item) => {
            if (item < 1 || item > 5) {
              throw new Error(`${validationMessage} row: ${row} col: ${col}`);
            }
            return parseInt(item, 10);
          });
        }
      } else {
        if (tag.value < 1 || tag.value > 5) {
          throw new Error(`${validationMessage} row: ${row} col: ${col}`);
        }
        return tag.value;
      }
    };

    if (lenderIdValue) {
      let currentCell = lenderWorksheet.getCell(programValue[0]);
      let currentRowNo = currentCell.row + 1;
      while (true) {
        const program = {};
        // eslint-disable-next-line no-await-in-loop
        const lenderName = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.LENDER_NAME
        );
        const lenderType = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.LENDER_TYPE
        );
        const programName = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_NAME
        );
        program.lenderProgramType = programName.value;

        const programMinLoanSize = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_LOAN_SIZE
        );
        if (programMinLoanSize.value) {
          if (programMinLoanSize.value < 100000 || programMinLoanSize.value > 1000000000) {
            throw new Error(
              `minLoanSize must be a containing from 100000 to 1000000000 row:${currentRowNo} col: ${
                currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_LOAN_SIZE
              }`
            );
          }
          if (typeof programMinLoanSize.value === 'number') {
            program.minLoanSize = programMinLoanSize.value;
          } else {
            program.minLoanSize = Number(programMinLoanSize.value.replace(/[^0-9.-]+/g, ''));
          }
        }
        const programMinTag = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_TAG
        );
        if (programMinTag.value) {
          if (programMinTag.value < 1 || programMinTag.value > 5) {
            throw new Error(
              `minLoanSizeTag must be a containing numbers from 1 to 5 row:${currentRowNo} col: ${
                currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_TAG
              }`
            );
          }
        }
        program.minLoanTag = programMinTag.value;
        const programMaxLoanSize = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_LOAN_SIZE
        );
        if (programMaxLoanSize.value) {
          if (programMaxLoanSize.value < 100000 || programMaxLoanSize.value > 1000000000) {
            throw new Error(
              `maxLoanSize must be a containing from 100000 to 1000000000 row:${currentRowNo} col: ${
                currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_LOAN_SIZE
              }`
            );
          }
          if (typeof programMaxLoanSize.value === 'number') {
            program.maxLoanSize = programMaxLoanSize.value;
          } else {
            program.maxLoanSize = Number(programMaxLoanSize.value.replace(/[^0-9.-]+/g, ''));
          }
        }

        const programMaxTag = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_TAG
        );
        if (programMaxTag.value) {
          if (programMaxTag.value < 1 || programMaxTag.value > 5) {
            throw new Error(
              `maxLoanSizeTag must be a containing numbers from 1 to 5 row:${currentRowNo} col: ${
                currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_TAG
              }`
            );
          }
        }
        program.maxLoanTag = programMaxTag.value;
        const programStates = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_STATES
        );
        // common function calling for getting states array
        program.statesArray = getStatesArray(programStates.value);
        // calling common function for getting states array tag
        program.statesArrTag = getColumnValueNumber(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_STATE_TAGS,
          'stateTag must be an array containing numbers from 1 to 5'
        );
        const programPropertyType = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_PROPERTY_TYPE
        );
        // common function calling for getting property type
        program.propertyType = getPropertyType(programPropertyType.value);
        // calling common function for getting property type tag
        program.propTypeArrTag = getColumnValueNumber(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_PROPERTY_TYPE_TAGS,
          'propertyTypeArrTag must be an array containing numbers from 1 to 5'
        );

        const actualArray = CsvLenderPropertyTypeMapping.All;
        const propArray = program.propertyType;
        if (propArray) {
          program.doesNotLandOn = actualArray.filter((item) => !propArray.includes(item));
        }

        const doesNotTag = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.DOES_NOT_LAND_ON_TAGS
        );
        if (doesNotTag.value) {
          if (doesNotTag.value < 1 || doesNotTag.value > 5) {
            throw new Error(
              `doesNotTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${
                currentCell.col + LenderWorkBookKeyColMappingForInstitute.DOES_NOT_LAND_ON_TAGS
              }`
            );
          }
        }
        program.doesNotLandOnArrTag = doesNotTag.value;

        const loanType = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.LOAN_TYPE
        );
        if (loanType.value) {
          if (loanType.value.includes(', ')) {
            program.loanType = loanType.value.split(',').map((item) => CsvLenderLoanTypeMapping[item.trim()]);
          } else {
            program.loanType = [CsvLenderLoanTypeMapping[loanType.value]];
          }
        }
        // calling common function for getting loan type tag
        program.loanTypeArrTag = getColumnValueNumber(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.LOAN_TYPE_TAG,
          'loanTypeTag must be an array containing numbers from 1 to 5'
        );

        const index = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.INDEX_USED
        );
        program.indexUsed = index.value;

        const spread = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.SPREAD_ESTIMATION
        );
        program.spreadEstimate = spread.value;

        const counties = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.COUNTIES
        );
        program.counties = counties.value;

        const recourse = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.RECOURSE
        );
        program.recourseRequired = recourse.value;

        const nonRecourse = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.NON_RECOURSE
        );
        program.nonRecourseLTV = nonRecourse.value;

        // changing the column number as lender id is in the column 24 and current cell col is 1
        const lenderId = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.INSTITUTE_ID
        );
        const obj = {
          lenderNameVisible: lenderName.value,
          lenderType: CsvLenderTypeMapping[lenderType.value],
        };
        if (lenderId.value) {
          // eslint-disable-next-line no-await-in-loop
          await LendingInstitution.findByIdAndUpdate(lenderId.value, obj);
          program.lenderInstitute = lenderId.value;
        } else {
          // eslint-disable-next-line no-await-in-loop
          const findInstitute = await LendingInstitution.findOne({ lenderNameVisible: lenderName.value });
          if (!findInstitute && lenderName.value) {
            // eslint-disable-next-line no-await-in-loop
            const institute = await LendingInstitution.create({
              lenderNameVisible: lenderName.value,
              lenderType: CsvLenderTypeMapping[lenderType.value],
            });
            program.lenderInstitute = institute._id;
          }
          if (findInstitute) {
            program.lenderInstitute = findInstitute._id;
          }
        }

        const notes = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.NOTES);
        const notesId = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.NOTES_ID
        );
        if (notesId.value) {
          // eslint-disable-next-line no-await-in-loop
          await LenderInstituteNotes.findByIdAndUpdate(notesId.value, { content: notes.value });
        } else if (notes.value) {
          // eslint-disable-next-line no-await-in-loop
          await LenderInstituteNotes.create({
            content: notes.value,
            lenderInstitute: program.lenderInstitute,
          });
        }

        // changing the column number as program id is in the column 23 and current cell col is 1
        const programId = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_ID
        );
        currentCell = lenderWorksheet.getCell(currentRowNo, currentCell.col);
        // Updating current row no by 1 for every loop
        currentRowNo += 1;
        if (!lenderName.value || lenderName.value === null) {
          break;
        }
        program.statesArrTag = program.statesArrTag ? program.statesArrTag : [1];
        program.minLoanTag = program.minLoanTag ? program.minLoanTag : 1;
        program.maxLoanTag = program.maxLoanTag ? program.maxLoanTag : 1;
        program.propTypeArrTag = program.propTypeArrTag ? program.propTypeArrTag : [1];
        program.doesNotLandOnArrTag = program.doesNotLandOnArrTag ? program.doesNotLandOnArrTag : [1];
        program.loanTypeArrTag = program.loanTypeArrTag ? program.loanTypeArrTag : [1];
        if (programId.value) {
          // eslint-disable-next-line no-await-in-loop
          await LenderProgram.findByIdAndUpdate(programId.value, program);
        } else {
          // eslint-disable-next-line no-await-in-loop
          await LenderProgram.create(program);
        }
      }
    } else {
      const lenderValue = Object.entries(lenderWorkbookSheet).find(
        ([, value]) => value.v === LenderWorkBookExcelEnum.LENDER_NAME
      );

      const lenderProgram = [];
      if (lenderValue) {
        let currentCell = lenderWorksheet.getCell(lenderValue[0]);
        let currentRowNo = currentCell.row + 1;
        while (true) {
          const program = {};
          const lenderName = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.LENDER_NAME
          );
          const lenderType = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.LENDER_TYPE
          );
          if (lenderName.value) {
            // eslint-disable-next-line no-await-in-loop
            const findInstitute = await LendingInstitution.findOne({ lenderNameVisible: lenderName.value });
            if (!findInstitute) {
              // eslint-disable-next-line no-await-in-loop
              const institute = await LendingInstitution.create({
                lenderNameVisible: lenderName.value,
                lenderType: CsvLenderTypeMapping[lenderType.value],
              });
              program.lenderInstitute = institute._id;
            }
            if (findInstitute) {
              program.lenderInstitute = findInstitute._id;
            }
          }

          const programName = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_NAME
          );
          program.lenderProgramType = programName.value;
          const min = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_LOAN_SIZE
          );
          if (min.value) {
            if (min.value < 100000 || min.value > 1000000000) {
              throw new Error(
                `minLoanSize must be a containing from 100000 to 1000000000 row:${currentRowNo} col: ${
                  currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_LOAN_SIZE
                }`
              );
            }
            if (typeof min.value === 'number') {
              program.minLoanSize = min.value;
            } else {
              program.minLoanSize = Number(min.value.replace(/[^0-9.-]+/g, ''));
            }
          }

          const minTag = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_TAG
          );
          if (minTag.value) {
            if (minTag.value < 1 || minTag.value > 5) {
              throw new Error(
                `minLoanSizeTag must be a containing numbers from 1 to 5 row:${currentRowNo} col: ${
                  currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_TAG
                }`
              );
            }
          }
          program.minLoanTag = minTag.value;

          const max = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_LOAN_SIZE
          );
          if (max.value) {
            if (max.value < 100000 || max.value > 1000000000) {
              throw new Error(
                `maxLoanSize must be a containing from 100000 to 1000000000 row:${currentRowNo} col: ${
                  currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_LOAN_SIZE
                }`
              );
            }
            if (typeof max.value === 'number') {
              program.maxLoanSize = max.value;
            } else {
              program.maxLoanSize = Number(max.value.replace(/[^0-9.-]+/g, ''));
            }
          }

          program.maxLoanSize = max.value;

          const maxTag = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_TAG
          );
          if (maxTag.value) {
            if (maxTag.value < 1 || maxTag.value > 5) {
              throw new Error(
                `maxLoanSizeTag must be a containing numbers from 1 to 5 row:${currentRowNo} col: ${
                  currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_TAG
                }`
              );
            }
          }

          program.maxLoanTag = maxTag.value;

          const state = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_STATES
          );
          // common function calling for getting states array
          program.statesArray = getStatesArray(state.value);
          // calling common function for getting states array tag
          program.statesArrTag = getColumnValueNumber(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_STATE_TAGS,
            'stateTag must be an array containing numbers from 1 to 5'
          );

          const property = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_PROPERTY_TYPE
          );
          // common function calling for getting property type
          program.propertyType = getPropertyType(property.value);
          // calling common function for getting property type tag
          program.propTypeArrTag = getColumnValueNumber(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_PROPERTY_TYPE_TAGS,
            'propertyTypeArrTag must be an array containing numbers from 1 to 5'
          );

          lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.DOES_NOT_LAND_ON
          );
          const actualArray = CsvLenderPropertyTypeMapping.All;
          const propArray = program.propertyType;
          if (propArray) {
            program.doesNotLandOn = actualArray.filter((item) => !propArray.includes(item));
          }

          const doesNotTag = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.DOES_NOT_LAND_ON_TAGS
          );
          if (doesNotTag.value) {
            if (doesNotTag.value < 1 || doesNotTag.value > 5) {
              throw new Error(
                `doesNotTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${
                  currentCell.col + LenderWorkBookKeyColMappingForInstitute.DOES_NOT_LAND_ON_TAGS
                }`
              );
            }
          }
          program.doesNotLandOnArrTag = doesNotTag.value;

          const loanType = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.LOAN_TYPE
          );

          if (loanType.value) {
            if (loanType.value.includes(', ')) {
              program.loanType = loanType.value.split(',').map((item) => CsvLenderLoanTypeMapping[item.trim()]);
            } else {
              program.loanType = [CsvLenderLoanTypeMapping[loanType.value]];
            }
          }
          // calling common function for getting loan type tag
          program.loanTypeArrTag = getColumnValueNumber(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.LOAN_TYPE_TAG,
            'loanTypeTag must be an array containing numbers from 1 to 5'
          );

          const index = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.INDEX_USED
          );
          program.indexUsed = index.value;

          const spread = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.SPREAD_ESTIMATION
          );
          program.spreadEstimate = spread.value;

          const counties = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.COUNTIES
          );
          program.counties = counties.value;

          const recourse = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.RECOURSE
          );
          program.recourseRequired = recourse.value;

          const nonRecourse = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.NON_RECOURSE
          );
          program.nonRecourseLTV = nonRecourse.value;

          const note = lenderWorksheet.getCell(
            currentCell.row + 2,
            currentCell.col + LenderWorkBookKeyColMappingForInstitute.NOTES
          );
          if (note.value) {
            // eslint-disable-next-line no-await-in-loop
            await LenderInstituteNotes.create({
              content: note.value,
              lenderInstitute: program.lenderInstitute,
            });
          }

          currentCell = lenderWorksheet.getCell(currentRowNo, currentCell.col);
          currentRowNo += 1;
          if (!lenderName.value || !lenderType.value || lenderName.value === null || lenderType.value === null) {
            break;
          }
          program.statesArrTag = program.statesArrTag ? program.statesArrTag : [1];
          program.minLoanTag = program.minLoanTag ? program.minLoanTag : 1;
          program.maxLoanTag = program.maxLoanTag ? program.maxLoanTag : 1;
          program.propTypeArrTag = program.propTypeArrTag ? program.propTypeArrTag : [1];
          program.doesNotLandOnArrTag = program.doesNotLandOnArrTag ? program.doesNotLandOnArrTag : [1];
          program.loanTypeArrTag = program.loanTypeArrTag ? program.loanTypeArrTag : [1];
          lenderProgram.push(program);
        }
        await LenderProgram.deleteMany({});
        await LenderProgram.create(lenderProgram);
      }
    }

    const lenderContactWorksheet = workbook.getWorksheet(lenderWorkbook.SheetNames[0]);
    const lenderContactWorkbookSheetName = lenderWorkbook.SheetNames[0];
    const lenderContactWorkbookSheet = lenderWorkbook.Sheets[lenderContactWorkbookSheetName];

    const lenderContactIdValue = Object.entries(lenderContactWorkbookSheet).find(([, value]) => value.v === 'ContactId');
    const lenderValue = Object.entries(lenderContactWorkbookSheet).find(([, value]) => value.v === 'Lender');

    if (lenderContactIdValue) {
      let currentCell = lenderContactWorksheet.getCell(lenderValue[0]);
      let currentRowNo = currentCell.row + 1;
      while (true) {
        const contact = {};
        const lender = lenderContactWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMappingForContact.LENDER_NAME
        );
        if (lender.value) {
          const firstName = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.FIRST_NAME
          );
          contact.firstName = firstName.value;

          const lastName = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.LAST_NAME
          );
          contact.lastName = lastName.value;

          const program = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.PROGRAMS
          );
          // for multiple values of program in lender contact sheet
          if (program.value !== null) {
            contact.programs = program.value.split(', ').map((item) => item.trim());
          } else {
            contact.programs = program.value;
          }

          const nickName = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.NICK_NAME
          );
          contact.nickName = nickName.value;

          const email = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.EMAIL
          );
          if (email.value) {
            if (typeof email.value === 'string') {
              contact.email = email.value;
            } else if (typeof email.value === 'object') {
              if (email.value.text) {
                contact.email = email.value.text;
              }
            } else {
              throw new Error(
                httpStatus.BAD_REQUEST,
                `Please provide valid Email row:${currentRowNo} col: ${
                  currentCell.col + LenderWorkBookKeyColMappingForContact.EMAIL
                }`
              );
            }
          }

          const mainPhone = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.MAIN_PHONE_NUMBER
          );
          contact.phoneNumberDirect = mainPhone.value;

          const mobilePhone = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.MOBILE_PHONE_NUMBER
          );
          contact.phoneNumberCell = mobilePhone.value;

          const officePhone = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.OFFICE_PHONE_NUMBER
          );
          contact.phoneNumberOffice = officePhone.value;

          const title = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.TITLE
          );
          contact.title = title.text;

          const city = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.CITY
          );
          contact.city = city.value;

          const state = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.STATE
          );
          contact.state = state.value;

          const contactTag = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.CONTACT_TAG
          );
          if (contactTag.value) {
            if (contactTag.value < 1 || contactTag.value > 5) {
              throw new Error('contactTag must be a containing numbers from 1 to 5');
            }
          }
          contact.contactTag = contactTag.value;

          const emailTag = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.EMAIL_TAG
          );
          if (emailTag.value) {
            if (emailTag.value < 1 || emailTag.value > 5) {
              throw new Error('emailTag must be a containing numbers from 1 to 5');
            }
          }
          contact.emailTag = emailTag.value;

          const contactId = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.CONTACT_ID
          );
          if (contactId.value) {
            contact.contactId = mongoose.Types.ObjectId(contactId.value);
          }

          const lenderId = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.LENDER_INSTITUTE
          );
          if (lenderId.value) {
            contact.lenderInstitute = lenderId.value;
            // eslint-disable-next-line no-await-in-loop
            const findInstitute = await LendingInstitution.findOne({ lenderNameVisible: lender.value });
            // in exported contact sheet we are getting lender institute id too.
            // the below condition is if we change the lender name in the contact sheet then it'll update the lender name in lender institution for the same id
            if (!findInstitute) {
              // eslint-disable-next-line no-await-in-loop
              await LendingInstitution.findByIdAndUpdate(lenderId.value, { lenderNameVisible: lender.value });
            }
          } else {
            // when new data is added into the exported sheet we don't have lender institute id for that, so finding the lender institute by the lender name and assigning it's id in the field of lender institute in contacts
            // eslint-disable-next-line no-await-in-loop
            const findInstitution = await LendingInstitution.findOne({ lenderNameVisible: lender.value });
            contact.lenderInstitute = findInstitution._id;
          }
        }
        currentCell = lenderContactWorksheet.getCell(currentRowNo, currentCell.col);
        currentRowNo += 1;
        if (!lender.value || lender.value === null) {
          break;
        }

        if (contact.contactId) {
          contact.contactTag = contact.contactTag ? contact.contactTag : 1;
          contact.emailTag = contact.emailTag ? contact.emailTag : 1;

          // eslint-disable-next-line no-await-in-loop
          await LenderContact.findByIdAndUpdate(contact.contactId, contact);
        } else {
          // eslint-disable-next-line no-await-in-loop
          const con = await LenderContact.findOne({ email: contact.email });
          if (!con) {
            contact.contactTag = contact.contactTag ? contact.contactTag : 1;
            contact.emailTag = contact.emailTag ? contact.emailTag : 1;

            // eslint-disable-next-line no-await-in-loop
            await LenderContact.create(contact);
          }
        }
      }
    } else {
      const lenderContactValue = Object.entries(lenderContactWorkbookSheet).find(([, value]) => value.v === 'Lender');
      const lenderContact = [];
      const notAvailableLender = [];
      if (lenderContactValue) {
        let currentCell = lenderContactWorksheet.getCell(lenderContactValue[0]);
        let currentRowNo = currentCell.row + 1;
        while (true) {
          const contact = {};
          const lender = lenderContactWorksheet.getCell(
            currentRowNo,
            currentCell.col + LenderWorkBookKeyColMappingForContact.LENDER_NAME
          );
          if (lender.value) {
            // eslint-disable-next-line no-await-in-loop
            const lenderInstitute = await LendingInstitution.findOne({ lenderNameVisible: lender.value });
            if (lenderInstitute) {
              contact.lenderInstitute = lenderInstitute._id;

              const firstName = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.FIRST_NAME
              );
              contact.firstName = firstName.value;

              const lastName = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.LAST_NAME
              );
              contact.lastName = lastName.value;

              const program = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.PROGRAMS
              );
              // for multiple values of program in lender contact sheet
              if (program.value !== null) {
                contact.programs = program.value.split(', ').map((item) => item.trim());
              } else {
                contact.programs = program.value;
              }

              const nickName = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.NICK_NAME
              );
              contact.nickName = nickName.value;

              const email = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.EMAIL
              );
              if (email.value) {
                if (typeof email.value === 'string') {
                  contact.email = email.value;
                } else if (typeof email.value === 'object') {
                  if (email.value.text) {
                    contact.email = email.value.text;
                  }
                } else {
                  throw new Error(httpStatus.BAD_REQUEST, 'Please provide valid Email');
                }
              }

              const mainPhone = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.MAIN_PHONE_NUMBER
              );
              contact.phoneNumberDirect = mainPhone.value;

              const mobilePhone = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.MOBILE_PHONE_NUMBER
              );
              contact.phoneNumberCell = mobilePhone.value;

              const officePhone = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.OFFICE_PHONE_NUMBER
              );
              contact.phoneNumberOffice = officePhone.value;

              const title = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.TITLE
              );
              contact.title = title.value;

              const city = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.CITY
              );
              contact.city = city.value;

              const state = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.STATE
              );
              contact.state = state.value;

              const contactTag = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.CONTACT_TAG
              );
              if (contactTag.value) {
                if (contactTag.value < 1 || contactTag.value > 5) {
                  throw new Error('contactTag must be a containing numbers from 1 to 5');
                }
              }
              contact.contactTag = contactTag.value;

              const emailTag = lenderContactWorksheet.getCell(
                currentRowNo,
                currentCell.col + LenderWorkBookKeyColMappingForContact.EMAIL_TAG
              );
              if (emailTag.value) {
                if (emailTag.value < 1 || emailTag.value > 5) {
                  throw new Error('emailTag must be a containing numbers from 1 to 5');
                }
              }
              contact.emailTag = emailTag.value;

              if (contact.email) {
                contact.contactTag = contact.contactTag ? contact.contactTag : 1;
                contact.emailTag = contact.emailTag ? contact.emailTag : 1;
                lenderContact.push(contact);
              }
              if (!contact.email) {
                notAvailableLender.push(contact);
              }
            } else {
              notAvailableLender.push({ lenderName: lender.value });
            }
          }

          currentCell = lenderContactWorksheet.getCell(currentRowNo, currentCell.col);
          currentRowNo += 1;
          if (!lender.value || lender.value === null) {
            break;
          }
        }
      }
      await Promise.all(
        lenderContact.map((lenderCon) =>
          LenderContact.findOneAndUpdate({ email: lenderCon.email }, { ...lenderCon }, { upsert: true })
        )
      );

      if (notAvailableLender.length === 0) {
        return res.status(httpStatus.OK).send({ message: 'data insert from file' });
      }
      if (notAvailableLender.length > 0) {
        return res.status(httpStatus.OK).send({
          result: {
            message: 'This contacts were not added because they do not have Email, FirstName or LastName...',
            data: notAvailableLender,
          },
        });
      }
    }

    return res.status(httpStatus.OK).send({ message: 'data insert from file' });
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, `error from insertDataFromFile controller: ${e.message}`);
  }
});
