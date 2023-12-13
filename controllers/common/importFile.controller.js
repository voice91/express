import _ from 'lodash';
import httpStatus from 'http-status';
import XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import {
  CsvLenderLoanTypeMapping,
  CsvLenderPropertyTypeMapping,
  CsvLenderTypeMapping,
  CsvStatesArrayMapping,
  isObjectId,
  processDateForExcel,
} from 'utils/common';
import { catchAsync } from 'utils/catchAsync';
import { LenderContact, LenderInstituteNotes, LenderProgram, LendingInstitution } from 'models';
import enumModel, { EnumAssetTypeOfDeal } from 'models/enum.model';
import ApiError from '../../utils/ApiError';
import { logger } from '../../config/logger';
import { lenderContactService, userService } from '../../services';

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
  DESCRIPTION: 20,
  HEADQUARTERS: 21,
  WEBSITE: 22,
  RANKING: 23,
  NOTE_1_DATE: 24,
  NOTE_1_CONTENT: 25,
  NOTE_1_PERSON: 26,
  NOTE_2_DATE: 27,
  NOTE_2_CONTENT: 28,
  NOTE_2_PERSON: 29,
  NOTE_3_DATE: 30,
  NOTE_3_CONTENT: 31,
  NOTE_3_PERSON: 32,
  NOTE_4_DATE: 33,
  NOTE_4_CONTENT: 34,
  NOTE_4_PERSON: 35,
  NOTE_5_DATE: 36,
  NOTE_5_CONTENT: 37,
  NOTE_5_PERSON: 38,
  PROGRAM_ID: 39,
  INSTITUTE_ID: 40,
  NOTE_1_ID: 41,
  NOTE_2_ID: 42,
  NOTE_3_ID: 43,
  NOTE_4_ID: 44,
  NOTE_5_ID: 45,
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
        const valueToAddInProperty = defaultAssetTypeOfDeal.slice();
        // eslint-disable-next-line array-callback-return
        propertyValue.split('+').map((item) => {
          if (item !== 'Default' && !valueToAddInProperty.includes(CsvLenderPropertyTypeMapping[item])) {
            valueToAddInProperty.push(CsvLenderPropertyTypeMapping[item]);
          }
        });
        propertyType = valueToAddInProperty.filter(Boolean);
      } else if (propertyValue.includes('-')) {
        const valueToRemoveProperty = defaultAssetTypeOfDeal.slice();
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

const getColumnValueNumber = (row, col, validationMessage, lenderWorksheet) => {
  const tag = lenderWorksheet.getCell(row, col);
  if (typeof tag.value !== 'number') {
    if (tag.value) {
      const statesTagArray = [];
      tag.value.split(',').forEach((item) => {
        if (item < 1 || item > 5) {
          throw new Error(`${validationMessage} row: ${row} col: ${col}`);
        }
        statesTagArray.push(parseInt(item.trim(), 10));
      });
      return statesTagArray;
    }
  } else {
    if (tag.value < 1 || tag.value > 5) {
      throw new Error(`${validationMessage} row: ${row} col: ${col}`);
    }
    return tag.value;
  }
};

/**
 * This function processes lender program, notes and institution data from an Excel workbook
 */
const processLenderProgramAndInstitutionData = async (lenderWorkbook, user) => {
  // Extracting worksheet and sheet details from the workbook
  const lenderWorksheet = workbook.getWorksheet(lenderWorkbook.SheetNames[1]);
  const lenderWorkbookSheetName = lenderWorkbook.SheetNames[1];
  const lenderWorkbookSheet = lenderWorkbook.Sheets[lenderWorkbookSheetName];
  // Finding the cell containing the lender name in the workbook
  const programValue = Object.entries(lenderWorkbookSheet).find(
    ([, value]) => value.v === LenderWorkBookExcelEnum.LENDER_NAME
  );
  // Initializing loop variables
  let currentCell = lenderWorksheet.getCell(programValue[0]);
  let currentRowNo = currentCell.row + 1;
  while (true) {
    const program = {};

    // Extracting data from the worksheet for the current row
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
      'stateTag must be an array containing numbers from 1 to 5',
      lenderWorksheet
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
      'propertyTypeArrTag must be an array containing numbers from 1 to 5',
      lenderWorksheet
    );

    const actualArray = CsvLenderPropertyTypeMapping.All;
    const propArray = program.propertyType;
    if (propArray) {
      program.doesNotLandOn = actualArray.filter((item) => !propArray.includes(item));
    }

    program.doesNotLandOnArrTag = getColumnValueNumber(
      currentRowNo,
      currentCell.col + LenderWorkBookKeyColMappingForInstitute.DOES_NOT_LAND_ON_TAGS,
      'doesNotLandOnArrTag must be an array containing numbers from 1 to 5',
      lenderWorksheet
    );

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
      'loanTypeTag must be an array containing numbers from 1 to 5',
      lenderWorksheet
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
    if (counties.value) {
      program.counties = counties.value.split(',').map((item) => item.trim());
    }

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

    const lenderData = {};
    const description = lenderWorksheet.getCell(
      currentRowNo,
      currentCell.col + LenderWorkBookKeyColMappingForInstitute.DESCRIPTION
    );
    const headquarters = lenderWorksheet.getCell(
      currentRowNo,
      currentCell.col + LenderWorkBookKeyColMappingForInstitute.HEADQUARTERS
    );
    const website = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.WEBSITE);
    const ranking = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.RANKING);
    if (description && description.value) {
      lenderData.description = description.value;
    }
    if (headquarters && headquarters.value) {
      lenderData.headquarter = headquarters.value;
    }
    if (website && website.value) {
      lenderData.website = website.value;
    }
    if (ranking && ranking.value) {
      lenderData.creRanking = ranking.value;
    }
    // changing the column number as lender id is in the column 24 and current cell col is 1
    const lenderId = lenderWorksheet.getCell(
      currentRowNo,
      currentCell.col + LenderWorkBookKeyColMappingForInstitute.INSTITUTE_ID
    );
    const obj = {
      lenderNameVisible: lenderName.value,
      lenderType: CsvLenderTypeMapping[lenderType.value],
    };
    Object.assign(obj, lenderData);
    // If lenderId exists, update the existing record; otherwise, create a new record
    if (lenderId.value) {
      // eslint-disable-next-line no-await-in-loop
      const updatedLender = await LendingInstitution.findByIdAndUpdate(lenderId.value, obj, { new: true });
      if (!updatedLender) {
        Object.assign(obj, { _id: lenderId.value });
        // eslint-disable-next-line no-await-in-loop
        const lenderInstitute = await LendingInstitution.create(obj);
        program.lenderInstitute = lenderInstitute._id;
        logger.info(`LendingInstitution created for Id: ${lenderId.value}, Name : ${lenderName.value}`);
      } else {
        logger.info(`LendingInstitution updated for Id: ${lenderId.value}, Name : ${lenderName.value}`);
        program.lenderInstitute = lenderId.value;
      }
    } else {
      // eslint-disable-next-line no-await-in-loop
      const findInstitute = await LendingInstitution.findOneAndUpdate({ lenderNameVisible: lenderName.value }, obj);
      if (!findInstitute && lenderName.value) {
        // eslint-disable-next-line no-await-in-loop
        const institute = await LendingInstitution.create(obj);
        logger.info(`LendingInstitution created Id: ${institute._id}, Name: ${lenderName.value}`);
        program.lenderInstitute = institute._id;
      }
      if (findInstitute) {
        logger.info(`LendingInstitution updated for Id: ${findInstitute._id}, Name: ${lenderName.value}`);
        program.lenderInstitute = findInstitute._id;
      }
    }
    // process 5 notes
    for (let i = 1; i <= 5; i += 1) {
      // Retrieve note content and ID from the worksheet based on the mapping
      const noteContent = lenderWorksheet.getCell(
        currentRowNo,
        currentCell.col + LenderWorkBookKeyColMappingForInstitute[`NOTE_${i}_CONTENT`]
      );
      const noteId = lenderWorksheet.getCell(
        currentRowNo,
        currentCell.col + LenderWorkBookKeyColMappingForInstitute[`NOTE_${i}_ID`]
      );
      const noteDate = lenderWorksheet.getCell(
        currentRowNo,
        currentCell.col + LenderWorkBookKeyColMappingForInstitute[`NOTE_${i}_DATE`]
      );

      if (noteId.value) {
        // If note ID exists, update the corresponding note
        // eslint-disable-next-line no-await-in-loop
        const updatedNote = await LenderInstituteNotes.findByIdAndUpdate(
          noteId.value,
          {
            content: noteContent.value,
            updatedBy: user._id,
            updatedAt: noteDate.value ? processDateForExcel(noteDate.value) : new Date(),
          },
          { new: true, timestamps: false } // timestamps: false passed because need to update manually
        );

        // Prepare data for creating a new note if the update operation did not find a matching note
        const noteData = {
          content: noteContent.value,
          lenderInstitute: program.lenderInstitute,
          createdBy: user._id,
          updatedBy: user._id,
          createdAt: noteDate.value ? processDateForExcel(noteDate.value) : new Date(),
          updatedAt: noteDate.value ? processDateForExcel(noteDate.value) : new Date(),
        };

        if (!updatedNote) {
          // If the note was not updated, create a new note
          if (isObjectId(noteId.value)) {
            // If the note ID is a valid ObjectId, assign it to the note data
            Object.assign(noteData, { _id: noteId.value });
          }

          // eslint-disable-next-line no-await-in-loop
          await LenderInstituteNotes.create(noteData);
          logger.info(`Lender note updated for id ${noteId.value} for lender : ${lenderName.value}`);
        }
      } else if (noteContent.value) {
        // If no note ID exists, create a new note if there is content
        // eslint-disable-next-line no-await-in-loop
        const note = await LenderInstituteNotes.create({
          content: noteContent.value,
          lenderInstitute: program.lenderInstitute,
          createdBy: user._id,
          updatedBy: user._id,
          createdAt: noteDate.value ? processDateForExcel(noteDate.value) : new Date(),
          updatedAt: noteDate.value ? processDateForExcel(noteDate.value) : new Date(),
        });
        logger.info(`Lender Note created with id ${note._id} for lender : ${lenderName.value}`);
      }
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
    // If programId exists, update the existing record; otherwise, create a new record
    if (programId.value) {
      // eslint-disable-next-line no-await-in-loop
      const updatedLenderProgram = await LenderProgram.findByIdAndUpdate(programId.value, program);
      if (!updatedLenderProgram) {
        if (isObjectId(programId.value)) {
          Object.assign(program, { _id: programId.value });
        }
        // eslint-disable-next-line no-await-in-loop
        const lenderProgram = await LenderProgram.create(program);
        logger.info(`LenderProgram created Id : ${lenderProgram._id} for lendingInstitute name : ${lenderName.value}`);
      }
      logger.info(`LenderProgram updated for Id : ${programId.value} for lendingInstitute name : ${lenderName.value}`);
    } else {
      // eslint-disable-next-line no-await-in-loop
      const lenderProgram = await LenderProgram.create(program);
      logger.info(`LenderProgram created Id : ${lenderProgram._id} for lendingInstitute name : ${lenderName.value}`);
    }
  }
};

/**
 * This function processes lender contacts data from an Excel workbook
 */
const processLenderContactData = async (lenderWorkbook) => {
  const lenderContactWorksheet = workbook.getWorksheet(lenderWorkbook.SheetNames[0]);
  const lenderContactWorkbookSheetName = lenderWorkbook.SheetNames[0];
  const lenderContactWorkbookSheet = lenderWorkbook.Sheets[lenderContactWorkbookSheetName];

  const lenderValue = Object.entries(lenderContactWorkbookSheet).find(([, value]) => value.v === 'Lender');
  let currentCell = lenderContactWorksheet.getCell(lenderValue[0]);
  let currentRowNo = currentCell.row + 1;
  const notAvailableLender = [];
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
          contact.email = email.value.trim();
        } else if (typeof email.value === 'object') {
          if (email.value.text) {
            contact.email = email.value.text.trim();
          }
        } else {
          throw new Error(
            httpStatus.BAD_REQUEST,
            `Please provide valid Email row:${currentRowNo} col: ${
              currentCell.col + LenderWorkBookKeyColMappingForContact.EMAIL
            }`
          );
        }
      } else {
        notAvailableLender.push(contact);
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
      if (state.value) {
        contact.state = state.value;
      }

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
          logger.info(`LendingInstitution updated : ${lenderId.value}`);
        }
      } else {
        // when new data is added into the exported sheet we don't have lender institute id for that, so finding the lender institute by the lender name and assigning it's id in the field of lender institute in contacts
        // eslint-disable-next-line no-await-in-loop
        const findInstitution = await LendingInstitution.findOne({ lenderNameVisible: lender.value });
        if (findInstitution) {
          contact.lenderInstitute = findInstitution._id;
        } else {
          notAvailableLender.push({ lenderName: lender.value });
        }
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
      const updatedLender = await LenderContact.findByIdAndUpdate(contact.contactId, contact);
      if (updatedLender && updatedLender.user) {
        // eslint-disable-next-line no-await-in-loop
        await userService.updateUser(
          { _id: updatedLender.user },
          {
            firstName: contact.firstName,
            companyName: lender.value,
            lastName: contact.lastName,
            city: contact.city,
            state: contact.state,
            phoneNumber: contact.phoneNumberCell,
          }
        );
      }
      logger.info(`LenderContact updated for email ${contact.email}`);
    } else if (contact.email && contact.lenderInstitute) {
      contact.contactTag = contact.contactTag ? contact.contactTag : 1;
      contact.emailTag = contact.emailTag ? contact.emailTag : 1;
      // eslint-disable-next-line no-await-in-loop
      const registeredLender = await userService.getOne({ email: contact.email });
      if (!registeredLender) {
        const userBody = {
          firstName: contact.firstName,
          companyName: lender.value,
          lastName: contact.lastName,
          email: contact.email,
          password: Math.random().toString(36).slice(-10),
          emailVerified: true,
          enforcePassword: true,
          role: enumModel.EnumRoleOfUser.LENDER,
        };
        // eslint-disable-next-line no-await-in-loop
        const newLender = await userService.createUser(userBody);
        contact.user = newLender._id;
      } else {
        contact.user = registeredLender._id;
      }
      // eslint-disable-next-line no-await-in-loop
      const updatedContact = await LenderContact.findOneAndUpdate({ email: contact.email }, contact, { new: true });
      if (updatedContact) {
        logger.info(`LenderContact updated for email ${updatedContact.email}`);
      } else {
        // eslint-disable-next-line no-await-in-loop
        await lenderContactService.createLenderContact(contact);
        // eslint-disable-next-line no-await-in-loop
        await userService.updateUser(
          { _id: contact.user },
          {
            firstName: contact.firstName,
            companyName: lender.value,
            lastName: contact.lastName,
            city: contact.city,
            state: contact.state,
            phoneNumber: contact.phoneNumberCell,
          }
        );
      }
    }
  }
  return notAvailableLender;
};

// eslint-disable-next-line import/prefer-default-export
export const importDataFromFile = catchAsync(async (file, res) => {
  try {
    let data;
    const { user } = file;
    // if file is not uploaded then throw an error
    if (!file.files) {
      throw new ApiError(httpStatus.BAD_REQUEST, `Please upload a file`);
    }
    if (Object.values(file.files).length) {
      data = Object.values(file.files)[0].data;
    }
    if (_.flatten(Object.values(file.files)).length > 1) {
      throw new Error(httpStatus.BAD_REQUEST, 'You can Upload only one File');
    }
    const lenderWorkbook = XLSX.read(data, { type: 'buffer' });
    await workbook.xlsx.load(data);

    await processLenderProgramAndInstitutionData(lenderWorkbook, user);
    const notAvailableLender = await processLenderContactData(lenderWorkbook);
    if (notAvailableLender.length > 0) {
      return res.status(httpStatus.OK).send({
        result: {
          message: 'This contacts were not added because they do not have Email, FirstName or LastName...',
          data: notAvailableLender,
        },
      });
    }
    return res.status(httpStatus.OK).send({ message: 'data insert from file' });
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, `error from insertDataFromFile controller: ${e.message}`);
  }
});
