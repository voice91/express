"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importDataFromFile = exports.defaultAssetTypeOfDeal = exports.LenderWorkBookKeyColMappingForInstitute = exports.LenderWorkBookKeyColMappingForContact = exports.LenderWorkBookExcelEnum = void 0;
var _lodash = _interopRequireDefault(require("lodash"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _xlsx = _interopRequireDefault(require("xlsx"));
var _exceljs = _interopRequireDefault(require("exceljs"));
var _common = require("../../utils/common");
var _catchAsync = require("../../utils/catchAsync");
var _models = require("../../models");
var _enum = _interopRequireWildcard(require("../../models/enum.model"));
var _ApiError = _interopRequireDefault(require("../../utils/ApiError"));
var _logger = require("../../config/logger");
var _services = require("../../services");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var mongoose = require('mongoose');
var workbook = new _exceljs["default"].Workbook();
var LenderWorkBookExcelEnum = exports.LenderWorkBookExcelEnum = {
  PROGRAM_ID: 'ProgramId',
  LENDER_NAME: 'Lender Name'
};

// column mapping for CLEAN_LENDERS sheet
var LenderWorkBookKeyColMappingForInstitute = exports.LenderWorkBookKeyColMappingForInstitute = {
  LENDER_NAME: 0,
  LENDER_TYPE: 1,
  PROGRAM_NAME: 2,
  PROGRAM_MIN_LOAN_SIZE: 3,
  PROGRAM_MIN_TAG: 4,
  PROGRAM_MAX_LOAN_SIZE: 5,
  PROGRAM_MAX_TAG: 6,
  PROGRAM_STATES: 7,
  PROGRAM_STATE_TAGS: 8,
  PROGRAM_PROPERTY_TYPE: 9,
  PROGRAM_PROPERTY_TYPE_TAGS: 10,
  DOES_NOT_LAND_ON: 11,
  DOES_NOT_LAND_ON_TAGS: 12,
  LOAN_TYPE: 13,
  LOAN_TYPE_TAG: 14,
  INDEX_USED: 15,
  SPREAD_ESTIMATION: 16,
  COUNTIES: 17,
  RECOURSE: 18,
  NON_RECOURSE: 19,
  DESCRIPTION: 20,
  HEADQUARTERS: 21,
  WEBSITE: 22,
  RANKING: 23,
  NOTE_1_DATE: 24,
  NOTE_1_CONTENT: 25,
  NOTE_1_PERSON: 26,
  NOTE_2_DATE: 27,
  NOTE_2_CONTENT: 28,
  NOTE_2_PERSON: 29,
  NOTE_3_DATE: 30,
  NOTE_3_CONTENT: 31,
  NOTE_3_PERSON: 32,
  NOTE_4_DATE: 33,
  NOTE_4_CONTENT: 34,
  NOTE_4_PERSON: 35,
  NOTE_5_DATE: 36,
  NOTE_5_CONTENT: 37,
  NOTE_5_PERSON: 38,
  PROGRAM_ID: 39,
  INSTITUTE_ID: 40,
  NOTE_1_ID: 41,
  NOTE_2_ID: 42,
  NOTE_3_ID: 43,
  NOTE_4_ID: 44,
  NOTE_5_ID: 45
};
// column mapping for CLEAN_CONTACT sheet
var LenderWorkBookKeyColMappingForContact = exports.LenderWorkBookKeyColMappingForContact = {
  LENDER_NAME: 0,
  FIRST_NAME: 1,
  LAST_NAME: 2,
  PROGRAMS: 3,
  NICK_NAME: 4,
  EMAIL: 5,
  MAIN_PHONE_NUMBER: 6,
  MOBILE_PHONE_NUMBER: 7,
  OFFICE_PHONE_NUMBER: 8,
  TITLE: 9,
  CITY: 10,
  STATE: 11,
  CONTACT_TAG: 12,
  EMAIL_TAG: 13,
  CONTACT_ID: 14,
  LENDER_INSTITUTE: 15
};
// as it was declared twice in the code for if and else condition
var defaultAssetTypeOfDeal = exports.defaultAssetTypeOfDeal = [_enum.EnumAssetTypeOfDeal.MULTIFAMILY, _enum.EnumAssetTypeOfDeal.OFFICE, _enum.EnumAssetTypeOfDeal.RETAIL, _enum.EnumAssetTypeOfDeal.INDUSTRIAL, _enum.EnumAssetTypeOfDeal.SELF_STORAGE, _enum.EnumAssetTypeOfDeal.STUDENT_HOUSING, _enum.EnumAssetTypeOfDeal.MOBILE_HOME_PARK, _enum.EnumAssetTypeOfDeal.FOR_SALE_CONDOS, _enum.EnumAssetTypeOfDeal.NNN_RETAIL];

// common function for getting states array
var getStatesArray = function getStatesArray(cellValue) {
  var statesArray = [];
  if (cellValue) {
    if (cellValue === 'Nationwide') {
      statesArray = _common.CsvStatesArrayMapping.Nationwide;
    } else if (cellValue.includes('Nationwide')) {
      if (cellValue.includes('-')) {
        var valueToRemoveState = _common.CsvStatesArrayMapping.Nationwide;
        // eslint-disable-next-line array-callback-return
        cellValue.split('-').map(function (item) {
          if (item !== 'Nationwide') {
            var indexToRemove = valueToRemoveState.indexOf(_common.CsvStatesArrayMapping[item]);
            if (indexToRemove !== -1) {
              valueToRemoveState.splice(indexToRemove, 1);
            }
          }
        });
        statesArray = valueToRemoveState.filter(Boolean);
      }
    } else if (cellValue.includes(', ')) {
      statesArray = cellValue.split(',').map(function (item) {
        return _common.CsvStatesArrayMapping[item.trim()];
      });
    } else {
      statesArray = _common.CsvStatesArrayMapping[cellValue];
    }
  }
  return statesArray;
};

// common function for getting property type
var getPropertyType = function getPropertyType(propertyValue) {
  var propertyType = [];
  if (propertyValue) {
    if (propertyValue === 'All') {
      propertyType = _common.CsvLenderPropertyTypeMapping.All;
    } else if (propertyValue === 'Default') {
      propertyType = defaultAssetTypeOfDeal;
    } else if (propertyValue.includes('Default')) {
      if (propertyValue.includes('+')) {
        var valueToAddInProperty = defaultAssetTypeOfDeal.slice();
        // eslint-disable-next-line array-callback-return
        propertyValue.split('+').map(function (item) {
          if (item !== 'Default' && !valueToAddInProperty.includes(_common.CsvLenderPropertyTypeMapping[item])) {
            valueToAddInProperty.push(_common.CsvLenderPropertyTypeMapping[item]);
          }
        });
        propertyType = valueToAddInProperty.filter(Boolean);
      } else if (propertyValue.includes('-')) {
        var valueToRemoveProperty = defaultAssetTypeOfDeal.slice();
        // eslint-disable-next-line array-callback-return
        propertyValue.split('-').map(function (item) {
          if (item !== 'Default') {
            var indexToRemove = valueToRemoveProperty.indexOf(_common.CsvLenderPropertyTypeMapping[item]);
            if (indexToRemove !== -1) {
              valueToRemoveProperty.splice(indexToRemove, 1);
            }
          }
        });
        propertyType = valueToRemoveProperty.filter(Boolean);
      }
    } else if (propertyValue.includes(', ')) {
      propertyType = propertyValue.split(',').map(function (item) {
        return _common.CsvLenderPropertyTypeMapping[item.trim()];
      });
    } else {
      propertyType = _common.CsvLenderPropertyTypeMapping[propertyValue];
    }
  }
  return propertyType;
};
var getColumnValueNumber = function getColumnValueNumber(row, col, validationMessage, lenderWorksheet) {
  var tag = lenderWorksheet.getCell(row, col);
  if (typeof tag.value !== 'number') {
    if (tag.value) {
      var statesTagArray = [];
      tag.value.split(',').forEach(function (item) {
        if (item < 1 || item > 5) {
          throw new Error("".concat(validationMessage, " row: ").concat(row, " col: ").concat(col));
        }
        statesTagArray.push(parseInt(item.trim(), 10));
      });
      return statesTagArray;
    }
  } else {
    if (tag.value < 1 || tag.value > 5) {
      throw new Error("".concat(validationMessage, " row: ").concat(row, " col: ").concat(col));
    }
    return tag.value;
  }
};

/**
 * This function processes lender program, notes and institution data from an Excel workbook
 */
var processLenderProgramAndInstitutionData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(lenderWorkbook, user) {
    var lenderWorksheet, lenderWorkbookSheetName, lenderWorkbookSheet, programValue, currentCell, currentRowNo, _loop;
    return _regeneratorRuntime().wrap(function _callee$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          // Extracting worksheet and sheet details from the workbook
          lenderWorksheet = workbook.getWorksheet(lenderWorkbook.SheetNames[1]);
          lenderWorkbookSheetName = lenderWorkbook.SheetNames[1];
          lenderWorkbookSheet = lenderWorkbook.Sheets[lenderWorkbookSheetName]; // Finding the cell containing the lender name in the workbook
          programValue = Object.entries(lenderWorkbookSheet).find(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
              value = _ref3[1];
            return value.v === LenderWorkBookExcelEnum.LENDER_NAME;
          }); // Initializing loop variables
          currentCell = lenderWorksheet.getCell(programValue[0]);
          currentRowNo = currentCell.row + 1;
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
            var program, lenderName, lenderType, programName, programMinLoanSize, programMinTag, programMaxLoanSize, programMaxTag, programStates, programPropertyType, actualArray, propArray, loanType, index, spread, counties, recourse, nonRecourse, lenderData, description, headquarters, website, ranking, lenderId, obj, updatedLender, lenderInstitute, findInstitute, institute, i, noteContent, noteId, noteDate, updatedNote, noteData, note, programId, updatedLenderProgram, lenderProgram, _lenderProgram;
            return _regeneratorRuntime().wrap(function _loop$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  program = {}; // Extracting data from the worksheet for the current row
                  // eslint-disable-next-line no-await-in-loop
                  lenderName = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.LENDER_NAME);
                  lenderType = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.LENDER_TYPE);
                  programName = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_NAME);
                  program.lenderProgramType = programName.value;
                  programMinLoanSize = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_LOAN_SIZE);
                  if (!programMinLoanSize.value) {
                    _context.next = 10;
                    break;
                  }
                  if (!(programMinLoanSize.value < 100000 || programMinLoanSize.value > 1000000000)) {
                    _context.next = 9;
                    break;
                  }
                  throw new Error("minLoanSize must be a containing from 100000 to 1000000000 row:".concat(currentRowNo, " col: ").concat(currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_LOAN_SIZE));
                case 9:
                  if (typeof programMinLoanSize.value === 'number') {
                    program.minLoanSize = programMinLoanSize.value;
                  } else {
                    program.minLoanSize = Number(programMinLoanSize.value.replace(/[^0-9.-]+/g, ''));
                  }
                case 10:
                  programMinTag = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_TAG);
                  if (!programMinTag.value) {
                    _context.next = 14;
                    break;
                  }
                  if (!(programMinTag.value < 1 || programMinTag.value > 5)) {
                    _context.next = 14;
                    break;
                  }
                  throw new Error("minLoanSizeTag must be a containing numbers from 1 to 5 row:".concat(currentRowNo, " col: ").concat(currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MIN_TAG));
                case 14:
                  program.minLoanTag = programMinTag.value;
                  programMaxLoanSize = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_LOAN_SIZE);
                  if (!programMaxLoanSize.value) {
                    _context.next = 20;
                    break;
                  }
                  if (!(programMaxLoanSize.value < 100000 || programMaxLoanSize.value > 1000000000)) {
                    _context.next = 19;
                    break;
                  }
                  throw new Error("maxLoanSize must be a containing from 100000 to 1000000000 row:".concat(currentRowNo, " col: ").concat(currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_LOAN_SIZE));
                case 19:
                  if (typeof programMaxLoanSize.value === 'number') {
                    program.maxLoanSize = programMaxLoanSize.value;
                  } else {
                    program.maxLoanSize = Number(programMaxLoanSize.value.replace(/[^0-9.-]+/g, ''));
                  }
                case 20:
                  programMaxTag = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_TAG);
                  if (!programMaxTag.value) {
                    _context.next = 24;
                    break;
                  }
                  if (!(programMaxTag.value < 1 || programMaxTag.value > 5)) {
                    _context.next = 24;
                    break;
                  }
                  throw new Error("maxLoanSizeTag must be a containing numbers from 1 to 5 row:".concat(currentRowNo, " col: ").concat(currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_MAX_TAG));
                case 24:
                  program.maxLoanTag = programMaxTag.value;
                  programStates = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_STATES); // common function calling for getting states array
                  program.statesArray = getStatesArray(programStates.value);
                  // calling common function for getting states array tag
                  program.statesArrTag = getColumnValueNumber(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_STATE_TAGS, 'stateTag must be an array containing numbers from 1 to 5', lenderWorksheet);
                  programPropertyType = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_PROPERTY_TYPE); // common function calling for getting property type
                  program.propertyType = getPropertyType(programPropertyType.value);
                  // calling common function for getting property type tag
                  program.propTypeArrTag = getColumnValueNumber(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_PROPERTY_TYPE_TAGS, 'propertyTypeArrTag must be an array containing numbers from 1 to 5', lenderWorksheet);
                  actualArray = _common.CsvLenderPropertyTypeMapping.All;
                  propArray = program.propertyType;
                  if (propArray) {
                    program.doesNotLandOn = actualArray.filter(function (item) {
                      return !propArray.includes(item);
                    });
                  }
                  program.doesNotLandOnArrTag = getColumnValueNumber(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.DOES_NOT_LAND_ON_TAGS, 'doesNotLandOnArrTag must be an array containing numbers from 1 to 5', lenderWorksheet);
                  loanType = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.LOAN_TYPE);
                  if (loanType.value) {
                    if (loanType.value.includes(', ')) {
                      program.loanType = loanType.value.split(',').map(function (item) {
                        return _common.CsvLenderLoanTypeMapping[item.trim()];
                      });
                    } else {
                      program.loanType = [_common.CsvLenderLoanTypeMapping[loanType.value]];
                    }
                  }
                  // calling common function for getting loan type tag
                  program.loanTypeArrTag = getColumnValueNumber(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.LOAN_TYPE_TAG, 'loanTypeTag must be an array containing numbers from 1 to 5', lenderWorksheet);
                  index = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.INDEX_USED);
                  program.indexUsed = index.value;
                  spread = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.SPREAD_ESTIMATION);
                  program.spreadEstimate = spread.value;
                  counties = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.COUNTIES);
                  if (counties.value) {
                    program.counties = counties.value.split(',').map(function (item) {
                      return item.trim();
                    });
                  }
                  recourse = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.RECOURSE);
                  program.recourseRequired = recourse.value;
                  nonRecourse = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.NON_RECOURSE);
                  program.nonRecourseLTV = nonRecourse.value;
                  lenderData = {};
                  description = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.DESCRIPTION);
                  headquarters = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.HEADQUARTERS);
                  website = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.WEBSITE);
                  ranking = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.RANKING);
                  if (description && description.value) {
                    lenderData.description = description.value;
                  }
                  if (headquarters && headquarters.value) {
                    lenderData.headquarter = headquarters.value;
                  }
                  if (website && website.value) {
                    lenderData.website = website.value;
                  }
                  if (ranking && ranking.value) {
                    lenderData.creRanking = ranking.value;
                  }
                  // changing the column number as lender id is in the column 24 and current cell col is 1
                  lenderId = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.INSTITUTE_ID);
                  obj = {
                    lenderNameVisible: lenderName.value,
                    lenderType: _common.CsvLenderTypeMapping[lenderType.value]
                  };
                  Object.assign(obj, lenderData);
                  // If lenderId exists, update the existing record; otherwise, create a new record
                  if (!lenderId.value) {
                    _context.next = 77;
                    break;
                  }
                  _context.next = 63;
                  return _models.LendingInstitution.findByIdAndUpdate(lenderId.value, obj, {
                    "new": true
                  });
                case 63:
                  updatedLender = _context.sent;
                  if (updatedLender) {
                    _context.next = 73;
                    break;
                  }
                  Object.assign(obj, {
                    _id: lenderId.value
                  });
                  // eslint-disable-next-line no-await-in-loop
                  _context.next = 68;
                  return _models.LendingInstitution.create(obj);
                case 68:
                  lenderInstitute = _context.sent;
                  program.lenderInstitute = lenderInstitute._id;
                  _logger.logger.info("LendingInstitution created for Id: ".concat(lenderId.value, ", Name : ").concat(lenderName.value));
                  _context.next = 75;
                  break;
                case 73:
                  _logger.logger.info("LendingInstitution updated for Id: ".concat(lenderId.value, ", Name : ").concat(lenderName.value));
                  program.lenderInstitute = lenderId.value;
                case 75:
                  _context.next = 87;
                  break;
                case 77:
                  _context.next = 79;
                  return _models.LendingInstitution.findOneAndUpdate({
                    lenderNameVisible: lenderName.value
                  }, obj);
                case 79:
                  findInstitute = _context.sent;
                  if (!(!findInstitute && lenderName.value)) {
                    _context.next = 86;
                    break;
                  }
                  _context.next = 83;
                  return _models.LendingInstitution.create(obj);
                case 83:
                  institute = _context.sent;
                  _logger.logger.info("LendingInstitution created Id: ".concat(institute._id, ", Name: ").concat(lenderName.value));
                  program.lenderInstitute = institute._id;
                case 86:
                  if (findInstitute) {
                    _logger.logger.info("LendingInstitution updated for Id: ".concat(findInstitute._id, ", Name: ").concat(lenderName.value));
                    program.lenderInstitute = findInstitute._id;
                  }
                case 87:
                  i = 1;
                case 88:
                  if (!(i <= 5)) {
                    _context.next = 112;
                    break;
                  }
                  // Retrieve note content and ID from the worksheet based on the mapping
                  noteContent = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute["NOTE_".concat(i, "_CONTENT")]);
                  noteId = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute["NOTE_".concat(i, "_ID")]);
                  noteDate = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute["NOTE_".concat(i, "_DATE")]);
                  if (!noteId.value) {
                    _context.next = 104;
                    break;
                  }
                  _context.next = 95;
                  return _models.LenderInstituteNotes.findByIdAndUpdate(noteId.value, {
                    content: noteContent.value,
                    updatedBy: user._id,
                    updatedAt: noteDate.value ? (0, _common.processDateForExcel)(noteDate.value) : new Date()
                  }, {
                    "new": true,
                    timestamps: false
                  } // timestamps: false passed because need to update manually
                  );
                case 95:
                  updatedNote = _context.sent;
                  // Prepare data for creating a new note if the update operation did not find a matching note
                  noteData = {
                    content: noteContent.value,
                    lenderInstitute: program.lenderInstitute,
                    createdBy: user._id,
                    updatedBy: user._id,
                    createdAt: noteDate.value ? (0, _common.processDateForExcel)(noteDate.value) : new Date(),
                    updatedAt: noteDate.value ? (0, _common.processDateForExcel)(noteDate.value) : new Date()
                  };
                  if (updatedNote) {
                    _context.next = 102;
                    break;
                  }
                  // If the note was not updated, create a new note
                  if ((0, _common.isObjectId)(noteId.value)) {
                    // If the note ID is a valid ObjectId, assign it to the note data
                    Object.assign(noteData, {
                      _id: noteId.value
                    });
                  }

                  // eslint-disable-next-line no-await-in-loop
                  _context.next = 101;
                  return _models.LenderInstituteNotes.create(noteData);
                case 101:
                  _logger.logger.info("Lender note updated for id ".concat(noteId.value, " for lender : ").concat(lenderName.value));
                case 102:
                  _context.next = 109;
                  break;
                case 104:
                  if (!noteContent.value) {
                    _context.next = 109;
                    break;
                  }
                  _context.next = 107;
                  return _models.LenderInstituteNotes.create({
                    content: noteContent.value,
                    lenderInstitute: program.lenderInstitute,
                    createdBy: user._id,
                    updatedBy: user._id,
                    createdAt: noteDate.value ? (0, _common.processDateForExcel)(noteDate.value) : new Date(),
                    updatedAt: noteDate.value ? (0, _common.processDateForExcel)(noteDate.value) : new Date()
                  });
                case 107:
                  note = _context.sent;
                  _logger.logger.info("Lender Note created with id ".concat(note._id, " for lender : ").concat(lenderName.value));
                case 109:
                  i += 1;
                  _context.next = 88;
                  break;
                case 112:
                  // changing the column number as program id is in the column 23 and current cell col is 1
                  programId = lenderWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForInstitute.PROGRAM_ID);
                  currentCell = lenderWorksheet.getCell(currentRowNo, currentCell.col);
                  // Updating current row no by 1 for every loop
                  currentRowNo += 1;
                  if (!(!lenderName.value || lenderName.value === null)) {
                    _context.next = 117;
                    break;
                  }
                  return _context.abrupt("return", 1);
                case 117:
                  program.statesArrTag = program.statesArrTag ? program.statesArrTag : [1];
                  program.minLoanTag = program.minLoanTag ? program.minLoanTag : 1;
                  program.maxLoanTag = program.maxLoanTag ? program.maxLoanTag : 1;
                  program.propTypeArrTag = program.propTypeArrTag ? program.propTypeArrTag : [1];
                  program.doesNotLandOnArrTag = program.doesNotLandOnArrTag ? program.doesNotLandOnArrTag : [1];
                  program.loanTypeArrTag = program.loanTypeArrTag ? program.loanTypeArrTag : [1];
                  // If programId exists, update the existing record; otherwise, create a new record
                  if (!programId.value) {
                    _context.next = 136;
                    break;
                  }
                  _context.next = 126;
                  return _models.LenderProgram.findByIdAndUpdate(programId.value, program);
                case 126:
                  updatedLenderProgram = _context.sent;
                  if (updatedLenderProgram) {
                    _context.next = 133;
                    break;
                  }
                  if ((0, _common.isObjectId)(programId.value)) {
                    Object.assign(program, {
                      _id: programId.value
                    });
                  }
                  // eslint-disable-next-line no-await-in-loop
                  _context.next = 131;
                  return _models.LenderProgram.create(program);
                case 131:
                  lenderProgram = _context.sent;
                  _logger.logger.info("LenderProgram created Id : ".concat(lenderProgram._id, " for lendingInstitute name : ").concat(lenderName.value));
                case 133:
                  _logger.logger.info("LenderProgram updated for Id : ".concat(programId.value, " for lendingInstitute name : ").concat(lenderName.value));
                  _context.next = 140;
                  break;
                case 136:
                  _context.next = 138;
                  return _models.LenderProgram.create(program);
                case 138:
                  _lenderProgram = _context.sent;
                  _logger.logger.info("LenderProgram created Id : ".concat(_lenderProgram._id, " for lendingInstitute name : ").concat(lenderName.value));
                case 140:
                case "end":
                  return _context.stop();
              }
            }, _loop);
          });
        case 7:
          if (!true) {
            _context2.next = 13;
            break;
          }
          return _context2.delegateYield(_loop(), "t0", 9);
        case 9:
          if (!_context2.t0) {
            _context2.next = 11;
            break;
          }
          return _context2.abrupt("break", 13);
        case 11:
          _context2.next = 7;
          break;
        case 13:
        case "end":
          return _context2.stop();
      }
    }, _callee);
  }));
  return function processLenderProgramAndInstitutionData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * This function processes lender contacts data from an Excel workbook
 */
var processLenderContactData = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(lenderWorkbook) {
    var lenderContactWorksheet, lenderContactWorkbookSheetName, lenderContactWorkbookSheet, lenderValue, currentCell, currentRowNo, notAvailableLender, contact, lender, firstName, lastName, program, nickName, email, mainPhone, mobilePhone, officePhone, title, city, state, contactTag, emailTag, contactId, lenderId, findInstitute, findInstitution, updatedLender, registeredLender, userBody, newLender, updatedContact;
    return _regeneratorRuntime().wrap(function _callee2$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          lenderContactWorksheet = workbook.getWorksheet(lenderWorkbook.SheetNames[0]);
          lenderContactWorkbookSheetName = lenderWorkbook.SheetNames[0];
          lenderContactWorkbookSheet = lenderWorkbook.Sheets[lenderContactWorkbookSheetName];
          lenderValue = Object.entries(lenderContactWorkbookSheet).find(function (_ref5) {
            var _ref6 = _slicedToArray(_ref5, 2),
              value = _ref6[1];
            return value.v === 'Lender';
          });
          currentCell = lenderContactWorksheet.getCell(lenderValue[0]);
          currentRowNo = currentCell.row + 1;
          notAvailableLender = [];
        case 7:
          if (!true) {
            _context3.next = 117;
            break;
          }
          contact = {};
          lender = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.LENDER_NAME);
          if (!lender.value) {
            _context3.next = 73;
            break;
          }
          firstName = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.FIRST_NAME);
          contact.firstName = firstName.value;
          lastName = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.LAST_NAME);
          contact.lastName = lastName.value;
          program = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.PROGRAMS); // for multiple values of program in lender contact sheet
          if (program.value !== null) {
            contact.programs = program.value.split(', ').map(function (item) {
              return item.trim();
            });
          } else {
            contact.programs = program.value;
          }
          nickName = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.NICK_NAME);
          contact.nickName = nickName.value;
          email = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.EMAIL);
          if (!email.value) {
            _context3.next = 32;
            break;
          }
          if (!(typeof email.value === 'string')) {
            _context3.next = 25;
            break;
          }
          contact.email = email.value.trim();
          _context3.next = 30;
          break;
        case 25:
          if (!(_typeof(email.value) === 'object')) {
            _context3.next = 29;
            break;
          }
          if (email.value.text) {
            contact.email = email.value.text.trim();
          }
          _context3.next = 30;
          break;
        case 29:
          throw new Error(_httpStatus["default"].BAD_REQUEST, "Please provide valid Email row:".concat(currentRowNo, " col: ").concat(currentCell.col + LenderWorkBookKeyColMappingForContact.EMAIL));
        case 30:
          _context3.next = 33;
          break;
        case 32:
          notAvailableLender.push(contact);
        case 33:
          mainPhone = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.MAIN_PHONE_NUMBER);
          contact.phoneNumberDirect = mainPhone.value;
          mobilePhone = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.MOBILE_PHONE_NUMBER);
          contact.phoneNumberCell = mobilePhone.value;
          officePhone = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.OFFICE_PHONE_NUMBER);
          contact.phoneNumberOffice = officePhone.value;
          title = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.TITLE);
          contact.title = title.text;
          city = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.CITY);
          contact.city = city.value;
          state = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.STATE);
          if (state.value) {
            contact.state = state.value;
          }
          contactTag = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.CONTACT_TAG);
          if (!contactTag.value) {
            _context3.next = 49;
            break;
          }
          if (!(contactTag.value < 1 || contactTag.value > 5)) {
            _context3.next = 49;
            break;
          }
          throw new Error('contactTag must be a containing numbers from 1 to 5');
        case 49:
          contact.contactTag = contactTag.value;
          emailTag = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.EMAIL_TAG);
          if (!emailTag.value) {
            _context3.next = 54;
            break;
          }
          if (!(emailTag.value < 1 || emailTag.value > 5)) {
            _context3.next = 54;
            break;
          }
          throw new Error('emailTag must be a containing numbers from 1 to 5');
        case 54:
          contact.emailTag = emailTag.value;
          contactId = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.CONTACT_ID);
          if (contactId.value) {
            contact.contactId = mongoose.Types.ObjectId(contactId.value);
          }
          lenderId = lenderContactWorksheet.getCell(currentRowNo, currentCell.col + LenderWorkBookKeyColMappingForContact.LENDER_INSTITUTE);
          if (!lenderId.value) {
            _context3.next = 69;
            break;
          }
          contact.lenderInstitute = lenderId.value;
          // eslint-disable-next-line no-await-in-loop
          _context3.next = 62;
          return _models.LendingInstitution.findOne({
            lenderNameVisible: lender.value
          });
        case 62:
          findInstitute = _context3.sent;
          if (findInstitute) {
            _context3.next = 67;
            break;
          }
          _context3.next = 66;
          return _models.LendingInstitution.findByIdAndUpdate(lenderId.value, {
            lenderNameVisible: lender.value
          });
        case 66:
          _logger.logger.info("LendingInstitution updated : ".concat(lenderId.value));
        case 67:
          _context3.next = 73;
          break;
        case 69:
          _context3.next = 71;
          return _models.LendingInstitution.findOne({
            lenderNameVisible: lender.value
          });
        case 71:
          findInstitution = _context3.sent;
          if (findInstitution) {
            contact.lenderInstitute = findInstitution._id;
          } else {
            notAvailableLender.push({
              lenderName: lender.value
            });
          }
        case 73:
          currentCell = lenderContactWorksheet.getCell(currentRowNo, currentCell.col);
          currentRowNo += 1;
          if (!(!lender.value || lender.value === null)) {
            _context3.next = 77;
            break;
          }
          return _context3.abrupt("break", 117);
        case 77:
          if (!contact.contactId) {
            _context3.next = 89;
            break;
          }
          contact.contactTag = contact.contactTag ? contact.contactTag : 1;
          contact.emailTag = contact.emailTag ? contact.emailTag : 1;
          // eslint-disable-next-line no-await-in-loop
          _context3.next = 82;
          return _models.LenderContact.findByIdAndUpdate(contact.contactId, contact);
        case 82:
          updatedLender = _context3.sent;
          if (!(updatedLender && updatedLender.user)) {
            _context3.next = 86;
            break;
          }
          _context3.next = 86;
          return _services.userService.updateUser({
            _id: updatedLender.user
          }, {
            firstName: contact.firstName,
            companyName: lender.value,
            lastName: contact.lastName,
            city: contact.city,
            state: contact.state,
            phoneNumber: contact.phoneNumberCell
          });
        case 86:
          _logger.logger.info("LenderContact updated for email ".concat(contact.email));
          _context3.next = 115;
          break;
        case 89:
          if (!(contact.email && contact.lenderInstitute)) {
            _context3.next = 115;
            break;
          }
          contact.contactTag = contact.contactTag ? contact.contactTag : 1;
          contact.emailTag = contact.emailTag ? contact.emailTag : 1;
          // eslint-disable-next-line no-await-in-loop
          _context3.next = 94;
          return _services.userService.getOne({
            email: contact.email
          });
        case 94:
          registeredLender = _context3.sent;
          if (registeredLender) {
            _context3.next = 103;
            break;
          }
          userBody = {
            firstName: contact.firstName,
            companyName: lender.value,
            lastName: contact.lastName,
            email: contact.email,
            password: Math.random().toString(36).slice(-10),
            emailVerified: true,
            enforcePassword: true,
            role: _enum["default"].EnumRoleOfUser.LENDER
          }; // eslint-disable-next-line no-await-in-loop
          _context3.next = 99;
          return _services.userService.createUser(userBody);
        case 99:
          newLender = _context3.sent;
          contact.user = newLender._id;
          _context3.next = 104;
          break;
        case 103:
          contact.user = registeredLender._id;
        case 104:
          _context3.next = 106;
          return _models.LenderContact.findOneAndUpdate({
            email: contact.email
          }, contact, {
            "new": true
          });
        case 106:
          updatedContact = _context3.sent;
          if (!updatedContact) {
            _context3.next = 111;
            break;
          }
          _logger.logger.info("LenderContact updated for email ".concat(updatedContact.email));
          _context3.next = 115;
          break;
        case 111:
          _context3.next = 113;
          return _services.lenderContactService.createLenderContact(contact);
        case 113:
          _context3.next = 115;
          return _services.userService.updateUser({
            _id: contact.user
          }, {
            firstName: contact.firstName,
            companyName: lender.value,
            lastName: contact.lastName,
            city: contact.city,
            state: contact.state,
            phoneNumber: contact.phoneNumberCell
          });
        case 115:
          _context3.next = 7;
          break;
        case 117:
          return _context3.abrupt("return", notAvailableLender);
        case 118:
        case "end":
          return _context3.stop();
      }
    }, _callee2);
  }));
  return function processLenderContactData(_x3) {
    return _ref4.apply(this, arguments);
  };
}();

// eslint-disable-next-line import/prefer-default-export
var importDataFromFile = exports.importDataFromFile = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(file, res) {
    var data, user, lenderWorkbook, notAvailableLender;
    return _regeneratorRuntime().wrap(function _callee3$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          user = file.user; // if file is not uploaded then throw an error
          if (file.files) {
            _context4.next = 4;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "Please upload a file");
        case 4:
          if (Object.values(file.files).length) {
            data = Object.values(file.files)[0].data;
          }
          if (!(_lodash["default"].flatten(Object.values(file.files)).length > 1)) {
            _context4.next = 7;
            break;
          }
          throw new Error(_httpStatus["default"].BAD_REQUEST, 'You can Upload only one File');
        case 7:
          lenderWorkbook = _xlsx["default"].read(data, {
            type: 'buffer'
          });
          _context4.next = 10;
          return workbook.xlsx.load(data);
        case 10:
          _context4.next = 12;
          return processLenderProgramAndInstitutionData(lenderWorkbook, user);
        case 12:
          _context4.next = 14;
          return processLenderContactData(lenderWorkbook);
        case 14:
          notAvailableLender = _context4.sent;
          if (!(notAvailableLender.length > 0)) {
            _context4.next = 17;
            break;
          }
          return _context4.abrupt("return", res.status(_httpStatus["default"].OK).send({
            result: {
              message: 'This contacts were not added because they do not have Email, FirstName or LastName...',
              data: notAvailableLender
            }
          }));
        case 17:
          return _context4.abrupt("return", res.status(_httpStatus["default"].OK).send({
            message: 'data insert from file'
          }));
        case 20:
          _context4.prev = 20;
          _context4.t0 = _context4["catch"](0);
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "error from insertDataFromFile controller: ".concat(_context4.t0.message));
        case 23:
        case "end":
          return _context4.stop();
      }
    }, _callee3, null, [[0, 20]]);
  }));
  return function (_x4, _x5) {
    return _ref7.apply(this, arguments);
  };
}());