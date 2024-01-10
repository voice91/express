"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateExcelFromDealSummeryServices = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _axios = _interopRequireDefault(require("axios"));
var _xlsx = _interopRequireDefault(require("xlsx"));
var _exceljs = _interopRequireDefault(require("exceljs"));
var _logger = require("../config/logger");
var _ApiError = _interopRequireDefault(require("./ApiError"));
var _models = require("../models");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
var homedir = require('os').homedir();
var basePath = "".concat(homedir);
var path = require('path');
var workbook = new _exceljs["default"].Workbook();

// eslint-disable-next-line import/prefer-default-export
var updateExcelFromDealSummeryServices = exports.updateExcelFromDealSummeryServices = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(url, dealSummary) {
    var response, buffer, Workbook, worksheet, workbookSheetName, workbookSheet, summary, PropertySummaryValue, currentCell, i, key, value, dealMetricsValue, _currentCell, _i, _key, _value, financingRequestValue, _currentCell2, _i2, _key2, _value2, sourcesUsesValue, _currentCell3, _i3, _key3, _value3, UsesValue, currentCellForUses, j, _key4, _value4, sheet, sheetName, workbookSheet2, rentRollSummaryValue, _currentCell4, columnHeaders, columnHeaderRow, _j, columnHeaderCell, dataRow, _loop, _i4, checkEmptyCell, secondSheet, secondSheetName, testSheet2, financialSummaryValue, financialSummary, _currentCell5, headerOne, headerTwo, _i5, _loop2, startingCell, expensesValue, expenses, currentCellForExpense, _loop3, fileName, filePath, outPath;
    return _regeneratorRuntime().wrap(function _callee$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _axios["default"].get(url, {
            responseType: 'arraybuffer'
          });
        case 3:
          response = _context4.sent;
          buffer = Buffer.from(response.data, 'binary');
          Workbook = _xlsx["default"].read(buffer, {
            type: 'buffer'
          });
          _context4.next = 8;
          return workbook.xlsx.load(buffer);
        case 8:
          worksheet = workbook.getWorksheet(Workbook.SheetNames[0]);
          workbookSheetName = Workbook.SheetNames[0];
          workbookSheet = Workbook.Sheets[workbookSheetName];
          _context4.next = 13;
          return _models.DealSummary.findById(dealSummary);
        case 13:
          summary = _context4.sent;
          if (summary) {
            _context4.next = 16;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].NOT_FOUND, "deal summery not found with this id ".concat(dealSummary));
        case 16:
          // PropertySummary
          PropertySummaryValue = Object.entries(workbookSheet).find(function (_ref2) {
            var _ref3 = _slicedToArray(_ref2, 2),
              value = _ref3[1];
            return value.v === 'Property Summary';
          });
          if (!PropertySummaryValue) {
            _context4.next = 31;
            break;
          }
          currentCell = worksheet.getCell(PropertySummaryValue[0]);
          i = 0;
        case 20:
          if (!summary.propertySummary[i]) {
            _context4.next = 31;
            break;
          }
          key = worksheet.getCell(currentCell.row + 1, currentCell.col); // eslint-disable-next-line no-shadow
          value = worksheet.getCell(currentCell.row + 1, currentCell.col + 1);
          key.value = summary.propertySummary[i].key;
          value.value = summary.propertySummary[i].value;
          currentCell = worksheet.getCell(currentCell.row + 1, currentCell.col);
          if (!(!key.value || !value.value || key.value === null || value.value === null)) {
            _context4.next = 28;
            break;
          }
          return _context4.abrupt("break", 31);
        case 28:
          i += 1;
          _context4.next = 20;
          break;
        case 31:
          // dealMetrics
          dealMetricsValue = Object.entries(workbookSheet).find(function (_ref4) {
            var _ref5 = _slicedToArray(_ref4, 2),
              value = _ref5[1];
            return value.v === 'Deal Metrics';
          });
          if (!dealMetricsValue) {
            _context4.next = 46;
            break;
          }
          _currentCell = worksheet.getCell(dealMetricsValue[0]);
          _i = 0;
        case 35:
          if (!summary.dealMetrics[_i]) {
            _context4.next = 46;
            break;
          }
          _key = worksheet.getCell(_currentCell.row + 1, _currentCell.col); // eslint-disable-next-line no-shadow
          _value = worksheet.getCell(_currentCell.row + 1, _currentCell.col + 1);
          _key.value = summary.dealMetrics[_i].key;
          _value.value = summary.dealMetrics[_i].value;
          _currentCell = worksheet.getCell(_currentCell.row + 1, _currentCell.col);
          if (!(!_key.value || !_value.value || _key.value === null || _value.value === null)) {
            _context4.next = 43;
            break;
          }
          return _context4.abrupt("break", 46);
        case 43:
          _i += 1;
          _context4.next = 35;
          break;
        case 46:
          // financingRequest
          financingRequestValue = Object.entries(workbookSheet).find(function (_ref6) {
            var _ref7 = _slicedToArray(_ref6, 2),
              value = _ref7[1];
            return value.v === 'Financing Request';
          });
          if (!financingRequestValue) {
            _context4.next = 61;
            break;
          }
          _currentCell2 = worksheet.getCell(financingRequestValue[0]);
          _i2 = 0;
        case 50:
          if (!summary.financingRequest[_i2]) {
            _context4.next = 61;
            break;
          }
          _key2 = worksheet.getCell(_currentCell2.row + 1, _currentCell2.col); // eslint-disable-next-line no-shadow
          _value2 = worksheet.getCell(_currentCell2.row + 1, _currentCell2.col + 1);
          _key2.value = summary.financingRequest[_i2].key;
          _value2.value = summary.financingRequest[_i2].value;
          _currentCell2 = worksheet.getCell(_currentCell2.row + 1, _currentCell2.col);
          if (!(!_key2.value || !_value2.value || _key2.value === null || _value2.value === null)) {
            _context4.next = 58;
            break;
          }
          return _context4.abrupt("break", 61);
        case 58:
          _i2 += 1;
          _context4.next = 50;
          break;
        case 61:
          // Sources and Uses
          sourcesUsesValue = Object.entries(workbookSheet).find(function (_ref8) {
            var _ref9 = _slicedToArray(_ref8, 2),
              value = _ref9[1];
            return value.v === 'Sources and Uses';
          });
          if (!sourcesUsesValue) {
            _context4.next = 88;
            break;
          }
          _currentCell3 = worksheet.getCell(sourcesUsesValue[0]);
          _i3 = 0;
        case 65:
          if (!summary.sourcesAndUses.sources[_i3]) {
            _context4.next = 74;
            break;
          }
          _key3 = worksheet.getCell(_currentCell3.row + 1, _currentCell3.col);
          _value3 = worksheet.getCell(_currentCell3.row + 1, _currentCell3.col + 1);
          if (_key3.value !== 'Sources') {
            if (_key3.value !== 'Total Sources') {
              _key3.value = summary.sourcesAndUses.sources[_i3].key;
              _value3.value = summary.sourcesAndUses.sources[_i3].value;
            }
            _i3 += 1;
          }
          _currentCell3 = worksheet.getCell(_currentCell3.row + 1, _currentCell3.col);
          if (!(!_key3.value || !_value3.value || _key3.value === null || _value3.value === null)) {
            _context4.next = 72;
            break;
          }
          return _context4.abrupt("break", 74);
        case 72:
          _context4.next = 65;
          break;
        case 74:
          UsesValue = Object.entries(workbookSheet).find(function (_ref10) {
            var _ref11 = _slicedToArray(_ref10, 2),
              value = _ref11[1];
            return value.v === 'Uses';
          });
          if (!UsesValue) {
            _context4.next = 88;
            break;
          }
          currentCellForUses = worksheet.getCell(UsesValue[0]);
          j = 0;
        case 78:
          if (!summary.sourcesAndUses.uses[j]) {
            _context4.next = 88;
            break;
          }
          _key4 = worksheet.getCell(currentCellForUses.row + 1, currentCellForUses.col);
          _value4 = worksheet.getCell(currentCellForUses.row + 1, currentCellForUses.col + 1);
          if (_key4.value !== 'Total Uses') {
            _key4.value = summary.sourcesAndUses.uses[j].key;
            _value4.value = summary.sourcesAndUses.uses[j].value;
          }
          currentCellForUses = worksheet.getCell(currentCellForUses.row + 1, currentCellForUses.col);
          if (!(!_key4.value || !_value4.value || _key4.value === null || _value4.value === null)) {
            _context4.next = 85;
            break;
          }
          return _context4.abrupt("break", 88);
        case 85:
          j += 1;
          _context4.next = 78;
          break;
        case 88:
          sheet = workbook.getWorksheet(Workbook.SheetNames[1]);
          sheetName = Workbook.SheetNames[1];
          workbookSheet2 = Workbook.Sheets[sheetName];
          rentRollSummaryValue = Object.entries(workbookSheet2).find(function (_ref12) {
            var _ref13 = _slicedToArray(_ref12, 2),
              value = _ref13[1];
            return value.v === 'Rent Roll Summary';
          });
          if (!rentRollSummaryValue) {
            _context4.next = 122;
            break;
          }
          _currentCell4 = sheet.getCell(rentRollSummaryValue[0]);
          columnHeaders = [];
          columnHeaderRow = _currentCell4.row + 1;
          _j = 0; // Retrieve column headers dynamically
        case 97:
          if (!true) {
            _context4.next = 105;
            break;
          }
          columnHeaderCell = sheet.getCell(columnHeaderRow, _currentCell4.col);
          if (columnHeaderCell.value) {
            _context4.next = 101;
            break;
          }
          return _context4.abrupt("break", 105);
        case 101:
          columnHeaders.push(columnHeaderCell.value);
          _currentCell4 = sheet.getCell(_currentCell4.row, _currentCell4.col + 1);
          _context4.next = 97;
          break;
        case 105:
          _currentCell4 = sheet.getCell(rentRollSummaryValue[0]);
          dataRow = columnHeaderRow + 1; // Process data rows dynamically
        case 107:
          if (!summary.rentRollSummary.length) {
            _context4.next = 122;
            break;
          }
          _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop(_i4) {
            var getValueToUpdate, columnValueCell;
            return _regeneratorRuntime().wrap(function _loop$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  getValueToUpdate = summary.rentRollSummary[_j].find(function (item) {
                    return item.key === columnHeaders[_i4];
                  });
                  columnValueCell = sheet.getCell(dataRow, _currentCell4.col + _i4);
                  if (columnValueCell.value !== 'Type' && columnValueCell.value !== null && getValueToUpdate) {
                    columnValueCell.value = getValueToUpdate.value;
                  }
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _loop);
          });
          _i4 = 0;
        case 110:
          if (!(_i4 < columnHeaders.length)) {
            _context4.next = 115;
            break;
          }
          return _context4.delegateYield(_loop(_i4), "t0", 112);
        case 112:
          _i4++;
          _context4.next = 110;
          break;
        case 115:
          // eslint-disable-next-line no-plusplus
          dataRow++;
          checkEmptyCell = sheet.getCell(dataRow, _currentCell4.col); // Break the loop if the row is empty
          if (checkEmptyCell.value) {
            _context4.next = 119;
            break;
          }
          return _context4.abrupt("break", 122);
        case 119:
          _j += 1;
          _context4.next = 107;
          break;
        case 122:
          secondSheet = workbook.getWorksheet(Workbook.SheetNames[2]);
          secondSheetName = Workbook.SheetNames[2];
          testSheet2 = Workbook.Sheets[secondSheetName];
          financialSummaryValue = Object.entries(testSheet2).find(function (_ref14) {
            var _ref15 = _slicedToArray(_ref14, 2),
              value = _ref15[1];
            return value.v === 'Financial Summary';
          });
          financialSummary = {};
          if (!financialSummaryValue) {
            _context4.next = 153;
            break;
          }
          _currentCell5 = secondSheet.getCell(financialSummaryValue[0]);
          headerOne = secondSheet.getCell(_currentCell5.row + 1, _currentCell5.col + 1);
          headerTwo = secondSheet.getCell(_currentCell5.row + 1, _currentCell5.col + 2);
          _i5 = 0;
          _loop2 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop2() {
            var key, value, getValueToUpdate, valueOfSecond, _valueOfSecond2;
            return _regeneratorRuntime().wrap(function _loop2$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  // eslint-disable-next-line no-shadow
                  key = secondSheet.getCell(_currentCell5.row + 1, _currentCell5.col);
                  value = secondSheet.getCell(_currentCell5.row + 1, _currentCell5.col + 1);
                  getValueToUpdate = summary.financialSummary.revenue.find(function (item) {
                    return item.key === key.value;
                  });
                  if (key.value && getValueToUpdate) {
                    if (value.value !== 'In-Place' && value.value !== 'Stabilized') {
                      key.value = getValueToUpdate.key;
                      if (headerOne.value === 'In-Place') {
                        value.value = getValueToUpdate.inPlaceValue;
                      } else if (headerOne.value === 'Stabilized') {
                        value.value = getValueToUpdate.stabilizedValue;
                      }
                      if (headerTwo.value && headerTwo.value === 'Stabilized') {
                        valueOfSecond = secondSheet.getCell(_currentCell5.row + 1, _currentCell5.col + 2);
                        valueOfSecond.value = getValueToUpdate.stabilizedValue;
                      } else if (headerTwo.value && headerTwo.value === 'In-Place') {
                        _valueOfSecond2 = secondSheet.getCell(_currentCell5.row + 1, _currentCell5.col + 2);
                        _valueOfSecond2.value = getValueToUpdate.inPlaceValue;
                      }
                    }
                  }
                  _currentCell5 = secondSheet.getCell(_currentCell5.row + 1, _currentCell5.col);
                  if (!(!key.value || key.value === null)) {
                    _context3.next = 7;
                    break;
                  }
                  return _context3.abrupt("return", 1);
                case 7:
                  // eslint-disable-next-line no-unused-vars
                  _i5 += 1;
                case 8:
                case "end":
                  return _context3.stop();
              }
            }, _loop2);
          });
        case 133:
          if (!true) {
            _context4.next = 139;
            break;
          }
          return _context4.delegateYield(_loop2(), "t1", 135);
        case 135:
          if (!_context4.t1) {
            _context4.next = 137;
            break;
          }
          return _context4.abrupt("break", 139);
        case 137:
          _context4.next = 133;
          break;
        case 139:
          startingCell = secondSheet.getCell(_currentCell5.row + 1, _currentCell5.col);
          expensesValue = Object.entries(testSheet2).find(function (_ref16) {
            var _ref17 = _slicedToArray(_ref16, 2),
              value = _ref17[1];
            return value.v === 'Expenses';
          });
          if (!expensesValue) {
            _context4.next = 153;
            break;
          }
          expenses = [];
          currentCellForExpense = secondSheet.getCell(expensesValue[0]);
          while (currentCellForExpense.address !== startingCell.address) {
            currentCellForExpense = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
          }
          _loop3 = /*#__PURE__*/_regeneratorRuntime().mark(function _loop3() {
            var expenseData, key, value, getValueToUpdate, valueOfSecond, _valueOfSecond;
            return _regeneratorRuntime().wrap(function _loop3$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  expenseData = {};
                  key = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
                  value = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 1);
                  getValueToUpdate = summary.financialSummary.expenses.find(function (item) {
                    return item.key === key.value;
                  });
                  if (key.value && getValueToUpdate) {
                    if (value.value !== 'In-Place' && value.value !== 'Stabilized') {
                      expenseData.expenseName = key.value;
                      if (headerOne.value === 'In-Place') {
                        value.value = getValueToUpdate.inPlaceValue;
                      } else if (headerOne.value === 'Stabilized') {
                        value.value = getValueToUpdate.stabilizedValue;
                      }
                      if (headerTwo.value && headerTwo.value === 'Stabilized') {
                        valueOfSecond = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 2);
                        valueOfSecond.value = getValueToUpdate.stabilizedValue;
                      } else if (headerTwo.value && headerTwo.value === 'In-Place') {
                        _valueOfSecond = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col + 2);
                        _valueOfSecond.value = getValueToUpdate.inPlaceValue;
                      }
                    }
                    currentCellForExpense = secondSheet.getCell(currentCellForExpense.row + 1, currentCellForExpense.col);
                  }
                  if (!(!key.value || key.value === null)) {
                    _context2.next = 7;
                    break;
                  }
                  return _context2.abrupt("return", 1);
                case 7:
                  if (Object.keys(expenseData).length) {
                    expenses.push(expenseData);
                  }
                case 8:
                case "end":
                  return _context2.stop();
              }
            }, _loop3);
          });
        case 146:
          if (!true) {
            _context4.next = 152;
            break;
          }
          return _context4.delegateYield(_loop3(), "t2", 148);
        case 148:
          if (!_context4.t2) {
            _context4.next = 150;
            break;
          }
          return _context4.abrupt("break", 152);
        case 150:
          _context4.next = 146;
          break;
        case 152:
          financialSummary.expenses = expenses;
        case 153:
          // summary._id
          fileName = "".concat(summary._id, "-LenderData.xlsx");
          filePath = path.join(basePath, fileName);
          _context4.next = 157;
          return workbook.xlsx.writeFile(filePath);
        case 157:
          outPath = "".concat(filePath);
          return _context4.abrupt("return", outPath);
        case 161:
          _context4.prev = 161;
          _context4.t3 = _context4["catch"](0);
          _logger.logger.error(_context4.t3);
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Failed to write XLSheet');
        case 165:
        case "end":
          return _context4.stop();
      }
    }, _callee, null, [[0, 161]]);
  }));
  return function updateExcelFromDealSummeryServices(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();