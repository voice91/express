/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
import ApiError from 'utils/ApiError';
import httpStatus from 'http-status';
import { LendingInstitution, LenderProgram, LenderContact } from 'models';
import XLSX from 'xlsx';
import _ from 'lodash';
import { logger } from 'config/logger';
import {
  EnumAssetTypeOfDeal,
  EnumLenderProgramTypeOfLenderProgram,
  EnumLenderTypeOfLendingInstitution,
  EnumLoanTypeOfLenderProgram,
  EnumStatesOfDeal,
} from '../models/enum.model';

export async function getLendingInstitutionById(id, options = {}) {
  const lendingInstitution = await LendingInstitution.findById(id, options.projection, options);
  return lendingInstitution;
}

export async function getOne(query, options = {}) {
  const lendingInstitution = await LendingInstitution.findOne(query, options.projection, options);
  return lendingInstitution;
}

export async function getLendingInstitutionList(filter, options = {}) {
  const lendingInstitution = await LendingInstitution.find(filter, options.projection, options);
  return lendingInstitution;
}

export async function getLendingInstitutionListWithPagination(filter, options = {}) {
  const lendingInstitution = await LendingInstitution.paginate(filter, options);
  return lendingInstitution;
}

export async function createLendingInstitution(body) {
  const lendingInstitution = await LendingInstitution.create(body);
  return lendingInstitution;
}

export async function updateLendingInstitution(filter, body, options = {}) {
  const lenderPrograms = await LenderProgram.find({ _id: { $in: body.lenderPrograms } });
  if (!lenderPrograms.length) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field lenderPrograms is not valid');
  }
  const contacts = await LenderContact.findOne({ _id: body.contacts });
  if (!contacts) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'field contacts is not valid');
  }
  const lendingInstitution = await LendingInstitution.findOneAndUpdate(filter, body, options);
  return lendingInstitution;
}

export async function updateManyLendingInstitution(filter, body, options = {}) {
  const lendingInstitution = await LendingInstitution.updateMany(filter, body, options);
  return lendingInstitution;
}

export async function removeLendingInstitution(filter) {
  const lendingInstitution = await LendingInstitution.findOneAndRemove(filter);
  return lendingInstitution;
}

export async function removeManyLendingInstitution(filter) {
  const lendingInstitution = await LendingInstitution.deleteMany(filter);
  return lendingInstitution;
}

export async function insertDataFromFile(file) {
  try {
    const lenderWorkbook = XLSX.read(file.files.file.data, { type: 'buffer' });
    const lenderInstitution = lenderWorkbook.SheetNames[1];
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

    const lenderProgram = lenderWorkbook.SheetNames[2];
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
      Construction: EnumLoanTypeOfLenderProgram.CONSTRUCTION,
      Bridge: [EnumLoanTypeOfLenderProgram.LIGHT_BRIDGE, EnumLoanTypeOfLenderProgram.HEAVY_BRIDGE],
      Permanent: EnumLoanTypeOfLenderProgram.PERMANENT,
      Land: EnumLoanTypeOfLenderProgram.LAND,
      'Light Bridge': EnumLoanTypeOfLenderProgram.LIGHT_BRIDGE,
      'Heavy Bridge': EnumLoanTypeOfLenderProgram.HEAVY_BRIDGE,
      Condos: EnumLoanTypeOfLenderProgram.CONDOS,
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
            .map((data) => CsvLenderLoanTypeMapping[data])
        ),
      };
    });
    logger.info('lenderLoanType');

    const lenderStatesArray = lenderLoanType.map((item) => {
      return {
        ...item,
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

    const lenderContact = lenderWorkbook.SheetNames[3];
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
            nickname: lsa.nickname,
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

    return { status: true, message: 'data insert from file' };
  } catch (e) {
    logger.info(e);
    throw new Error('error from insertDataFromFile services ', e.message);
  }
}
