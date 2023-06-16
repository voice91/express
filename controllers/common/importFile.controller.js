import _ from 'lodash';
import httpStatus from 'http-status';
import XLSX from 'xlsx';
import ApiError from '../../utils/ApiError';
import { logger } from '../../config/logger';
import {
  EnumAssetTypeOfDeal,
  EnumLenderTypeOfLendingInstitution,
  EnumLoanTypeOfDeal,
  EnumStatesOfDeal,
} from '../../models/enum.model';
import { LenderContact, LenderProgram, LendingInstitution } from '../../models';

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
        Condos: EnumAssetTypeOfDeal.CONDOS,
        '1-4 SFR': EnumAssetTypeOfDeal['1_4_SFR'],
        Hotel: EnumAssetTypeOfDeal.HOTEL,
        SFR: EnumAssetTypeOfDeal.SFR,
        Hospitality: EnumAssetTypeOfDeal.HOSPITALITY,
        Office: EnumAssetTypeOfDeal.OFFICE,
        'Anchored Retail': EnumAssetTypeOfDeal.ANCHORED_RETAIL,
        Specialty: EnumAssetTypeOfDeal.SPECIALTY,
        NNN: EnumAssetTypeOfDeal.NNN,
        'Mixed Use': EnumAssetTypeOfDeal.MIXED_USE,
        'Gas Stations': EnumAssetTypeOfDeal.GAS_STATIONS,
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
