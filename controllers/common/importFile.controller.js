import _ from 'lodash';
import httpStatus from 'http-status';
import XLSX from 'xlsx';
import ApiError from '../../utils/ApiError';
import { logger } from '../../config/logger';
import {
  EnumAssetTypeOfDeal,
  EnumLenderProgramTypeOfLenderProgram,
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
      const lenderInstitution = lenderWorkbook.SheetNames[6];
      const lenderInstitutionSheet = lenderWorkbook.Sheets[lenderInstitution];
      const lenderInstitutionSheetData = XLSX.utils.sheet_to_json(lenderInstitutionSheet);
      logger.info('Read lenderInstitutionSheetData');

      const CsvLenderTypeMapping = {
        Bank: EnumLenderTypeOfLendingInstitution.BANK,
        'Debt Fund': EnumLenderTypeOfLendingInstitution.DEBT_FUND,
        'Credit Union': EnumLenderTypeOfLendingInstitution.CREDIT_UNION,
        LifeCo: EnumLenderTypeOfLendingInstitution.LIFECO,
      };

      const lenderInstitutes = lenderInstitutionSheetData.map((item) => {
        return { ...item, lenderType: CsvLenderTypeMapping[item.lenderType] };
      });
      logger.info('Get lenderInstitutes');

      await Promise.all(
        lenderInstitutes.map((lenderInst) =>
          LendingInstitution.findOneAndUpdate(
            { lenderNameVisible: lenderInst.lenderNameVisible },
            { ...lenderInst },
            { upsert: true }
          )
        )
      );
      logger.info('Insert lenderInstitute Data');

      const lenderProgram = lenderWorkbook.SheetNames[7];
      const lenderProgramSheet = lenderWorkbook.Sheets[lenderProgram];
      const lenderProgramSheetData = XLSX.utils.sheet_to_json(lenderProgramSheet);
      logger.info('Read lenderProgramSheetData');

      const CsvLenderProgramTypeMapping = {
        Construction: EnumLenderProgramTypeOfLenderProgram.CONSTRUCTION,
        Bridge: EnumLenderProgramTypeOfLenderProgram.BRIDGE,
        Permanent: EnumLenderProgramTypeOfLenderProgram.PERMANENT,
        Main: EnumLenderProgramTypeOfLenderProgram.MAIN,
        'Specialty Bridge': EnumLenderProgramTypeOfLenderProgram.SPECIALTY_BRIDGE,
        'Transitional Bridge': EnumLenderProgramTypeOfLenderProgram.TRANSITIONAL_BRIDGE,
        Land: EnumLenderProgramTypeOfLenderProgram.LAND,
        Conventional: EnumLenderProgramTypeOfLenderProgram.CONVENTIONAL,
      };

      const CsvLenderPropertyTypeMapping = {
        Multifamily: EnumAssetTypeOfDeal.MULTIFAMILY,
        'Student Housing': EnumAssetTypeOfDeal.STUDENT_HOUSING,
        Industrial: EnumAssetTypeOfDeal.INDUSTRIAL,
        'Self-Storage': EnumAssetTypeOfDeal.SELF_STORAGE,
        Retail: EnumAssetTypeOfDeal.RETAIL,
        Condos: EnumAssetTypeOfDeal.CONDOS,
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
        NY: EnumStatesOfDeal.NEW_YORK,
        NJ: EnumStatesOfDeal.NEW_JERSEY,
        CA: EnumStatesOfDeal.CALIFORNIA,
        NV: EnumStatesOfDeal.NEVADA,
        TX: EnumStatesOfDeal.TEXAS,
        WA: EnumStatesOfDeal.WASHINGTON,
        IL: EnumStatesOfDeal.ILLINOIS,
        DC: EnumStatesOfDeal.DISTRICT_OF_COLUMBIA,
        MA: EnumStatesOfDeal.MASSACHUSETTS,
        WI: EnumStatesOfDeal.WISCONSIN,
        IN: EnumStatesOfDeal.INDIANA,
        AR: EnumStatesOfDeal.ARKANSAS,
        MO: EnumStatesOfDeal.MISSOURI,
        FL: EnumStatesOfDeal.FLORIDA,
        ID: EnumStatesOfDeal.IDAHO,
        LA: EnumStatesOfDeal.LOUISIANA,
        MS: EnumStatesOfDeal.MISSISSIPPI,
        TN: EnumStatesOfDeal.TENNESSEE,
        MI: EnumStatesOfDeal.MICHIGAN,
        KS: EnumStatesOfDeal.KANSAS,
        OK: EnumStatesOfDeal.OKLAHOMA,
        NC: EnumStatesOfDeal.NORTH_CAROLINA,
        SC: EnumStatesOfDeal.SOUTH_CAROLINA,
        GA: EnumStatesOfDeal.GEORGIA,
        Nationwide: Object.values(EnumStatesOfDeal),
      };

      const lenderProgramType = lenderProgramSheetData.map((item) => {
        return { ...item, lenderProgramType: CsvLenderProgramTypeMapping[item.lenderProgramType] };
      });
      logger.info('lenderProgramType');

      // _.flatten method is a lodash method used to flatten the array. It takes simple array or array of arrays and return array.
      const lenderPropertyType = lenderProgramType.map((item) => {
        return {
          ...item,
          // eslint-disable-next-line no-shadow
          propertyType: _.flatten(item.propertyType.split(',').map((data) => CsvLenderPropertyTypeMapping[data])),
        };
      });
      logger.info('lenderPropertyType');

      const lenderLoanType = lenderPropertyType.map((item) => {
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
      });
      logger.info('lenderLoanType');

      const lenderStatesArray = lenderLoanType.map((item) => {
        return {
          ...item,
          // eslint-disable-next-line no-shadow
          statesArray: _.flatten(item.statesArray.split(',').map((data) => CsvStatesArrayMapping[data])),
        };
      });
      logger.info('lenderStatesArray');

      const lenderInstitute = await LendingInstitution.find({});
      logger.info('Find lenderInstitute Data');

      const lenderPrograms = _.compact(
        // eslint-disable-next-line array-callback-return
        lenderStatesArray.map((lsa) => {
          const institute = lenderInstitute.find((lI) => lI.lenderNameVisible === lsa.Lender_Name);
          if (institute) {
            return {
              lenderInstitute: institute._id,
              lenderProgramType: lsa.lenderProgramType,
              minLoanSize: lsa.minLoanSize,
              maxLoanSize: lsa.maxLoanSize,
              statesArray: lsa.statesArray,
              propertyType: lsa.propertyType,
              loanType: lsa.loanType,
            };
          }
        })
      );

      await LenderProgram.insertMany(lenderPrograms);
      logger.info('Insert lenderProgram Data');

      const lenderContact = lenderWorkbook.SheetNames[8];
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
              firstName: lsa.firstName,
              lastName: lsa.lastName,
              nickName: lsa.nickName,
              email: lsa.email,
              phoneNumberDirect: lsa.phoneNumberDirect,
              phoneNumberCell: lsa.phoneNumberCell,
              phoneNumberOffice: lsa.phoneNumberOffice,
              city: lsa.city,
              state: lsa.state,
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
