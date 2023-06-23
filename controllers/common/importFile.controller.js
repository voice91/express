import _ from 'lodash';
import httpStatus from 'http-status';
import XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import ApiError from '../../utils/ApiError';
import { logger } from '../../config/logger';
import {
  EnumAssetTypeOfDeal,
  EnumLenderTypeOfLendingInstitution,
  EnumLoanTypeOfDeal,
  EnumStatesOfDeal,
  defaulAssetTypeOfDeal,
} from '../../models/enum.model';
import { LenderContact, LenderInstituteNotes, LenderProgram, LendingInstitution } from '../../models';

const workbook = new ExcelJS.Workbook();

// TODO : Need to Remove importDataFromFile after code merge in staging
// eslint-disable-next-line import/prefer-default-export
export async function importDataFromFile(file, res) {
  try {
    let data;
    if (Object.values(file.files).length) {
      data = Object.values(file.files)[0].data;
    }
    if (_.flatten(Object.values(file.files)).length > 1) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You can Upload only one File');
    }
    if (data) {
      const lenderWorkbook = XLSX.read(data, { type: 'buffer' });
      const lenderInstitution = lenderWorkbook.SheetNames[2];
      const lenderInstitutionSheet = lenderWorkbook.Sheets[lenderInstitution];
      const lenderInstitutionSheetData = XLSX.utils.sheet_to_json(lenderInstitutionSheet);
      logger.info('Read lenderInstitutionSheetData');

      const CsvLenderTypeMapping = {
        Bank: EnumLenderTypeOfLendingInstitution.BANK,
        'Debt Fund': EnumLenderTypeOfLendingInstitution.DEBT_FUND,
        'Credit Union': EnumLenderTypeOfLendingInstitution.CREDIT_UNION,
        'National Bank': EnumLenderTypeOfLendingInstitution.NATIONAL_BANK,
        'Regional Bank': EnumLenderTypeOfLendingInstitution.REGIONAL_BANK,
        LifeCo: EnumLenderTypeOfLendingInstitution.LIFECO,
      };

      const lenderInstitutes = lenderInstitutionSheetData.map((item) => {
        return { ...item, lenderType: CsvLenderTypeMapping[item.lenderType] };
      });
      logger.info('Get lenderInstitutes');

      const lenderInstName = [];
      // eslint-disable-next-line array-callback-return
      const uniqLenderInstitutes = lenderInstitutes.filter((lenderInst) => {
        if (!lenderInstName.includes(lenderInst.lenderNameVisible)) {
          lenderInstName.push(lenderInst.lenderNameVisible);
          return lenderInst;
        }
      });

      await Promise.all(
        uniqLenderInstitutes.map((lenderInst) =>
          LendingInstitution.findOneAndUpdate(
            { lenderNameVisible: lenderInst.lenderNameVisible },
            { ...lenderInst },
            { upsert: true }
          )
        )
      );
      logger.info('Insert lenderInstitute Data');

      const lenderProgram = lenderWorkbook.SheetNames[3];
      const lenderProgramSheet = lenderWorkbook.Sheets[lenderProgram];
      const lenderProgramSheetData = XLSX.utils.sheet_to_json(lenderProgramSheet);
      logger.info('Read lenderProgramSheetData');

      const CsvLenderProgramTypeMapping = {
        Construction: 'construction',
        Bridge: 'bridge',
        Permanent: 'permanent',
        Main: 'main',
        'Specialty Bridge': 'specialityBridge',
        'Transitional Bridge': 'transitionalBridge',
        Land: 'land',
        Conventional: 'conventional',
        'Main Bridge': 'mainBridge',
        'SFR Bridge': 'sfrBridge',
        'Note on Note': 'noteOnNote',
        'Local Bank': 'localBank',
        'National Construction': 'nationalConstruction',
      };

      const CsvLenderPropertyTypeMapping = {
        Multifamily: EnumAssetTypeOfDeal.MULTIFAMILY,
        'Student Housing': EnumAssetTypeOfDeal.STUDENT_HOUSING,
        Industrial: EnumAssetTypeOfDeal.INDUSTRIAL,
        'Self-Storage': EnumAssetTypeOfDeal.SELF_STORAGE,
        Retail: EnumAssetTypeOfDeal.RETAIL,
        '1-4 SFR': EnumAssetTypeOfDeal['1_4_SFR'],
        SFR: EnumAssetTypeOfDeal.SFR,
        Hospitality: EnumAssetTypeOfDeal.HOSPITALITY,
        Office: EnumAssetTypeOfDeal.OFFICE,
        NNN: EnumAssetTypeOfDeal.NNN,
        All: Object.values(EnumAssetTypeOfDeal),
      };
      const CsvLenderLoanTypeMapping = {
        Construction: EnumLoanTypeOfDeal.CONSTRUCTION,
        Bridge: [EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL, EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL],
        Permanent: EnumLoanTypeOfDeal.STABILIZED,
        Land: EnumLoanTypeOfDeal.PRE_DEVELOPMENT_LAND,
        'Light Bridge': EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL,
        'Heavy Bridge': EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL,
      };
      const CsvStatesArrayMapping = {
        AL: EnumStatesOfDeal.ALABAMA,
        AK: EnumStatesOfDeal.ALASKA,
        AZ: EnumStatesOfDeal.ARIZONA,
        AR: EnumStatesOfDeal.ARKANSAS,
        CA: EnumStatesOfDeal.CALIFORNIA,
        CO: EnumStatesOfDeal.COLORADO,
        CT: EnumStatesOfDeal.CONNECTICUT,
        DE: EnumStatesOfDeal.DELAWARE,
        DC: EnumStatesOfDeal.DISTRICT_OF_COLUMBIA,
        FL: EnumStatesOfDeal.FLORIDA,
        GA: EnumStatesOfDeal.GEORGIA,
        HI: EnumStatesOfDeal.HAWAII,
        ID: EnumStatesOfDeal.IDAHO,
        IL: EnumStatesOfDeal.ILLINOIS,
        IN: EnumStatesOfDeal.INDIANA,
        IA: EnumStatesOfDeal.IOWA,
        KS: EnumStatesOfDeal.KANSAS,
        KY: EnumStatesOfDeal.KENTUCKY,
        LA: EnumStatesOfDeal.LOUISIANA,
        ME: EnumStatesOfDeal.MAINE,
        MD: EnumStatesOfDeal.MARYLAND,
        MA: EnumStatesOfDeal.MASSACHUSETTS,
        MI: EnumStatesOfDeal.MICHIGAN,
        MN: EnumStatesOfDeal.MINNESOTA,
        MS: EnumStatesOfDeal.MISSISSIPPI,
        MO: EnumStatesOfDeal.MISSOURI,
        MT: EnumStatesOfDeal.MONTANA,
        NE: EnumStatesOfDeal.NEBRASKA,
        NV: EnumStatesOfDeal.NEVADA,
        NH: EnumStatesOfDeal.NEW_HAMPSHIRE,
        NJ: EnumStatesOfDeal.NEW_JERSEY,
        NM: EnumStatesOfDeal.NEW_MEXICO,
        NY: EnumStatesOfDeal.NEW_YORK,
        NC: EnumStatesOfDeal.NORTH_CAROLINA,
        ND: EnumStatesOfDeal.NORTH_DAKOTA,
        OH: EnumStatesOfDeal.OHIO,
        OK: EnumStatesOfDeal.OKLAHOMA,
        OR: EnumStatesOfDeal.OREGON,
        PA: EnumStatesOfDeal.PENNSYLVANIA,
        RI: EnumStatesOfDeal.RHODE_ISLAND,
        SC: EnumStatesOfDeal.SOUTH_CAROLINA,
        SD: EnumStatesOfDeal.SOUTH_DAKOTA,
        TN: EnumStatesOfDeal.TENNESSEE,
        TX: EnumStatesOfDeal.TEXAS,
        UT: EnumStatesOfDeal.UTAH,
        VT: EnumStatesOfDeal.VERMONT,
        VA: EnumStatesOfDeal.VIRGINIA,
        WA: EnumStatesOfDeal.WASHINGTON,
        WV: EnumStatesOfDeal.WEST_VIRGINIA,
        WI: EnumStatesOfDeal.WISCONSIN,
        WY: EnumStatesOfDeal.WYOMING,
        Nationwide: Object.values(EnumStatesOfDeal),
      };
      const lenderProgramType = lenderProgramSheetData.map((item) => {
        return { ...item, lenderProgramType: CsvLenderProgramTypeMapping[item.lenderProgramType] };
      });
      logger.info('lenderProgramType');

      // _.flatten method is a lodash method used to flatten the array. It takes simple array or array of arrays and return array.
      const lenderPropertyType = lenderProgramType.map((item) => {
        if (item.propertyType) {
          return {
            ...item,
            // eslint-disable-next-line no-shadow
            propertyType: _.flatten(item.propertyType.split(',').map((data) => CsvLenderPropertyTypeMapping[data])),
          };
        }
        return item;
      });
      logger.info('lenderPropertyType');

      const lenderLoanType = lenderPropertyType.map((item) => {
        if (item && item.loanType) {
          return {
            ...item,
            loanType: _.flatten(
              item.loanType
                .replace(/\[|\]/g, '')
                .split(',')
                // eslint-disable-next-line no-shadow
                .map((data) => CsvLenderLoanTypeMapping[data])
            ),
          };
        }
        return item;
      });
      logger.info('lenderLoanType');

      const lenderStatesArrTag = lenderLoanType.map((item) => {
        if (item && item.statesArrTag) {
          if (typeof item.statesArrTag === 'string') {
            return {
              ...item,
              // eslint-disable-next-line no-shadow
              statesArrTag: _.flatten(item.statesArrTag.split(',').map((data) => data)).map(Number),
            };
          }
          return {
            ...item,
            statesArrTag: item.statesArrTag,
          };
        }
        return item;
      });
      logger.info('lenderStatesArrTag');

      const lenderStatesArray = lenderStatesArrTag.map((item) => {
        if (item && item.statesArray) {
          return {
            ...item,
            // eslint-disable-next-line no-shadow
            statesArray: _.flatten(item.statesArray.split(',').map((data) => CsvStatesArrayMapping[data])),
          };
        }
        return item;
      });
      logger.info('lenderStatesArray');

      const lenderPropertyTypeArrTag = lenderStatesArray.map((item) => {
        if (item && item.propTypeArrTag) {
          return {
            ...item,
            propTypeArrTag: item.propTypeArrTag,
          };
        }
        return item;
      });
      logger.info('lenderPropertyTypeArrTag');

      const lenderLoanTypeArrTag = lenderPropertyTypeArrTag.map((item) => {
        if (item && item.loanTypeArrTag) {
          return {
            ...item,
            loanTypeArrTag: item.loanTypeArrTag,
          };
        }
        return item;
      });
      logger.info('lenderLoanTypeArrTag');

      const lenderInstitute = await LendingInstitution.find({});
      logger.info('Find lenderInstitute Data');

      const lenderPrograms = _.compact(
        // eslint-disable-next-line array-callback-return
        lenderLoanTypeArrTag.map((lsa) => {
          const institute = lenderInstitute.find((lI) => lI.lenderNameVisible === lsa.Lender_Name);
          if (institute) {
            return {
              lenderInstitute: institute._id,
              lenderProgramType: lsa.lenderProgramType,
              ...(lsa.minLoanSize && { minLoanSize: lsa.minLoanSize }),
              ...(lsa.minLoanTag && { minLoanTag: lsa.minLoanTag }),
              ...(lsa.maxLoanSize && { maxLoanSize: lsa.maxLoanSize }),
              ...(lsa.maxLoanTag && { maxLoanTag: lsa.maxLoanTag }),
              ...(lsa.statesArray && { statesArray: lsa.statesArray }),
              ...(lsa.statesArrTag && { statesArrTag: lsa.statesArrTag }),
              ...(lsa.propertyType && { propertyType: lsa.propertyType }),
              ...(lsa.propTypeArrTag && { propTypeArrTag: lsa.propTypeArrTag }),
              ...(lsa.loanType && { loanType: lsa.loanType }),
              ...(lsa.loanTypeArrTag && { loanTypeArrTag: lsa.loanTypeArrTag }),
              ...(lsa.indexUsed && { indexUsed: lsa.indexUsed }),
              ...(lsa.spreadEstimate && { spreadEstimate: lsa.spreadEstimate }),
              ...(lsa.counties && { counties: lsa.counties }),
              ...(lsa.recourseRequired && { recourseRequired: lsa.recourseRequired }),
              ...(lsa.nonRecourseLTV && { nonRecourseLTV: lsa.nonRecourseLTV }),
            };
          }
        })
      );
      await LenderProgram.insertMany(lenderPrograms);
      logger.info('Insert lenderProgram Data');

      const lenderContact = lenderWorkbook.SheetNames[4];
      const lenderContactSheet = lenderWorkbook.Sheets[lenderContact];
      const lenderContactSheetData = XLSX.utils.sheet_to_json(lenderContactSheet);
      logger.info('Read lenderContactSheetData');

      const lenderContacts = _.compact(
        // eslint-disable-next-line array-callback-return
        lenderContactSheetData.map((lsa) => {
          const institute = lenderInstitute.find((lI) => lI.lenderNameVisible === lsa.Lender);
          if (institute) {
            return {
              lenderInstitute: institute._id,
              ...(lsa.firstName && { firstName: lsa.firstName }),
              ...(lsa.lastName && { lastName: lsa.lastName }),
              ...(lsa.nickName && { nickName: lsa.nickName }),
              ...(lsa.email && { email: lsa.email.trim() }),
              ...(lsa.phoneNumberDirect && { phoneNumberDirect: lsa.phoneNumberDirect }),
              ...(lsa.phoneNumberCell && { phoneNumberCell: lsa.phoneNumberCell }),
              ...(lsa.phoneNumberOffice && { phoneNumberOffice: lsa.phoneNumberOffice }),
              ...(lsa.city && { city: lsa.city }),
              ...(lsa.state && { state: lsa.state }),
              ...(lsa.title && { title: lsa.title }),
              ...(lsa.emailTag && { emailTag: lsa.emailTag }),
              ...(lsa.contactTag && { contactTag: lsa.contactTag }),
            };
          }
        })
      );

      await Promise.all(
        lenderContacts.map((lenderCon) =>
          LenderContact.findOneAndUpdate({ email: lenderCon.email }, { ...lenderCon }, { upsert: true })
        )
      );
      logger.info('Insert lenderContact Data');

      return res.status(httpStatus.OK).send({ message: 'data insert from file' });
    }
    throw new Error('data not available in file');
  } catch (e) {
    logger.info(e);
    throw new Error('error from insertDataFromFile services ', e.message);
  }
}

export async function importDataFromFileV2(file, res) {
  try {
    let data;
    if (Object.values(file.files).length) {
      data = Object.values(file.files)[0].data;
    }
    if (_.flatten(Object.values(file.files)).length > 1) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You can Upload only one File');
    }
    const lenderWorkbook = XLSX.read(data, { type: 'buffer' });
    await workbook.xlsx.load(data);

    const lenderWorksheet = workbook.getWorksheet(lenderWorkbook.SheetNames[1]);
    const lenderWorkbookSheetName = lenderWorkbook.SheetNames[1];
    const lenderWorkbookSheet = lenderWorkbook.Sheets[lenderWorkbookSheetName];

    const lenderValue = Object.entries(lenderWorkbookSheet).find(([, value]) => value.v === 'Lender Name');

    const lenderProgram = [];
    if (lenderValue) {
      let currentCell = lenderWorksheet.getCell(lenderValue[0]);
      while (true) {
        const program = {};
        const lenderName = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col);
        const lenderType = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 1);
        const CsvLenderTypeMapping = {
          Bank: EnumLenderTypeOfLendingInstitution.BANK,
          'Debt Fund': EnumLenderTypeOfLendingInstitution.DEBT_FUND,
          'Credit Union': EnumLenderTypeOfLendingInstitution.CREDIT_UNION,
          'National Bank': EnumLenderTypeOfLendingInstitution.NATIONAL_BANK,
          'Regional Bank': EnumLenderTypeOfLendingInstitution.REGIONAL_BANK,
          LifeCo: EnumLenderTypeOfLendingInstitution.LIFECO,
          'Life Insurance': EnumLenderTypeOfLendingInstitution.LIFE_INSURANCE,
          CMBS: EnumLenderTypeOfLendingInstitution.CMBS,
          'Local Bank': EnumLenderTypeOfLendingInstitution.LOCAL_BANK,
        };
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
          program.lenderInstitute = findInstitute._id;
        }

        const programName = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 2);
        program.lenderProgramType = programName.value;
        const min = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 3);
        program.minLoanSize = min.value;

        const minTag = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 4);
        program.minLoanTag = minTag.value;

        const max = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 5);
        program.maxLoanSize = max.value;

        const maxTag = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 6);
        program.maxLoanTag = maxTag.value;

        const state = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 7);

        const CsvStatesArrayMapping = {
          AL: EnumStatesOfDeal.ALABAMA,
          AK: EnumStatesOfDeal.ALASKA,
          AZ: EnumStatesOfDeal.ARIZONA,
          AR: EnumStatesOfDeal.ARKANSAS,
          CA: EnumStatesOfDeal.CALIFORNIA,
          CO: EnumStatesOfDeal.COLORADO,
          CT: EnumStatesOfDeal.CONNECTICUT,
          DE: EnumStatesOfDeal.DELAWARE,
          DC: EnumStatesOfDeal.DISTRICT_OF_COLUMBIA,
          FL: EnumStatesOfDeal.FLORIDA,
          GA: EnumStatesOfDeal.GEORGIA,
          HI: EnumStatesOfDeal.HAWAII,
          ID: EnumStatesOfDeal.IDAHO,
          IL: EnumStatesOfDeal.ILLINOIS,
          IN: EnumStatesOfDeal.INDIANA,
          IA: EnumStatesOfDeal.IOWA,
          KS: EnumStatesOfDeal.KANSAS,
          KY: EnumStatesOfDeal.KENTUCKY,
          LA: EnumStatesOfDeal.LOUISIANA,
          ME: EnumStatesOfDeal.MAINE,
          MD: EnumStatesOfDeal.MARYLAND,
          MA: EnumStatesOfDeal.MASSACHUSETTS,
          MI: EnumStatesOfDeal.MICHIGAN,
          MN: EnumStatesOfDeal.MINNESOTA,
          MS: EnumStatesOfDeal.MISSISSIPPI,
          MO: EnumStatesOfDeal.MISSOURI,
          MT: EnumStatesOfDeal.MONTANA,
          NE: EnumStatesOfDeal.NEBRASKA,
          NV: EnumStatesOfDeal.NEVADA,
          NH: EnumStatesOfDeal.NEW_HAMPSHIRE,
          NJ: EnumStatesOfDeal.NEW_JERSEY,
          NM: EnumStatesOfDeal.NEW_MEXICO,
          NY: EnumStatesOfDeal.NEW_YORK,
          NC: EnumStatesOfDeal.NORTH_CAROLINA,
          ND: EnumStatesOfDeal.NORTH_DAKOTA,
          OH: EnumStatesOfDeal.OHIO,
          OK: EnumStatesOfDeal.OKLAHOMA,
          OR: EnumStatesOfDeal.OREGON,
          PA: EnumStatesOfDeal.PENNSYLVANIA,
          RI: EnumStatesOfDeal.RHODE_ISLAND,
          SC: EnumStatesOfDeal.SOUTH_CAROLINA,
          SD: EnumStatesOfDeal.SOUTH_DAKOTA,
          TN: EnumStatesOfDeal.TENNESSEE,
          TX: EnumStatesOfDeal.TEXAS,
          UT: EnumStatesOfDeal.UTAH,
          VT: EnumStatesOfDeal.VERMONT,
          VA: EnumStatesOfDeal.VIRGINIA,
          WA: EnumStatesOfDeal.WASHINGTON,
          WV: EnumStatesOfDeal.WEST_VIRGINIA,
          WI: EnumStatesOfDeal.WISCONSIN,
          WY: EnumStatesOfDeal.WYOMING,
          Nationwide: Object.values(EnumStatesOfDeal),
        };

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
            program.statesArrTag = stateTag.value.split(', ').map((item) => parseInt(item, 10));
          }
        } else {
          program.statesArrTag = stateTag.value;
        }

        const property = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 9);

        const CsvLenderPropertyTypeMapping = {
          Multifamily: EnumAssetTypeOfDeal.MULTIFAMILY,
          'Student Housing': EnumAssetTypeOfDeal.STUDENT_HOUSING,
          Industrial: EnumAssetTypeOfDeal.INDUSTRIAL,
          'Self-Storage': EnumAssetTypeOfDeal.SELF_STORAGE,
          Retail: EnumAssetTypeOfDeal.RETAIL,
          '1_4 SFR': EnumAssetTypeOfDeal['1_4_SFR'],
          Hotels: EnumAssetTypeOfDeal.HOTELS,
          Office: EnumAssetTypeOfDeal.OFFICE,
          'NNN Retail': EnumAssetTypeOfDeal.NNN_RETAIL,
          All: Object.values(EnumAssetTypeOfDeal),
          'Mobile Home Park': EnumAssetTypeOfDeal.MOBILE_HOME_PARK,
          Cannabis: EnumAssetTypeOfDeal.CANNABIS,
          'For Sale Condos': EnumAssetTypeOfDeal.FOR_SALE_CONDOS,
          Healthcare: EnumAssetTypeOfDeal.HEALTHCARE,
          'Short-term rentals': EnumAssetTypeOfDeal.SHORT_TERM_RENTALS,
          'Co-living': EnumAssetTypeOfDeal.CO_LIVING,
          'Outdoor Storage': EnumAssetTypeOfDeal.OUTDOOR_STORAGE,
          Hospitality: EnumAssetTypeOfDeal.HOSPITALITY,
        };

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
            program.propTypeArrTag = propertyTag.value.split(', ').map((item) => parseInt(item, 10));
          }
        } else {
          program.propTypeArrTag = propertyTag.value;
        }

        lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 11);
        const actualArray = CsvLenderPropertyTypeMapping.All;
        const propArray = program.propertyType;
        if (propArray) {
          program.doesNotLandOn = actualArray.filter((item) => !propArray.includes(item));
        }

        const doesNotTag = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 12);
        program.doesNotLandOnArrTag = doesNotTag.value;

        const loanType = lenderWorksheet.getCell(currentCell.row + 2, currentCell.col + 13);

        const CsvLenderLoanTypeMapping = {
          Construction: EnumLoanTypeOfDeal.CONSTRUCTION,
          Bridge: [EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL, EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL],
          Permanent: EnumLoanTypeOfDeal.STABILIZED,
          Land: EnumLoanTypeOfDeal.PRE_DEVELOPMENT_LAND,
          'Light Bridge': EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL,
          'Heavy Bridge': EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL,
          'Light Transitional': EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL,
          'Heavy Transitional': EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL,
          Transitional: EnumLoanTypeOfDeal.TRANSITIONAL,
          Stabilized: EnumLoanTypeOfDeal.STABILIZED,
        };

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
            program.loanTypeArrTag = loanTypeTag.value.split(', ').map((item) => parseInt(item, 10));
          }
        } else {
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
      await LenderProgram.create(lenderProgram);
    }

    const lenderContactWorksheet = workbook.getWorksheet(lenderWorkbook.SheetNames[0]);
    const lenderContactWorkbookSheetName = lenderWorkbook.SheetNames[0];
    const lenderContactWorkbookSheet = lenderWorkbook.Sheets[lenderContactWorkbookSheetName];

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
                throw new ApiError(httpStatus.BAD_REQUEST, 'Please provide valid Email');
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
            contact.contactTag = contactTag.value;

            const emailTag = lenderContactWorksheet.getCell(currentCell.row + 1, currentCell.col + 13);
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
        message: 'This contacts were not added because they did not match our conditions...',
        results: notAvailableLender,
      });
    }
  } catch (e) {
    throw new Error('error from insertDataFromFile controller ', e.message);
  }
}
