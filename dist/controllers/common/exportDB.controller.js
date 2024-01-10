"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportToExcel = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _lodash = _interopRequireDefault(require("lodash"));
var _models = require("../../models");
var _common = require("../../utils/common");
var _catchAsync = require("../../utils/catchAsync");
var _enum = require("../../models/enum.model");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } // eslint-disable-next-line import/no-extraneous-dependencies
var homedir = require('os').homedir();
var basePath = "".concat(homedir);
var path = require('path');

// eslint-disable-next-line import/no-extraneous-dependencies
var excel = require('exceljs');

/**
 * Converts a 0-based index to an Excel-style column reference.
 *
 * @param {number} index - 0-based index representing the column position.
 * @returns {string} - String representing the Excel-style column reference (A,B,...,Z,AA,AB,..).
 */
function getColumnReference(index) {
  var dividend = index + 1;
  var columnName = '';
  while (dividend > 0) {
    var modulo = (dividend - 1) % 26;
    columnName = String.fromCharCode(65 + modulo) + columnName;
    dividend = Math.floor((dividend - modulo) / 26);
  }
  return columnName;
}

/**
 * Converts a column name to its corresponding Excel-style column reference.
 *
 * @param {string[]} columnsArray - Array of column names (strings).
 * @param {string} columnName - Specific column name for which to find the reference.
 * @returns {string} - String representing the Excel-style column reference.
 */
function getColumnReferenceFromColumnName(columnsArray, columnName) {
  return getColumnReference(columnsArray.indexOf(columnName));
}
// Function for old values that are saved in the form of %
// As now as we set the format for this field and multiplying the value by 100 to show it in % format, the already % value stored in db also getting multiply by 100
function processNonRecursiveLTV(value) {
  if (typeof value === 'string' && value.includes('%')) {
    if (parseFloat(value) > 1) {
      return parseFloat(value) / 100;
    }
  }
  return parseFloat(value);
}
// eslint-disable-next-line import/prefer-default-export
var exportToExcel = exports.exportToExcel = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var workbook, LenderContactsheet, fieldNamesofLenderContact, lenderInstitution, lenderNotes, lenderContact, contactDataRows, LenderProgramsheet, fieldNamesofLenderProgram, lenderProgram, programDataRows, lastRow, i, fileName, filePath, outPath;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          // Create a new workbook
          workbook = new excel.Workbook();
          LenderContactsheet = workbook.addWorksheet('CLEAN_CONTACTS');
          fieldNamesofLenderContact = ['Lender', 'First Name', 'Last Name', 'Program(s)', 'Nick Name', 'Email', 'Main Phone', 'Mobile Phone', 'Office Phone', 'Title', 'City', 'State', 'contactTag', 'Email Tag', 'ContactId', 'LenderId']; // Write field names to Excel sheet
          fieldNamesofLenderContact.forEach(function (fieldName, columnIndex) {
            var cell = LenderContactsheet.getCell("".concat(getColumnReference(columnIndex), "1"));
            cell.value = fieldName;
            cell.font = {
              bold: true
            };
          });
          _context.next = 6;
          return _models.LendingInstitution.find().lean();
        case 6:
          lenderInstitution = _context.sent;
          _context.next = 9;
          return _models.LenderInstituteNotes.find({}, {}, {
            populate: 'createdBy'
          }).lean();
        case 9:
          lenderNotes = _context.sent;
          _context.next = 12;
          return _models.LenderContact.find().lean();
        case 12:
          lenderContact = _context.sent;
          contactDataRows = [];
          lenderContact.forEach(function (item) {
            var lender = lenderInstitution.find(function (lenderItem) {
              return lenderItem._id.toString() === item.lenderInstitute.toString();
            });
            var rowValues = [];
            rowValues[1] = lender.lenderNameVisible;
            rowValues[2] = item.firstName;
            rowValues[3] = item.lastName;
            rowValues[4] = item.programs ? item.programs.join(', ') : item.programs;
            rowValues[5] = item.nickName;
            rowValues[6] = item.email;
            rowValues[7] = item.phoneNumberDirect;
            rowValues[8] = item.phoneNumberCell;
            rowValues[9] = item.phoneNumberOffice;
            rowValues[10] = item.title;
            rowValues[11] = item.city;
            rowValues[12] = item.state;
            rowValues[13] = item.contactTag;
            rowValues[14] = item.emailTag;
            rowValues[15] = "".concat(item._id);
            rowValues[16] = "".concat(lender._id);
            contactDataRows.push(rowValues);
          });
          // sort the data in the asc order of Lender Name
          contactDataRows.sort(function (a, b) {
            return a[1].localeCompare(b[1]);
          });
          // add rows to sheet one by one
          contactDataRows.forEach(function (row) {
            LenderContactsheet.addRow(row);
          });
          LenderProgramsheet = workbook.addWorksheet('CLEAN_LENDERS');
          fieldNamesofLenderProgram = ['Lender Name', 'Lender Type', 'Program Name', 'Min', 'Min Tag', 'Max', 'Max Tag', 'States Array', 'States Tag', 'Property Type Array', 'Property Type Tag', 'Does Not Do', 'Does Not Do Tag', 'Loan Type Array', 'Loan Type Tag', 'Index Used', 'Spread Estimate', 'Counties', 'Recourse Required', 'Non-Recourse LTV', 'Description', 'Headquarters', 'Website', 'Ranking', 'Note 1 Date', 'Note 1 Content', 'Note 1 Person', 'Note 2 Date', 'Note 2 Content', 'Note 2 Person', 'Note 3 Date', 'Note 3 Content', 'Note 3 Person', 'Note 4 Date', 'Note 4 Content', 'Note 4 Person', 'Note 5 Date', 'Note 5 Content', 'Note 5 Person', 'ProgramId', 'LenderInstituteId', 'Note 1 Id', 'Note 2 Id', 'Note 3 Id', 'Note 4 Id', 'Note 5 Id']; // Write field names to Excel sheet
          fieldNamesofLenderProgram.forEach(function (fieldName, columnIndex) {
            var cell = LenderProgramsheet.getCell("".concat(getColumnReference(columnIndex), "1"));
            cell.value = fieldName;
            cell.font = {
              bold: true
            };
          });
          _context.next = 22;
          return _models.LenderProgram.find().lean();
        case 22:
          lenderProgram = _context.sent;
          programDataRows = [];
          lenderProgram.forEach(function (item) {
            var lender = lenderInstitution.find(function (lenderItem) {
              return lenderItem._id.toString() === item.lenderInstitute.toString();
            });
            // eslint-disable-next-line no-shadow
            var notes = lenderNotes.filter(function (note) {
              return note.lenderInstitute.toString() === lender._id.toString();
            }).sort(function (a, b) {
              return b.createdAt - a.createdAt;
            });
            var statesArray = item.statesArray;
            var result = _lodash["default"].intersection(statesArray, _common.CsvStatesArrayMapping.Nationwide);
            if (result.length >= _common.CsvStatesArrayMapping.Nationwide.length) {
              statesArray = ['Nationwide'];
            }
            function returnPropertyArrayAsExcelSheet(propertyArray) {
              // eslint-disable-next-line no-shadow
              var propertyMappingValue = propertyArray.map(function (item) {
                return _common.CsvReverseLenderPropertyTypeMapping[item];
              });
              return propertyMappingValue.join(', ');
            }
            var property;
            if (item.propertyType.length >= _enum.defaulAssetTypeOfDeal.length) {
              if (item.propertyType.length === _enum.defaulAssetTypeOfDeal.length) {
                if (JSON.stringify(item.propertyType.sort()) === JSON.stringify(_enum.defaulAssetTypeOfDeal.sort())) {
                  property = 'Default';
                } else {
                  property = returnPropertyArrayAsExcelSheet(item.propertyType);
                }
              } else if (Object.values(_enum.EnumAssetTypeOfDeal).length === item.propertyType.length) {
                if (JSON.stringify(item.propertyType.sort()) === JSON.stringify(Object.values(_enum.EnumAssetTypeOfDeal).sort())) {
                  property = 'All';
                }
              } else if (_enum.defaulAssetTypeOfDeal.every(function (value) {
                return item.propertyType.includes(value);
              })) {
                var diffValues = item.propertyType.filter(function (value) {
                  return !_enum.defaulAssetTypeOfDeal.includes(value);
                }).filter(Boolean);
                // eslint-disable-next-line no-shadow
                var diffMappingValue = diffValues.map(function (item) {
                  return _common.CsvReverseLenderPropertyTypeMapping[item];
                });
                property = "Default+".concat(diffMappingValue.join('+'));
              } else {
                property = returnPropertyArrayAsExcelSheet(item.propertyType);
              }
            } else {
              property = returnPropertyArrayAsExcelSheet(item.propertyType);
            }
            var rowValues = [];
            rowValues[1] = lender.lenderNameVisible;
            rowValues[2] = _common.CsvReverseLenderTypeMapping[lender.lenderType];
            rowValues[3] = item.lenderProgramType;
            rowValues[4] = item.minLoanSize ? item.minLoanSize : '';
            rowValues[5] = item.minLoanTag;
            rowValues[6] = item.maxLoanSize ? item.maxLoanSize : '';
            rowValues[7] = item.maxLoanTag;
            rowValues[8] = statesArray.join(', ');
            rowValues[9] = item.statesArrTag.join(', ');
            rowValues[10] = property;
            rowValues[11] = item.propTypeArrTag.join(', ');
            rowValues[12] = item.doesNotLandOn.map(function (val) {
              return _common.CsvReverseLenderPropertyTypeMapping[val];
            }).join(', ');
            rowValues[13] = item.doesNotLandOnArrTag.join(', ');
            rowValues[14] = item.loanType.map(function (val) {
              return _common.CsvReverseLenderLoanTypeMapping[val];
            }).join(', ');
            rowValues[15] = item.loanTypeArrTag.join(', ');
            rowValues[16] = item.indexUsed;
            rowValues[17] = item.spreadEstimate;
            rowValues[18] = item.counties ? item.counties.join(', ') : '';
            rowValues[19] = item.recourseRequired;
            rowValues[20] = item.nonRecourseLTV ? processNonRecursiveLTV(item.nonRecourseLTV) : ''; // we formatted cell as percentage so need the value as number
            // rowValues[20] = item.nonRecourseLTV ? parseFloat(item.nonRecourseLTV) : ''; // we formatted cell as percentage so need the value as number
            rowValues[21] = lender.description;
            rowValues[22] = lender.headquarter;
            rowValues[23] = lender.website;
            rowValues[24] = lender.creRanking;
            if (notes.length) {
              var refCellNumber = 25;
              for (var i = 0; i < notes.length && i <= 4; i += 1) {
                rowValues[refCellNumber] = notes[i].updatedAt;
                refCellNumber += 1;
                rowValues[refCellNumber] = notes[i].content;
                refCellNumber += 1;
                rowValues[refCellNumber] = notes[i].createdBy && notes[i].createdBy.firstName ? notes[i].createdBy.firstName : '';
                refCellNumber += 1;
              }
            }
            rowValues[40] = "".concat(item._id);
            rowValues[41] = "".concat(lender._id);
            if (notes.length) {
              for (var _i = 0; notes[_i] && _i <= 4; _i += 1) {
                rowValues[42 + _i] = "".concat(notes[_i]._id);
              }
            }
            programDataRows.push(rowValues);
          });

          // sort the data in the asc order of Lender Name
          programDataRows.sort(function (a, b) {
            return a[1].localeCompare(b[1]);
          });
          // add rows to sheet one by one
          programDataRows.forEach(function (row) {
            LenderProgramsheet.addRow(row);
          });
          lastRow = LenderProgramsheet.getColumn('A').worksheet.rowCount || 999; // set the format of cell
          for (i = 2; i <= lastRow; i += 1) {
            LenderProgramsheet.getCell("".concat(getColumnReferenceFromColumnName(fieldNamesofLenderProgram, 'Min')).concat(i)).numFmt = '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"??_);_(@_)'; // format cell of min amount as number with $
            LenderProgramsheet.getCell("".concat(getColumnReferenceFromColumnName(fieldNamesofLenderProgram, 'Max')).concat(i)).numFmt = '_("$"* #,##0_);_("$"* (#,##0);_("$"* "-"??_);_(@_)'; //  format cell of max amount as number with $
            LenderProgramsheet.getCell("".concat(getColumnReferenceFromColumnName(fieldNamesofLenderProgram, 'Non-Recourse LTV')).concat(i)).numFmt = '0%'; //  format cell of nonRecourseLTV as percentage
          }

          // Save the workbook as an Excel file when all rows have been processed
          // Get the user's home directory path
          // Set the file path with the download directory
          fileName = '/LenderData.xlsx'; // todo : this can be dynamic so we have to change it
          filePath = path.join(basePath, fileName);
          _context.next = 33;
          return workbook.xlsx.writeFile(filePath);
        case 33:
          outPath = "".concat(filePath); // res.sendFile(outPath);
          return _context.abrupt("return", res.status(_httpStatus["default"].OK).sendFile(outPath));
        case 35:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());