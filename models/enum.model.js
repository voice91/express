/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
const EnumCodeTypeOfCode = {
  RESETPASSWORD: 'resetPassword',
  LOGIN: 'login',
};
const EnumRoleOfUser = {
  USER: 'user',
  ADVISOR: 'advisor',
  LENDER: 'lender',
};
const EnumPlatformOfDeviceToken = {
  ANDROID: 'android',
  IOS: 'ios',
  WEB: 'web',
};
const EnumStatesOfDeal = {
  ALABAMA: 'AL',
  ALASKA: 'AK',
  ARIZONA: 'AZ',
  ARKANSAS: 'AR',
  CALIFORNIA: 'CA',
  COLORADO: 'CO',
  CONNECTICUT: 'CT',
  DELAWARE: 'DE',
  DISTRICT_OF_COLUMBIA: 'DC',
  FLORIDA: 'FL',
  GEORGIA: 'GA',
  HAWAII: 'HI',
  IDAHO: 'ID',
  ILLINOIS: 'IL',
  INDIANA: 'IN',
  IOWA: 'IA',
  KANSAS: 'KS',
  KENTUCKY: 'KY',
  LOUISIANA: 'LA',
  MAINE: 'ME',
  MARYLAND: 'MD',
  MASSACHUSETTS: 'MA',
  MICHIGAN: 'MI',
  MINNESOTA: 'MN',
  MISSISSIPPI: 'MS',
  MISSOURI: 'MO',
  MONTANA: 'MT',
  NEBRASKA: 'NE',
  NEVADA: 'NV',
  NEW_HAMPSHIRE: 'NH',
  NEW_JERSEY: 'NJ',
  NEW_MEXICO: 'NM',
  NEW_YORK: 'NY',
  NORTH_CAROLINA: 'NC',
  NORTH_DAKOTA: 'ND',
  OHIO: 'OH',
  OKLAHOMA: 'OK',
  OREGON: 'OR',
  PENNSYLVANIA: 'PA',
  RHODE_ISLAND: 'RI',
  SOUTH_CAROLINA: 'SC',
  SOUTH_DAKOTA: 'SD',
  TENNESSEE: 'TN',
  TEXAS: 'TX',
  UTAH: 'UT',
  VERMONT: 'VT',
  VIRGINIA: 'VA',
  WASHINGTON: 'WA',
  WEST_VIRGINIA: 'WV',
  WISCONSIN: 'WI',
  WYOMING: 'WY',
};

const EnumStageOfDeal = {
  INTAKE: 'intake',
  PREPARING_MATERIALS: 'preparingMaterials',
  OUT_IN_MARKET: 'outInMarket',
  SELECTING_QUOTES: 'selectingQuotes',
  CLOSING: 'closing',
  CLOSED: 'closed',
};
const EnumAssetTypeOfDeal = {
  MULTIFAMILY: 'multifamily',
  OFFICE: 'office',
  RETAIL: 'retail',
  INDUSTRIAL: 'industrial',
  HOSPITALITY: 'hospitality',
  RESIDENTIAL: 'residential',
  SELF_STORAGE: 'selfStorage',
  MOBILE_HOME_PARK: 'mobileHomePark',
  STUDENT_HOUSING: 'studentHousing',
  SPECIALTY: 'specialty',
  CONDOS: 'condos',
};
const EnumLoanPurposeOfDeal = {
  PURCHASE: 'purchase',
  REFINANCE: 'refinance',
  CONSTRUCTION: 'construction',
};
const EnumLoanTypeOfDeal = {
  STABILIZED: 'stabilized',
  LIGHT_TRANSITIONAL: 'lightTransitional',
  HEAVY_TRANSITIONAL: 'heavyTransitional',
  CONSTRUCTION: 'construction',
  PRE_DEVELOPMENT: 'preDevelopment',
};
const EnumLenderTypeOfLendingInstitution = {
  CREDIT_UNION: 'creditUnion',
  LOCAL_BANK: 'localBank',
  REGIONAL_BANK: 'regionalBank',
  CMBS: 'cmbs',
  AGENCY: 'agency',
  HUD: 'hud',
  LIFECO: 'lifeco',
  DEBT_FUND: 'debtFund',
  HARD_MONEY: 'hardMoney',
  BANK: 'bank',
};
const EnumStageOfLenderPlacement = {
  NEW: 'new',
  SENT: 'sent',
  REVIEWING: 'reviewing',
  TERMS_RECEIVED: 'termsReceived',
  PASS: 'pass',
  TERMS_SHEET_RECEIVED: 'termsSheetReceived',
  CLOSING: 'closing',
  CLOSED: 'closed',
};
const EnumTermSheetOfLenderPlacement = {
  PDF: 'pdf',
  DOC: 'doc',
  DOCX: 'docx',
  PPT: 'ppt',
  XLS: 'xls',
  XLSX: 'xlsx',
  PPTX: 'pptx',
};
const EnumInterestRateTypeOfTerms = {
  FIXED_RATE: 'fixedRate',
  FLOATING_RATE: 'floatingRate',
};
const EnumEmailAttachmentsOfEmailTemplate = {
  PDF: 'pdf',
  DOC: 'doc',
  DOCX: 'docx',
  PPT: 'ppt',
  PPTX: 'pptx',
  XLS: 'xls',
  XLSX: 'xlsx',
};
const EnumTaskDocumentsOfTask = {
  PDF: 'pdf',
  DOC: 'doc',
  DOCX: 'docx',
  PPT: 'ppt',
  PPTX: 'pptx',
  XLS: 'xls',
  XLSX: 'xlsx',
};
const EnumLoanTypeOfLenderProgram = {
  CONSTRUCTION: 'construction',
  CONSTRUCTIONS: 'Construction',
  LIGHT_BRIDGE: 'lightBridge',
  HEAVY_BRIDGE: 'heavyBridge',
  PERMANENT: 'permanent',
  LAND: 'land',
};
const EnumLenderProgramTypeOfLenderProgram = {
  CONSTRUCTION: 'construction',
  TRANSITIONAL: 'transitional',
  STABILIZED: 'stabilized',
  LAND: 'land',
  BRIDGE: 'bridge',
  PERMANENT: 'permanent',
  MAIN: 'main',
  SPECIALTY_BRIDGE: 'specialtyBridge',
  TRANSITIONAL_BRIDGE: 'transitionalBridge',
  CONVENTIONAL: 'conventional',
};
const EnumDocumentTypeOfDealDocument = {
  PROPERTY_INFORMATION: 'propertyInformation',
  FINANCIAL_INFORMATION: 'financialInformation',
  SPONSER_INFORMATION: 'sponserInformation',
  OTHERS: 'others',
};
const EnumFileOfDealDocument = {
  PNG: 'png',
  JPG: 'jpg',
  PDF: 'pdf',
  DOC: 'doc',
  DOCX: 'docx',
  PPT: 'ppt',
  PPTX: 'pptx',
  XLS: 'xls',
  XLSX: 'xlsx',
};
const EnumContentType = {
  APLICATION_PDF: 'application/pdf',
  APLICATION_DOC: 'application/msword',
  APLICATION_DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  APLICATION_PPT: 'application/vnd.ms-powerpoint',
  APLICATION_XLS: 'application/vnd.ms-excel',
  APLICATION_XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  APLICATION_PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  IMAGE_PNG: 'image/png',
  IMAGE_JPEG: 'image/jpeg',
};
const EnumTypeOfToken = {
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
  REFRESH: 'refresh',
};
const EnumTypeOfStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
};

module.exports = {
  EnumContentType,
  EnumCodeTypeOfCode,
  EnumRoleOfUser,
  EnumPlatformOfDeviceToken,
  EnumStageOfDeal,
  EnumAssetTypeOfDeal,
  EnumLoanPurposeOfDeal,
  EnumLoanTypeOfDeal,
  EnumLenderProgramTypeOfLenderProgram,
  EnumLenderTypeOfLendingInstitution,
  EnumStageOfLenderPlacement,
  EnumTermSheetOfLenderPlacement,
  EnumInterestRateTypeOfTerms,
  EnumEmailAttachmentsOfEmailTemplate,
  EnumTaskDocumentsOfTask,
  EnumDocumentTypeOfDealDocument,
  EnumFileOfDealDocument,
  EnumTypeOfToken,
  EnumTypeOfStatus,
  EnumStatesOfDeal,
  EnumLoanTypeOfLenderProgram,
};
