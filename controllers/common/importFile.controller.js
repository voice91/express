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
import { LenderContact, LenderInstituteNotes, LenderProgram, LendingInstitution } from '../../models';
import { EnumAssetTypeOfDeal } from '../../models/enum.model';
import ApiError from '../../utils/ApiError';

const mongoose = require('mongoose');

const workbook = new ExcelJS.Workbook();

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

    const lenderIdValue = Object.entries(lenderWorkbookSheet).find(([, value]) => value.v === 'Id');

    if (lenderIdValue) {
      let currentCell = lenderWorksheet.getCell(lenderIdValue[0]);
      while (true) {
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
        const id = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col);

        // eslint-disable-next-line no-await-in-loop
        const lenderName = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 1);
        const lenderType = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 2);
        const lenderId = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 3);

        const obj = {
          lenderNameVisible: lenderName.value,
          lenderType: lenderType.value,
        };
        // eslint-disable-next-line no-await-in-loop
        await LendingInstitution.findByIdAndUpdate(lenderId.value, obj);

        const programName = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 4);
        program.lenderProgramType = programName.value;

        const state = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 5);
        // todo : make function for comman code for getting state value=
        if (state.value) {
          if (state.value === 'Nationwide') {
            program.statesArray = CsvStatesArrayMapping.Nationwide;
          } else if (state.value.includes('Nationwide')) {
            if (state.value.includes('-')) {
              const valueToRemoveState = CsvStatesArrayMapping.Nationwide;
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

        const stateTag = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 6);
        if (typeof stateTag.value !== 'number') {
          if (stateTag.value) {
            program.statesArrTag = stateTag.value.split(', ').map((item) => {
              if (item <= 1 || item >= 5) {
                throw new Error('stateTag must be an array containing numbers from 1 to 5');
              }
              return parseInt(item, 10);
            });
          }
        } else {
          if (stateTag.value <= 1 || stateTag.value >= 5) {
            throw new Error('stateTag must be an array containing numbers from 1 to 5');
          }
          program.statesArrTag = stateTag.value;
        }

        const min = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 7);
        if (min.value) {
          if (min.value <= 100000 || min.value >= 1000000000) {
            throw new Error('minLoanSize must be a containing from 100000 to 1000000000');
          }
          if (typeof min.value === 'number') {
            program.minLoanSize = min.value;
          } else {
            program.minLoanSize = Number(min.value.replace(/[^0-9.-]+/g, ''));
          }
        }

        const minTag = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 8);
        if (minTag.value) {
          if (minTag.value <= 1 || minTag.value >= 5) {
            throw new Error('minLoanSizeTag must be a containing numbers from 1 to 5');
          }
        }
        program.minLoanTag = minTag.value;

        const max = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 9);
        if (max.value) {
          if (max.value <= 100000 || max.value >= 1000000000) {
            throw new Error('maxLoanSize must be a containing from 100000 to 1000000000');
          }
          if (typeof max.value === 'number') {
            program.maxLoanSize = max.value
          } else {
            program.maxLoanSize = Number(max.value.replace(/[^0-9.-]+/g, ''));
          }
        }

        const maxTag = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 10);
        if (maxTag.value) {
          if (maxTag.value <= 1 || maxTag.value >= 5) {
            throw new Error('maxLoanSizeTag must be a containing numbers from 1 to 5');
          }
        }
        program.maxLoanTag = maxTag.value;

        const property = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 11);
        // todo : make function for comman code for getting property value
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

        const propertyTag = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 12);
        if (typeof propertyTag.value !== 'number') {
          if (propertyTag.value) {
            program.propTypeArrTag = propertyTag.value.split(', ').map((item) => {
              if (item <= 1 || item >= 5) {
                throw new Error('propertyTypeArrTag must be an array containing numbers from 1 to 5');
              }
              return parseInt(item, 10);
            });
          }
        } else {
          if (propertyTag.value <= 1 || propertyTag.value >= 5) {
            throw new Error('propertyTypeArrTag must be an array containing numbers from 1 to 5');
          }
          program.propTypeArrTag = propertyTag.value;
        }

        const actualArray = CsvLenderPropertyTypeMapping.All;
        const propArray = program.propertyType;
        if (propArray) {
          program.doesNotLandOn = actualArray.filter((item) => !propArray.includes(item));
        }

        const doesNotTag = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 14);
        if (doesNotTag.value) {
          if (doesNotTag.value <= 1 || doesNotTag.value >= 5) {
            console.log(`=== doesNotTag.value ====>`, doesNotTag.value);
            // throw new Error('doesNotTag must be an array containing numbers from 1 to 5');
          }
        }
        program.doesNotLandOnArrTag = doesNotTag.value;

        const loanType = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 15);
        if (loanType.value) {
          if (loanType.value.includes(', ')) {
            program.loanType = loanType.value.split(',').map((item) => CsvLenderLoanTypeMapping[item.trim()]);
          } else {
            program.loanType = [CsvLenderLoanTypeMapping[loanType.value]];
          }
        }

        const loanTypeTag = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 16);
        if (typeof loanTypeTag.value !== 'number') {
          if (loanTypeTag.value) {
            program.loanTypeArrTag = loanTypeTag.value.split(',').map((item) => {
              if (item <= 1 || item >= 5) {
                throw new Error('loanTypeTag must be an array containing numbers from 1 to 5');
              }
              return parseInt(item, 10);
            });
          }
        } else {
          if (loanTypeTag.value <= 1 || loanTypeTag.value >= 5) {
            throw new Error('loanTypeTag must be an array containing numbers from 1 to 5');
          }
          program.loanTypeArrTag = loanTypeTag.value;
        }

        const index = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 17);
        program.indexUsed = index.value;

        const spread = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 18);
        program.spreadEstimate = spread.value;

        const counties = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 19);
        program.counties = counties.value;

        const recourse = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 20);
        program.recourseRequired = recourse.value;

        const nonRecourse = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col + 21);
        program.nonRecourseLTV = nonRecourse.value;

        currentCell = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!id.value || id.value === null) {
          break;
        }
        // eslint-disable-next-line no-await-in-loop
        await LenderProgram.findByIdAndUpdate(id.value, program);
      }
    } else {
      const lenderValue = Object.entries(lenderWorkbookSheet).find(([, value]) => value.v === 'Lender Name');

      const lenderProgram = [];
      if (lenderValue) {
        let currentCell = lenderWorksheet.getCell(lenderValue[0]);
        while (true) {
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
            if (min.value <= 100000 || min.value >= 1000000000) {
              throw new Error('minLoanSize must be a containing from 100000 to 1000000000');
            }
            if (typeof min.value === 'number') {
              program.minLoanSize = min.value;
            } else {
              program.minLoanSize = Number(min.value.replace(/[^0-9.-]+/g, ''));
            }
          }

          const minTag = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 4);
          if (minTag.value) {
            if (minTag.value <= 1 || minTag.value >= 5) {
              throw new Error('minLoanSizeTag must be a containing numbers from 1 to 5');
            }
          }
          program.minLoanTag = minTag.value;

          const max = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 5);
          if (max.value) {
            if (max.value <= 100000 || max.value >= 1000000000) {
              throw new Error('maxLoanSize must be a containing from 100000 to 1000000000');
            }
            if (typeof max.value === 'number') {
              program.maxLoanSize = max.value
            } else {
              program.maxLoanSize = Number(max.value.replace(/[^0-9.-]+/g, ''));
            }
          }

          program.maxLoanSize = max.value;

          const maxTag = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 6);
          if (maxTag.value) {
            if (maxTag.value <= 1 || maxTag.value >= 5) {
              throw new Error('maxLoanSizeTag must be a containing numbers from 1 to 5');
            }
          }

          program.maxLoanTag = maxTag.value;

          const state = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 7);

          if (state.value) {
            if (state.value === 'Nationwide') {
              program.statesArray = CsvStatesArrayMapping.Nationwide;
            } else if (state.value.includes('Nationwide')) {
              if (state.value.includes('-')) {
                const valueToRemoveState = CsvStatesArrayMapping.Nationwide;
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
                if (item <= 1 || item >= 5) {
                  throw new Error('stateTag must be an array containing numbers from 1 to 5');
                }
                return parseInt(item, 10);
              });
            }
          } else {
            if (stateTag.value <= 1 || stateTag.value >= 5) {
              throw new Error('stateTag must be an array containing numbers from 1 to 5');
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
          const propertyTag = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 10);
          if (typeof propertyTag.value !== 'number') {
            if (propertyTag.value) {
              program.propTypeArrTag = propertyTag.value.split(', ').map((item) => {
                if (item <= 1 || item >= 5) {
                  throw new Error('propertyTypeArrTag must be an array containing numbers from 1 to 5');
                }
                return parseInt(item, 10);
              });
            }
          } else {
            if (propertyTag.value <= 1 || propertyTag.value >= 5) {
              throw new Error('propertyTypeArrTag must be an array containing numbers from 1 to 5');
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
            if (doesNotTag.value <= 1 || doesNotTag.value >= 5) {
              console.log(`=== doesNotTag.value ====>`, doesNotTag.value);
              // throw new Error('doesNotTag must be an array containing numbers from 1 to 5');
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

          if (typeof loanTypeTag.value !== 'number') {
            if (loanTypeTag.value) {
              program.loanTypeArrTag = loanTypeTag.value.split(',').map((item) => {
                if (item <= 1 || item >= 5) {
                  throw new Error('loanTypeTag must be an array containing numbers from 1 to 5');
                }
                return parseInt(item, 10);
              });
            }
          } else {
            if (loanTypeTag.value <= 1 || loanTypeTag.value >= 5) {
              throw new Error('loanTypeTag must be an array containing numbers from 1 to 5');
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

          currentCell = lenderWorksheet.getCell(currentCell.row + 1, currentCell.col);
          if (!lenderName.value || !lenderType.value || lenderName.value === null || lenderType.value === null) {
            break;
          }
          lenderProgram.push(program);
        }
        await LenderProgram.deleteMany({})
        await LenderProgram.create(lenderProgram);
      }
    }

    const lenderContactWorksheet = workbook.getWorksheet(lenderWorkbook.SheetNames[0]);
    const lenderContactWorkbookSheetName = lenderWorkbook.SheetNames[0];
    const lenderContactWorkbookSheet = lenderWorkbook.Sheets[lenderContactWorkbookSheetName];

    const lenderContactIdValue = Object.entries(lenderContactWorkbookSheet).find(([, value]) => value.v === 'Id');
    if (lenderContactIdValue) {
      let currentCell = lenderContactWorksheet.getCell(lenderContactIdValue[0]);
      while (true) {
        const contact = {};
        const id = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col);
        if (id.value) {
          const lenderId = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 2);

          // eslint-disable-next-line no-await-in-loop
          // const lenderInstitute = await LendingInstitution.findOne({ _id: lenderId.value});

          contact.lenderInstitute = lenderId.value;

          const firstName = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 3);
          contact.firstName = firstName.value;

          const lastName = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 4);
          contact.lastName = lastName.value;

          const nickName = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 5);
          contact.nickName = nickName.value;

          const program = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 6);
          contact.programs = program.value;

          const email = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 7);
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

          const emailTag = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 8);
          if (emailTag.value) {
            if (emailTag.value <= 1 || emailTag.value >= 5) {
              throw new Error('emailTag must be a containing numbers from 1 to 5');
            }
          }
          contact.emailTag = emailTag.value;

          const contactTag = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 9);
          if (contactTag.value) {
            if (contactTag.value <= 1 || contactTag.value >= 5) {
              throw new Error('contactTag must be a containing numbers from 1 to 5');
            }
          }
          contact.contactTag = contactTag.value;

          const mainPhone = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 10);
          contact.phoneNumberDirect = mainPhone.value;

          const mobilePhone = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 11);
          contact.phoneNumberCell = mobilePhone.value;

          const officePhone = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 12);
          contact.phoneNumberOffice = officePhone.value;

          const title = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 13);
          contact.title = title.value;

          const city = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 14);
          contact.city = city.value;

          const state = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 15);
          contact.state = state.value;
        }
        currentCell = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col);
        if (!id.value || id.value === null) {
          break;
        }

        const objectId = mongoose.Types.ObjectId(id.value);

        // eslint-disable-next-line no-await-in-loop
        await LenderContact.findByIdAndUpdate(objectId, contact);
      }
    } else {
      const lenderContactValue = Object.entries(lenderContactWorkbookSheet).find(([, value]) => value.v === 'Lender');
      const lenderContact = [];
      const notAvailableLender = [];
      if (lenderContactValue) {
        let currentCell = lenderContactWorksheet.getCell(lenderContactValue[0]);
        while (true) {
          const contact = {};
          const lender = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col);
          if (lender.value) {
            // eslint-disable-next-line no-await-in-loop
            const lenderInstitute = await LendingInstitution.findOne({ lenderNameVisible: lender.value });
            if (lenderInstitute) {
              contact.lenderInstitute = lenderInstitute._id;

              const firstName = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 1);
              contact.firstName = firstName.value;

              const lastName = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 2);
              contact.lastName = lastName.value;

              const program = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 3);
              contact.programs = program.value;

              const nickName = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 4);
              contact.nickName = nickName.value;

              const email = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 5);
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

              const mainPhone = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 6);
              contact.phoneNumberDirect = mainPhone.value;

              const mobilePhone = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 7);
              contact.phoneNumberCell = mobilePhone.value;

              const officePhone = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 8);
              contact.phoneNumberOffice = officePhone.value;

              const title = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 9);
              contact.title = title.value;

              const city = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 10);
              contact.city = city.value;

              const state = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 11);
              contact.state = state.value;

              const contactTag = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 12);
              if (contactTag.value) {
                if (contactTag.value <= 1 || contactTag.value >= 5) {
                  throw new Error('contactTag must be a containing numbers from 1 to 5');
                }
              }
              contact.contactTag = contactTag.value;

              const emailTag = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 13);
              if (emailTag.value) {
                if (emailTag.value <= 1 || emailTag.value >= 5) {
                  throw new Error('emailTag must be a containing numbers from 1 to 5');
                }
              }
              contact.emailTag = emailTag.value;

              if (contact.email) {
                lenderContact.push(contact);
              }
              if (!contact.email) {
                notAvailableLender.push(contact);
              }
            } else {
              notAvailableLender.push({ lenderName: lender.value });
            }
          }

          currentCell = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col);
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

    // return { message: ' data updated' };
    return res.status(httpStatus.OK).send({ message: 'data insert from file' });
  } catch (e) {
    throw new ApiError(httpStatus.BAD_REQUEST, `error from insertDataFromFile controller: ${e.message}`);
  }
});
