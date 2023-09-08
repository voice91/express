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
import { EnumAssetTypeOfDeal, EnumStatesOfDeal } from 'models/enum.model';
import ApiError from '../../utils/ApiError';

const mongoose = require('mongoose');

const workbook = new ExcelJS.Workbook();

export const LenderWorkBookExcelEnum = {
  PROGRAM_ID: 'ProgramId',
  LENDER_NAME: 'Lender Name',
};

export const LenderWorkBookKeyColMapping = {
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

    if (lenderIdValue) {
      let currentCell = lenderWorksheet.getCell(programValue[0]);
      const currentRowNo = currentCell.row + 1;
      while (true) {
        const allNation = Object.values(EnumStatesOfDeal);
        const program = {};
        const defaulAssetTypeOfDeal = [
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

        // eslint-disable-next-line no-await-in-loop
        const lenderName = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMapping.LENDER_NAME);
        const lenderType = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMapping.LENDER_TYPE);

        const programName = lenderWorksheet.getCell(
          currentRowNo,
          currentCell.col + LenderWorkBookKeyColMapping.PROGRAM_NAME
        );
        program.lenderProgramType = programName.value;

        const programMinLoanSizeCol = currentCell.col + LenderWorkBookKeyColMapping.PROGRAM_MIN_LOAN_SIZE;
        const programMinLoanSize = lenderWorksheet.getCell(currentRowNo, programMinLoanSizeCol);
        if (programMinLoanSize.value) {
          if (programMinLoanSize.value < 100000 || programMinLoanSize.value > 1000000000) {
            throw new Error(
              `minLoanSize must be a containing from 100000 to 1000000000 row:${currentRowNo} col: ${programMinLoanSizeCol}`
            );
          }
          if (typeof programMinLoanSize.value === 'number') {
            program.minLoanSize = programMinLoanSize.value;
          } else {
            program.minLoanSize = Number(programMinLoanSize.value.replace(/[^0-9.-]+/g, ''));
          }
        }

        const programMinTagColNo = currentCell.col + LenderWorkBookKeyColMapping.PROGRAM_MIN_TAG;
        const programMinTag = lenderWorksheet.getCell(currentRowNo, programMinTagColNo);
        if (programMinTag.value) {
          if (programMinTag.value < 1 || programMinTag.value > 5) {
            throw new Error(
              `minLoanSizeTag must be a containing numbers from 1 to 5 row:${currentRowNo} col: ${programMinTagColNo}`
            );
          }
        }
        program.minLoanTag = programMinTag.value;

        const programMaxLoanSizeColNo = LenderWorkBookKeyColMapping.PROGRAM_MAX_LOAN_SIZE + 5;
        const programMaxLoanSize = lenderWorksheet.getCell(currentRowNo, programMaxLoanSizeColNo);
        if (programMaxLoanSize.value) {
          if (programMaxLoanSize.value < 100000 || programMaxLoanSize.value > 1000000000) {
            throw new Error(
              `maxLoanSize must be a containing from 100000 to 1000000000 row:${currentRowNo} col: ${programMaxLoanSizeColNo}`
            );
          }
          if (typeof programMaxLoanSize.value === 'number') {
            program.maxLoanSize = programMaxLoanSize.value;
          } else {
            program.maxLoanSize = Number(programMaxLoanSize.value.replace(/[^0-9.-]+/g, ''));
          }
        }

        const programMaxTagColNo = currentCell.col + LenderWorkBookKeyColMapping.PROGRAM_MAX_TAG;
        const programMaxTag = lenderWorksheet.getCell(currentRowNo, programMaxTagColNo);
        if (programMaxTag.value) {
          if (programMaxTag.value < 1 || programMaxTag.value > 5) {
            throw new Error(
              `maxLoanSizeTag must be a containing numbers from 1 to 5 row:${currentRowNo} col: ${programMaxTagColNo}`
            );
          }
        }
        program.maxLoanTag = programMaxTag.value;

        const programStatesColNo = currentCell.col + LenderWorkBookKeyColMapping.PROGRAM_STATES;
        const programStates = lenderWorksheet.getCell(currentRowNo, programStatesColNo);
        // todo : make function for comman code for getting state value=
        if (programStates.value) {
          if (programStates.value === 'Nationwide') {
            program.statesArray = allNation;
          } else if (programStates.value.includes('Nationwide')) {
            if (programStates.value.includes('-')) {
              const valueToRemoveState = allNation;
              // eslint-disable-next-line array-callback-return
              programStates.value.split('-').map((item) => {
                if (item !== 'Nationwide') {
                  const indexToRemove = valueToRemoveState.indexOf(CsvStatesArrayMapping[item]);
                  if (indexToRemove !== -1) {
                    valueToRemoveState.splice(indexToRemove, 1);
                  }
                }
              });
              program.statesArray = valueToRemoveState.filter(Boolean);
            }
          } else if (programStates.value.includes(', ')) {
            program.statesArray = programStates.value.split(',').map((item) => CsvStatesArrayMapping[item.trim()]);
          } else {
            program.statesArray = [CsvStatesArrayMapping[programStates.value]];
          }
        }

        const programStateTagsColNo = LenderWorkBookKeyColMapping.PROGRAM_STATE_TAGS + 8;
        const programStateTags = lenderWorksheet.getCell(currentRowNo, programStateTagsColNo);
        if (typeof programStateTags.value !== 'number') {
          if (programStateTags.value) {
            program.statesArrTag = programStateTags.value.split(', ').map((item) => {
              if (item < 1 || item > 5) {
                throw new Error(
                  `stateTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${programStateTagsColNo}`
                );
              }
              return parseInt(item, 10);
            });
          }
        } else {
          if (programStateTags.value < 1 || programStateTags.value > 5) {
            throw new Error(
              `stateTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${programStateTagsColNo}`
            );
          }
          program.statesArrTag = programStateTags.value;
        }

        const programPropertyTypeColNo = currentCell.col + LenderWorkBookKeyColMapping.PROGRAM_PROPERTY_TYPE;
        const programPropertyType = lenderWorksheet.getCell(currentRowNo, programPropertyTypeColNo);
        // todo : make function for comman code for getting property value
        if (programPropertyType.value) {
          if (programPropertyType.value === 'All') {
            program.propertyType = CsvLenderPropertyTypeMapping.All;
          } else if (programPropertyType.value === 'Default') {
            program.propertyType = defaulAssetTypeOfDeal;
          } else if (programPropertyType.value.includes('Default')) {
            if (programPropertyType.value.includes('+')) {
              const valueToAddInProperty = defaulAssetTypeOfDeal;
              // eslint-disable-next-line array-callback-return
              programPropertyType.value.split('+').map((item) => {
                if (item !== 'Default') {
                  if (!valueToAddInProperty.includes(CsvLenderPropertyTypeMapping[item])) {
                    valueToAddInProperty.push(CsvLenderPropertyTypeMapping[item]);
                  }
                }
              });
              program.propertyType = valueToAddInProperty.filter(Boolean);
            } else if (programPropertyType.value.includes('-')) {
              const valueToRemoveProperty = defaulAssetTypeOfDeal;
              // eslint-disable-next-line array-callback-return
              programPropertyType.value.split('-').map((item) => {
                if (item !== 'Default') {
                  const indexToRemove = valueToRemoveProperty.indexOf(CsvLenderPropertyTypeMapping[item]);
                  if (indexToRemove !== -1) {
                    valueToRemoveProperty.splice(indexToRemove, 1);
                  }
                }
              });
              program.propertyType = valueToRemoveProperty.filter(Boolean);
            }
          } else if (programPropertyType.value.includes(', ')) {
            program.propertyType = programPropertyType.value
              .split(',')
              .map((item) => CsvLenderPropertyTypeMapping[item.trim()]);
          } else {
            program.propertyType = [CsvLenderPropertyTypeMapping[programPropertyType.value]];
          }
        }

        const propertyTag = lenderWorksheet.getCell(currentRowNo, currentCell.col + 10);
        if (typeof propertyTag.value !== 'number') {
          if (propertyTag.value) {
            program.propTypeArrTag = propertyTag.value.split(', ').map((item) => {
              if (item < 1 || item > 5) {
                throw new Error(
                  `propertyTypeArrTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${
                    currentCell.col + 10
                  }`
                );
              }
              return parseInt(item, 10);
            });
          }
        } else {
          if (propertyTag.value < 1 || propertyTag.value > 5) {
            throw new Error(
              `propertyTypeArrTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${
                currentCell.col + 10
              }`
            );
          }
          program.propTypeArrTag = propertyTag.value;
        }

        const actualArray = CsvLenderPropertyTypeMapping.All;
        const propArray = program.propertyType;
        if (propArray) {
          program.doesNotLandOn = actualArray.filter((item) => !propArray.includes(item));
        }

        const doesNotTag = lenderWorksheet.getCell(currentRowNo, currentCell.col + 12);
        if (doesNotTag.value) {
          if (doesNotTag.value < 1 || doesNotTag.value > 5) {
            throw new Error(
              `doesNotTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${currentCell.col + 12}`
            );
          }
        }
        program.doesNotLandOnArrTag = doesNotTag.value;

        const loanType = lenderWorksheet.getCell(currentRowNo, currentCell.col + 13);
        if (loanType.value) {
          if (loanType.value.includes(', ')) {
            program.loanType = loanType.value.split(',').map((item) => CsvLenderLoanTypeMapping[item.trim()]);
          } else {
            program.loanType = [CsvLenderLoanTypeMapping[loanType.value]];
          }
        }

        const loanTypeTagCol = currentCell.col + 14;
        const loanTypeTag = lenderWorksheet.getCell(currentRowNo, loanTypeTagCol);
        if (typeof loanTypeTag.value !== 'number') {
          if (loanTypeTag.value) {
            program.loanTypeArrTag = loanTypeTag.value.split(',').map((item) => {
              if (item < 1 || item > 5) {
                throw new Error(
                  `loanTypeTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${loanTypeTagCol}`
                );
              }
              return parseInt(item, 10);
            });
          }
        } else {
          if (loanTypeTag.value < 1 || loanTypeTag.value > 5) {
            throw new Error(
              `loanTypeTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${loanTypeTagCol}`
            );
          }
          program.loanTypeArrTag = loanTypeTag.value;
        }

        const index = lenderWorksheet.getCell(currentRowNo, currentCell.col + 15);
        program.indexUsed = index.value;

        const spread = lenderWorksheet.getCell(currentRowNo, currentCell.col + 16);
        program.spreadEstimate = spread.value;

        const counties = lenderWorksheet.getCell(currentRowNo, currentCell.col + 17);
        program.counties = counties.value;

        const recourse = lenderWorksheet.getCell(currentRowNo, currentCell.col + 18);
        program.recourseRequired = recourse.value;

        const nonRecourse = lenderWorksheet.getCell(currentRowNo, currentCell.col + 19);
        program.nonRecourseLTV = nonRecourse.value;

        const lenderId = lenderWorksheet.getCell(currentRowNo, currentCell.col + 22);
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

        const notes = lenderWorksheet.getCell(currentRowNo, currentCell.col + 20);
        const notesId = lenderWorksheet.getCell(currentRowNo, currentCell.col + 21);
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

        const programId = lenderWorksheet.getCell(currentRowNo, currentCell.col + 23);

        currentCell = lenderWorksheet.getCell(currentRowNo, currentCell.col);
        if (!lenderName.value || lenderName.value === null) {
          break;
        }
        if (programId.value) {
          program.statesArrTag = program.statesArrTag ? program.statesArrTag : [1];
          program.minLoanTag = program.minLoanTag ? program.minLoanTag : 1;
          program.maxLoanTag = program.maxLoanTag ? program.maxLoanTag : 1;
          program.propTypeArrTag = program.propTypeArrTag ? program.propTypeArrTag : [1];
          program.doesNotLandOnArrTag = program.doesNotLandOnArrTag ? program.doesNotLandOnArrTag : [1];
          program.loanTypeArrTag = program.loanTypeArrTag ? program.loanTypeArrTag : [1];

          // eslint-disable-next-line no-await-in-loop
          await LenderProgram.findByIdAndUpdate(programId.value, program);
        } else {
          program.statesArrTag = program.statesArrTag ? program.statesArrTag : [1];
          program.minLoanTag = program.minLoanTag ? program.minLoanTag : 1;
          program.maxLoanTag = program.maxLoanTag ? program.maxLoanTag : 1;
          program.propTypeArrTag = program.propTypeArrTag ? program.propTypeArrTag : [1];
          program.doesNotLandOnArrTag = program.doesNotLandOnArrTag ? program.doesNotLandOnArrTag : [1];
          program.loanTypeArrTag = program.loanTypeArrTag ? program.loanTypeArrTag : [1];
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
        const currentRowNo = currentCell.row + 1;
        while (true) {
          const program = {};
          const allNation = Object.values(EnumStatesOfDeal);
          const defaulAssetTypeOfDeal = [
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
          const lenderName = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col);
          const lenderType = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 1);
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

          const programName = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 2);
          program.lenderProgramType = programName.value;
          const min = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 3);
          if (min.value) {
            if (min.value < 100000 || min.value > 1000000000) {
              throw new Error(
                `minLoanSize must be a containing from 100000 to 1000000000 row:${currentRowNo} col: ${currentCell.col + 3}`
              );
            }
            if (typeof min.value === 'number') {
              program.minLoanSize = min.value;
            } else {
              program.minLoanSize = Number(min.value.replace(/[^0-9.-]+/g, ''));
            }
          }

          const minTag = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 4);
          if (minTag.value) {
            if (minTag.value < 1 || minTag.value > 5) {
              throw new Error(
                `minLoanSizeTag must be a containing numbers from 1 to 5 row:${currentRowNo} col: ${currentCell.col + 3}`
              );
            }
          }
          program.minLoanTag = minTag.value;

          const max = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 5);
          if (max.value) {
            if (max.value < 100000 || max.value > 1000000000) {
              throw new Error(
                `maxLoanSize must be a containing from 100000 to 1000000000 row:${currentRowNo} col: ${currentCell.col + 5}`
              );
            }
            if (typeof max.value === 'number') {
              program.maxLoanSize = max.value;
            } else {
              program.maxLoanSize = Number(max.value.replace(/[^0-9.-]+/g, ''));
            }
          }

          program.maxLoanSize = max.value;

          const maxTag = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 6);
          if (maxTag.value) {
            if (maxTag.value < 1 || maxTag.value > 5) {
              throw new Error(
                `maxLoanSizeTag must be a containing numbers from 1 to 5 row:${currentRowNo} col: ${currentCell.col + 6}`
              );
            }
          }

          program.maxLoanTag = maxTag.value;

          const state = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 7);

          if (state.value) {
            if (state.value === 'Nationwide') {
              program.statesArray = allNation;
            } else if (state.value.includes('Nationwide')) {
              if (state.value.includes('-')) {
                const valueToRemoveState = allNation;
                // eslint-disable-next-line array-callback-return
                state.value.split('-').map((item) => {
                  if (item !== 'Nationwide') {
                    const indexToRemove = valueToRemoveState.indexOf(CsvStatesArrayMapping[item]);
                    if (indexToRemove !== -1) {
                      valueToRemoveState.splice(indexToRemove, 1);
                    }
                  }
                });
                program.statesArray = valueToRemoveState.filter(Boolean);
              }
            } else if (state.value.includes(', ')) {
              program.statesArray = state.value.split(',').map((item) => CsvStatesArrayMapping[item.trim()]);
            } else {
              program.statesArray = [CsvStatesArrayMapping[state.value]];
            }
          }

          const stateTag = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 8);
          if (typeof stateTag.value !== 'number') {
            if (stateTag.value) {
              program.statesArrTag = stateTag.value.split(', ').map((item) => {
                if (item < 1 || item > 5) {
                  throw new Error('stateTag must be an array containing numbers from 1 to 5');
                }
                return parseInt(item, 10);
              });
            }
          } else {
            if (stateTag.value < 1 || stateTag.value > 5) {
              throw new Error(
                `stateTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${currentCell.col + 8}`
              );
            }
            program.statesArrTag = stateTag.value;
          }

          const property = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 9);
          if (property.value) {
            if (property.value === 'All') {
              program.propertyType = CsvLenderPropertyTypeMapping.All;
            } else if (property.value === 'Default') {
              program.propertyType = defaulAssetTypeOfDeal;
            } else if (property.value.includes('Default')) {
              if (property.value.includes('+')) {
                const valueToAddInProperty = defaulAssetTypeOfDeal;
                // eslint-disable-next-line array-callback-return
                property.value.split('+').map((item) => {
                  if (item !== 'Default') {
                    if (!valueToAddInProperty.includes(CsvLenderPropertyTypeMapping[item])) {
                      valueToAddInProperty.push(CsvLenderPropertyTypeMapping[item]);
                    }
                  }
                });
                program.propertyType = valueToAddInProperty.filter(Boolean);
              } else if (property.value.includes('-')) {
                const valueToRemoveProperty = defaulAssetTypeOfDeal;
                // eslint-disable-next-line array-callback-return
                property.value.split('-').map((item) => {
                  if (item !== 'Default') {
                    const indexToRemove = valueToRemoveProperty.indexOf(CsvLenderPropertyTypeMapping[item]);
                    if (indexToRemove !== -1) {
                      valueToRemoveProperty.splice(indexToRemove, 1);
                    }
                  }
                });
                program.propertyType = valueToRemoveProperty.filter(Boolean);
              }
            } else if (property.value.includes(', ')) {
              program.propertyType = property.value.split(',').map((item) => CsvLenderPropertyTypeMapping[item.trim()]);
            } else {
              program.propertyType = [CsvLenderPropertyTypeMapping[property.value]];
            }
          }
          const propertyTagColNo = currentCell.col + 10;
          const propertyTag = lenderWorksheet.getCell(currentCell.row + 2, propertyTagColNo);
          if (typeof propertyTag.value !== 'number') {
            if (propertyTag.value) {
              program.propTypeArrTag = propertyTag.value.split(', ').map((item) => {
                if (item < 1 || item > 5) {
                  throw new Error(
                    `propertyTypeArrTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${propertyTagColNo}`
                  );
                }
                return parseInt(item, 10);
              });
            }
          } else {
            if (propertyTag.value < 1 || propertyTag.value > 5) {
              throw new Error(
                `propertyTypeArrTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${
                  currentCell.col + 10
                }`
              );
            }
            program.propTypeArrTag = propertyTag.value;
          }

          lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 11);
          const actualArray = CsvLenderPropertyTypeMapping.All;
          const propArray = program.propertyType;
          if (propArray) {
            program.doesNotLandOn = actualArray.filter((item) => !propArray.includes(item));
          }

          const doesNotTag = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 12);
          if (doesNotTag.value) {
            if (doesNotTag.value < 1 || doesNotTag.value > 5) {
              throw new Error(
                `doesNotTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${currentCell.col + 12}`
              );
            }
          }
          program.doesNotLandOnArrTag = doesNotTag.value;

          const loanType = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 13);

          if (loanType.value) {
            if (loanType.value.includes(', ')) {
              program.loanType = loanType.value.split(',').map((item) => CsvLenderLoanTypeMapping[item.trim()]);
            } else {
              program.loanType = [CsvLenderLoanTypeMapping[loanType.value]];
            }
          }

          const loanTypeTag = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 14);
          const loanTypeTagColNo = currentCell.col + 14;

          if (typeof loanTypeTag.value !== 'number') {
            if (loanTypeTag.value) {
              program.loanTypeArrTag = loanTypeTag.value.split(',').map((item) => {
                if (item < 1 || item > 5) {
                  throw new Error(
                    `loanTypeTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${loanTypeTagColNo}`
                  );
                }
                return parseInt(item, 10);
              });
            }
          } else {
            if (loanTypeTag.value < 1 || loanTypeTag.value > 5) {
              throw new Error(
                `loanTypeTag must be an array containing numbers from 1 to 5 row:${currentRowNo} col: ${
                  currentCell.col + 14
                }`
              );
            }
            program.loanTypeArrTag = loanTypeTag.value;
          }
          const index = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 15);
          program.indexUsed = index.value;

          const spread = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 16);
          program.spreadEstimate = spread.value;

          const counties = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 17);
          program.counties = counties.value;

          const recourse = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 18);
          program.recourseRequired = recourse.value;

          const nonRecourse = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 19);
          program.nonRecourseLTV = nonRecourse.value;

          const note = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 20);
          if (note.value) {
            // eslint-disable-next-line no-await-in-loop
            await LenderInstituteNotes.create({
              content: note.value,
              lenderInstitute: program.lenderInstitute,
            });
          }

          currentCell = lenderWorksheet.getCell(currentRowNo, currentCell.col);
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
      const currentRowNo = currentCell.row + 1;
      while (true) {
        const contact = {};
        const lender = lenderContactWorksheet.getCell(currentRowNo, currentCell.col);
        if (lender.value) {
          const firstName = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 1);
          contact.firstName = firstName.value;

          const lastName = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 2);
          contact.lastName = lastName.value;

          const program = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 3);
          contact.programs = program.value;

          const nickName = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 4);
          contact.nickName = nickName.value;

          const email = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 5);
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
                `Please provide valid Email row:${currentRowNo} col: ${currentCell.col + 5}`
              );
            }
          }

          const mainPhone = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 6);
          contact.phoneNumberDirect = mainPhone.value;

          const mobilePhone = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 7);
          contact.phoneNumberCell = mobilePhone.value;

          const officePhone = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 8);
          contact.phoneNumberOffice = officePhone.value;

          const title = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 9);
          contact.title = title.text;

          const city = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 10);
          contact.city = city.value;

          const state = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 11);
          contact.state = state.value;

          const contactTag = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 12);
          if (contactTag.value) {
            if (contactTag.value < 1 || contactTag.value > 5) {
              throw new Error('contactTag must be a containing numbers from 1 to 5');
            }
          }
          contact.contactTag = contactTag.value;

          const emailTag = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 13);
          if (emailTag.value) {
            if (emailTag.value < 1 || emailTag.value > 5) {
              throw new Error('emailTag must be a containing numbers from 1 to 5');
            }
          }
          contact.emailTag = emailTag.value;

          const contactId = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 14);
          if (contactId.value) {
            contact.contactId = mongoose.Types.ObjectId(contactId.value);
          }

          const lenderId = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 15);
          if (lenderId.value) {
            contact.lenderInstitute = lenderId.value;
            // eslint-disable-next-line no-await-in-loop
            const findInstitute = await LendingInstitution.findOne({ lenderNameVisible: lender.value });
            if (!findInstitute) {
              // eslint-disable-next-line no-await-in-loop
              await LendingInstitution.findByIdAndUpdate(lenderId.value, { lenderNameVisible: lender.value });
            }
          }
        }
        currentCell = lenderContactWorksheet.getCell(currentRowNo, currentCell.col);
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
        const currentRowNo = currentCell.row + 1;
        while (true) {
          const contact = {};
          const lender = lenderContactWorksheet.getCell(currentRowNo, currentCell.col);
          if (lender.value) {
            // eslint-disable-next-line no-await-in-loop
            const lenderInstitute = await LendingInstitution.findOne({ lenderNameVisible: lender.value });
            if (lenderInstitute) {
              contact.lenderInstitute = lenderInstitute._id;

              const firstName = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 1);
              contact.firstName = firstName.value;

              const lastName = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 2);
              contact.lastName = lastName.value;

              const program = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 3);
              contact.programs = program.value;

              const nickName = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 4);
              contact.nickName = nickName.value;

              const email = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 5);
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

              const mainPhone = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 6);
              contact.phoneNumberDirect = mainPhone.value;

              const mobilePhone = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 7);
              contact.phoneNumberCell = mobilePhone.value;

              const officePhone = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 8);
              contact.phoneNumberOffice = officePhone.value;

              const title = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 9);
              contact.title = title.value;

              const city = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 10);
              contact.city = city.value;

              const state = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 11);
              contact.state = state.value;

              const contactTag = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 12);
              if (contactTag.value) {
                if (contactTag.value < 1 || contactTag.value > 5) {
                  throw new Error('contactTag must be a containing numbers from 1 to 5');
                }
              }
              contact.contactTag = contactTag.value;

              const emailTag = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + 13);
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
