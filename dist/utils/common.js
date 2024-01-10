"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.capitalizeFirstLetter = exports.asyncForEach = exports.addSymbolInData = exports.addIndexForCustomBlocks = exports.addDays = exports.CsvStatesArrayMapping = exports.CsvReverseLenderTypeMapping = exports.CsvReverseLenderPropertyTypeMapping = exports.CsvReverseLenderLoanTypeMapping = exports.CsvLenderTypeMapping = exports.CsvLenderPropertyTypeMapping = exports.CsvLenderLoanTypeMapping = void 0;
exports.changeData = changeData;
exports.sendDealTemplate = exports.removeNullFields = exports.removeFalsyValueFromDealSummery = exports.processDateForExcel = exports.manageTimeLine = exports.manageLenderPlacementStageTimeline = exports.manageDealStageTimeline = exports.isObjectId = exports.isMongooseModel = exports.isMongooseDocument = exports.invitationToDeal = exports.getUserField = exports.getTextFromTemplate = exports.getStateFullName = exports.getQueueUrlFromArn = exports.getMimeType = exports.getKeyFromUrl = exports.getEmailSubjectForDeal = exports.getBatchedIterable = exports.generateOtp = exports.encodeUrl = exports.constructEmailContent = exports.checkTermAdded = void 0;
exports.sortObjectByKeys = sortObjectByKeys;
exports.validateLoanAmount = exports.validUrl = exports.transFormCardResponse = exports.transFormAccountResponse = exports.threadingTemplate = void 0;
var _mongoose = require("mongoose");
var _httpStatus = _interopRequireDefault(require("http-status"));
var _enum = _interopRequireWildcard(require("../models/enum.model"));
var _lodash = _interopRequireWildcard(require("lodash"));
var _moment = _interopRequireDefault(require("moment/moment"));
var _ApiError = _interopRequireDefault(require("./ApiError"));
var _contentType = _interopRequireDefault(require("./content-type.json"));
var _enumStageOfLenderPlacement = require("./enumStageOfLenderPlacement");
var _enumStageForDeal = require("./enumStageForDeal");
var _models = require("../models");
var _services = require("../services");
var _CsvReverseLenderProp;
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _awaitAsyncGenerator(e) { return new _OverloadYield(e, 0); }
function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }
function _AsyncGenerator(e) { var r, t; function resume(r, t) { try { var n = e[r](t), o = n.value, u = o instanceof _OverloadYield; Promise.resolve(u ? o.v : o).then(function (t) { if (u) { var i = "return" === r ? "return" : "next"; if (!o.k || t.done) return resume(i, t); t = e[i](t).value; } settle(n.done ? "return" : "normal", t); }, function (e) { resume("throw", e); }); } catch (e) { settle("throw", e); } } function settle(e, n) { switch (e) { case "return": r.resolve({ value: n, done: !0 }); break; case "throw": r.reject(n); break; default: r.resolve({ value: n, done: !1 }); } (r = r.next) ? resume(r.key, r.arg) : t = null; } this._invoke = function (e, n) { return new Promise(function (o, u) { var i = { key: e, arg: n, resolve: o, reject: u, next: null }; t ? t = t.next = i : (r = t = i, resume(e, n)); }); }, "function" != typeof e["return"] && (this["return"] = void 0); }
_AsyncGenerator.prototype["function" == typeof Symbol && Symbol.asyncIterator || "@@asyncIterator"] = function () { return this; }, _AsyncGenerator.prototype.next = function (e) { return this._invoke("next", e); }, _AsyncGenerator.prototype["throw"] = function (e) { return this._invoke("throw", e); }, _AsyncGenerator.prototype["return"] = function (e) { return this._invoke("return", e); };
function _OverloadYield(t, e) { this.v = t, this.k = e; }
/* eslint-disable */
var asyncForEach = exports.asyncForEach = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(array, callback) {
    var index;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          index = 0;
        case 1:
          if (!(index < array.length)) {
            _context.next = 7;
            break;
          }
          _context.next = 4;
          return callback(array[index], index, array);
        case 4:
          index += 1;
          _context.next = 1;
          break;
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function asyncForEach(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

/* eslint-enable */
/**
 * Check Whether Object is Mongoose Model
 * @param object
 * @returns {boolean}
 */
var isMongooseModel = exports.isMongooseModel = function isMongooseModel() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return object instanceof _mongoose.Mongoose.prototype.Model;
};

/**
 * Check Whether Object is Mongoose Documents
 * @param object
 * @returns {boolean}
 */
var isMongooseDocument = exports.isMongooseDocument = function isMongooseDocument() {
  var object = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return object instanceof _mongoose.Mongoose.prototype.Document;
};

/**
 * Check Whether Object is Mongoose ObjectId
 * @param data
 * @returns {boolean}
 */
var isObjectId = exports.isObjectId = function isObjectId() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _mongoose.Mongoose.prototype.isValidObjectId(data);
};

/**
 * @param {String} string
 * @returns {string}
 */
var capitalizeFirstLetter = exports.capitalizeFirstLetter = function capitalizeFirstLetter() {
  var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 *
 * @returns {number}
 */
var generateOtp = exports.generateOtp = function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000);
};
var transFormCardResponse = exports.transFormCardResponse = function transFormCardResponse(paymentMethod) {
  var _paymentMethod$card = paymentMethod.card,
    expMonth = _paymentMethod$card.exp_month,
    expYear = _paymentMethod$card.exp_year,
    last4 = _paymentMethod$card.last4,
    _paymentMethod$billin = paymentMethod.billing_details,
    _paymentMethod$billin2 = _paymentMethod$billin.address,
    city = _paymentMethod$billin2.city,
    country = _paymentMethod$billin2.country,
    line1 = _paymentMethod$billin2.line1,
    line2 = _paymentMethod$billin2.line2,
    postalCode = _paymentMethod$billin2.postal_code,
    state = _paymentMethod$billin2.state,
    name = _paymentMethod$billin.name,
    id = paymentMethod.id;
  return {
    expMonth: expMonth,
    expYear: expYear,
    last4: last4,
    id: id,
    city: city,
    country: country,
    line1: line1,
    line2: line2,
    postalCode: postalCode,
    state: state,
    name: name
  };
};
var transFormAccountResponse = exports.transFormAccountResponse = function transFormAccountResponse(account) {
  var object = account.object;
  if (object === 'bank_account') {
    var bankName = account.bank_name,
      country = account.country,
      last4 = account.last4,
      routingNumber = account.routing_number;
    return {
      type: 'payout',
      object: object,
      bankName: bankName,
      country: country,
      last4: last4,
      routingNumber: routingNumber
    };
  }
  if (object === 'card') {
    var brand = account.brand,
      _country = account.country,
      expMonth = account.exp_month,
      expYear = account.exp_year,
      funding = account.funding,
      _last = account.last4;
    return {
      type: 'payout',
      object: object,
      brand: brand,
      country: _country,
      expMonth: expMonth,
      expYear: expYear,
      funding: funding,
      last4: _last
    };
  }
  return {};
};
var getUserField = exports.getUserField = function getUserField() {
  var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  return "firstName lastName ".concat(field);
};
/* eslint-disable */
function sortObjectByKeys(o) {
  return Object.keys(o).sort().reduce(function (r, k) {
    return r[k] = o[k], r;
  }, {});
}

/* eslint-enable */
var getBatchedIterable = exports.getBatchedIterable = /*#__PURE__*/function () {
  var _ref = _wrapAsyncGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(cursor, batchSize) {
    var batch, hasNext, item;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          batch = [];
          hasNext = false;
        case 2:
          _context2.next = 4;
          return _awaitAsyncGenerator(cursor.next());
        case 4:
          item = _context2.sent;
          /* eslint-enable no-await-in-loop */
          hasNext = !!item;
          if (hasNext) batch.push(item);
          if (!(batch.length === batchSize)) {
            _context2.next = 11;
            break;
          }
          _context2.next = 10;
          return batch;
        case 10:
          batch = [];
        case 11:
          if (hasNext) {
            _context2.next = 2;
            break;
          }
        case 12:
          if (!batch.length) {
            _context2.next = 15;
            break;
          }
          _context2.next = 15;
          return batch;
        case 15:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function getBatchedIterable(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getQueueUrlFromArn = exports.getQueueUrlFromArn = function getQueueUrlFromArn(arn, sqs) {
  var accountId = arn.split(':')[4];
  var queueName = arn.split(':')[5];
  return "".concat(sqs.endpoint.href + accountId, "/").concat(queueName);
};
var validUrl = exports.validUrl = function validUrl(s) {
  try {
    var url = new URL(s);
    return url;
  } catch (err) {
    return false;
  }
};
var addDays = exports.addDays = function addDays(theDate, days) {
  return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
};
var getMimeType = exports.getMimeType = function getMimeType(allowedExtension) {
  return allowedExtension.map(function (ext) {
    var obj = _contentType["default"].find(function (c) {
      return c.key === ext;
    });
    return obj ? obj.mimeType : '';
  });
};
var encodeUrl = exports.encodeUrl = function encodeUrl(url) {
  var fileUrl = url.split('/');
  var fileUrlToEncode = fileUrl[fileUrl.length - 1];
  var encodedUrl = encodeURI(fileUrlToEncode);
  var fileRemoveUnEncodedPart = fileUrl.splice(0, fileUrl.length - 1);
  fileRemoveUnEncodedPart.push(encodedUrl);
  var finalEncodedUrl = fileRemoveUnEncodedPart.join('/');
  return finalEncodedUrl;
};
var CsvReverseLenderTypeMapping = exports.CsvReverseLenderTypeMapping = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _enum.EnumLenderTypeOfLendingInstitution.BANK, 'Bank'), _enum.EnumLenderTypeOfLendingInstitution.DEBT_FUND, 'Debt Fund'), _enum.EnumLenderTypeOfLendingInstitution.CREDIT_UNION, 'Credit Union'), _enum.EnumLenderTypeOfLendingInstitution.NATIONAL_BANK, 'National Bank'), _enum.EnumLenderTypeOfLendingInstitution.REGIONAL_BANK, 'Regional Bank'), _enum.EnumLenderTypeOfLendingInstitution.LIFECO, 'LifeCo'), _enum.EnumLenderTypeOfLendingInstitution.LIFE_INSURANCE, 'Life Insurance'), _enum.EnumLenderTypeOfLendingInstitution.CMBS, 'CMBS'), _enum.EnumLenderTypeOfLendingInstitution.LOCAL_BANK, 'Local Bank');
var CsvLenderTypeMapping = exports.CsvLenderTypeMapping = {
  Bank: _enum.EnumLenderTypeOfLendingInstitution.BANK,
  'Debt Fund': _enum.EnumLenderTypeOfLendingInstitution.DEBT_FUND,
  'Credit Union': _enum.EnumLenderTypeOfLendingInstitution.CREDIT_UNION,
  'National Bank': _enum.EnumLenderTypeOfLendingInstitution.NATIONAL_BANK,
  'Regional Bank': _enum.EnumLenderTypeOfLendingInstitution.REGIONAL_BANK,
  LifeCo: _enum.EnumLenderTypeOfLendingInstitution.LIFECO,
  'Life Insurance': _enum.EnumLenderTypeOfLendingInstitution.LIFE_INSURANCE,
  CMBS: _enum.EnumLenderTypeOfLendingInstitution.CMBS,
  'Local Bank': _enum.EnumLenderTypeOfLendingInstitution.LOCAL_BANK
};
var CsvReverseLenderPropertyTypeMapping = exports.CsvReverseLenderPropertyTypeMapping = (_CsvReverseLenderProp = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_CsvReverseLenderProp, _enum.EnumAssetTypeOfDeal.MULTIFAMILY, 'Multifamily'), _enum.EnumAssetTypeOfDeal.STUDENT_HOUSING, 'Student Housing'), _enum.EnumAssetTypeOfDeal.INDUSTRIAL, 'Industrial'), _enum.EnumAssetTypeOfDeal.SELF_STORAGE, 'Self-Storage'), _enum.EnumAssetTypeOfDeal.RETAIL, 'Retail'), _enum.EnumAssetTypeOfDeal['1_4_SFR'], '1_4 SFR'), _enum.EnumAssetTypeOfDeal.HOTELS, 'Hotels'), _enum.EnumAssetTypeOfDeal.OFFICE, 'Office'), _enum.EnumAssetTypeOfDeal.NNN_RETAIL, 'NNN Retail'), _enum.EnumAssetTypeOfDeal.MOBILE_HOME_PARK, 'Mobile Home Park'), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_CsvReverseLenderProp, _enum.EnumAssetTypeOfDeal.CANNABIS, 'Cannabis'), _enum.EnumAssetTypeOfDeal.FOR_SALE_CONDOS, 'For Sale Condos'), _enum.EnumAssetTypeOfDeal.HEALTHCARE, 'Healthcare'), _enum.EnumAssetTypeOfDeal.SHORT_TERM_RENTALS, 'Short-term rentals'), _enum.EnumAssetTypeOfDeal.CO_LIVING, 'Co-living'), _enum.EnumAssetTypeOfDeal.OUTDOOR_STORAGE, 'Outdoor Storage'));
var CsvLenderPropertyTypeMapping = exports.CsvLenderPropertyTypeMapping = {
  Multifamily: _enum.EnumAssetTypeOfDeal.MULTIFAMILY,
  'Student Housing': _enum.EnumAssetTypeOfDeal.STUDENT_HOUSING,
  Industrial: _enum.EnumAssetTypeOfDeal.INDUSTRIAL,
  'Self-Storage': _enum.EnumAssetTypeOfDeal.SELF_STORAGE,
  Retail: _enum.EnumAssetTypeOfDeal.RETAIL,
  '1_4 SFR': _enum.EnumAssetTypeOfDeal['1_4_SFR'],
  Hotels: _enum.EnumAssetTypeOfDeal.HOTELS,
  Hospitality: _enum.EnumAssetTypeOfDeal.HOTELS,
  Office: _enum.EnumAssetTypeOfDeal.OFFICE,
  'NNN Retail': _enum.EnumAssetTypeOfDeal.NNN_RETAIL,
  All: Object.values(_enum.EnumAssetTypeOfDeal),
  'Mobile Home Park': _enum.EnumAssetTypeOfDeal.MOBILE_HOME_PARK,
  Cannabis: _enum.EnumAssetTypeOfDeal.CANNABIS,
  'For Sale Condos': _enum.EnumAssetTypeOfDeal.FOR_SALE_CONDOS,
  Healthcare: _enum.EnumAssetTypeOfDeal.HEALTHCARE,
  'Short-term rentals': _enum.EnumAssetTypeOfDeal.SHORT_TERM_RENTALS,
  'Co-living': _enum.EnumAssetTypeOfDeal.CO_LIVING,
  'Outdoor Storage': _enum.EnumAssetTypeOfDeal.OUTDOOR_STORAGE
};
var CsvReverseLenderLoanTypeMapping = exports.CsvReverseLenderLoanTypeMapping = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, _enum.EnumLoanTypeOfDeal.CONSTRUCTION, 'Construction'), _enum.EnumLoanTypeOfDeal.PRE_DEVELOPMENT_LAND, 'Land'), _enum.EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL, 'Light Transitional'), _enum.EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL, 'Heavy Transitional'), _enum.EnumLoanTypeOfDeal.TRANSITIONAL, 'Transitional'), _enum.EnumLoanTypeOfDeal.STABILIZED, 'Stabilized');
var CsvLenderLoanTypeMapping = exports.CsvLenderLoanTypeMapping = {
  Construction: _enum.EnumLoanTypeOfDeal.CONSTRUCTION,
  Bridge: [_enum.EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL, _enum.EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL],
  Permanent: _enum.EnumLoanTypeOfDeal.STABILIZED,
  Land: _enum.EnumLoanTypeOfDeal.PRE_DEVELOPMENT_LAND,
  'Light Bridge': _enum.EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL,
  'Heavy Bridge': _enum.EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL,
  'Light Transitional': _enum.EnumLoanTypeOfDeal.LIGHT_TRANSITIONAL,
  'Heavy Transitional': _enum.EnumLoanTypeOfDeal.HEAVY_TRANSITIONAL,
  Transitional: _enum.EnumLoanTypeOfDeal.TRANSITIONAL,
  Stabilized: _enum.EnumLoanTypeOfDeal.STABILIZED
};
var CsvStatesArrayMapping = exports.CsvStatesArrayMapping = {
  AL: _enum.EnumStatesOfDeal.ALABAMA,
  AK: _enum.EnumStatesOfDeal.ALASKA,
  AZ: _enum.EnumStatesOfDeal.ARIZONA,
  AR: _enum.EnumStatesOfDeal.ARKANSAS,
  CA: _enum.EnumStatesOfDeal.CALIFORNIA,
  CO: _enum.EnumStatesOfDeal.COLORADO,
  CT: _enum.EnumStatesOfDeal.CONNECTICUT,
  DE: _enum.EnumStatesOfDeal.DELAWARE,
  DC: _enum.EnumStatesOfDeal.DISTRICT_OF_COLUMBIA,
  FL: _enum.EnumStatesOfDeal.FLORIDA,
  GA: _enum.EnumStatesOfDeal.GEORGIA,
  HI: _enum.EnumStatesOfDeal.HAWAII,
  ID: _enum.EnumStatesOfDeal.IDAHO,
  IL: _enum.EnumStatesOfDeal.ILLINOIS,
  IN: _enum.EnumStatesOfDeal.INDIANA,
  IA: _enum.EnumStatesOfDeal.IOWA,
  KS: _enum.EnumStatesOfDeal.KANSAS,
  KY: _enum.EnumStatesOfDeal.KENTUCKY,
  LA: _enum.EnumStatesOfDeal.LOUISIANA,
  ME: _enum.EnumStatesOfDeal.MAINE,
  MD: _enum.EnumStatesOfDeal.MARYLAND,
  MA: _enum.EnumStatesOfDeal.MASSACHUSETTS,
  MI: _enum.EnumStatesOfDeal.MICHIGAN,
  MN: _enum.EnumStatesOfDeal.MINNESOTA,
  MS: _enum.EnumStatesOfDeal.MISSISSIPPI,
  MO: _enum.EnumStatesOfDeal.MISSOURI,
  MT: _enum.EnumStatesOfDeal.MONTANA,
  NE: _enum.EnumStatesOfDeal.NEBRASKA,
  NV: _enum.EnumStatesOfDeal.NEVADA,
  NH: _enum.EnumStatesOfDeal.NEW_HAMPSHIRE,
  NJ: _enum.EnumStatesOfDeal.NEW_JERSEY,
  NM: _enum.EnumStatesOfDeal.NEW_MEXICO,
  NY: _enum.EnumStatesOfDeal.NEW_YORK,
  NC: _enum.EnumStatesOfDeal.NORTH_CAROLINA,
  ND: _enum.EnumStatesOfDeal.NORTH_DAKOTA,
  OH: _enum.EnumStatesOfDeal.OHIO,
  OK: _enum.EnumStatesOfDeal.OKLAHOMA,
  OR: _enum.EnumStatesOfDeal.OREGON,
  PA: _enum.EnumStatesOfDeal.PENNSYLVANIA,
  RI: _enum.EnumStatesOfDeal.RHODE_ISLAND,
  SC: _enum.EnumStatesOfDeal.SOUTH_CAROLINA,
  SD: _enum.EnumStatesOfDeal.SOUTH_DAKOTA,
  TN: _enum.EnumStatesOfDeal.TENNESSEE,
  TX: _enum.EnumStatesOfDeal.TEXAS,
  UT: _enum.EnumStatesOfDeal.UTAH,
  VT: _enum.EnumStatesOfDeal.VERMONT,
  VA: _enum.EnumStatesOfDeal.VIRGINIA,
  WA: _enum.EnumStatesOfDeal.WASHINGTON,
  WV: _enum.EnumStatesOfDeal.WEST_VIRGINIA,
  WI: _enum.EnumStatesOfDeal.WISCONSIN,
  WY: _enum.EnumStatesOfDeal.WYOMING,
  Nationwide: Object.values(_enum.EnumStatesOfDeal)
};
var removeFalsyValueFromDealSummery = exports.removeFalsyValueFromDealSummery = function removeFalsyValueFromDealSummery(body) {
  if (body.propertySummary) {
    // eslint-disable-next-line no-param-reassign
    body.propertySummary = body.propertySummary.filter(function (item) {
      return item.value;
    });
  }
  if (body.dealMetrics) {
    // eslint-disable-next-line no-param-reassign
    body.dealMetrics = body.dealMetrics.filter(function (item) {
      return item.value;
    });
  }
  if (body.financingRequest) {
    // eslint-disable-next-line no-param-reassign
    body.financingRequest = body.financingRequest.filter(function (item) {
      return item.value;
    });
  }
  if (body.sourcesAndUses && body.sourcesAndUses.sources) {
    // eslint-disable-next-line no-param-reassign
    body.sourcesAndUses.sources = body.sourcesAndUses.sources.filter(function (item) {
      return item.value;
    });
  }
  if (body.sourcesAndUses && body.sourcesAndUses.uses) {
    // eslint-disable-next-line no-param-reassign
    body.sourcesAndUses.uses = body.sourcesAndUses.uses.filter(function (item) {
      return item.value;
    });
  }
  if (body.financialSummary && body.financialSummary.revenue) {
    // eslint-disable-next-line no-param-reassign
    body.financialSummary.revenue = body.financialSummary.revenue.filter(function (item) {
      return item.inPlaceValue || item.stabilizedValue;
    });
  }
  if (body.financialSummary && body.financialSummary.expenses) {
    // eslint-disable-next-line no-param-reassign
    body.financialSummary.expenses = body.financialSummary.expenses.filter(function (item) {
      return item.inPlaceValue || item.stabilizedValue;
    });
  }
  return body;
};
function findValueFromGivenTableForPArticularKey(table, key) {
  var result = table.find(function (item) {
    return item.key && item.key === key;
  });
  return result ? result.value : false;
}

// when key is not fixed , so we are passing keys array contains possible values of key
function findValueFromSourcesForParticularKey(table, keys) {
  var result = table.find(function (item) {
    return item.key && keys.includes(item.key);
  });
  return result ? result.value : false;
}

/**
 * Validates the consistency of the requested loan amount across different parts of the data.
 * @param {object} data - The data object containing financingRequest, dealMetrics, and sourcesAndUses properties.
 * @throws {Error} Throws an error if the requested loan amount values are inconsistent.
 */
var validateLoanAmount = exports.validateLoanAmount = function validateLoanAmount(data) {
  var requestLoanAmountInFinancingRequest = data.financingRequest && data.financingRequest.length ? findValueFromGivenTableForPArticularKey(data.financingRequest, 'Requested Loan Amount') : null;
  var requestLoanAmountInDealMetrics = data.dealMetrics && data.dealMetrics.length ? findValueFromGivenTableForPArticularKey(data.dealMetrics, 'Requested Loan Amount') : null;
  var requestLoanAmountInSources = data.sourcesAndUses && Object.keys(data.sourcesAndUses).length && data.sourcesAndUses.sources && data.sourcesAndUses.sources.length ? findValueFromSourcesForParticularKey(data.sourcesAndUses.sources, ['Senior Loan', 'Loan Amount', 'Requested Loan Amount']) : null;
  if (
  // Check if requested loan amount in Financing Request and Deal Metrics do not match
  requestLoanAmountInFinancingRequest && requestLoanAmountInDealMetrics && requestLoanAmountInFinancingRequest !== requestLoanAmountInDealMetrics ||
  // Check if requested loan amount in Financing Request and Sources do not match
  requestLoanAmountInFinancingRequest && requestLoanAmountInSources && requestLoanAmountInFinancingRequest !== requestLoanAmountInSources ||
  // Check if requested loan amount in Deal Metrics and Sources do not match
  requestLoanAmountInDealMetrics && requestLoanAmountInSources && requestLoanAmountInDealMetrics !== requestLoanAmountInSources) {
    // If any of the above conditions are true, throw an error with details
    // getting the sectionNames to show dynamically in the error
    var sectionNames = [requestLoanAmountInFinancingRequest ? "Financing Request" : null, requestLoanAmountInDealMetrics ? "Deal Metrics" : null, requestLoanAmountInSources ? "Sources" : null].filter(Boolean);
    throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "Mismatched Requested Loan Amount values found in ".concat(sectionNames.join(' and '), "."));
  }
};

/**
 * Add an index to each entry in the customBlocks array and organize them based on their sectionName.
 * checks for index, if sectionName not available in the indexMap then it starts from 0 , else increase index by 1
 * @param {Array} customBlocks - An array of objects representing dynamic fields.
 * @returns {Array} - An array of objects with added index.
 */
var addIndexForCustomBlocks = exports.addIndexForCustomBlocks = function addIndexForCustomBlocks(customBlocks) {
  var indexMap = {};
  var customBlocksWithIndex = [];
  customBlocks.forEach(function (block) {
    var sectionName = block.sectionName;
    // here checks for index, if sectionName not available in the indexMap then it starts from 0 , else increase index by 1.
    if (!indexMap[sectionName]) {
      indexMap[sectionName] = 0;
    }
    customBlocksWithIndex.push(_objectSpread(_objectSpread({}, block), {}, {
      index: indexMap[sectionName]
    }));
    indexMap[sectionName] += 1;
  });
  return customBlocksWithIndex;
};

/**
 * Function: getTextFromTemplate
 * Description: This function takes in an object containing various parameters and generates an email text based on a provided email template.
 *
 * Parameters:
 *   - lenderName: The name of the lender. If not provided, it defaults to 'Lender'.
 *   - executiveSummary: The executive summary of the deal.
 *   - documents: An array of documents related to the deal.
 *   - dealSummaryLink: A link to the deal summary page.
 *   - passLink: A link to pass page of the deal.
 *   - advisorName: The name of the advisor.
 *   - emailTemplate: The email template that includes placeholders for various parameters.
 *
 * Return:
 *   - The generated email text with placeholders replaced by actual parameter values.
 */
var getTextFromTemplate = exports.getTextFromTemplate = function getTextFromTemplate(_ref3) {
  var lenderName = _ref3.lenderName,
    executiveSummary = _ref3.executiveSummary,
    documents = _ref3.documents,
    dealSummaryLink = _ref3.dealSummaryLink,
    passLink = _ref3.passLink,
    advisorName = _ref3.advisorName,
    emailTemplate = _ref3.emailTemplate,
    followUpContent = _ref3.followUpContent;
  return _lodash["default"].template(emailTemplate)({
    lenderName: lenderName || 'Lender',
    executiveSummary: executiveSummary,
    documents: documents,
    dealSummaryLink: dealSummaryLink,
    passLink: passLink,
    advisorName: advisorName,
    followUpContent: followUpContent
  });
};
/**
 * Manage the timeline of stages based on changes in stages.
 * @param {string} oldStage - The previous stage .
 * @param {string} updatedStage - The updated stage.
 * @param {Array} timelineArray - The timeline of stage changes.
 * @param {Map} stageToStageNumberMapping - A mapping of stages to their corresponding numbers.
 * @returns {Array} - The modified timeline after processing the stage changes.
 */
var manageTimeLine = exports.manageTimeLine = function manageTimeLine(oldStage, updatedStage, timelineArray, stageToStageNumberMapping) {
  var stageNumberToStageMapping = new Map();
  stageToStageNumberMapping.forEach(function (value, key) {
    stageNumberToStageMapping.set(value, key);
  });
  var getStageFromStageNumber = function getStageFromStageNumber(stageNumber) {
    return stageNumberToStageMapping.get(stageNumber);
  };
  var getStageNumberFromStage = function getStageNumberFromStage(stage) {
    return stageToStageNumberMapping.get(stage);
  };
  if (getStageNumberFromStage(oldStage) > getStageNumberFromStage(updatedStage)) {
    // Iterate through the stages between old and updated stages in reverse.
    for (var i = getStageNumberFromStage(oldStage) - 1; i >= getStageNumberFromStage(updatedStage); i -= 1) {
      if (getStageFromStageNumber(i)) {
        // Add the stage to the timeline with the current date.
        timelineArray.push({
          stage: getStageFromStageNumber(i),
          updateAt: new Date()
        });
      }
    }
  } else if (getStageNumberFromStage(oldStage) < getStageNumberFromStage(updatedStage)) {
    for (var index = timelineArray.length - 1; index >= 0; index -= 1) {
      var changeLog = timelineArray[index];
      if (getStageNumberFromStage(changeLog.stage) < getStageNumberFromStage(updatedStage)) {
        timelineArray.splice(index, 1);
      }
    }
    return timelineArray;
  }
  return timelineArray;
};

/**
 * Manage the timeline of lender placement stages based on changes in stages.
 * @param {string} oldStage - The previous stage of lender placement.
 * @param {string} updatedStage - The updated stage of lender placement.
 * @param {Array} timeline - The timeline of stage changes.
 * @returns {Array} - The modified timeline after processing the stage changes.
 */
var manageLenderPlacementStageTimeline = exports.manageLenderPlacementStageTimeline = function manageLenderPlacementStageTimeline(oldStage, updatedStage, timeline) {
  var updatedTimeline = manageTimeLine(oldStage, updatedStage, timeline, _enumStageOfLenderPlacement.lenderPlacementStageToStageNumberMapping);
  return updatedTimeline;
};

/**
 * Manage the timeline of deal stages based on changes in stages.
 * @param {string} oldStage - The previous stage of deal.
 * @param {string} updatedStage - The updated stage of deal.
 * @param {Array} timeline - The timeline of stage changes.
 * @returns {Array} - The modified timeline after processing the stage changes.
 */
var manageDealStageTimeline = exports.manageDealStageTimeline = function manageDealStageTimeline(oldStage, updatedStage, timeline) {
  var updatedTimeline = manageTimeLine(oldStage, updatedStage, timeline, _enumStageForDeal.dealStageToStageNumberMapping);
  return updatedTimeline;
};

// check & throw error if term is not added
var checkTermAdded = exports.checkTermAdded = function checkTermAdded(lenderPlacement) {
  if (_lodash["default"].isEmpty(lenderPlacement.terms)) {
    throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Can not add term-sheet without adding terms');
  }
};

/**
 * this will return the full name of the state
 * @param stateAbbreviation
 * @return {string|null}
 */
var getStateFullName = exports.getStateFullName = function getStateFullName(stateAbbreviation) {
  // eslint-disable-next-line no-restricted-syntax
  for (var state in _enum.EnumStatesOfDeal) {
    if (_enum.EnumStatesOfDeal[state] === stateAbbreviation) {
      // We were getting the state value in the email in UPPERCASE, so making it Startcase
      return _lodash["default"].startCase(_lodash["default"].lowerCase(state));
    }
  }
  // If no match is found, return an appropriate null.
  return null;
};

/**
 * this will return the subject for email
 * @param deal
 * @return {`${string}-$${number}m Financing Request`}
 */
var getEmailSubjectForDeal = exports.getEmailSubjectForDeal = function getEmailSubjectForDeal(dealSummary) {
  // As per new requirement now subject of mails should be heading of deal summary i.e., heading of presentation tab
  // The field of heading are not required so have to add condition for which field is there in heading should be present in subject
  // Also have to separate the field by -
  var _dealSummary$heading = dealSummary.heading,
    dealName = _dealSummary$heading.dealName,
    cityState = _dealSummary$heading.cityState,
    dealInfo = _dealSummary$heading.dealInfo;
  var dealNamePart = dealName ? "".concat(dealName, " - ") : '';
  var cityStatePart = cityState ? "".concat(cityState, " - ") : '';
  var dealInfoPart = dealInfo ? "".concat(dealInfo, " - ") : '';

  // The purpose of this .replace(/- $/, '') is to search for any trailing hyphen and space at the end of the generated string and remove it.
  return "".concat(dealNamePart).concat(cityStatePart).concat(dealInfoPart).replace(/- $/, '');
};
function addCommaSeparators(value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Modify and format data values (add symbols like $ and % based on value type, and also round the values).
 * @param {Object} data - The data object to be modified.
 * @param {number} decimalPoint - The number of decimal places to round to.
 * @param {string} keyToCheckType - The key used to check the type of value.
 * @param {string} keyToAssign - The key used to assign value.
 * @returns {Object} - The modified data object.
 */

function changeData(data, decimalPoint, keyToCheckType, keyToAssign) {
  var isNumber = function isNumber(value) {
    return typeof value === 'number';
  };
  var isString = function isString(value) {
    return typeof value === 'string';
  };
  // Formatting numeric values
  if (isNumber(data[keyToAssign])) {
    if (data[keyToAssign]) {
      Object.assign(data, _defineProperty({}, keyToAssign, (data[keyToAssign] * 1).toFixed(decimalPoint)));
    }
  }
  // Formatting data for currency type
  if (data[keyToCheckType] && data[keyToCheckType] === _enum.EnumOfTypeOfValue.CURRENCY) {
    // Removing commas from string values
    if (isString(data[keyToAssign]) && data[keyToAssign].includes(',')) {
      Object.assign(data, _defineProperty({}, keyToAssign, data[keyToAssign].replace(/,/g, '')));
    }
    // if data is in string and data not include $ than we have to convert it in num and fixed decimal point
    // Handle string values without commas
    if (isString(data[keyToAssign]) && !/[,()]/.test(data[keyToAssign])) {
      // Remove '$' if present
      if (data[keyToAssign].includes('$')) {
        Object.assign(data, _defineProperty({}, keyToAssign, data[keyToAssign].split('$').pop()));
      }
      // Convert string to number and format with fixed decimal points
      Object.assign(data, _defineProperty({}, keyToAssign, (data[keyToAssign] * 1).toFixed(decimalPoint)));
    }
    // Check if the value of data[keyToAssign] is not a string
    // OR
    // Check if the value of data[keyToAssign] is a string, but it does not contain a '$' character
    // AND
    // Check if the value of data[keyToAssign] is not one of the following: '(', ',', '('
    if (!isString(data[keyToAssign]) || isString(data[keyToAssign]) && !data[keyToAssign].includes('$') && !/[%,$()]/.test(data[keyToAssign])) {
      // Convert to number and format as currency string
      Object.assign(data, _defineProperty({}, keyToAssign, data[keyToAssign] * 1));
      if (isNumber(data[keyToAssign]) && data[keyToAssign] < 0) {
        Object.assign(data, _defineProperty({}, keyToAssign, "$(".concat(Math.abs(data[keyToAssign]), ")")));
      } else {
        Object.assign(data, _defineProperty({}, keyToAssign, "$".concat(data[keyToAssign])));
      }
    }
  }
  // Formatting for percentage type
  if (data[keyToCheckType] && data[keyToCheckType] === _enum.EnumOfTypeOfValue.PERCENTAGE) {
    // Removing commas from string values
    if (isString(data[keyToAssign]) && data[keyToAssign].includes(',')) {
      Object.assign(data, _defineProperty({}, keyToAssign, data[keyToAssign].replace(/,/g, '')));
    }
    // Handle string values without commas
    if (isString(data[keyToAssign]) && !/[,()]/.test(data[keyToAssign])) {
      // Remove '%' if present
      if (data[keyToAssign].includes('%')) {
        var _data$keyToAssign$spl = data[keyToAssign].split('%'),
          _data$keyToAssign$spl2 = _slicedToArray(_data$keyToAssign$spl, 1),
          valueWithoutPercentage = _data$keyToAssign$spl2[0];
        Object.assign(data, _defineProperty({}, keyToAssign, valueWithoutPercentage));
      }
      // Convert string to number and format with fixed decimal points, append '%'
      Object.assign(data, _defineProperty({}, keyToAssign, "".concat((data[keyToAssign] * 1).toFixed(decimalPoint), "%")));
    }
    // Check if the value is not a string and format as percentage string
    if (data[keyToAssign] && !isString(data[keyToAssign])) {
      Object.assign(data, _defineProperty({}, keyToAssign, "".concat(data[keyToAssign].toFixed(decimalPoint), "%")));
    }
  }

  // Adding a comma separator at the end to format the numeric values in all sections that are neither of type string nor represent a year.
  if (![_enum.EnumOfTypeOfValue.STRING, _enum.EnumOfTypeOfValue.YEAR].includes(data[keyToCheckType])) {
    if (isString(data[keyToAssign])) {
      if (data[keyToAssign].includes('$') && !/[,()%]/.test(data[keyToAssign])) {
        // Removing the dollar sign, if present
        Object.assign(data, _defineProperty({}, keyToAssign, data[keyToAssign].replace('$', '')));

        // Parsing the value as a number
        Object.assign(data, _defineProperty({}, keyToAssign, parseFloat(data[keyToAssign]).toFixed(decimalPoint)));

        // adding commas
        Object.assign(data, _defineProperty({}, keyToAssign, addCommaSeparators(data[keyToAssign])));

        // Adding the dollar sign back
        Object.assign(data, _defineProperty({}, keyToAssign, "$".concat(data[keyToAssign])));
      } else if (data[keyToAssign].includes('%') && !/[,()%]/.test(data[keyToAssign])) {
        // Removing the dollar sign, if present
        Object.assign(data, _defineProperty({}, keyToAssign, data[keyToAssign].replace('%', '')));

        // Parsing the value as a number
        Object.assign(data, _defineProperty({}, keyToAssign, parseFloat(data[keyToAssign]).toFixed(decimalPoint)));
        Object.assign(data, _defineProperty({}, keyToAssign, addCommaSeparators(data[keyToAssign])));
        // Adding the percentage sign back
        Object.assign(data, _defineProperty({}, keyToAssign, "".concat(data[keyToAssign], "%")));
        // data[keyToAssign] = `${data[keyToAssign]}%`;
      } else {
        // Add commas for numeric values
        Object.assign(data, _defineProperty({}, keyToAssign, addCommaSeparators(data[keyToAssign])));
      }
    }
  }
  return data;
}

/**
 * This function adds symbols, such as '$' and '%', to specific numeric values within the data.
 * @param {Array} data - The input data to be modified.
 * @returns {Array} - The modified data with symbols added to numeric values.
 */
var addSymbolInData = exports.addSymbolInData = function addSymbolInData(data) {
  if (!_lodash["default"].isEmpty(data)) {
    var modifiedData = data.map(function (item) {
      return item.map(function (field) {
        return changeData(field, 0, 'type', 'value');
      });
    });
    return modifiedData;
  }
  return data;
};
var getKeyFromUrl = exports.getKeyFromUrl = function getKeyFromUrl(url) {
  var pattern = /(\/users\/.*)/;
  var match = url.match(pattern);
  if (match && match[1]) {
    return match[1].substring(1);
  }
  return url;
};

/**
 * Common function for the template of send deal test mail and send mail
 */
var sendDealTemplate = exports.sendDealTemplate = function sendDealTemplate(_ref4) {
  var _dealDetail$dealSumma, _find, _dealDetail$dealSumma2, _find2, _dealDetail$dealSumma3, _find3, _dealDetail$sponsor, _find4, _find5, _dealDetail$dealSumma4, _find6, _dealDetail$dealSumma5, _dealDetail$sponsor2;
  var emailContent = _ref4.emailContent,
    dealDetail = _ref4.dealDetail,
    firstName = _ref4.firstName,
    advisorName = _ref4.advisorName,
    passLink = _ref4.passLink,
    dealSummaryLink = _ref4.dealSummaryLink;
  // To convert the value into string
  var getAmountFromString = function getAmountFromString(value) {
    if (value) {
      var _value$toString;
      return (_value$toString = value.toString()) === null || _value$toString === void 0 ? void 0 : _value$toString.replace(/[$,]/g, '');
    }
    return value;
  };

  // To convert the value into float
  var getAmountInFloat = function getAmountInFloat(value) {
    var removeDollarAndCommas = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    if (value) {
      if (removeDollarAndCommas) {
        return parseFloat(getAmountFromString(value));
      }
      return parseFloat(value === null || value === void 0 ? void 0 : value.toString());
    }
    return value;
  };

  // function for format currency (round of the value and to show in the form of 'k' if the value is less than 1 million)
  var formatCurrency = function formatCurrency(amount) {
    if (typeof amount === 'string') {
      var floatValue = getAmountInFloat(amount);
      if ((0, _lodash.isNaN)(floatValue)) {
        return 0;
      }
      // eslint-disable-next-line no-param-reassign
      amount = floatValue;
    } else if ((0, _lodash.isUndefined)(amount)) {
      return 0;
    }
    if (amount >= 1000000) {
      var lastDigit = (0, _lodash.round)(amount / 1000000, 2).toString().slice(-1);
      if (lastDigit === '5') {
        return "$".concat((0, _lodash.round)(amount / 1000000, 2), "m");
      }
      return "$".concat((0, _lodash.round)(amount / 1000000, 1), "m");
    }
    return "$".concat((0, _lodash.round)(amount / 1000, 0), "k");
  };

  // To remove the sentence for unitCount, Occupancy and SF when we don't have its value
  var removeStringFromTemplate = function removeStringFromTemplate() {
    var _sentence$replace;
    var sentence = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var loanType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var updatedSentence = sentence === null || sentence === void 0 || (_sentence$replace = sentence.replace(/\[unitCount\]-unit,/, '')) === null || _sentence$replace === void 0 || (_sentence$replace = _sentence$replace.replace(/\[Occupancy\] occupied/, '')) === null || _sentence$replace === void 0 ? void 0 : _sentence$replace.replace(/\[Square Footage\] SF,/, '');
    return (0, _lodash.includes)(_enum.EnumLoanTypeOfDeal.CONSTRUCTION, loanType) ? updatedSentence : updatedSentence === null || updatedSentence === void 0 ? void 0 : updatedSentence.replace(/\[\[toBeBuilt\]\],/g, '');
  };
  var dealSummaryUsesData = ((_dealDetail$dealSumma = dealDetail.dealSummary) === null || _dealDetail$dealSumma === void 0 || (_dealDetail$dealSumma = _dealDetail$dealSumma.sourcesAndUses) === null || _dealDetail$dealSumma === void 0 ? void 0 : _dealDetail$dealSumma.uses) || [];
  var totalUses = (0, _lodash.sum)(dealSummaryUsesData === null || dealSummaryUsesData === void 0 ? void 0 : dealSummaryUsesData.map(function (use) {
    return getAmountInFloat(use === null || use === void 0 ? void 0 : use.value);
  }));
  var removeTotalUses = dealSummaryUsesData === null || dealSummaryUsesData === void 0 ? void 0 : dealSummaryUsesData.filter(function (item) {
    return (item === null || item === void 0 ? void 0 : item.key) !== 'Total Uses';
  });
  var usesKeyValue = removeTotalUses === null || removeTotalUses === void 0 ? void 0 : removeTotalUses.map(function (value) {
    return "".concat(formatCurrency(value.value), " of ").concat(value.key);
  }).join(', ');
  var firstUsesValue = formatCurrency(dealSummaryUsesData ? _lodash["default"].get(dealSummaryUsesData[0], 'value', '') : '');
  var ltcValue = getAmountInFloat(dealDetail === null || dealDetail === void 0 ? void 0 : dealDetail.loanAmount) / totalUses || 0;
  var inPlaceDYVal = (_find = (0, _lodash.find)(dealDetail === null || dealDetail === void 0 || (_dealDetail$dealSumma2 = dealDetail.dealSummary) === null || _dealDetail$dealSumma2 === void 0 ? void 0 : _dealDetail$dealSumma2.dealMetrics, function (data) {
    return data.key === 'In-Place DY';
  })) === null || _find === void 0 ? void 0 : _find.value;
  var inStabilizedDYVal = (_find2 = (0, _lodash.find)(dealDetail === null || dealDetail === void 0 || (_dealDetail$dealSumma3 = dealDetail.dealSummary) === null || _dealDetail$dealSumma3 === void 0 ? void 0 : _dealDetail$dealSumma3.dealMetrics, function (data) {
    return data.key === 'Stabilized DY';
  })) === null || _find2 === void 0 ? void 0 : _find2.value;
  var existingLoanBalance = (_find3 = (0, _lodash.find)(dealSummaryUsesData, function (data) {
    return (0, _lodash.includes)(['Loan Balance', 'Current Loan Balance', 'Existing Loan Balance', 'Current Debt', 'Current Debt Balance', 'Debt Balance', 'Payoff Loan Balance', 'Payoff Current Loan Balance', 'Payoff Existing Loan Balance', 'Payoff Current Debt Balance', 'Payoff Debt Balance'], data === null || data === void 0 ? void 0 : data.key);
  })) === null || _find3 === void 0 ? void 0 : _find3.value;
  var getText = _lodash["default"].template(emailContent)({
    lenderFirstName: _lodash["default"].startCase(firstName),
    advisorName: _lodash["default"].startCase(advisorName),
    sponsorName: ((_dealDetail$sponsor = dealDetail.sponsor) === null || _dealDetail$sponsor === void 0 ? void 0 : _dealDetail$sponsor.name) || '[[Sponsor Name]]',
    amount: formatCurrency(dealDetail.loanAmount) || 'NA',
    loanPurpose: dealDetail.loanPurpose || 'NA',
    dealName: dealDetail.dealName || 'NA',
    unitCount: dealDetail.unitCount || '[unitCount]',
    propertyType: dealDetail.assetType || 'NA',
    toBeBuilt: '[[toBeBuilt]]',
    address: dealDetail.address || 'NA',
    city: dealDetail.city || 'NA',
    state: getStateFullName(dealDetail.state) || 'NA',
    purchasePrice: formatCurrency((_find4 = (0, _lodash.find)(dealSummaryUsesData, function (data) {
      return data.key === 'Purchase Price';
    })) === null || _find4 === void 0 ? void 0 : _find4.value) || 'NA',
    inPlaceNOI: formatCurrency((_find5 = (0, _lodash.find)((_dealDetail$dealSumma4 = dealDetail.dealSummary) === null || _dealDetail$dealSumma4 === void 0 ? void 0 : _dealDetail$dealSumma4.dealMetrics, function (data) {
      return data.key === 'In-Place NOI';
    })) === null || _find5 === void 0 ? void 0 : _find5.value) || 'NA',
    stabilizedNOI: formatCurrency((_find6 = (0, _lodash.find)((_dealDetail$dealSumma5 = dealDetail.dealSummary) === null || _dealDetail$dealSumma5 === void 0 ? void 0 : _dealDetail$dealSumma5.dealMetrics, function (data) {
      return data.key === 'Stabilized NOI';
    })) === null || _find6 === void 0 ? void 0 : _find6.value) || 'NA',
    squareFootage: dealDetail.squareFootage || '[Square Footage]',
    occupancy: dealDetail.occupancy || '[Occupancy]',
    totalUsesValue: !(0, _lodash.isEmpty)(dealSummaryUsesData) ? formatCurrency(totalUses) : 'NA',
    usesKeyValue: usesKeyValue || 'NA',
    LTC: (0, _lodash.round)(ltcValue / 100, 1) || 'NA',
    firstUsesValue: firstUsesValue || 'NA',
    existingLoanBalance: existingLoanBalance || 'NA',
    inPlaceDY: inPlaceDYVal ? "".concat(getAmountInFloat(inPlaceDYVal), "%") : 'NA',
    stabilizedDY: inStabilizedDYVal ? "".concat(getAmountInFloat(inStabilizedDYVal), "%") : 'NA',
    // we only need first line of sponsor bio so splitting it with (.).
    sponsorBioName: ((_dealDetail$sponsor2 = dealDetail.sponsor) === null || _dealDetail$sponsor2 === void 0 || (_dealDetail$sponsor2 = _dealDetail$sponsor2.description) === null || _dealDetail$sponsor2 === void 0 ? void 0 : _dealDetail$sponsor2.split('.')[0]) || '[[Sponsor bio from Sponsor bio page]]',
    loanTypeValue: dealDetail.loanType || 'NA',
    dealSummaryLink: dealSummaryLink,
    passLink: passLink
  });
  return removeStringFromTemplate(getText, dealDetail.loanType);
};

/**
 * Common function for unsetting the field whose value is null in the body
 */
var removeNullFields = exports.removeNullFields = function removeNullFields(obj) {
  Object.entries(obj).forEach(function (_ref5) {
    var _ref6 = _slicedToArray(_ref5, 2),
      key = _ref6[0],
      value = _ref6[1];
    if (!value) {
      // eslint-disable-next-line no-param-reassign
      obj.$unset = _objectSpread(_objectSpread({}, obj.$unset), {}, _defineProperty({}, key, ''));
      // eslint-disable-next-line no-param-reassign
      delete obj[key];
    } else if (_typeof(value) === 'object') {
      removeNullFields(value);
    }
  });
  return obj;
};

/**
 * Common function for inviting borrowers and default advisors to the deal
 */

var invitationToDeal = exports.invitationToDeal = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(_ref7) {
    var existingUsers, fromEmail, pass, userName, dealName, deal, body, isDefaultAdvisor, isDealCreated, userEmailNotExists, filter, userAlreadyIncluded, update;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          existingUsers = _ref7.existingUsers, fromEmail = _ref7.fromEmail, pass = _ref7.pass, userName = _ref7.userName, dealName = _ref7.dealName, deal = _ref7.deal, body = _ref7.body, isDefaultAdvisor = _ref7.isDefaultAdvisor, isDealCreated = _ref7.isDealCreated;
          // Here,we will get the emails that are not in our system, as we can't add them we are throwing error for it.
          userEmailNotExists = _lodash["default"].differenceBy(isDealCreated ? body.dealMembers : body.email, existingUsers.map(function (item) {
            return item.email;
          }));
          if (!(userEmailNotExists && userEmailNotExists.length)) {
            _context5.next = 4;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "The borrowers : ".concat(userEmailNotExists.join(', '), " doesn't exists"));
        case 4:
          if (!(!isDefaultAdvisor && existingUsers.some(function (user) {
            return user.role !== _enum["default"].EnumRoleOfUser.USER;
          }))) {
            _context5.next = 6;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'You can only add borrowers to the deal');
        case 6:
          if (!isDefaultAdvisor) {
            _context5.next = 11;
            break;
          }
          _context5.next = 9;
          return _models.Deal.findByIdAndUpdate(deal, {
            $addToSet: {
              'involvedUsers.advisors': existingUsers.map(function (item) {
                return item._id;
              })
            }
          });
        case 9:
          _context5.next = 22;
          break;
        case 11:
          filter = {
            _id: deal,
            'involvedUsers.borrowers': {
              $in: existingUsers.map(function (item) {
                return item._id;
              })
            }
          }; // here we are checking whether the user is already in the deal
          _context5.next = 14;
          return _services.dealService.getOne(filter);
        case 14:
          userAlreadyIncluded = _context5.sent;
          if (!userAlreadyIncluded) {
            _context5.next = 19;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'The borrower is already part of the deal');
        case 19:
          update = {
            $addToSet: {
              'involvedUsers.borrowers': existingUsers.map(function (item) {
                return item._id;
              })
            }
          };
          _context5.next = 22;
          return _models.Deal.findByIdAndUpdate(deal, update);
        case 22:
          if (!existingUsers.length) {
            _context5.next = 27;
            break;
          }
          // here we are sending invitation email to user and default advisors
          existingUsers.map( /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(item) {
              var firstName, user;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    firstName = item.firstName, user = item.email;
                    _context3.next = 3;
                    return _services.emailService.sendInvitationEmail({
                      fromEmail: fromEmail,
                      pass: pass,
                      user: user,
                      userName: userName,
                      dealName: dealName,
                      isDealCreated: false,
                      link: 'login',
                      firstName: firstName
                    });
                  case 3:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x6) {
              return _ref9.apply(this, arguments);
            };
          }());
          // here we are creating the notification after we send the invitation email to the users
          existingUsers.map( /*#__PURE__*/function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(user) {
              var notification;
              return _regeneratorRuntime().wrap(function _callee4$(_context4) {
                while (1) switch (_context4.prev = _context4.next) {
                  case 0:
                    notification = {
                      createdBy: body.createdBy,
                      updatedBy: body.createdBy,
                      message: "".concat(user.email, " Requested to be added to ").concat(dealName),
                      deal: deal
                    };
                    _context4.next = 3;
                    return _services.notificationService.createNotification(notification);
                  case 3:
                  case "end":
                    return _context4.stop();
                }
              }, _callee4);
            }));
            return function (_x7) {
              return _ref10.apply(this, arguments);
            };
          }());

          // as our existingUsers is array we are using map on it. below line will help us to insert many document in our db at once, and we have passed the object in the map we have to enter in our db,
          // so we will get deal id, the user from which we log in or who is creating deal their id will go in invitedBy and in emailExists we get the whole document, and we just want id of the person which we are inviting the deal, so we did emailExists._id
          // here we are adding invitations to the invitation model, if the default advisors are also getting added then we are setting role to "advisor" else "user"
          _context5.next = 27;
          return _models.Invitation.insertMany(existingUsers.map(function (emailExists) {
            return {
              deal: deal,
              status: 'accepted',
              invitedBy: body.user,
              invitee: emailExists._id,
              role: isDefaultAdvisor ? _enum["default"].EnumRoleOfUser.ADVISOR : _enum["default"].EnumRoleOfUser.USER
            };
          }));
        case 27:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function invitationToDeal(_x5) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * Function of email template of threading
 */
var threadingTemplate = exports.threadingTemplate = function threadingTemplate(_ref11) {
  var emailContent = _ref11.emailContent;
  // This is to extract style tag and body tag from the email content
  var extractContent = function extractContent(_ref12) {
    var email = _ref12.email,
      isBody = _ref12.isBody;
    var styleRegex = /<style>([\s\S]*?)<\/style>/g;
    var bodyRegex = /<body>([\s\S]*?)<\/body>/g;
    var matches = email === null || email === void 0 ? void 0 : email.match(isBody ? bodyRegex : styleRegex);
    if (matches) {
      return matches.map(function (match) {
        return match.replace(isBody ? '<body>' : '<style>', '').replace(isBody ? '</body>' : '</style>', '');
      });
    }
    return [];
  };
  // need to split the mail content as we need vertical line after the line that describes the time and by whom the message we got
  var heading = emailContent.map(function (item) {
    var head = item.split('wrote:');
    return head[0].concat('wrote:');
  });
  var styleContent = emailContent.map(function (email) {
    return extractContent({
      email: email,
      isBody: false
    });
  }).flat();
  var bodyContent = emailContent.map(function (email) {
    return extractContent({
      email: email,
      isBody: true
    });
  }).flat();

  // desired body that we need to pass in the html template
  var body = "".concat(bodyContent.map(function (data, index) {
    if (index === 0) {
      // For the first message, wrap it with one outer div
      return "<div class=\"space_between_line\"/><div>".concat(heading[index], "</div><div class=\"email-inner-content\">").concat(data);
    }
    // For subsequent messages, nest them inside the previous div
    return "<div class=\"space_between_line\"/><div>".concat(heading[index], "</div><div class=\"email-inner-content\">").concat(data);
  }).join(''), "</div>");
  var template = "<!DOCTYPE html>\n <html>\n   <head>\n    <style id=\"custom-styles\">\n      .email-container {\n        color: #600060;\n        font-size: 0.75rem;\n        font-weight: 400;\n      }\n    \n    .space_between_line{\n    padding-top : 12px\n    }\n      .email-content {\n        flex: 1;\n      }\n\n      .vertical-line {\n        border-left: 1px solid #D3D3D3;\n        /* Adjust the line style and color as needed */\n        height: 100%;\n        margin-left: 5px;\n        /* Adjust the margin as needed */\n      }\n\n      .email-inner-content {\n        padding-left: 7px;\n        border-left: 1px solid #d3d3d3;\n        height: auto;\n        margin-left: 5px;\n      }\n\n      .email-thread {\n        padding-top: 15px;\n      }\n\n      .a {\n        color: blue;\n        text-decoration: underline;\n      }\n    </style>\n    <script>\n      window.addEventListener('DOMContentLoaded', (event) => {\n        const styleTag = document.getElementById('custom-styles');\n        ".concat(styleContent, ".forEach((style) => {\n          styleTag.appendChild(document.createTextNode(style));\n        });\n      });\n    </script>\n   </head>\n   <body>\n    <div class=\"email-container\">\n      ").concat(body, "\n    </div>\n   </body>\n </html>");
  return template;
};
/**
 * Common function for threading send deal mail, follow-up mail and messages in the mail
 */
var constructEmailContent = exports.constructEmailContent = function constructEmailContent(_ref13) {
  var lenderPlacement = _ref13.lenderPlacement,
    sender = _ref13.sender;
  var followUpEmails = lenderPlacement.followUpMail.map(function (mail) {
    return mail;
  });
  var messages = lenderPlacement.messages.map(function (message) {
    return message;
  });

  // common function to create desired email content
  var formatEmailContent = function formatEmailContent(item) {
    var isFollowUp = item.mailContent;
    var time = (0, _moment["default"])(item.sentAt || item.updatedAt).format('ddd, DD MMM YYYY hh:mm A [GMT]');
    var content = "On ".concat(time, " ").concat(isFollowUp ? sender : item.senderEmail || item.sender.email, " wrote:\n").concat(isFollowUp ? item.mailContent : item.message);
    return content;
  };

  // array of send deal mail, followup mail and messages
  var emailContentArray = [lenderPlacement.sendDealMail].concat(_toConsumableArray(followUpEmails), _toConsumableArray(messages));

  // function to sort the mails as per the time they are sent in ascending order.
  function sortedItems(a, b) {
    var aTime = a.sentAt || a.updatedAt || 0;
    var bTime = b.sentAt || b.updatedAt || 0;
    return bTime - aTime;
  }
  // sort the emailContent array using the above function, calling the function to format the email and joining it by <br> as we need space after every mail.
  var emailContent = emailContentArray.sort(sortedItems).map(function (item) {
    return formatEmailContent(item);
  });

  // return the html format template that we need for threading
  return threadingTemplate({
    emailContent: emailContent
  });
};

/**
 * Converts an Excel serial number to a JavaScript Date object.
 * @param {number} serialNumber - The Excel serial number representing the number of days since the Excel epoch (1900-01-01).
 * @returns {Date} - A JavaScript Date object representing the corresponding date.
 */
function excelSerialNumberToDate(serialNumber) {
  var millisecondsPerDay = 24 * 60 * 60 * 1000;
  var daysSinceExcelEpoch = serialNumber;
  var millisecondsSinceExcelEpoch = daysSinceExcelEpoch * millisecondsPerDay;
  var excelEpoch = new Date('1899-12-30'); // JavaScript epoch is 1970-01-01
  return new Date(excelEpoch.getTime() + millisecondsSinceExcelEpoch);
}

/**
 * Processes a date value to ensure it is in a valid Date object format.
 * If the input is already a Date object, it is returned as is.
 * If the input is a valid number (Excel serial number), it is converted to a Date object.
 * If the input is neither a Date object nor a valid number, the current date is returned.
 *
 * @param {Date|number|any} date - The date value to be processed.
 * @returns {Date} - A processed Date object.
 */
var processDateForExcel = exports.processDateForExcel = function processDateForExcel(date) {
  if (_moment["default"].isDate(date)) {
    return date;
  }
  if (typeof date === 'number' && !(0, _lodash.isNaN)(date)) {
    return excelSerialNumberToDate(date);
  }
  return new Date();
};