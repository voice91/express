const mongoose = require('mongoose');
const XLSX = require('xlsx');
const _ = require('lodash');
const LendingInstitution = require('./models/lendingInstitution.model');
const LenderProgram = require('./models/lenderProgram.model');
const {
  EnumLenderProgramTypeOfLenderProgram,
  EnumAssetTypeOfDeal,
  EnumLoanTypeOfLenderProgram,
  EnumStatesOfDeal,
  EnumLenderTypeOfLendingInstitution,
} = require('./models/enum.model');
const LenderContact = require('./models/lenderContact.model');

// I have inserted one excel sheet at a time so some of the code are commented in this

mongoose
  .connect('mongodb://127.0.0.1:27017/fosocial', { useNewUrlParser: true })
  // eslint-disable-next-line no-unused-vars
  .then(async (connection) => {
    const lenderWorkbook = XLSX.readFile('Lender.xlsx');
    const lenderInstitution = lenderWorkbook.SheetNames[1];
    const lenderInstitutionSheet = lenderWorkbook.Sheets[lenderInstitution];
    const lenderInstitutionSheetData = XLSX.utils.sheet_to_json(lenderInstitutionSheet);

    const CsvLenderTypeMapping = {
      Bank: EnumLenderTypeOfLendingInstitution.BANK,
      'Debt Fund': EnumLenderTypeOfLendingInstitution.DEBT_FUND,
      'Credit Union': EnumLenderTypeOfLendingInstitution.CREDIT_UNION,
      LifeCo: EnumLenderTypeOfLendingInstitution.LIFECO,
    };

    const lenderInstitutes = lenderInstitutionSheetData.map((item) => {
      return { ...item, lenderType: CsvLenderTypeMapping[item.lenderType] };
    });

    await Promise.all(
      lenderInstitutes.map((lenderInst) =>
        LendingInstitution.findOneAndUpdate({ lenderNameVisible: lenderInst.name }, { ...lenderInst }, { upsert: true })
      )
    );

    // const lenderWorkbook = XLSX.readFile('Lender.xlsx');
    const lenderProgram = lenderWorkbook.SheetNames[2];
    const lenderProgramSheet = lenderWorkbook.Sheets[lenderProgram];
    const lenderProgramSheetData = XLSX.utils.sheet_to_json(lenderProgramSheet);

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

    // _.flatten method is a lodash method used to flatten the array. It takes simple array or array of arrays and return array.
    const lenderPropertyType = lenderProgramType.map((item) => {
      return {
        ...item,
        propertyType: _.flatten(item.propertyType.split(',').map((data) => CsvLenderPropertyTypeMapping[data])),
      };
    });

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
    const lenderStatesArray = lenderLoanType.map((item) => {
      return { ...item, statesArray: _.flatten(item.statesArray.split(',').map((data) => CsvStatesArrayMapping[data])) };
    });

    const lenderPrograms = [];
    const lenderInstitute = await LendingInstitution.find({});

    // eslint-disable-next-line array-callback-return
    lenderInstitute.map((item) => {
      // eslint-disable-next-line array-callback-return
      lenderStatesArray.map((data) => {
        if (data.Lender_Name === item.lenderNameVisible) {
          lenderPrograms.push({
            lenderInstitute: item._id,
            lenderProgramType: data.lenderProgramType,
            minLoanSize: data.minLoanSize,
            maxLoanSize: data.maxLoanSize,
            statesArray: data.statesArray,
            propertyType: data.propertyType,
            loanType: data.loanType,
          });
        }
      });
    });

    // const lenderWorkbook = XLSX.readFile('Lender.xlsx');
    const lenderContact = lenderWorkbook.SheetNames[3];
    const lenderContactSheet = lenderWorkbook.Sheets[lenderContact];
    const lenderContactSheetData = XLSX.utils.sheet_to_json(lenderContactSheet);

    const lenderContacts = [];

    // const lenderInstitute = await LendingInstitution.find({});
    // eslint-disable-next-line array-callback-return
    lenderInstitute.map((item) => {
      // eslint-disable-next-line array-callback-return
      lenderContactSheetData.map((data) => {
        if (data.Lender === item.lenderNameVisible) {
          lenderContacts.push({
            lenderInstitute: item._id,
            firstName: data.firstName,
            lastName: data.lastName,
            nickname: data.nickname,
            email: data.email,
            phoneNumberDirect: data.phoneNumberDirect,
            phoneNumberCell: data.phoneNumberCell,
            phoneNumberOffice: data.phoneNumberOffice,
            city: data.city,
            state: data.state,
          });
        }
      });
    });

    // await LendingInstitution.insertMany(lenderInstitutes);
    await LenderProgram.insertMany(lenderPrograms);
    await LenderContact.insertMany(lenderContacts);
  })
  .catch((error) => console.log(error));
