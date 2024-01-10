"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDealSummary = createDealSummary;
exports.dealSummeryDto = dealSummeryDto;
exports.getDealSummaryById = getDealSummaryById;
exports.importFileForDealSummary = importFileForDealSummary;
exports.removeDealSummary = removeDealSummary;
exports.updateDealSummary = updateDealSummary;
exports.updateExcelFromDealSummery = updateExcelFromDealSummery;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _lodash = _interopRequireDefault(require("lodash"));
var _models = require("../models");
var _importExcel = require("../utils/importExcel");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _updateExcelFromDealSummeryServices = require("../utils/updateExcelFromDealSummeryServices");
var _common = require("../utils/common");
var _enum = require("../models/enum.model");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function dealSummeryDto(dealSummary) {
  if (dealSummary.dealMetrics) {
    Object.assign(dealSummary, {
      dealMetrics: dealSummary.dealMetrics.map(function (item) {
        if ([_enum.EnumKeyNameInDealSummary.STABILIZED_DY, _enum.EnumKeyNameInDealSummary.ESTIMATED_LTV, _enum.EnumKeyNameInDealSummary.IN_PLACE_DY].includes(item.key)) {
          return (0, _common.changeData)(item, 1, _enum.EnumKeyNameInDealSummary.TYPE, _enum.EnumKeyNameInDealSummary.VALUE);
        }
        // In-Place DSCR also need to send in the 2 decimal with x
        if ([_enum.EnumKeyNameInDealSummary.STABILIZED_DSCR, _enum.EnumKeyNameInDealSummary.IN_PLACE_DSCR].includes(item.key)) {
          if (typeof item.value === 'string' && item.value.includes('x')) {
            return item;
          }
          var convertedData = (0, _common.changeData)(item, 2, _enum.EnumKeyNameInDealSummary.TYPE, _enum.EnumKeyNameInDealSummary.VALUE);
          convertedData.value = "".concat(convertedData.value, "x");
          return convertedData;
        }
        return (0, _common.changeData)(item, 0, _enum.EnumKeyNameInDealSummary.TYPE, _enum.EnumKeyNameInDealSummary.VALUE);
      })
    });
  }
  if (!_lodash["default"].isEmpty(dealSummary.financingRequest)) {
    Object.assign(dealSummary, {
      financingRequest: dealSummary.financingRequest.map(function (item) {
        return (0, _common.changeData)(item, 0, _enum.EnumKeyNameInDealSummary.TYPE, _enum.EnumKeyNameInDealSummary.VALUE);
      })
    });
  }
  if (!_lodash["default"].isEmpty(dealSummary.propertySummary)) {
    Object.assign(dealSummary, {
      propertySummary: dealSummary.propertySummary.map(function (item) {
        return (0, _common.changeData)(item, 0, _enum.EnumKeyNameInDealSummary.TYPE, _enum.EnumKeyNameInDealSummary.VALUE);
      })
    });
  }
  if (dealSummary.sourcesAndUses && !_lodash["default"].isEmpty(dealSummary.sourcesAndUses.sources)) {
    Object.assign(dealSummary.sourcesAndUses, {
      sources: dealSummary.sourcesAndUses.sources.map(function (item) {
        return (0, _common.changeData)(item, 0, _enum.EnumKeyNameInDealSummary.TYPE, _enum.EnumKeyNameInDealSummary.VALUE);
      }).filter(function (item) {
        return item.key !== _enum.EnumKeyNameInDealSummary.TOTAL_SOURCES;
      })
    });
  }
  if (dealSummary.sourcesAndUses && !_lodash["default"].isEmpty(dealSummary.sourcesAndUses.uses)) {
    Object.assign(dealSummary.sourcesAndUses, {
      uses: dealSummary.sourcesAndUses.uses.map(function (item) {
        return (0, _common.changeData)(item, 0, _enum.EnumKeyNameInDealSummary.TYPE, _enum.EnumKeyNameInDealSummary.VALUE);
      }).filter(function (item) {
        return item.key !== _enum.EnumKeyNameInDealSummary.TOTAL_USES;
      })
    });
  }
  if (!_lodash["default"].isEmpty(dealSummary.rentRollSummary)) {
    Object.assign(dealSummary, {
      rentRollSummary: dealSummary.rentRollSummary.map(function (item) {
        return item.map(function (data) {
          return (0, _common.changeData)(data, 0, _enum.EnumKeyNameInDealSummary.TYPE, _enum.EnumKeyNameInDealSummary.VALUE);
        });
      })
    });
  }
  if (dealSummary.financialSummary && !_lodash["default"].isEmpty(dealSummary.financialSummary.revenue)) {
    Object.assign(dealSummary.financialSummary, {
      revenue: dealSummary.financialSummary.revenue.map(function (item) {
        return (0, _common.changeData)(item, 0, _enum.EnumKeyNameInDealSummary.IN_PLACE_TYPE, _enum.EnumKeyNameInDealSummary.IN_PLACE_VALUE);
      }).filter(function (data) {
        return data.key !== _enum.EnumColumnNameOfFinancialSummary.EFFECTIVE_GROSS_INCOME;
      })
    });
    Object.assign(dealSummary.financialSummary, {
      revenue: dealSummary.financialSummary.revenue.map(function (item) {
        return (0, _common.changeData)(item, 0, _enum.EnumKeyNameInDealSummary.STABILIZED_TYPE, _enum.EnumKeyNameInDealSummary.STABILIZED_VALUE);
      }).filter(function (data) {
        return data.key !== _enum.EnumColumnNameOfFinancialSummary.EFFECTIVE_GROSS_INCOME;
      })
    });
  }
  if (dealSummary.financialSummary && !_lodash["default"].isEmpty(dealSummary.financialSummary.expenses)) {
    Object.assign(dealSummary.financialSummary, {
      expenses: dealSummary.financialSummary.expenses.map(function (item) {
        return (0, _common.changeData)(item, 0, _enum.EnumKeyNameInDealSummary.IN_PLACE_TYPE, _enum.EnumKeyNameInDealSummary.IN_PLACE_VALUE);
      }).filter(function (data) {
        return data.key !== _enum.EnumColumnNameOfFinancialSummary.TOTAL_OPERATING_EXPNESES;
      })
    });
    Object.assign(dealSummary.financialSummary, {
      expenses: dealSummary.financialSummary.expenses.map(function (item) {
        return (0, _common.changeData)(item, 0, _enum.EnumKeyNameInDealSummary.STABILIZED_TYPE, _enum.EnumKeyNameInDealSummary.STABILIZED_VALUE);
      }).filter(function (data) {
        return data.key !== _enum.EnumColumnNameOfFinancialSummary.TOTAL_OPERATING_EXPNESES;
      })
    });
  }
  return dealSummary;
}

// eslint-disable-next-line import/prefer-default-export
function importFileForDealSummary(_x) {
  return _importFileForDealSummary.apply(this, arguments);
}
function _importFileForDealSummary() {
  _importFileForDealSummary = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(options) {
    var record;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return (0, _importExcel.importExcelFile)(options.url);
        case 2:
          record = _context.sent;
          record.url = options.url;
          record.deal = options.deal;
          return _context.abrupt("return", dealSummeryDto(record));
        case 6:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _importFileForDealSummary.apply(this, arguments);
}
function updateExcelFromDealSummery(_x2, _x3) {
  return _updateExcelFromDealSummery.apply(this, arguments);
}
function _updateExcelFromDealSummery() {
  _updateExcelFromDealSummery = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(body, dealSummaryId) {
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", (0, _updateExcelFromDealSummeryServices.updateExcelFromDealSummeryServices)(body.url, dealSummaryId));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _updateExcelFromDealSummery.apply(this, arguments);
}
function createDealSummary(_x4) {
  return _createDealSummary.apply(this, arguments);
}
function _createDealSummary() {
  _createDealSummary = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(body) {
    var deal, dealSummary;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return _models.Deal.findOne({
            _id: body.deal
          });
        case 2:
          deal = _context3.sent;
          if (deal) {
            _context3.next = 5;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Deal does not Exist..');
        case 5:
          // todo: below code commented as per FE requirements as of now, because already passing url and fileName in documents Array
          // if (body.url) {
          //   body.documents.push({
          //     url: body.url,
          //     fileName: decodeURIComponent(body.url.split('/').pop()),
          //   });
          // }

          if (body.documents && body.documents.length) {
            // eslint-disable-next-line no-param-reassign
            body.documents = body.documents.map(function (item) {
              if (item.url && !item.fileName) {
                // eslint-disable-next-line no-param-reassign
                item.fileName = decodeURIComponent(body.url.split('/').pop());
                return item;
              }
              return item;
            });
          }
          _context3.next = 8;
          return _models.DealSummary.create(body);
        case 8:
          dealSummary = _context3.sent;
          _context3.next = 11;
          return _models.Deal.findOneAndUpdate({
            _id: body.deal
          }, {
            dealSummary: dealSummary._id
          }, {
            "new": true
          });
        case 11:
          return _context3.abrupt("return", dealSummeryDto(dealSummary));
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _createDealSummary.apply(this, arguments);
}
function getDealSummaryById(_x5) {
  return _getDealSummaryById.apply(this, arguments);
}
function _getDealSummaryById() {
  _getDealSummaryById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(query) {
    var options,
      dealSummary,
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          _context4.next = 3;
          return _models.DealSummary.findOne(query, options.projection, options);
        case 3:
          dealSummary = _context4.sent;
          if (dealSummary) {
            _context4.next = 6;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].NOT_FOUND, 'No such Deal Summary');
        case 6:
          return _context4.abrupt("return", dealSummeryDto(dealSummary));
        case 7:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getDealSummaryById.apply(this, arguments);
}
function updateDealSummary(_x6, _x7) {
  return _updateDealSummary.apply(this, arguments);
} // added this remove deal summary function
function _updateDealSummary() {
  _updateDealSummary = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(filter, body) {
    var options,
      key,
      dealSummary,
      _args5 = arguments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          options = _args5.length > 2 && _args5[2] !== undefined ? _args5[2] : {};
          // Loop through each key in the body
          // eslint-disable-next-line no-restricted-syntax
          for (key in body) {
            // Check if the key exists in the body and its value is an empty string
            // eslint-disable-next-line no-prototype-builtins
            if (body.hasOwnProperty(key) && body[key] === '') {
              // If the $unset operator object doesn't exist, initialize it
              if (!body.$unset) {
                // eslint-disable-next-line no-param-reassign
                body.$unset = {};
              }
              // Add the key to the $unset operator object with a value of 1
              // eslint-disable-next-line no-param-reassign
              body.$unset[key] = 1;
              // Remove the key from the body object
              // eslint-disable-next-line no-param-reassign
              delete body[key];
            }
          }
          if (body.documents && body.documents.length) {
            // eslint-disable-next-line no-param-reassign
            body.documents = body.documents.map(function (item) {
              if (item.url && !item.fileName) {
                // eslint-disable-next-line no-param-reassign
                item.fileName = decodeURIComponent(body.url.split('/').pop());
                return item;
              }
              return item;
            });
          }
          _context5.next = 5;
          return _models.DealSummary.findOneAndUpdate(filter, body, options);
        case 5:
          dealSummary = _context5.sent;
          return _context5.abrupt("return", dealSummary);
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _updateDealSummary.apply(this, arguments);
}
function removeDealSummary(_x8) {
  return _removeDealSummary.apply(this, arguments);
}
function _removeDealSummary() {
  _removeDealSummary = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(filter) {
    var dealSummary;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _models.DealSummary.findOneAndRemove(filter);
        case 2:
          dealSummary = _context6.sent;
          return _context6.abrupt("return", dealSummary);
        case 4:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _removeDealSummary.apply(this, arguments);
}