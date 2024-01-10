"use strict";

/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
var EnumOfNodeEnv = {
  PRODUCTION: 'production',
  DEVELOPMENT: 'development',
  SANDBOX: 'sandBox'
};
var EnumCodeTypeOfCode = {
  RESETPASSWORD: 'resetPassword',
  LOGIN: 'login'
};
var EnumRoleOfUser = {
  USER: 'user',
  ADVISOR: 'advisor',
  LENDER: 'lender'
};
var EnumPlatformOfDeviceToken = {
  ANDROID: 'android',
  IOS: 'ios',
  WEB: 'web'
};
var EnumStatesOfDeal = {
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
  WYOMING: 'WY'
};
var EnumStageOfDeal = {
  NEW: 'new',
  PREPARING_MATERIALS: 'preparingMaterials',
  OUT_IN_MARKET: 'outInMarket',
  SELECTING_LENDER: 'selectingLender',
  CLOSING: 'closing',
  CLOSED: 'closed',
  ARCHIVE: 'archive',
  ON_HOLD: 'onHold'
};
var EnumAssetTypeOfDeal = {
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
  OUTDOOR_STORAGE: 'outdoorStorage'
};
var defaulAssetTypeOfDeal = [EnumAssetTypeOfDeal.MULTIFAMILY, EnumAssetTypeOfDeal.OFFICE, EnumAssetTypeOfDeal.RETAIL, EnumAssetTypeOfDeal.INDUSTRIAL, EnumAssetTypeOfDeal.SELF_STORAGE, EnumAssetTypeOfDeal.STUDENT_HOUSING, EnumAssetTypeOfDeal.MOBILE_HOME_PARK, EnumAssetTypeOfDeal.FOR_SALE_CONDOS, EnumAssetTypeOfDeal.NNN_RETAIL];
var EnumLoanPurposeOfDeal = {
  PURCHASE: 'purchase',
  REFINANCE: 'refinance',
  CONSTRUCTION: 'construction'
};
var EnumLoanTypeOfDeal = {
  STABILIZED: 'stabilized',
  LIGHT_TRANSITIONAL: 'lightTransitional',
  HEAVY_TRANSITIONAL: 'heavyTransitional',
  CONSTRUCTION: 'construction',
  TRANSITIONAL: 'transitional',
  PRE_DEVELOPMENT_LAND: 'preDevelopment/land'
};
var EnumLenderTypeOfLendingInstitution = {
  CREDIT_UNION: 'creditUnion',
  LOCAL_BANK: 'localBank',
  REGIONAL_BANK: 'regionalBank',
  NATIONAL_BANK: 'nationalBank',
  CMBS: 'cmbs',
  AGENCY: 'agency',
  HUD: 'hud',
  LIFE_INSURANCE: 'lifeInsurance',
  DEBT_FUND: 'debtFund',
  BANK: 'bank'
};
var EnumStageOfLenderPlacement = {
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
  ARCHIVE: 'archive'
};
var EnumNextStepOfLenderPlacement = {
  "new": 'Send the lender the deal',
  sent: 'Waiting on lender for initial review',
  reviewing: 'Waiting on lender to review',
  termsReceived: 'Review and negotiate lender terms',
  pass: 'Lender passed due to the credit of the deal',
  termsSheetReceived: 'Review and negotiate term sheet',
  closing: 'Gather and send lender due diligence requests',
  closed: 'Lender closed the deal',
  notResponsive: 'Follow up or archive lender'
};
var EnumTermSheetOfLenderPlacement = {
  PDF: 'pdf',
  DOC: 'doc',
  DOCX: 'docx',
  PPT: 'ppt',
  XLS: 'xls',
  XLSX: 'xlsx',
  PPTX: 'pptx'
};
var EnumInterestRateTypeOfTerms = {
  FIXED_NO_INDEX: 'fixed(No_Index)',
  FIXED_INDEX: 'fixed(Index)',
  FLOATING: 'floating'
};
var EnumEmailAttachmentsOfEmailTemplate = {
  PDF: 'pdf',
  DOC: 'doc',
  DOCX: 'docx',
  PPT: 'ppt',
  PPTX: 'pptx',
  XLS: 'xls',
  XLSX: 'xlsx'
};
var EnumTaskDocumentsOfTask = {
  PDF: 'pdf',
  DOC: 'doc',
  DOCX: 'docx',
  PPT: 'ppt',
  PPTX: 'pptx',
  XLS: 'xls',
  XLSX: 'xlsx'
};
var EnumDocumentTypeOfDealDocument = {
  PROPERTY_INFORMATION: 'propertyInformation',
  PROPERTY_FINANCIALS: 'propertyFinancials',
  SPONSOR_INFORMATION: 'sponsorInformation',
  OTHERS: 'others'
};
var EnumFileOfDealDocument = {
  PNG: 'png',
  JPG: 'jpg',
  PDF: 'pdf',
  DOC: 'doc',
  DOCX: 'docx',
  PPT: 'ppt',
  PPTX: 'pptx',
  XLS: 'xls',
  XLSX: 'xlsx'
};
var EnumContentType = {
  APLICATION_PDF: 'application/pdf',
  APLICATION_DOC: 'application/msword',
  APLICATION_DOCX: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  APLICATION_PPT: 'application/vnd.ms-powerpoint',
  APLICATION_XLS: 'application/vnd.ms-excel',
  APLICATION_XLSX: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  APLICATION_PPTX: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  IMAGE_PNG: 'image/png',
  IMAGE_JPEG: 'image/jpeg'
};
var EnumTypeOfToken = {
  RESET_PASSWORD: 'resetPassword',
  VERIFY_EMAIL: 'verifyEmail',
  REFRESH: 'refresh'
};
var EnumTypeOfStatus = {
  PENDING: 'pending',
  ACCEPTED: 'accepted'
};
var EnumPrePaymentTypeOfTerms = {
  LOCKOUT: 'lockout',
  YIELD_MAINTENANCE: 'yieldMaintenance',
  MINIMUM_INTEREST: 'minimumInterest',
  NO_PENALTY: 'noPenalty',
  STEPDOWN: 'stepdown'
};
var EnumOfEmailStatus = {
  SEND_DEAL: 'sendDeal',
  EMAIL_SENT: 'emailSent',
  FOLLOW_UP: 'followUp'
};
var EnumOfNotesTypeOfLenderNotes = {
  EXTERNAL_NOTE: 'externalNote',
  INTERNAL_NOTE: 'internalNote'
};
var EnumOfRecourse = {
  NON_RECOURSE: 'nonRecourse',
  PARTIAL_RECOURSE: 'partialRecourse',
  FULL_RECOURSE: 'fullRecourse'
};
var EnumofExtension = {
  MONTHS: 'months',
  YEARS: 'years',
  TBD: 'tbd',
  NA: 'na'
};
var EnumOfActivityType = {
  NOTE: 'note',
  ACTIVITY: 'activity'
};
var EnumOfDynamicFieldType = {
  BULLET: 'bullet',
  TEXT: 'text',
  BULLET_TEXT: 'bulletText',
  FILE: 'file',
  TABLE: 'table'
};
var EnumOfTypeOfValue = {
  STRING: 'string',
  NUMBER: 'number',
  CURRENCY: 'currency',
  PERCENTAGE: 'percentage',
  YEAR: 'year'
};
var EnumOfSectionName = {
  PROPERTY_SUMMARY: 'propertySummary',
  DEAL_METRICS: 'dealMetrics',
  FINANCING_REQUEST: 'financingRequest',
  SOURCES_AND_USES: 'sourcesAndUses',
  RENT_ROLL_SUMMARY: 'rentRollSummary',
  FINANCIAL_SUMMARY: 'financialSummary',
  DOCUMENTS: 'documents'
};
var EnumOfRatesName = {
  PRIME_RATE: 'Prime Rate',
  SOFR: 'SOFR',
  TREASURY_5_YEAR: 'Treasury 5-Year',
  TREASURY_7_YEAR: 'Treasury 7-Year',
  TREASURY_10_YEAR: 'Treasury 10-Year',
  SOFR_1_MONTH_AVG: 'SOFR 1-Month Avg',
  SOFR_SWAP_2_YEAR: 'SOFR Swap 2-Year',
  SOFR_SWAP_5_YEAR: 'SOFR Swap 5-Year',
  SOFR_SWAP_7_YEAR: 'SOFR Swap 7-Year',
  SOFR_SWAP_10_YEAR: 'SOFR Swap 10-Year'
};
var EnumSheetNameOfUw = {
  SUMMARY: 'Summary',
  RENT_ROLL: 'Rent Roll',
  NOI: 'NOI'
};
var EnumTableNameInUwSheet = {
  PROPERTY_SUMMARY: 'Property Summary',
  DEAL_METRICS: 'Deal Metrics',
  FINANCING_REQUEST: 'Financing Request',
  SOURCES_AND_USES: 'Sources and Uses',
  SOURCES: 'Sources',
  USES: 'Uses',
  FINANCIAL_SUMMARY: 'Financial Summary',
  REVENUE: 'Revenue',
  EXPENSES: 'Expenses',
  RENT_ROLL_SUMMARY: 'Rent Roll Summary'
};
var EnumColumnNameOfFinancialSummary = {
  IN_PLACE: 'In-Place',
  STABILIZED: 'Stabilized',
  NOTES: 'Notes',
  EFFECTIVE_GROSS_INCOME: 'Effective Gross Income',
  TOTAL_OPERATING_EXPNESES: 'Total Operating Expneses' // Expneses spelling is incorrect , but added because same used in UW sheet
};
var EnumKeyNameInDealSummary = {
  TYPE: 'type',
  VALUE: 'value',
  STABILIZED_DY: 'Stabilized DY',
  ESTIMATED_LTV: 'Estimated LTV',
  IN_PLACE_DY: 'In-Place DY',
  STABILIZED_DSCR: 'Stabilized DSCR',
  IN_PLACE_DSCR: 'In-Place DSCR',
  TOTAL_SOURCES: 'Total Sources',
  TOTAL_USES: 'Total Uses',
  IN_PLACE_TYPE: 'inPlaceType',
  IN_PLACE_VALUE: 'inPlaceValue',
  STABILIZED_TYPE: 'stabilizedType',
  STABILIZED_VALUE: 'stabilizedValue'
};
module.exports = {
  EnumOfNodeEnv: EnumOfNodeEnv,
  EnumPrePaymentTypeOfTerms: EnumPrePaymentTypeOfTerms,
  EnumContentType: EnumContentType,
  EnumCodeTypeOfCode: EnumCodeTypeOfCode,
  EnumofExtension: EnumofExtension,
  EnumRoleOfUser: EnumRoleOfUser,
  EnumPlatformOfDeviceToken: EnumPlatformOfDeviceToken,
  EnumOfActivityType: EnumOfActivityType,
  EnumStageOfDeal: EnumStageOfDeal,
  EnumAssetTypeOfDeal: EnumAssetTypeOfDeal,
  EnumLoanPurposeOfDeal: EnumLoanPurposeOfDeal,
  EnumLoanTypeOfDeal: EnumLoanTypeOfDeal,
  EnumOfEmailStatus: EnumOfEmailStatus,
  EnumLenderTypeOfLendingInstitution: EnumLenderTypeOfLendingInstitution,
  EnumStageOfLenderPlacement: EnumStageOfLenderPlacement,
  EnumTermSheetOfLenderPlacement: EnumTermSheetOfLenderPlacement,
  EnumInterestRateTypeOfTerms: EnumInterestRateTypeOfTerms,
  EnumEmailAttachmentsOfEmailTemplate: EnumEmailAttachmentsOfEmailTemplate,
  EnumTaskDocumentsOfTask: EnumTaskDocumentsOfTask,
  EnumDocumentTypeOfDealDocument: EnumDocumentTypeOfDealDocument,
  EnumOfNotesTypeOfLenderNotes: EnumOfNotesTypeOfLenderNotes,
  EnumFileOfDealDocument: EnumFileOfDealDocument,
  EnumTypeOfToken: EnumTypeOfToken,
  EnumTypeOfStatus: EnumTypeOfStatus,
  EnumStatesOfDeal: EnumStatesOfDeal,
  EnumOfRecourse: EnumOfRecourse,
  defaulAssetTypeOfDeal: defaulAssetTypeOfDeal,
  EnumOfDynamicFieldType: EnumOfDynamicFieldType,
  EnumOfTypeOfValue: EnumOfTypeOfValue,
  EnumOfSectionName: EnumOfSectionName,
  EnumNextStepOfLenderPlacement: EnumNextStepOfLenderPlacement,
  EnumOfRatesName: EnumOfRatesName,
  EnumSheetNameOfUw: EnumSheetNameOfUw,
  EnumTableNameInUwSheet: EnumTableNameInUwSheet,
  EnumColumnNameOfFinancialSummary: EnumColumnNameOfFinancialSummary,
  EnumKeyNameInDealSummary: EnumKeyNameInDealSummary
};