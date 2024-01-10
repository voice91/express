"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var _enum = _interopRequireDefault(require("./enum.model"));
var _plugins = require("./plugins");
var _excluded = ["followOnDate"];
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var documentSchema = new _mongoose["default"].Schema({
  url: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String
  }
});
var ExtensionsShema = new _mongoose["default"].Schema({
  extensionOption: {
    value: Number,
    extensionTime: {
      type: String,
      "enum": Object.values(_enum["default"].EnumofExtension)
    }
  },
  extensionFee: {
    type: String
  }
});
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
var TermsSchema = new _mongoose["default"].Schema({
  initialFunding: {
    type: Number,
    required: true
  },
  futureFunding: {
    type: Number
  },
  totalLoanAmount: {
    type: Number
  },
  interestRateType: {
    type: String,
    "enum": Object.values(_enum["default"].EnumInterestRateTypeOfTerms),
    "default": _enum["default"].EnumInterestRateTypeOfTerms.FIXED_INDEX
  },
  interestRateIndexValue: {
    type: String
  },
  interestRateIndexDate: {
    type: Date
  },
  spread: {
    type: String
  },
  totalRate: {
    type: String
  },
  rateNotes: {
    type: String
  },
  initialTerm: {
    value: Number,
    extensionTime: {
      type: String,
      "enum": Object.values(_enum["default"].EnumofExtension)
    }
  },
  extensions: {
    type: [ExtensionsShema]
  },
  interestRateIndex: {
    type: String
  },
  LTC: {
    type: String
  },
  termNotes: {
    type: String
  },
  prePaymentPeriod: {
    value: Number,
    extensionTime: {
      type: String,
      "enum": Object.values(_enum["default"].EnumofExtension)
    }
  },
  prePaymentType: {
    type: String,
    "enum": Object.values(_enum["default"].EnumPrePaymentTypeOfTerms)
  },
  penaltySchedule: {
    type: String
  },
  stabilizedDSCR: {
    type: String
  },
  IO: {
    value: Number,
    extensionTime: {
      type: String,
      "enum": Object.values(_enum["default"].EnumofExtension)
    }
  },
  amortization: {
    value: Number,
    extensionTime: {
      type: String,
      "enum": Object.values(_enum["default"].EnumofExtension)
    }
  },
  originationFee: {
    type: String
  },
  exitFee: {
    type: String
  },
  recourse: {
    type: String,
    "enum": Object.values(_enum["default"].EnumOfRecourse)
  },
  asIsLTV: {
    type: String
  },
  stabilizedLTV: {
    type: String
  },
  asIsDY: {
    type: String
  },
  stabilizedDY: {
    type: String
  },
  asIsDSCR: {
    type: String
  },
  generalNotes: {
    type: String
  }
});
var TermSheetSchema = new _mongoose["default"].Schema({
  url: {
    type: String
  },
  fileName: {
    type: String
  }
});
var TimeLineSchema = new _mongoose["default"].Schema({
  stage: {
    type: String,
    "enum": Object.values(_enum["default"].EnumStageOfLenderPlacement)
  },
  updatedAt: {
    type: Date,
    "default": new Date()
  }
});
var messageSchema = new _mongoose["default"].Schema({
  /**
   * sender: field type updated from String to mongoose.Schema.Types.ObjectId
   * */
  sender: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  /**
   * senderEmail: to store the email of person, which not registered in system and replied the message
   * */
  senderEmail: {
    type: String
  },
  updatedAt: {
    type: Date,
    "default": new Date()
  },
  message: {
    type: String
  },
  documents: {
    type: [documentSchema]
  },
  messageId: {
    type: String
  },
  // to store the userId which has read the message
  messageReadBy: {
    type: [_mongoose["default"].Schema.Types.ObjectId],
    ref: 'User'
  },
  to: {
    type: [String]
  },
  // to store the emails in cc
  cc: {
    type: [String]
  }
});
var mailSchema = new _mongoose["default"].Schema({
  mailContent: String,
  sentAt: {
    type: Date,
    "default": new Date()
  }
});
var LenderPlacementSchema = new _mongoose["default"].Schema({
  /**
   * created By
   * */
  createdBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  /**
   * updated By
   * */
  updatedBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  /**
   * ObjectId of Lending institution from LendingInstitution collection
   * */
  lendingInstitution: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'LendingInstitution',
    required: true
  },
  /**
   * ObjectId of Lending institution from lenderContact collection
   * */
  lenderContact: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'LenderContact'
  },
  /**
   * ObjectId of the currently selected lender from the LenderProgram collection
   * */
  lenderProgram: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'LenderProgram'
  },
  deal: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Deal'
  },
  /**
   * The stage of lender
   * */
  stage: {
    type: String,
    "enum": Object.values(_enum["default"].EnumStageOfLenderPlacement),
    required: true,
    "default": _enum["default"].EnumStageOfLenderPlacement.NEW
  },
  stageEnumWiseNumber: {
    type: Number,
    min: 0,
    max: _enum["default"].EnumStageOfLenderPlacement.length,
    "default": 7
  },
  nextStep: {
    type: String,
    "default": _enum["default"].EnumNextStepOfLenderPlacement["new"]
  },
  /**
   * The set of terms that the lender is offering on the deal
   * */
  terms: {
    type: TermsSchema
  },
  /**
   * The order in which the terms will be visible
   * */
  orderOfTerms: {
    type: Number
  },
  /**
   * An official document that has the final terms; will be uploaded by advisor to lenderPlacement
   * */
  termSheet: {
    type: TermSheetSchema
  },
  isEmailSent: {
    type: String,
    "enum": Object.values(_enum["default"].EnumOfEmailStatus),
    "default": _enum["default"].EnumOfEmailStatus.SEND_DEAL
  },
  followOnDate: {
    type: Date
  },
  isEmailSentFirstTime: {
    type: Boolean,
    "default": false
  },
  postmarkMessageId: {
    type: [String]
  },
  // when we send email of send deal that time we store that id here & also storing in the above field so old flow will not break & not need to change many things
  sendEmailPostmarkMessageId: {
    type: [String]
  },
  isFavourite: {
    type: Boolean,
    "default": false
  },
  isArchived: {
    type: Boolean,
    "default": false
  },
  timeLine: {
    type: [TimeLineSchema]
    // default: [{ stage: enumModel.EnumStageOfLenderPlacement.NEW, updatedAt: new Date() }],
  },
  messages: {
    type: [messageSchema],
    select: false
  },
  /**
   * For send deal mail
   * */
  sendDealMail: {
    type: mailSchema
  },
  /**
   * For follow-up mails
   * */
  followUpMail: {
    type: [mailSchema]
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  autoCreate: true,
  toJSON: {
    virtuals: true
  }
});
LenderPlacementSchema.virtual('notes', {
  ref: 'LenderNotes',
  localField: '_id',
  foreignField: 'lenderPlacement',
  justOne: false,
  options: {
    match: {
      NotesType: _enum["default"].EnumOfNotesTypeOfLenderNotes.EXTERNAL_NOTE
    }
  }
});
LenderPlacementSchema.virtual('internalNotes', {
  ref: 'LenderNotes',
  localField: '_id',
  foreignField: 'lenderPlacement',
  justOne: false,
  options: {
    match: {
      NotesType: _enum["default"].EnumOfNotesTypeOfLenderNotes.INTERNAL_NOTE
    }
  }
});
LenderPlacementSchema.virtual('lenderAllContacts', {
  ref: 'LenderContact',
  localField: 'lendingInstitution',
  foreignField: 'lenderInstitute',
  justOne: false
});
LenderPlacementSchema.virtual('task', {
  ref: 'Task',
  localField: 'lendingInstitution',
  foreignField: 'askingPartyInstitute',
  justOne: false
});
LenderPlacementSchema.virtual('outstandingTaskCount', {
  ref: 'Task',
  localField: 'lendingInstitution',
  foreignField: 'askingPartyInstitute',
  count: true,
  match: {
    $expr: {
      $or: [{
        $eq: ['$taskAnswer', []]
      },
      // Check if taskAnswer is an empty array
      {
        $not: {
          $isArray: '$taskAnswer'
        }
      } // Check if taskAnswer is not an array or non-existent
      ]
    }
  }
});
// Define the toJSON transform method for the LenderPlacementSchema options object
LenderPlacementSchema.options.toJSON.transform = function (doc, _ref) {
  var followOnDate = _ref.followOnDate,
    ret = _objectWithoutProperties(_ref, _excluded);
  // Check if followOnDate exists
  if (followOnDate) {
    // Get the timestamp of the followOnDate field
    var followOnDateTimestamp = followOnDate.getTime();
    // Check if the followOnDate timestamp is less than the current timestamp
    if (followOnDateTimestamp < Date.now()) {
      // Set the isEmailSent property of the ret object to 'follow up'
      // and the followOnDate property to the followOnDateTimestamp
      // eslint-disable-next-line no-param-reassign
      ret = _objectSpread(_objectSpread({}, ret), {}, {
        isEmailSent: _enum["default"].EnumOfEmailStatus.FOLLOW_UP,
        followOnDate: followOnDateTimestamp
      });
    }
  }
  // Return the ret object
  return ret;
};
LenderPlacementSchema.plugin(_plugins.toJSON);
LenderPlacementSchema.plugin(_mongoosePaginateV["default"]);
LenderPlacementSchema.plugin(_plugins.softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt'
});
var LenderPlacementModel = _mongoose["default"].models.LenderPlacement || _mongoose["default"].model('LenderPlacement', LenderPlacementSchema, 'LenderPlacement');
module.exports = LenderPlacementModel;