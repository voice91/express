"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importTableDataFromExcel = exports.importExcelFile = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _ApiError = _interopRequireDefault(require("./ApiError"));
var _logger = require("../config/logger");
var _enum = require("../models/enum.model");
var _common = require("./common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var axios = require('axios');
var ExcelJS = require('exceljs');
var XLSX = require('xlsx');
// eslint-disable-next-line import/no-extraneous-dependencies
var math = require('mathjs');
var workbook = new ExcelJS.Workbook();
function formatMathFormulaFormValue(_ref) {
  var val = _ref.val,
    key = _ref.key,
    tableName = _ref.tableName;
  if (val && _typeof(val) === 'object') {
    if (val.formula) {
      if (val.result && val.result.error) {
        throw new Error("Error in dataSheet in table \"".concat(tableName, "\" in key \"").concat(key, "\" : ").concat(val.result.error));
      }
      // if result of val is string type then no need to evaluate using math.evaluate
      if (typeof val.result === 'string') {
        return val.result;
      }
      // We are doing this because of the math.evaluate function takes a string as input, interprets it as a mathematical expression, and returns the result as a number.
      // E.g.: The requested loan amount at financing request and deal matrices is of type number, while in sources it's of type string, and we are comparing them later as we need requested loan amount to be equal everywhere
      var _expression = val.formula.replace(val.formula, val.result);
      return math.evaluate(_expression);
    }
    if (val.sharedFormula) {
      var _expression2 = val.sharedFormula.replace(val.sharedFormula, val.result);
      return math.evaluate(_expression2);
    }
    var expression = val.formula.replace(val.result);
    return math.evaluate(expression);
  }
  return val;
}

/**
 * This function determines the type of a given value based on its characteristics and context.
 *
 * @param {any} val - The value to be analyzed.
 * @param {string} valueFromExcel - A string from Excel used to help identify the value type.
 * @param {string} key - Name of field in the excel.
 * @returns {string} - A string representing the determined type of the value.
 */
function typeOfValue(val, valueFromExcel) {
  var key = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (typeof val === 'number') {
    if (valueFromExcel.includes('$')) {
      return _enum.EnumOfTypeOfValue.CURRENCY;
    }
    if (valueFromExcel.includes('%')) {
      return _enum.EnumOfTypeOfValue.PERCENTAGE;
    }
    // Year type has been implemented, ensuring that values categorized as such will not have comma separators added to them.
    if (key.includes('Year')) {
      return _enum.EnumOfTypeOfValue.YEAR;
    }
    return _enum.EnumOfTypeOfValue.NUMBER;
  }
  if (typeof val === 'string') {
    return _enum.EnumOfTypeOfValue.STRING;
  }
}

/**
 * Retrieves and formats values from an Excel sheet for a specified table.
 * @param {Object} params - Input parameters.
 * @param {Object} params.excelSheetData - Excel sheet data object.
 * @param {Object} params.currentCell - Current cell in the Excel sheet.
 * @param {string} params.tableName - Name of the table being processed.
 * @return {Array} resultArray - Array of retrieved and formatted data.
 */
function retrieveAndFormatTableValues(_ref2) {
  var excelSheetData = _ref2.excelSheetData,
    currentCell = _ref2.currentCell,
    tableName = _ref2.tableName;
  var resultArray = [];
  while (true) {
    var data = {};
    var key = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
    var value = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);
    var result = formatMathFormulaFormValue({
      val: value.value,
      key: key.value,
      tableName: tableName
    });
    if (result) {
      data.type = typeOfValue(result, value.numFmt ? value.numFmt : '', key.value || '');
    }
    if (value.numFmt && value.numFmt.includes('%') && data.type === 'percentage') {
      result *= 100;
    }
    if (key.value) {
      data.key = key.value;
      data.value = result;
    }

    // eslint-disable-next-line no-param-reassign
    currentCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
    if (!key.value || !value.value || key.value === null || value.value === null) {
      break;
    }
    resultArray.push(data);
  }
  return resultArray;
}

/**
 * Processes data for a simple table from an Excel sheet based on the table name.
 * @param {Object} params - Input parameters.
 * @param {Object} params.summaryData - Summary data containing information about tables.
 * @param {string} params.tableName - Name of the table being processed.
 * @param {Object} params.excelSheetData - Excel sheet data object.
 * @return {Array} resultArray - Array of retrieved and formatted data.
 */
function processSimpleTableData(_ref3) {
  var summaryData = _ref3.summaryData,
    tableName = _ref3.tableName,
    excelSheetData = _ref3.excelSheetData;
  var resultArray = [];
  var tableValue = Object.entries(summaryData).find(function (_ref4) {
    var _ref5 = _slicedToArray(_ref4, 2),
      value = _ref5[1];
    return value.v === tableName;
  });
  if (tableValue) {
    var currentCell = excelSheetData.getCell(tableValue[0]);
    resultArray = retrieveAndFormatTableValues({
      excelSheetData: excelSheetData,
      currentCell: currentCell,
      tableName: tableName
    });
  }
  return resultArray;
}

/**
 * Retrieves column headers of a table from an Excel sheet dynamically.
 * @param {Object} excelSheetData - Excel sheet data object.
 * @param {Object} currentCell - Current cell in the Excel sheet.
 * @returns {Array} - Array of column headers.
 */
function getHeadersOfTable(excelSheetData, currentCell) {
  var columnHeaders = [];
  var columnHeaderRow = currentCell.row + 1;
  // Retrieve column headers dynamically
  while (true) {
    // Get the cell for the current column header
    var columnHeaderCell = excelSheetData.getCell(columnHeaderRow, currentCell.col);
    // Break the loop if there are no more column headers
    if (!columnHeaderCell.value) {
      break;
    }
    // Add the column header to the array
    columnHeaders.push(columnHeaderCell.value);
    // Move to the next column
    // eslint-disable-next-line no-param-reassign
    currentCell = excelSheetData.getCell(currentCell.row, currentCell.col + 1);
  }
  return columnHeaders;
}

/**
 * Processes financial summary data from an Excel sheet.
 * @param {Object} params - Input parameters.
 * @param {Object} params.excelSheetData - Excel sheet data object.
 * @param {Object} params.currentCell - Current cell in the Excel sheet.
 * @param {Object} params.headerOne - First header for financial summary data.
 * @param {Object} params.headerTwo - Second header for financial summary data.
 * @param {Object} params.headerThree - Third header for financial summary data.
 * @returns {Object} - Processed data and updated current cell.
 */
function processFinancialSummaryData(_ref6) {
  var excelSheetData = _ref6.excelSheetData,
    currentCell = _ref6.currentCell,
    headerOne = _ref6.headerOne,
    headerTwo = _ref6.headerTwo,
    headerThree = _ref6.headerThree;
  var resultArray = [];
  while (true) {
    // eslint-disable-next-line no-shadow
    var data = {};
    var key = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
    var value = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);
    var cellValue = formatMathFormulaFormValue({
      val: value.value,
      key: key.value,
      tableName: _enum.EnumTableNameInUwSheet.FINANCIAL_SUMMARY
    });
    if (value.value !== _enum.EnumColumnNameOfFinancialSummary.IN_PLACE && value.value !== _enum.EnumColumnNameOfFinancialSummary.STABILIZED) {
      data.key = key.value;
      if (headerOne.value === _enum.EnumColumnNameOfFinancialSummary.IN_PLACE) {
        if (cellValue) {
          data.inPlaceType = typeOfValue(cellValue, value.numFmt);
        }
        if (value.numFmt) {
          if (value.numFmt.includes('%')) {
            cellValue *= 100;
          }
        }
        data.inPlaceValue = cellValue;
      } else if (headerOne.value === _enum.EnumColumnNameOfFinancialSummary.STABILIZED) {
        if (cellValue) {
          data.stabilizedType = typeOfValue(cellValue, value.numFmt);
        }
        if (value.numFmt) {
          if (value.numFmt.includes('%')) {
            cellValue *= 100;
          }
        }
        data.stabilizedValue = cellValue;
      }
      if (headerTwo.value && headerTwo.value === _enum.EnumColumnNameOfFinancialSummary.STABILIZED) {
        var valueOfSecond = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 2);
        // Condition for if the value is there then only proceed
        if (valueOfSecond.value) {
          // passing all the values in the function
          data.stabilizedValue = formatMathFormulaFormValue({
            val: valueOfSecond.value,
            key: key.value,
            tableName: _enum.EnumTableNameInUwSheet.FINANCIAL_SUMMARY
          });
          if (valueOfSecond.numFmt) {
            if (data.stabilizedValue) {
              data.stabilizedType = typeOfValue(data.stabilizedValue, valueOfSecond.numFmt);
            }
            if (valueOfSecond.numFmt.includes('%')) {
              data.stabilizedValue *= 100;
            }
          }
        }
      } else if (headerTwo.value && headerTwo.value === _enum.EnumColumnNameOfFinancialSummary.IN_PLACE) {
        var _valueOfSecond = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 2);
        if (_valueOfSecond.value) {
          data.inPlaceValue = formatMathFormulaFormValue({
            val: _valueOfSecond.value,
            key: key.value,
            tableName: _enum.EnumTableNameInUwSheet.FINANCIAL_SUMMARY
          });
          if (_valueOfSecond.numFmt) {
            if (data.inPlaceValue) {
              data.inPlaceType = typeOfValue(data.inPlaceValue, _valueOfSecond.numFmt);
            }
            if (_valueOfSecond.numFmt.includes('%')) {
              data.inPlaceValue *= 100;
            }
          }
        }
      }
      // adding condition for notes if it's in second header
      else if (headerTwo.value && headerTwo.value === _enum.EnumColumnNameOfFinancialSummary.NOTES) {
        var valueOfNotes = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 2);
        if (valueOfNotes.value) {
          // check for the type , if type is string assign as it is, else convert to string
          data.note = typeof valueOfNotes.value === 'string' ? valueOfNotes.value : "".concat(valueOfNotes.value);
        }
      }
      // adding condition for notes if it's in third header as notes can be either in 2nd or 3rd column only
      if (headerThree.value && headerThree.value === _enum.EnumColumnNameOfFinancialSummary.NOTES) {
        var _valueOfNotes = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 3);
        if (_valueOfNotes.value) {
          // check for the type , if type is string assign as it is, else convert to string
          data.note = typeof _valueOfNotes.value === 'string' ? _valueOfNotes.value : "".concat(_valueOfNotes.value);
        }
      }
    }
    // eslint-disable-next-line no-param-reassign
    currentCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
    if (!key.value || key.value === null) {
      break;
    }
    if (Object.keys(data).length) {
      resultArray.push(data);
    }
  }
  return {
    processedData: resultArray,
    currentCell: currentCell
  };
}

/**
 * Imports and processes an Excel file from a given URL.
 * @param {string} url - URL of the Excel file.
 * @returns {Object} - Processed data from the Excel file.
 * @throws {ApiError} - Throws an error if there's an issue with file reading or processing.
 */
// eslint-disable-next-line import/prefer-default-export
var importExcelFile = exports.importExcelFile = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
    var data, response, buffer, Workbook, propertySummary, dealMetrics, financingRequest, sourcesAndUses, rentRollSummary, financialSummary;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          data = {}; // Download the Excel file using the pre-signed URL
          _context.next = 4;
          return axios.get(url, {
            responseType: 'arraybuffer'
          });
        case 4:
          response = _context.sent;
          buffer = Buffer.from(response.data, 'binary');
          Workbook = XLSX.read(buffer, {
            type: 'buffer'
          });
          _context.next = 9;
          return workbook.xlsx.load(buffer);
        case 9:
          propertySummary = [];
          dealMetrics = [];
          financingRequest = [];
          sourcesAndUses = {};
          rentRollSummary = [];
          financialSummary = {};
          workbook.eachSheet(function (excelSheetData) {
            if (excelSheetData.name === _enum.EnumSheetNameOfUw.SUMMARY) {
              var summaryData = Workbook.Sheets[excelSheetData.name];

              // Property Summary
              var processedPropertySummary = processSimpleTableData({
                summaryData: summaryData,
                tableName: _enum.EnumTableNameInUwSheet.PROPERTY_SUMMARY,
                excelSheetData: excelSheetData
              });
              propertySummary.push.apply(propertySummary, _toConsumableArray(processedPropertySummary));
              _logger.logger.info("".concat(propertySummary.length, " rows imported for ").concat(_enum.EnumTableNameInUwSheet.PROPERTY_SUMMARY));

              // Deal Metrics
              var processedDealMetrics = processSimpleTableData({
                summaryData: summaryData,
                tableName: _enum.EnumTableNameInUwSheet.DEAL_METRICS,
                excelSheetData: excelSheetData
              });
              dealMetrics.push.apply(dealMetrics, _toConsumableArray(processedDealMetrics));
              _logger.logger.info("".concat(dealMetrics.length, " rows imported for ").concat(_enum.EnumTableNameInUwSheet.DEAL_METRICS));

              // Financing Request
              var processedFinancingRequest = processSimpleTableData({
                summaryData: summaryData,
                tableName: _enum.EnumTableNameInUwSheet.FINANCING_REQUEST,
                excelSheetData: excelSheetData
              });
              financingRequest.push.apply(financingRequest, _toConsumableArray(processedFinancingRequest));
              _logger.logger.info("".concat(financingRequest.length, " rows imported for ").concat(_enum.EnumTableNameInUwSheet.FINANCING_REQUEST));

              // Sources and Uses
              var sourcesUsesValue = Object.entries(summaryData).find(function (_ref8) {
                var _ref9 = _slicedToArray(_ref8, 2),
                  value = _ref9[1];
                return value.v === _enum.EnumTableNameInUwSheet.SOURCES_AND_USES;
              });
              var sources = [];
              var uses = [];
              if (sourcesUsesValue) {
                var processedSources = processSimpleTableData({
                  summaryData: summaryData,
                  tableName: _enum.EnumTableNameInUwSheet.SOURCES,
                  excelSheetData: excelSheetData,
                  dataArray: sources
                });
                sources.push.apply(sources, _toConsumableArray(processedSources));
                sourcesAndUses.sources = sources;
                _logger.logger.info("".concat(sources.length, " rows imported for ").concat(_enum.EnumTableNameInUwSheet.SOURCES));
                var processedUses = processSimpleTableData({
                  summaryData: summaryData,
                  tableName: _enum.EnumTableNameInUwSheet.USES,
                  excelSheetData: excelSheetData,
                  dataArray: uses
                });
                uses.push.apply(uses, _toConsumableArray(processedUses));
                sourcesAndUses.uses = uses;
                _logger.logger.info("".concat(uses.length, " rows imported for ").concat(_enum.EnumTableNameInUwSheet.USES));
              }
            } else if (excelSheetData.name === _enum.EnumSheetNameOfUw.NOI) {
              var noIData = Workbook.Sheets[excelSheetData.name];
              var financialSummaryValue = Object.entries(noIData).find(function (_ref10) {
                var _ref11 = _slicedToArray(_ref10, 2),
                  value = _ref11[1];
                return value.v === _enum.EnumTableNameInUwSheet.FINANCIAL_SUMMARY;
              });
              // Financial Summary
              if (financialSummaryValue) {
                var currentCell = excelSheetData.getCell(financialSummaryValue[0]);
                // Getting cell for all the three headers In-Place, Stabilized and Notes
                var headerOne = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 1);
                var headerTwo = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 2);
                var headerThree = excelSheetData.getCell(currentCell.row + 1, currentCell.col + 3);
                if (!headerOne.value) {
                  headerOne.value = _enum.EnumColumnNameOfFinancialSummary.IN_PLACE;
                }
                var processedData = processFinancialSummaryData({
                  excelSheetData: excelSheetData,
                  currentCell: currentCell,
                  headerOne: headerOne,
                  headerTwo: headerTwo,
                  headerThree: headerThree
                });
                var totalRevenue = processedData.processedData;
                currentCell = processedData.currentCell;
                financialSummary.revenue = totalRevenue;
                _logger.logger.info("".concat(totalRevenue.length, " rows imported for ").concat(_enum.EnumTableNameInUwSheet.REVENUE, " in ").concat(_enum.EnumTableNameInUwSheet.FINANCIAL_SUMMARY));
                var startingCell = excelSheetData.getCell(currentCell.row + 1, currentCell.col);
                var expensesValue = Object.entries(noIData).find(function (_ref12) {
                  var _ref13 = _slicedToArray(_ref12, 2),
                    value = _ref13[1];
                  return value.v === _enum.EnumTableNameInUwSheet.EXPENSES;
                });
                if (expensesValue) {
                  var currentCellForExpense = excelSheetData.getCell(expensesValue[0]);
                  while (currentCellForExpense.address !== startingCell.address) {
                    currentCellForExpense = excelSheetData.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
                  }
                  var processedExpenseData = processFinancialSummaryData({
                    excelSheetData: excelSheetData,
                    currentCell: currentCellForExpense,
                    headerOne: headerOne,
                    headerTwo: headerTwo,
                    headerThree: headerThree
                  });
                  var expenses = processedExpenseData.processedData;
                  currentCell = processedExpenseData.currentCell;
                  financialSummary.expenses = expenses;
                  _logger.logger.info("".concat(expenses.length, " rows imported for ").concat(_enum.EnumTableNameInUwSheet.EXPENSES, " in ").concat(_enum.EnumTableNameInUwSheet.FINANCIAL_SUMMARY));
                  var effectiveGrossIncomeInPlace = totalRevenue.find(function (revenue) {
                    return revenue.key === _enum.EnumColumnNameOfFinancialSummary.EFFECTIVE_GROSS_INCOME;
                  }).inPlaceValue;
                  var effectiveGrossIncomeStabilized = totalRevenue.find(function (revenue) {
                    return revenue.key === _enum.EnumColumnNameOfFinancialSummary.EFFECTIVE_GROSS_INCOME;
                  }).stabilizedValue;
                  var totalOperatingExpensesInPlace = expenses.find(function (expense) {
                    return expense.key === _enum.EnumColumnNameOfFinancialSummary.TOTAL_OPERATING_EXPNESES;
                  }).inPlaceValue;
                  var totalOperatingExpensesStabilized = expenses.find(function (expense) {
                    return expense.key === _enum.EnumColumnNameOfFinancialSummary.TOTAL_OPERATING_EXPNESES;
                  }).stabilizedValue;

                  // eslint-disable-next-line no-restricted-globals
                  if (!isNaN(effectiveGrossIncomeInPlace) && !isNaN(totalOperatingExpensesInPlace)) {
                    financialSummary.netOperatingIncome = {
                      inPlaceValue: "$".concat(effectiveGrossIncomeInPlace - totalOperatingExpensesInPlace)
                    };
                  }
                  // eslint-disable-next-line no-restricted-globals
                  if (!isNaN(effectiveGrossIncomeStabilized) && !isNaN(totalOperatingExpensesStabilized)) {
                    financialSummary.netOperatingIncome = _objectSpread(_objectSpread({}, financialSummary.netOperatingIncome), {}, {
                      stabilizedValue: "$".concat(effectiveGrossIncomeStabilized - totalOperatingExpensesStabilized)
                    });
                  }
                }
              }
            } else if (excelSheetData.name === _enum.EnumSheetNameOfUw.RENT_ROLL) {
              var rentRollSheetData = Workbook.Sheets[excelSheetData.name];
              var rentRollSummaryValue = Object.entries(rentRollSheetData).find(function (_ref14) {
                var _ref15 = _slicedToArray(_ref14, 2),
                  value = _ref15[1];
                return value.v === _enum.EnumTableNameInUwSheet.RENT_ROLL_SUMMARY;
              });
              // Rent Roll Summary
              if (rentRollSummaryValue) {
                var _currentCell = excelSheetData.getCell(rentRollSummaryValue[0]);
                var columnHeaders = getHeadersOfTable(excelSheetData, _currentCell);
                var columnHeaderRow = _currentCell.row + 1;
                _currentCell = excelSheetData.getCell(rentRollSummaryValue[0]);
                var dataRow = columnHeaderRow + 1;

                // Process data rows dynamically
                while (true) {
                  var rowData = [];
                  var hasData = false;

                  // Iterate through each column dynamically
                  // eslint-disable-next-line no-plusplus
                  for (var i = 0; i < columnHeaders.length; i++) {
                    var rentRollData = {};
                    var columnValueCell = excelSheetData.getCell(dataRow, _currentCell.col + i);
                    var columnValue = formatMathFormulaFormValue({
                      val: columnValueCell.value,
                      key: columnHeaders[i],
                      tableName: _enum.EnumTableNameInUwSheet.RENT_ROLL_SUMMARY
                    });
                    if (columnValue !== 'Type' && columnValue !== null) {
                      rowData[columnHeaders[i]] = columnValue;
                      rentRollData.key = columnHeaders[i];
                      rentRollData.value = columnValue;
                      if (columnValue) {
                        rentRollData.type = typeOfValue(columnValue, columnValueCell.numFmt ? columnValueCell.numFmt : '');
                      }
                      if (columnValueCell.numFmt) {
                        if (columnValueCell.numFmt.includes('%')) {
                          columnValue *= 100;
                        }
                      }
                      rowData.push(rentRollData);
                      hasData = true;
                    }
                  }
                  if (hasData) {
                    rentRollSummary.push(rowData);
                  }
                  // eslint-disable-next-line no-plusplus
                  dataRow++;
                  var checkEmptyCell = excelSheetData.getCell(dataRow, _currentCell.col);

                  // Break the loop if the row is empty
                  if (!checkEmptyCell.value) {
                    break;
                  }
                }
                _logger.logger.info("".concat(rentRollSummary.length, " rows imported for ").concat(_enum.EnumTableNameInUwSheet.RENT_ROLL_SUMMARY));
              }
            }
          });
          data.propertySummary = propertySummary;
          data.dealMetrics = dealMetrics;
          data.financingRequest = financingRequest;
          data.sourcesAndUses = sourcesAndUses;
          data.rentRollSummary = rentRollSummary;
          data.financialSummary = financialSummary;

          // Validates the consistency of the requested loan amount across Sources, Deal Metrics and Financing Request
          (0, _common.validateLoanAmount)(data);
          return _context.abrupt("return", data);
        case 26:
          _context.prev = 26;
          _context.t0 = _context["catch"](0);
          _logger.logger.error(_context.t0);
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "Failed to read XLSheet: ".concat(_context.t0.message));
        case 30:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 26]]);
  }));
  return function importExcelFile(_x) {
    return _ref7.apply(this, arguments);
  };
}();
var importTableDataFromExcel = exports.importTableDataFromExcel = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(url, keyToMatch) {
    var data, response, buffer, Workbook, customTableData;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          data = {};
          _context2.next = 4;
          return axios.get(url, {
            responseType: 'arraybuffer'
          });
        case 4:
          response = _context2.sent;
          buffer = Buffer.from(response.data, 'binary');
          Workbook = XLSX.read(buffer, {
            type: 'buffer'
          });
          customTableData = [];
          _context2.next = 10;
          return workbook.xlsx.load(buffer);
        case 10:
          workbook.eachSheet(function (excelSheetData) {
            var customBlockTableData = Workbook.Sheets[excelSheetData.name];
            // Find the starting point in the sheet (skip the first entry which is usually "!" in Excel)
            var startingPoint = Object.entries(customBlockTableData)[1];
            var matchingPair = Object.keys(customBlockTableData).filter(function (key) {
              var importedKeyToMatch =
              // if the  title is numeric type (e.g, 555) then getting number type value so getting issue in compare so converted to string
              typeof customBlockTableData[key].v === 'string' ? customBlockTableData[key].v : "".concat(customBlockTableData[key].v);
              return importedKeyToMatch === keyToMatch;
            });
            if (matchingPair && matchingPair.length === 1) {
              var titleIndex = matchingPair[0];
              var matchingKeyValuePair = _defineProperty({}, titleIndex, customBlockTableData[titleIndex]);
              var _Object$entries = Object.entries(matchingKeyValuePair);
              var _Object$entries2 = _slicedToArray(_Object$entries, 1);
              startingPoint = _Object$entries2[0];
            } else if (matchingPair.length > 1) {
              throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "Multiple titles present in the sheet");
            } else {
              throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "Title not found in the sheet ");
            }
            if (startingPoint) {
              // Initialize the current cell to the starting point
              var currentCell = excelSheetData.getCell(startingPoint[0]);
              var belowCellValue = excelSheetData.getCell(currentCell.row + 1, currentCell.col).value;
              if (!belowCellValue) {
                throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "No data found below title.");
              }
              var customTableTitle = currentCell.value; //  store the title of the customTable
              var columnHeaders = getHeadersOfTable(excelSheetData, currentCell);
              var columnHeaderRow = currentCell.row + 1;

              // Reset the current cell to the starting point
              currentCell = excelSheetData.getCell(startingPoint[0]);
              // Start processing data rows below the column headers
              var dataRow = columnHeaderRow + 1;

              // Process data rows dynamically
              while (true) {
                var rowData = [];
                var hasData = false;

                // Iterate through each column dynamically
                // eslint-disable-next-line no-plusplus
                for (var i = 0; i < columnHeaders.length; i++) {
                  var rowDataObject = {};
                  var columnValueCell = excelSheetData.getCell(dataRow, currentCell.col + i);
                  var columnValue = formatMathFormulaFormValue({
                    // if columnValueCell has not value then add dash (-)
                    val: columnValueCell.value ? columnValueCell.value : '-',
                    key: 'customTable',
                    tableName: 'customTable'
                  });
                  if (columnValue !== null) {
                    rowDataObject.key = columnHeaders[i];
                    rowDataObject.value = columnValue;
                    if (columnValue) {
                      rowDataObject.type = typeOfValue(columnValue, columnValueCell.numFmt ? columnValueCell.numFmt : '');
                    }
                    if (columnValueCell.numFmt) {
                      if (columnValueCell.numFmt.includes('%')) {
                        columnValue *= 100;
                        rowDataObject.value = columnValue;
                      }
                    }
                    rowData.push(rowDataObject);
                    hasData = true;
                  }
                }
                if (hasData) {
                  customTableData.push(rowData);
                }
                // eslint-disable-next-line no-plusplus
                dataRow++;
                var nextRow = [];
                // get the values of nextRow and push into an array for checking break condition
                for (var _i = 0; _i < columnHeaders.length; _i += 1) {
                  var cellValue = excelSheetData.getCell(dataRow, currentCell.col + _i).value;
                  if (cellValue) {
                    nextRow.push(cellValue);
                  }
                }

                // Break the loop if the next row is empty
                if (!nextRow.length) {
                  break;
                }
              }
              // Throw an error if only headers row present in sheet, no data rows present
              if (customTableData.length < 1) {
                throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "Table has insufficient data");
              }
              _logger.logger.info("".concat(customTableData.length, " rows imported for table ").concat(customTableTitle));
              data.customTableTitle = customTableTitle;
              data.customTableData = customTableData;
            }
          });
          return _context2.abrupt("return", data);
        case 14:
          _context2.prev = 14;
          _context2.t0 = _context2["catch"](0);
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "Failed to read data from file: ".concat(_context2.t0.message));
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 14]]);
  }));
  return function importTableDataFromExcel(_x2, _x3) {
    return _ref16.apply(this, arguments);
  };
}();