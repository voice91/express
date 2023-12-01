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
  NEW: 'new',
  PREPARING_MATERIALS: 'preparingMaterials',
  OUT_IN_MARKET: 'outInMarket',
  SELECTING_LENDER: 'selectingLender',
  CLOSING: 'closing',
  CLOSED: 'closed',
  ARCHIVE: 'archive',
  ON_HOLD: 'onHold',
};
const EnumAssetTypeOfDeal = {
  MULTIFAMILY: 'multifamily',
  OFFICE: 'office',
  RETAIL: 'retail',
  INDUSTRIAL: 'industrial',
  SELF_STORAGE: 'selfStorage',
  STUDENT_HOUSING: 'studentHousing',
  MOBILE_HOME_PARK: 'mobileHomePark',
  '1_4_SFR': '1_4_sfr',
  CANNABIS: 'cannabis',
  HOTELS: 'hotels',
  FOR_SALE_CONDOS: 'forSaleCondos',
  NNN_RETAIL: 'nnnRetail',
  HEALTHCARE: 'healthcare',
  SHORT_TERM_RENTALS: 'shortTermRentals',
  CO_LIVING: 'coLiving',
  OUTDOOR_STORAGE: 'outdoorStorage',
};

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
  TRANSITIONAL: 'transitional',
  PRE_DEVELOPMENT_LAND: 'preDevelopment/land',
};
const EnumLenderTypeOfLendingInstitution = {
  CREDIT_UNION: 'creditUnion',
  LOCAL_BANK: 'localBank',
  REGIONAL_BANK: 'regionalBank',
  NATIONAL_BANK: 'nationalBank',
  CMBS: 'cmbs',
  AGENCY: 'agency',
  HUD: 'hud',
  LIFE_INSURANCE: 'lifeInsurance',
  DEBT_FUND: 'debtFund',
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
  NOT_RESPONSIVE: 'notResponsive',
  NOT_COMPETITIVE: 'notCompetitive',
  ARCHIVE: 'archive',
};
const EnumNextStepOfLenderPlacement = {
  new: 'Send the lender the deal',
  sent: 'Waiting on lender for initial review',
  reviewing: 'Waiting on lender to review',
  termsReceived: 'Review and negotiate lender terms',
  pass: 'Lender passed due to the credit of the deal',
  termsSheetReceived: 'Review and negotiate term sheet',
  closing: 'Gather and send lender due diligence requests',
  closed: 'Lender closed the deal',
  notResponsive: 'Follow up or archive lender',
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
  FIXED_NO_INDEX: 'fixed(No_Index)',
  FIXED_INDEX: 'fixed(Index)',
  FLOATING: 'floating',
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
const EnumDocumentTypeOfDealDocument = {
  PROPERTY_INFORMATION: 'propertyInformation',
  PROPERTY_FINANCIALS: 'propertyFinancials',
  SPONSOR_INFORMATION: 'sponsorInformation',
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
const EnumPrePaymentTypeOfTerms = {
  LOCKOUT: 'lockout',
  YIELD_MAINTENANCE: 'yieldMaintenance',
  MINIMUM_INTEREST: 'minimumInterest',
  NO_PENALTY: 'noPenalty',
  STEPDOWN: 'stepdown',
};

const EnumOfEmailStatus = {
  SEND_DEAL: 'sendDeal',
  EMAIL_SENT: 'emailSent',
  FOLLOW_UP: 'followUp',
};

const EnumOfNotesTypeOfLenderNotes = {
  EXTERNAL_NOTE: 'externalNote',
  INTERNAL_NOTE: 'internalNote',
};
const EnumOfRecourse = {
  NON_RECOURSE: 'nonRecourse',
  PARTIAL_RECOURSE: 'partialRecourse',
  FULL_RECOURSE: 'fullRecourse',
};
const EnumofExtension = {
  MONTHS: 'months',
  YEARS: 'years',
  TBD: 'tbd',
  NA: 'na',
};
const EnumOfActivityType = {
  NOTE: 'note',
  ACTIVITY: 'activity',
};

const EnumOfDynamicFieldType = {
  BULLET: 'bullet',
  TEXT: 'text',
  BULLET_TEXT: 'bulletText',
  FILE: 'file',
  TABLE: 'table',
};

const EnumOfTypeOfValue = {
  STRING: 'string',
  NUMBER: 'number',
  CURRENCY: 'currency',
  PERCENTAGE: 'percentage',
  YEAR: 'year',
};
const EnumOfSectionName = {
  PROPERTY_SUMMARY: 'propertySummary',
  DEAL_METRICS: 'dealMetrics',
  FINANCING_REQUEST: 'financingRequest',
  SOURCES_AND_USES: 'sourcesAndUses',
  RENT_ROLL_SUMMARY: 'rentRollSummary',
  FINANCIAL_SUMMARY: 'financialSummary',
  DOCUMENTS: 'documents',
};
const EnumOfRatesName = {
  PRIME_RATE: 'Prime Rate',
  SOFR: 'SOFR',
  TREASURY_5_YEAR: 'Treasury 5-Year',
  TREASURY_7_YEAR: 'Treasury 7-Year',
  TREASURY_10_YEAR: 'Treasury 10-Year',
  SOFR_1_MONTH_AVG: 'SOFR 1-Month Avg',
  SOFR_SWAP_2_YEAR: 'SOFR Swap 2-Year',
  SOFR_SWAP_5_YEAR: 'SOFR Swap 5-Year',
  SOFR_SWAP_7_YEAR: 'SOFR Swap 7-Year',
  SOFR_SWAP_10_YEAR: 'SOFR Swap 10-Year',
};

const EnumSheetNameOfUw = {
  SUMMARY: 'Summary',
  RENT_ROLL: 'Rent Roll',
  NOI: 'NOI',
};

const EnumTableNameInUwSheet = {
  PROPERTY_SUMMARY: 'Property Summary',
  DEAL_METRICS: 'Deal Metrics',
  FINANCING_REQUEST: 'Financing Request',
  SOURCES_AND_USES: 'Sources and Uses',
  SOURCES: 'Sources',
  USES: 'Uses',
  FINANCIAL_SUMMARY: 'Financial Summary',
  REVENUE: 'Revenue',
  EXPENSES: 'Expenses',
  RENT_ROLL_SUMMARY: 'Rent Roll Summary',
};

const EnumColumnNameOfFinancialSummary = {
  IN_PLACE: 'In-Place',
  STABILIZED: 'Stabilized',
  NOTES: 'Notes',
  EFFECTIVE_GROSS_INCOME: 'Effective Gross Income',
  TOTAL_OPERATING_EXPNESES: 'Total Operating Expneses', // Expneses spelling is incorrect , but added because same used in UW sheet
};

module.exports = {
  EnumPrePaymentTypeOfTerms,
  EnumContentType,
  EnumCodeTypeOfCode,
  EnumofExtension,
  EnumRoleOfUser,
  EnumPlatformOfDeviceToken,
  EnumOfActivityType,
  EnumStageOfDeal,
  EnumAssetTypeOfDeal,
  EnumLoanPurposeOfDeal,
  EnumLoanTypeOfDeal,
  EnumOfEmailStatus,
  EnumLenderTypeOfLendingInstitution,
  EnumStageOfLenderPlacement,
  EnumTermSheetOfLenderPlacement,
  EnumInterestRateTypeOfTerms,
  EnumEmailAttachmentsOfEmailTemplate,
  EnumTaskDocumentsOfTask,
  EnumDocumentTypeOfDealDocument,
  EnumOfNotesTypeOfLenderNotes,
  EnumFileOfDealDocument,
  EnumTypeOfToken,
  EnumTypeOfStatus,
  EnumStatesOfDeal,
  EnumOfRecourse,
  defaulAssetTypeOfDeal,
  EnumOfDynamicFieldType,
  EnumOfTypeOfValue,
  EnumOfSectionName,
  EnumNextStepOfLenderPlacement,
  EnumOfRatesName,
  EnumSheetNameOfUw,
  EnumTableNameInUwSheet,
  EnumColumnNameOfFinancialSummary,
};
