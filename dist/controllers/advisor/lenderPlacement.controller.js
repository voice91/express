"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateMany = exports.updateAndSaveInitialEmailContent = exports.update = exports.sendMessage = exports.sendEmailV3 = exports.sendEmail = exports.sendDealV2 = exports.sendDeal = exports.removeDocument = exports.removeByDealAndLendingInstitution = exports.remove = exports.paginate = exports.list = exports.getTemplateByTemplateId = exports.getMessages = exports.getEmailTemplatesByLanderPlacementId = exports.getEmailDataV3 = exports.get = exports.create = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _services = require("../../services");
var _catchAsync = require("../../utils/catchAsync");
var _fileFieldValidation = _interopRequireDefault(require("../../models/fileFieldValidation.model"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _tempS = _interopRequireDefault(require("../../models/tempS3.model"));
var _common = require("../../utils/common");
var _lodash = _interopRequireDefault(require("lodash"));
var _pick = require("../../utils/pick");
var _ApiError = _interopRequireDefault(require("../../utils/ApiError"));
var _models = require("../../models");
var _emailContent = require("../../utils/emailContent");
var _enum = _interopRequireWildcard(require("../../models/enum.model"));
var _config = _interopRequireDefault(require("../../config/config"));
var _enumStageOfLenderPlacement = require("../../utils/enumStageOfLenderPlacement");
var _detailsInDeal = require("../../utils/detailsInDeal");
var _enumStageForDeal = require("../../utils/enumStageForDeal");
var _lenderPlacement = require("../../services/lenderPlacement.service");
var _logger = require("../../config/logger");
var _encryptDecryptText = require("../../utils/encrypt-decrypt-text");
var _deal = require("../../services/deal.service");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
// eslint-disable-next-line import/no-extraneous-dependencies
var he = require('he');
var moveFileAndUpdateTempS3 = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_ref) {
    var url, newFilePath, newUrl;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          url = _ref.url, newFilePath = _ref.newFilePath;
          _context.next = 3;
          return _services.s3Service.moveFile({
            key: url,
            newFilePath: newFilePath,
            isPrivate: _config["default"].aws.enablePrivateAccess
          });
        case 3:
          newUrl = _context.sent;
          _context.next = 6;
          return _tempS["default"].findOneAndUpdate({
            url: url
          }, {
            url: newUrl
          });
        case 6:
          return _context.abrupt("return", newUrl);
        case 7:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function moveFileAndUpdateTempS3(_x) {
    return _ref2.apply(this, arguments);
  };
}();
// this is used to move file to new specified path as shown in basePath, used in create and update controller.
var moveFiles = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(_ref3) {
    var body, user, moveFileObj;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          body = _ref3.body, user = _ref3.user, moveFileObj = _ref3.moveFileObj;
          _context4.next = 3;
          return (0, _common.asyncForEach)(Object.keys(moveFileObj), /*#__PURE__*/function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(key) {
              var fieldValidation, basePath, newUrlsArray, filePath;
              return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                while (1) switch (_context3.prev = _context3.next) {
                  case 0:
                    fieldValidation = _fileFieldValidation["default"]["".concat(key, "OfLenderPlacement")];
                    basePath = "users/".concat(user._id, "/lenderPlacement/").concat(body._id, "/").concat(key, "/").concat(_mongoose["default"].Types.ObjectId(), "/");
                    if (!Array.isArray(moveFileObj[key])) {
                      _context3.next = 21;
                      break;
                    }
                    newUrlsArray = [];
                    moveFileObj[key].map( /*#__PURE__*/function () {
                      var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(ele) {
                        var filePath;
                        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
                          while (1) switch (_context2.prev = _context2.next) {
                            case 0:
                              filePath = "".concat(ele.split('/').pop());
                              _context2.t0 = newUrlsArray;
                              _context2.next = 4;
                              return moveFileAndUpdateTempS3({
                                url: ele,
                                newFilePath: basePath + filePath
                              });
                            case 4:
                              _context2.t1 = _context2.sent;
                              _context2.t0.push.call(_context2.t0, _context2.t1);
                            case 6:
                            case "end":
                              return _context2.stop();
                          }
                        }, _callee2);
                      }));
                      return function (_x4) {
                        return _ref6.apply(this, arguments);
                      };
                    }());
                    _context3.t0 = Object;
                    _context3.t1 = body;
                    _context3.t2 = _objectSpread;
                    _context3.t3 = _objectSpread({}, body);
                    _context3.t4 = {};
                    _context3.t5 = _defineProperty;
                    _context3.t6 = {};
                    _context3.t7 = key;
                    _context3.next = 15;
                    return Promise.all(newUrlsArray);
                  case 15:
                    _context3.t8 = _context3.sent;
                    _context3.t9 = (0, _context3.t5)(_context3.t6, _context3.t7, _context3.t8);
                    _context3.t10 = (0, _context3.t2)(_context3.t3, _context3.t4, _context3.t9);
                    _context3.t0.assign.call(_context3.t0, _context3.t1, _context3.t10);
                    _context3.next = 51;
                    break;
                  case 21:
                    filePath = "".concat(moveFileObj[key].split('/').pop());
                    _context3.t11 = Object;
                    _context3.t12 = body;
                    _context3.t13 = _objectSpread;
                    _context3.t14 = _objectSpread({}, body);
                    _context3.t15 = {};
                    _context3.t16 = _defineProperty;
                    _context3.t17 = {};
                    _context3.t18 = key;
                    _context3.next = 32;
                    return moveFileAndUpdateTempS3({
                      url: moveFileObj[key],
                      newFilePath: basePath + filePath
                    });
                  case 32:
                    _context3.t19 = _context3.sent;
                    _context3.t20 = (0, _context3.t16)(_context3.t17, _context3.t18, _context3.t19);
                    _context3.t21 = (0, _context3.t13)(_context3.t14, _context3.t15, _context3.t20);
                    _context3.t11.assign.call(_context3.t11, _context3.t12, _context3.t21);
                    if (!fieldValidation.generateThumbnails) {
                      _context3.next = 51;
                      break;
                    }
                    _context3.t22 = Object;
                    _context3.t23 = body;
                    _context3.t24 = _objectSpread;
                    _context3.t25 = _objectSpread({}, body);
                    _context3.t26 = {};
                    _context3.t27 = _defineProperty;
                    _context3.t28 = {};
                    _context3.t29 = "thumbOf".concat(key);
                    _context3.next = 47;
                    return _services.s3Service.createThumbnails({
                      url: moveFileObj[key],
                      resolutions: fieldValidation.thumbnailResolutions
                    });
                  case 47:
                    _context3.t30 = _context3.sent;
                    _context3.t31 = (0, _context3.t27)(_context3.t28, _context3.t29, _context3.t30);
                    _context3.t32 = (0, _context3.t24)(_context3.t25, _context3.t26, _context3.t31);
                    _context3.t22.assign.call(_context3.t22, _context3.t23, _context3.t32);
                  case 51:
                  case "end":
                    return _context3.stop();
                }
              }, _callee3);
            }));
            return function (_x3) {
              return _ref5.apply(this, arguments);
            };
          }());
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function moveFiles(_x2) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * we send the necessary data in this API so FE can show the template to user
 * @type {(function(*, *, *): void)|*}
 */
var getEmailDataV3 = exports.getEmailDataV3 = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var lenderPlacementId, filter, options, lenderPlacements, hasSameDealId, dealSummaryDocs, emailAttachments, subject, response;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          lenderPlacementId = req.query.lenderPlacementId;
          filter = {
            _id: {
              $in: lenderPlacementId
            }
          };
          options = {
            populate: [{
              path: 'lenderContact'
            }, {
              path: 'deal',
              populate: {
                path: 'dealSummary'
              }
            }]
          };
          _context5.next = 5;
          return _services.lenderPlacementService.getLenderPlacementList(filter, options);
        case 5:
          lenderPlacements = _context5.sent;
          if (!(lenderPlacementId.length !== lenderPlacements.length)) {
            _context5.next = 8;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Some lender placement is not available');
        case 8:
          hasSameDealId = lenderPlacements.every(function (placement) {
            return placement.deal.id === lenderPlacements[0].deal.id && placement.lenderContact;
          });
          if (hasSameDealId) {
            _context5.next = 11;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Contact should be selected to send the deal & deal should be same for all the placements');
        case 11:
          dealSummaryDocs = [];
          if (lenderPlacements[0].deal.dealSummary.documents && lenderPlacements[0].deal.dealSummary.documents.length) {
            dealSummaryDocs.push.apply(dealSummaryDocs, _toConsumableArray(lenderPlacements[0].deal.dealSummary.documents));
          }
          // we need UW Excel sheet too in the email attachment, and we are storing that in data sheet so adding that in the dealSummaryDocs
          if (lenderPlacements[0].deal.dealSummary.dataSheet && lenderPlacements[0].deal.dealSummary.dataSheet.url) {
            dealSummaryDocs.push(lenderPlacements[0].deal.dealSummary.dataSheet);
          }
          emailAttachments = dealSummaryDocs.map(function (item) {
            return {
              fileName: item.fileName,
              path: item.url,
              fileType: item.url.split('.').pop()
            };
          });
          subject = (0, _common.getEmailSubjectForDeal)(lenderPlacements[0].deal.dealSummary._doc);
          response = {
            subject: subject,
            emailAttachments: emailAttachments,
            deal: lenderPlacements[0].deal,
            sendTo: lenderPlacements.map(function (lenderPlacement) {
              return {
                name: lenderPlacement.lenderContact.firstName,
                email: lenderPlacement.lenderContact.email
              };
            }),
            advisorName: req.user.firstName,
            signature: req.user.signature
          };
          return _context5.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: response
          }));
        case 18:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x5, _x6) {
    return _ref7.apply(this, arguments);
  };
}());

/**
 * we are sending email for send deal to lender with email template
 * @type {(function(*, *, *): void)|*}
 */
var sendEmailV3 = exports.sendEmailV3 = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var _req$body, sendToAdvisor, isFollowUp, ccList, dealDetail, dealId, firstName, options, lenderPlacement, emailAttachments, lenderUserIdsToAddInDeal, dealDataToUpdate, lenderPlacementsAssociatedWithDeal, placementWithTargetStage, dealStage, deal, createActivityLogBody;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _req$body = req.body, sendToAdvisor = _req$body.sendToAdvisor, isFollowUp = _req$body.isFollowUp, ccList = _req$body.ccList; // const { emailPresentingPostmark } = req.user;
          // a function call that decodes HTML-encoded text. It's commonly used to decode HTML entities like &lt; (represents <), &gt; (represents >), &amp; (represents &), and so on.
          req.body.emailContent = req.body.emailContent && he.decode(req.body.emailContent);
          req.body.followUpContent = req.body.followUpContent && he.decode(req.body.followUpContent);
          _lodash["default"].templateSettings.interpolate = /{{([\s\S]+?)}}/g;
          // we need to populate the deal summary as for the email's subject we need heading field of the deal summary
          // populating sponsor as we need its details in send deal and send test mail
          _context7.next = 6;
          return _services.dealService.getOne({
            _id: req.body.deal
          }, {
            populate: [{
              path: 'dealSummary'
            }, {
              path: 'sponsor'
            }]
          });
        case 6:
          dealDetail = _context7.sent;
          dealId = dealDetail._id;
          if (!sendToAdvisor) {
            _context7.next = 21;
            break;
          }
          firstName = 'lenderName'; // if we send to multiple placement than send generic lender name else selected lender name
          if (!(req.body.lenderPlacementIds.length === 1)) {
            _context7.next = 16;
            break;
          }
          options = {
            populate: [{
              path: 'lenderContact'
            }]
          };
          _context7.next = 14;
          return _services.lenderPlacementService.getOne({
            _id: req.body.lenderPlacementIds[0]
          }, options);
        case 14:
          lenderPlacement = _context7.sent;
          firstName = lenderPlacement.lenderContact.firstName;
        case 16:
          emailAttachments = req.body.emailAttachments.map(function (item) {
            var path;
            if (_config["default"].aws.enablePrivateAccess) {
              path = item.url ? decodeURI(item.url) : decodeURI(item.path);
            } else {
              path = item.url ? item.url : item.path;
            }
            return {
              fileName: item.fileName,
              path: path,
              fileType: item.fileType
            };
          });
          _context7.next = 19;
          return _services.emailService.sendEmailUsingGmail({
            to: req.user.email,
            from: req.user.sendEmailFrom,
            pass: (0, _encryptDecryptText.decrypt)(req.user.appPassword, _config["default"].encryptionPassword),
            subject: "TEST - ".concat((0, _common.getEmailSubjectForDeal)(dealDetail.dealSummary)),
            // calling common function for setting subject
            // ...(emailPresentingPostmark && { from: req.user.email }),
            // calling the common function for send deal template
            text: (0, _common.sendDealTemplate)({
              emailContent: req.body.emailContent,
              dealDetail: dealDetail,
              firstName: firstName,
              advisorName: req.user.firstName,
              passLink: "<a href='#'>Pass</a>",
              dealSummaryLink: "<a href='#'>Deal Summary</a>"
            }),
            attachments: emailAttachments,
            isHtml: true
            // headers - if you want the functionality like advisor can also reply its own email then we can pass the headers
          });
        case 19:
          _logger.logger.info("Test email successfully sent to ".concat(req.user.email, " from ").concat(req.user.sendEmailFrom));
          return _context7.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: 'Test-mail sent..'
          }));
        case 21:
          // for adding lender's userid in the deal when we send deal to them
          lenderUserIdsToAddInDeal = []; // we send email to all selected placement & if we have one than also we are taking in the array
          // '+messages' will explicitly include the message field along with other fields as in model we have set "select: false"
          // also populating sender in the messages array
          _context7.next = 24;
          return Promise.all(req.body.lenderPlacementIds.map( /*#__PURE__*/function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(lenderPlacementId) {
              var options, lenderPlacement, frontEndUrl, user, tokens, dealSummaryLink, passLink, headers, getFollowUpContent, postmarkMessageId, response, stage;
              return _regeneratorRuntime().wrap(function _callee6$(_context6) {
                while (1) switch (_context6.prev = _context6.next) {
                  case 0:
                    options = {
                      populate: [{
                        path: 'lenderContact'
                      }, {
                        path: 'messages.sender'
                      }],
                      select: '+messages'
                    };
                    _context6.next = 3;
                    return _services.lenderPlacementService.getOne({
                      _id: lenderPlacementId
                    }, options);
                  case 3:
                    lenderPlacement = _context6.sent;
                    frontEndUrl = _config["default"].front.url || 'http://54.196.81.18';
                    _context6.next = 7;
                    return _services.userService.getOne({
                      email: lenderPlacement.lenderContact.email,
                      role: _enum["default"].EnumRoleOfUser.LENDER
                    });
                  case 7:
                    user = _context6.sent;
                    // we are now creating the user at the time of creating contact
                    lenderUserIdsToAddInDeal.push(user._id);
                    _context6.next = 11;
                    return _services.tokenService.generateAuthTokens(user);
                  case 11:
                    tokens = _context6.sent;
                    dealSummaryLink = "".concat(frontEndUrl, "/dealDetail/").concat(dealId, "?tab=dealSummary&token=").concat(tokens.access.token);
                    passLink = "".concat(frontEndUrl, "/dealDetail/").concat(dealId, "?tab=dealSummary&pass=true&token=").concat(tokens.access.token);
                    headers = [{
                      Value: "".concat(lenderPlacementId)
                    }]; // It generates email text with placeholders replaced by actual parameter values for follow-up mail
                    getFollowUpContent = function getFollowUpContent() {
                      return _lodash["default"].template(req.body.followUpContent)({
                        lenderFirstName: _lodash["default"].startCase(lenderPlacement.lenderContact.firstName) || 'Lender',
                        dealSummaryLink: "<a href=".concat(dealSummaryLink, ">Deal Summary</a>"),
                        advisorName: _lodash["default"].startCase(req.user.firstName) || 'Advisor',
                        passLink: "<a href=".concat(passLink, ">Pass</a>")
                      });
                    }; // we have to send followup email in thread so need to add this header
                    if (isFollowUp) {
                      headers.push({
                        Name: 'In-Reply-To',
                        Value: lenderPlacement.postmarkMessageId[0]
                      });
                    }
                    if (!(_config["default"].application_env !== _enum.EnumOfNodeEnv.SANDBOX)) {
                      _context6.next = 22;
                      break;
                    }
                    _context6.next = 20;
                    return _services.emailService.sendEmailUsingGmail({
                      to: lenderPlacement.lenderContact.email,
                      cc: ccList,
                      subject: isFollowUp ? "RE: ".concat((0, _common.getEmailSubjectForDeal)(dealDetail.dealSummary)) : "".concat((0, _common.getEmailSubjectForDeal)(dealDetail.dealSummary)),
                      // calling common function for setting subject
                      // we will need to send email from this email if not present than it will take default email we have that condition in the sendEmail function
                      from: req.user.sendEmailFrom,
                      pass: (0, _encryptDecryptText.decrypt)(req.user.appPassword, _config["default"].encryptionPassword),
                      // for followup, we use this template
                      // we want send deal mail, followup mails and other messages as reply so calling common function for it along with followup content
                      text: isFollowUp ? "".concat(getFollowUpContent()).concat((0, _common.constructEmailContent)({
                        lenderPlacement: lenderPlacement,
                        sender: req.user.sendEmailFrom
                      })) :
                      // calling the common function for send deal template
                      (0, _common.sendDealTemplate)({
                        emailContent: req.body.emailContent,
                        dealDetail: dealDetail,
                        firstName: lenderPlacement.lenderContact.firstName,
                        advisorName: req.user.firstName,
                        dealSummaryLink: "<a href=".concat(dealSummaryLink, ">Deal Summary</a>"),
                        passLink: "<a href=".concat(passLink, ">Pass</a>")
                      }),
                      attachments: req.body.emailAttachments && req.body.emailAttachments.map(function (item) {
                        var path;
                        if (_config["default"].aws.enablePrivateAccess) {
                          path = item.url ? decodeURI(item.url) : decodeURI(item.path);
                        } else {
                          path = item.url ? item.url : item.path;
                        }
                        return {
                          fileName: item.fileName,
                          path: path,
                          fileType: item.fileType
                        };
                      }),
                      isHtml: true,
                      headers: headers,
                      // when we reply than it should go to sender also & sender is sendEmailFrom
                      replyTo: req.user.sendEmailFrom
                    });
                  case 20:
                    response = _context6.sent;
                    postmarkMessageId = response.MessageID || response.messageId;
                  case 22:
                    if (isFollowUp) {
                      _logger.logger.info("Follow up mail sent successfully to ".concat(lenderPlacement.lenderContact.email, " from ").concat(req.user.sendEmailFrom));
                    } else {
                      _logger.logger.info("Email for deal sent successfully to ".concat(lenderPlacement.lenderContact.email, " from ").concat(req.user.sendEmailFrom));
                    }
                    // Adding postmark message id in placement while updating lender placement when deal is sent
                    if (!(lenderPlacement.isEmailSent === _enum.EnumOfEmailStatus.SEND_DEAL)) {
                      _context6.next = 29;
                      break;
                    }
                    stage = _enum.EnumStageOfLenderPlacement.SENT;
                    _context6.next = 27;
                    return _models.LenderPlacement.findByIdAndUpdate(lenderPlacementId, {
                      followOnDate: new Date(Date.now() + _config["default"].followUpTimeForSendEmail),
                      isEmailSent: _enum.EnumOfEmailStatus.EMAIL_SENT,
                      isEmailSentFirstTime: true,
                      $addToSet: {
                        postmarkMessageId: postmarkMessageId,
                        sendEmailPostmarkMessageId: postmarkMessageId
                      },
                      stage: stage,
                      stageEnumWiseNumber: (0, _enumStageOfLenderPlacement.stageOfLenderPlacementWithNumber)(stage),
                      nextStep: _enum["default"].EnumNextStepOfLenderPlacement[stage],
                      timeLine: (0, _common.manageLenderPlacementStageTimeline)(lenderPlacement.stage, stage, lenderPlacement.timeLine),
                      // also adding send deal's mail once the mail is sent
                      sendDealMail: {
                        mailContent: (0, _common.sendDealTemplate)({
                          emailContent: req.body.emailContent,
                          dealDetail: dealDetail,
                          firstName: lenderPlacement.lenderContact.firstName,
                          advisorName: req.user.firstName,
                          dealSummaryLink: "<a href=".concat(dealSummaryLink, ">Deal Summary</a>")
                        }),
                        sentAt: new Date()
                      }
                    });
                  case 27:
                    _context6.next = 31;
                    break;
                  case 29:
                    _context6.next = 31;
                    return _models.LenderPlacement.findByIdAndUpdate(lenderPlacementId, {
                      followOnDate: new Date(Date.now() + _config["default"].followUpTimeForSendEmail),
                      isEmailSent: _enum.EnumOfEmailStatus.EMAIL_SENT,
                      isEmailSentFirstTime: false,
                      $addToSet: {
                        postmarkMessageId: postmarkMessageId,
                        sendEmailPostmarkMessageId: postmarkMessageId,
                        // adding follow-up mails whenever the user send follow up
                        followUpMail: {
                          mailContent: getFollowUpContent(),
                          sentAt: new Date()
                        }
                      }
                    });
                  case 31:
                  case "end":
                    return _context6.stop();
                }
              }, _callee6);
            }));
            return function (_x9) {
              return _ref9.apply(this, arguments);
            };
          }()));
        case 24:
          dealDataToUpdate = {
            $addToSet: {
              'involvedUsers.lenders': {
                $each: lenderUserIdsToAddInDeal
              }
            }
          };
          _context7.next = 27;
          return _services.lenderPlacementService.getLenderPlacementList({
            deal: dealId
          });
        case 27:
          lenderPlacementsAssociatedWithDeal = _context7.sent;
          // Filter placements with a stage lower than the target placement stage
          placementWithTargetStage = lenderPlacementsAssociatedWithDeal.filter(function (placement) {
            return _enumStageOfLenderPlacement.lenderPlacementStageToStageNumberMapping.get(placement.stage) < _enumStageOfLenderPlacement.lenderPlacementStageToStageNumberMapping.get(_enum.EnumStageOfLenderPlacement.SENT);
          });
          dealStage = _enum.EnumStageOfDeal.OUT_IN_MARKET; // If there are no placements with the target stage, update stage details in the dealDataToUpdate
          if (placementWithTargetStage.length) {
            _context7.next = 41;
            break;
          }
          _context7.t0 = Object;
          _context7.t1 = dealDataToUpdate;
          _context7.t2 = dealStage;
          _context7.t3 = (0, _enumStageForDeal.stageOfDealWithNumber)(dealStage);
          _context7.t4 = (0, _common.manageDealStageTimeline)(dealDetail.stage, dealStage, dealDetail.timeLine);
          _context7.next = 38;
          return (0, _detailsInDeal.detailsInDeal)(dealStage, dealId);
        case 38:
          _context7.t5 = _context7.sent;
          _context7.t6 = {
            stage: _context7.t2,
            orderOfStage: _context7.t3,
            timeLine: _context7.t4,
            details: _context7.t5
          };
          _context7.t0.assign.call(_context7.t0, _context7.t1, _context7.t6);
        case 41:
          _context7.next = 43;
          return _models.Deal.findByIdAndUpdate(dealId, dealDataToUpdate, {
            "new": true
          });
        case 43:
          deal = _context7.sent;
          // commenting user in case we need it again in future
          createActivityLogBody = {
            createdBy: req.user._id,
            updatedBy: req.user._id,
            update: "".concat(deal.dealName, " was sent out to lenders"),
            deal: dealId,
            type: _enum.EnumOfActivityType.ACTIVITY
            // user: config.activitySystemUser || 'system',
          };
          _context7.next = 47;
          return _services.activityLogService.createActivityLog(createActivityLogBody);
        case 47:
          return _context7.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: 'Email sent....'
          }));
        case 48:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}());
var get = exports.get = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var lenderPlacementId, filter, options, lenderPlacement;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          lenderPlacementId = req.params.lenderPlacementId;
          filter = {
            _id: lenderPlacementId
          };
          options = {
            populate: [{
              path: 'lendingInstitution'
            }, {
              path: 'notes',
              match: {
                notesType: _enum["default"].EnumOfNotesTypeOfLenderNotes.EXTERNAL_NOTE
              }
            }]
          };
          _context8.next = 5;
          return _services.lenderPlacementService.getOne(filter, options);
        case 5:
          lenderPlacement = _context8.sent;
          return _context8.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: lenderPlacement
          }));
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x10, _x11) {
    return _ref10.apply(this, arguments);
  };
}());
var getLenderPlacementFilterQuery = function getLenderPlacementFilterQuery(query) {
  var filter = (0, _pick.pick)(query, ['deal', 'stage', 'isFavourite', 'isArchived']);
  if (query.search) {
    filter.$or = [{
      firstName: new RegExp(query.search, 'i')
    }, {
      lastName: new RegExp(query.search, 'i')
    }];
  }
  return filter;
};
var list = exports.list = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var query, user, queryParams, sortingObj, sortObj, filter, options, lenderPlacement;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          query = req.query, user = req.user;
          queryParams = getLenderPlacementFilterQuery(query);
          sortingObj = (0, _pick.pick)(query, ['sort', 'order']);
          sortObj = _defineProperty({
            isFavourite: 'desc'
          }, sortingObj.sort, sortingObj.order);
          filter = _objectSpread(_objectSpread({}, queryParams), {}, {
            stage: query.stage ? query.stage : {
              $ne: _enum.EnumStageOfLenderPlacement.ARCHIVE
            }
          });
          options = _objectSpread(_objectSpread({}, (0, _pick.pick)(query, ['sort', 'limit', 'page'])), {}, {
            populate: [{
              path: 'lendingInstitution'
            }, {
              path: 'lenderContact'
            }, {
              path: 'lenderAllContacts'
            }, {
              path: 'task',
              match: {
                deal: query.deal,
                isCompleted: false
              }
            }, {
              path: 'outstandingTaskCount',
              count: true,
              match: {
                deal: query.deal,
                isCompleted: false
              }
            }, {
              path: 'notes',
              populate: [{
                path: 'user'
              }],
              match: {
                notesType: _enum["default"].EnumOfNotesTypeOfLenderNotes.EXTERNAL_NOTE
              }
            }, {
              path: 'internalNotes',
              populate: [{
                path: 'user'
              }],
              match: {
                notesType: _enum["default"].EnumOfNotesTypeOfLenderNotes.INTERNAL_NOTE
              }
            }],
            // by default messages field is set as select false in the model.
            // we required messages field along with the other field so added + with the messages.
            select: '+messages'
          });
          if (sortingObj.sort) {
            options.sort = sortObj;
            // options.collation = { locale: 'en', caseLevel: false }; // Case-insensitive sorting
          }
          _context9.next = 9;
          return _services.lenderPlacementService.getLenderPlacementList(filter, options);
        case 9:
          lenderPlacement = _context9.sent;
          // filter out if we only need outstanding tasks placement
          // if we want to find according to it than DB query will be increase & it takes more time bcs we are counting outstandingTaskCount by virtual & matching
          if (query.outstandingTask) {
            lenderPlacement = lenderPlacement.filter(function (placement) {
              return placement.outstandingTaskCount > 0;
            });
          }
          // checking for the new messages is available or not .
          // if current logged-in user's id is not available in messageReadBy array , then it is considered as this message is new, not read by user previously & hasNewMessagesAvailable marked as true.
          // based on the hasNewMessagesAvailable , set the blue dot mark on the placement in FE.
          lenderPlacement = lenderPlacement.map(function (placement) {
            var hasNewMessage = placement.messages.some(function (message) {
              return !message.messageReadBy.includes(user._id);
            });
            if (hasNewMessage) {
              // eslint-disable-next-line no-param-reassign
              placement._doc.hasNewMessagesAvailable = true;
            } else {
              // eslint-disable-next-line no-param-reassign
              placement._doc.hasNewMessagesAvailable = false;
            }
            return placement;
          });
          return _context9.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: lenderPlacement
          }));
        case 13:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x12, _x13) {
    return _ref11.apply(this, arguments);
  };
}());
var paginate = exports.paginate = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var query, sortingObj, sortObj, filter, options, lenderPlacement;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          query = req.query;
          sortingObj = (0, _pick.pick)(query, ['sort', 'order']);
          sortObj = _defineProperty({}, sortingObj.sort, sortingObj.order);
          filter = _objectSpread({}, (0, _pick.pick)(query, ['deal']));
          options = _objectSpread(_objectSpread({}, (0, _pick.pick)(query, ['limit', 'page'])), {}, {
            populate: [{
              path: 'lendingInstitution'
            }, {
              path: 'lenderContact'
            }, {
              path: 'lenderAllContacts'
            }, {
              path: 'notes'
            }]
          });
          if (sortingObj.sort) {
            options.sort = sortObj;
          }
          _context10.next = 8;
          return _services.lenderPlacementService.getLenderPlacementListWithPagination(filter, options);
        case 8:
          lenderPlacement = _context10.sent;
          lenderPlacement.results = lenderPlacement.results.map(function (lenderPlacementObject) {
            return _objectSpread({
              createdAt: lenderPlacementObject.createdAt
            }, lenderPlacementObject.toJSON());
          });
          return _context10.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: lenderPlacement
          }));
        case 11:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function (_x14, _x15) {
    return _ref12.apply(this, arguments);
  };
}());
var create = exports.create = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var body, user, moveFileObj, options;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          body = req.body;
          body.createdBy = req.user._id;
          body.updatedBy = req.user._id;
          user = req.user;
          moveFileObj = _objectSpread({}, body.termSheet && {
            termSheet: body.termSheet
          });
          if (body.stage) {
            body.stageEnumWiseNumber = (0, _enumStageOfLenderPlacement.stageOfLenderPlacementWithNumber)(body.stage);
          }
          body._id = _mongoose["default"].Types.ObjectId();
          _context12.next = 9;
          return moveFiles({
            body: body,
            user: user,
            moveFileObj: moveFileObj
          });
        case 9:
          options = {}; // Before it wasn't allowing other institute to add as well even if one is already added, so using promise.all so that it'll throw error for one but will allow others to get added in deal
          _context12.next = 12;
          return Promise.all(body.lendingDetails.map( /*#__PURE__*/function () {
            var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(lendingInstitute) {
              var placement, lenderPlacementResult, uploadedFileUrls;
              return _regeneratorRuntime().wrap(function _callee11$(_context11) {
                while (1) switch (_context11.prev = _context11.next) {
                  case 0:
                    placement = _objectSpread(_objectSpread({}, lendingInstitute), {}, {
                      createdBy: body.createdBy,
                      updatedBy: body.updatedBy
                    });
                    _context11.next = 3;
                    return _services.lenderPlacementService.createLenderPlacement(placement, options);
                  case 3:
                    lenderPlacementResult = _context11.sent;
                    if (!lenderPlacementResult) {
                      _context11.next = 9;
                      break;
                    }
                    uploadedFileUrls = [];
                    uploadedFileUrls.push(lenderPlacementResult.termSheet);
                    _context11.next = 9;
                    return _tempS["default"].updateMany({
                      url: {
                        $in: uploadedFileUrls
                      }
                    }, {
                      active: true
                    });
                  case 9:
                  case "end":
                    return _context11.stop();
                }
              }, _callee11);
            }));
            return function (_x18) {
              return _ref14.apply(this, arguments);
            };
          }()));
        case 12:
          return _context12.abrupt("return", res.status(_httpStatus["default"].CREATED).send({
            results: 'Lender added to the deal'
          }));
        case 13:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function (_x16, _x17) {
    return _ref13.apply(this, arguments);
  };
}());
var update = exports.update = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var body, lenderPlacementId, user, termsheet, moveFileObj, filter, fileName, options, optionForGetPlacement, beforeLenderPlacementResult, futureFunding, placementsInDeal, oldStage, lenderPlacementResult, dealId, lenderPlacementsAssociatedWithDeal, stage, createActivityLogBody, _stage, uploadedFileUrls, _createActivityLogBody, _stage2, _createActivityLogBody2, _stage3;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          body = req.body;
          body.updatedBy = req.user._id;
          lenderPlacementId = req.params.lenderPlacementId;
          user = req.user;
          termsheet = body.termSheet;
          moveFileObj = _objectSpread({}, body.termSheet && {
            termSheet: body.termSheet.url
          });
          body._id = lenderPlacementId;
          _context13.next = 9;
          return moveFiles({
            body: body,
            user: user,
            moveFileObj: moveFileObj
          });
        case 9:
          filter = {
            _id: lenderPlacementId
          };
          if (body.termSheet) {
            fileName = termsheet.fileName;
            body.termSheet = (0, _common.encodeUrl)(body.termSheet);
            body.termSheet = {
              url: body.termSheet,
              fileName: fileName
            };
          }
          options = {
            "new": true,
            populate: [{
              path: 'lendingInstitution'
            }, {
              path: 'lenderContact'
            },
            // TODO : check & add condition here like in the getlist API & also check for outstanding task bcs it will be 0 when we change status to new & after changing status FE is calling getList API so they are getting updated data
            {
              path: 'internalNotes',
              populate: [{
                path: 'user'
              }],
              match: {
                notesType: _enum["default"].EnumOfNotesTypeOfLenderNotes.INTERNAL_NOTE
              }
            }, {
              path: 'notes'
            }, {
              path: 'lenderAllContacts'
            }, {
              path: 'deal'
            }]
          };
          optionForGetPlacement = {
            populate: [{
              path: 'lenderContact'
            }]
          };
          _context13.next = 15;
          return _services.lenderPlacementService.getLenderPlacementById(lenderPlacementId, optionForGetPlacement);
        case 15:
          beforeLenderPlacementResult = _context13.sent;
          if (!body.terms) {
            _context13.next = 24;
            break;
          }
          futureFunding = body.terms.futureFunding ? body.terms.futureFunding : 0;
          body.terms.totalLoanAmount = body.terms.initialFunding + futureFunding;
          // checking for placement we are adding terms into already has orderOfTerms or not
          if (beforeLenderPlacementResult.orderOfTerms) {
            _context13.next = 24;
            break;
          }
          _context13.next = 22;
          return _services.lenderPlacementService.getLenderPlacementListCount({
            deal: beforeLenderPlacementResult.deal,
            orderOfTerms: {
              $exists: true
            }
          });
        case 22:
          placementsInDeal = _context13.sent;
          body.orderOfTerms = placementsInDeal;
        case 24:
          // check & throw error if term is not added
          // bcs we have requirement that if term is added than only we can add term-sheet
          if (body.termSheet) {
            (0, _common.checkTermAdded)(beforeLenderPlacementResult);
          }
          oldStage = beforeLenderPlacementResult.stage;
          if (!body.stage) {
            _context13.next = 40;
            break;
          }
          if (!(body.stage === _enum["default"].EnumStageOfDeal.NEW)) {
            _context13.next = 37;
            break;
          }
          body.isEmailSent = _enum["default"].EnumOfEmailStatus.SEND_DEAL;
          // When we change the status from sent to new then all the messages , contact, task, postmarkMessageId, sendEmailPostmarkMessageId, terms, followOnDate, sendDealMail and orderOfTerms should get removed
          body.isEmailSentFirstTime = false;
          body.messages = [];
          body.$unset = {
            lenderContact: '',
            terms: '',
            termSheet: '',
            followOnDate: '',
            sendDealMail: '',
            orderOfTerms: ''
          };
          body.postmarkMessageId = [];
          body.sendEmailPostmarkMessageId = [];
          body.followUpMail = [];
          _context13.next = 37;
          return (0, _lenderPlacement.removeLenderPlacementAssociatedThings)(beforeLenderPlacementResult);
        case 37:
          body.stageEnumWiseNumber = (0, _enumStageOfLenderPlacement.stageOfLenderPlacementWithNumber)(body.stage);
          body.nextStep = body.nextStep ? body.nextStep : _enum["default"].EnumNextStepOfLenderPlacement[body.stage];
          body.timeLine = (0, _common.manageLenderPlacementStageTimeline)(oldStage, body.stage, beforeLenderPlacementResult.timeLine);
        case 40:
          if (!(oldStage !== _enum.EnumStageOfLenderPlacement.CLOSED && body.stage === _enum.EnumStageOfLenderPlacement.ARCHIVE)) {
            _context13.next = 42;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Only Archive possible when status changed from Closed to Archive..');
        case 42:
          if (!(oldStage === _enum.EnumStageOfLenderPlacement.CLOSED && body.stage === _enum.EnumStageOfLenderPlacement.ARCHIVE)) {
            _context13.next = 45;
            break;
          }
          _context13.next = 45;
          return _models.LenderPlacement.findByIdAndUpdate(lenderPlacementId, {
            stage: _enum.EnumStageOfLenderPlacement.ARCHIVE
          });
        case 45:
          _context13.next = 47;
          return _services.lenderPlacementService.updateLenderPlacement(filter, body, options);
        case 47:
          lenderPlacementResult = _context13.sent;
          dealId = lenderPlacementResult.deal._id ? lenderPlacementResult.deal._id : lenderPlacementResult.deal;
          _context13.next = 51;
          return _services.lenderPlacementService.getLenderPlacementList({
            deal: dealId
          });
        case 51:
          lenderPlacementsAssociatedWithDeal = _context13.sent;
          if (![_enum["default"].EnumStageOfLenderPlacement.CLOSING, _enum["default"].EnumStageOfLenderPlacement.CLOSED].includes(lenderPlacementResult.stage)) {
            _context13.next = 59;
            break;
          }
          stage = lenderPlacementResult.stage; // Update the deal stage according to the current lender placement stage
          _context13.next = 56;
          return (0, _deal.updateDealStageWithPlacementStage)({
            dealId: dealId,
            dealStage: stage,
            placementStage: stage,
            lenderPlacementsAssociatedWithDeal: lenderPlacementsAssociatedWithDeal,
            lenderPlacementResult: lenderPlacementResult
          });
        case 56:
          // commenting user in case we need it again in future
          createActivityLogBody = {
            createdBy: req.user._id,
            updatedBy: req.user._id,
            update: "".concat(lenderPlacementResult.deal.dealName, " moved into ").concat(stage, " with ").concat(lenderPlacementResult.lendingInstitution.lenderNameVisible),
            deal: dealId,
            type: _enum.EnumOfActivityType.ACTIVITY
            // user: config.activitySystemUser || 'system',
          };
          _context13.next = 59;
          return _services.activityLogService.createActivityLog(createActivityLogBody);
        case 59:
          if (!(body.stage === _enum["default"].EnumStageOfLenderPlacement.NEW)) {
            _context13.next = 63;
            break;
          }
          _stage = lenderPlacementResult.stage;
          _context13.next = 63;
          return (0, _deal.updateDealStageWithPlacementStage)({
            dealId: dealId,
            dealStage: _stage,
            placementStage: _stage,
            lenderPlacementsAssociatedWithDeal: lenderPlacementsAssociatedWithDeal,
            lenderPlacementResult: lenderPlacementResult
          });
        case 63:
          if (!(body.stage === _enum["default"].EnumStageOfLenderPlacement.SENT)) {
            _context13.next = 66;
            break;
          }
          _context13.next = 66;
          return (0, _deal.updateDealStageWithPlacementStage)({
            dealId: dealId,
            dealStage: _enum.EnumStageOfDeal.OUT_IN_MARKET,
            placementStage: _enum.EnumStageOfLenderPlacement.SENT,
            lenderPlacementsAssociatedWithDeal: lenderPlacementsAssociatedWithDeal,
            lenderPlacementResult: lenderPlacementResult
          });
        case 66:
          if (!lenderPlacementResult.termSheet) {
            _context13.next = 71;
            break;
          }
          uploadedFileUrls = [];
          uploadedFileUrls.push(lenderPlacementResult.termSheet.url);
          _context13.next = 71;
          return _tempS["default"].updateMany({
            url: {
              $in: uploadedFileUrls
            }
          }, {
            active: true
          });
        case 71:
          if (!(!beforeLenderPlacementResult.termSheet && body.termSheet)) {
            _context13.next = 78;
            break;
          }
          // commenting user in case we need it again in future
          _createActivityLogBody = {
            createdBy: req.user._id,
            updatedBy: req.user._id,
            update: "".concat(beforeLenderPlacementResult.lendingInstitution.lenderNameVisible, " posted a term sheet on ").concat(lenderPlacementResult.deal.dealName),
            deal: lenderPlacementResult.deal,
            lender: lenderPlacementResult.lendingInstitution,
            type: _enum.EnumOfActivityType.ACTIVITY
            // user: config.activitySystemUser || 'system',
          };
          _context13.next = 75;
          return _services.activityLogService.createActivityLog(_createActivityLogBody);
        case 75:
          _stage2 = _enum.EnumStageOfLenderPlacement.TERMS_SHEET_RECEIVED;
          _context13.next = 78;
          return _models.LenderPlacement.findByIdAndUpdate(lenderPlacementId, {
            stage: _stage2,
            stageEnumWiseNumber: (0, _enumStageOfLenderPlacement.stageOfLenderPlacementWithNumber)(_stage2),
            timeLine: (0, _common.manageLenderPlacementStageTimeline)(oldStage, _stage2, beforeLenderPlacementResult.timeLine),
            nextStep: _enum["default"].EnumNextStepOfLenderPlacement[_stage2]
          });
        case 78:
          if (!(!beforeLenderPlacementResult.terms && body.terms)) {
            _context13.next = 85;
            break;
          }
          // commenting user in case we need it again in future
          _createActivityLogBody2 = {
            createdBy: req.user._id,
            updatedBy: req.user._id,
            update: "".concat(beforeLenderPlacementResult.lendingInstitution.lenderNameVisible, " sent over terms"),
            deal: lenderPlacementResult.deal,
            lender: lenderPlacementResult.lendingInstitution,
            type: _enum.EnumOfActivityType.ACTIVITY
            // user: config.activitySystemUser || 'system',
          };
          _context13.next = 82;
          return _services.activityLogService.createActivityLog(_createActivityLogBody2);
        case 82:
          _stage3 = _enum.EnumStageOfLenderPlacement.TERMS_RECEIVED;
          _context13.next = 85;
          return _models.LenderPlacement.findByIdAndUpdate(lenderPlacementId, {
            stage: _stage3,
            stageEnumWiseNumber: (0, _enumStageOfLenderPlacement.stageOfLenderPlacementWithNumber)(_stage3),
            timeLine: (0, _common.manageLenderPlacementStageTimeline)(oldStage, _stage3, beforeLenderPlacementResult.timeLine),
            nextStep: _enum["default"].EnumNextStepOfLenderPlacement[_stage3]
          });
        case 85:
          return _context13.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: lenderPlacementResult
          }));
        case 86:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function (_x19, _x20) {
    return _ref15.apply(this, arguments);
  };
}());
var updateMany = exports.updateMany = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var body, lenderPlacementIds, updateBody, filter, options, lenderPlacementResult;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          body = req.body;
          body.updatedBy = req.user;
          lenderPlacementIds = req.body.lenderPlacementIds;
          updateBody = req.body.update;
          filter = {
            _id: {
              $in: lenderPlacementIds
            }
          };
          options = {
            "new": true
          };
          _context14.next = 8;
          return _services.lenderPlacementService.updateManyLenderPlacement(filter, updateBody, options);
        case 8:
          lenderPlacementResult = _context14.sent;
          return _context14.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: lenderPlacementResult
          }));
        case 10:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function (_x21, _x22) {
    return _ref16.apply(this, arguments);
  };
}());
var remove = exports.remove = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var lenderPlacementId, filter, lenderPlacement;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          lenderPlacementId = req.params.lenderPlacementId;
          filter = {
            _id: lenderPlacementId
          };
          _context15.next = 4;
          return _services.lenderPlacementService.removeLenderPlacement(filter);
        case 4:
          lenderPlacement = _context15.sent;
          return _context15.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: lenderPlacement
          }));
        case 6:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function (_x23, _x24) {
    return _ref17.apply(this, arguments);
  };
}());
var removeByDealAndLendingInstitution = exports.removeByDealAndLendingInstitution = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var _req$query, deal, lendingInstitution, filter, lenderPlacement;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          _req$query = req.query, deal = _req$query.deal, lendingInstitution = _req$query.lendingInstitution;
          filter = {
            deal: deal,
            lendingInstitution: lendingInstitution
          };
          _context16.next = 4;
          return _services.lenderPlacementService.removeLenderPlacement(filter);
        case 4:
          lenderPlacement = _context16.sent;
          return _context16.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: lenderPlacement
          }));
        case 6:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function (_x25, _x26) {
    return _ref18.apply(this, arguments);
  };
}());

/**
 * @deprecated
 * This function is no longer in use instead we are using '/sendDeal/v3' as we only have one template instead of choosing different templates, and also we added functionality of sending deals to multiple lender.
 */
var sendDeal = exports.sendDeal = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var _req$body2, lenderInstitute, deal, lenderPlacement, advisorName, advisorEmail, filterToFindContact, filterToFindPlacement, filterToFindDeal, lenderContact, lenderName, totalLoanAmount, docIds, createTemplates, contact, staticEmailTemplateData, templateData, totalLoanAmountForSubject, defaultTemplate;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _req$body2 = req.body, lenderInstitute = _req$body2.lenderInstitute, deal = _req$body2.deal, lenderPlacement = _req$body2.lenderPlacement;
          advisorName = req.user.name;
          advisorEmail = req.user.email;
          filterToFindContact = {
            lenderInstitute: lenderInstitute
          };
          filterToFindPlacement = {
            // lendingInstitution: lenderInstitute,
            _id: lenderPlacement
          };
          filterToFindDeal = {
            deal: deal
          };
          _context17.next = 8;
          return _services.lenderPlacementService.sendDeal(filterToFindContact, filterToFindPlacement, filterToFindDeal);
        case 8:
          lenderContact = _context17.sent;
          if (lenderContact.lenderPlacement.lendingInstitution) {
            lenderName = lenderContact.lenderPlacement.lendingInstitution.lenderNameVisible;
          }
          totalLoanAmount = 0;
          docIds = lenderContact.docIds;
          createTemplates = [];
          if (!lenderContact.lenderPlacement.terms) {
            totalLoanAmount = 0;
          } else {
            totalLoanAmount = lenderContact.lenderPlacement.terms.totalLoanAmount;
            totalLoanAmount /= 1000000;
            totalLoanAmount = totalLoanAmount.toFixed(2);
          }
          if (!lenderPlacement) {
            _context17.next = 28;
            break;
          }
          // now we have only on contact in placement so no need to add all contact
          contact = [{
            sendTo: lenderContact.lenderPlacement.lenderContact.email,
            name: lenderContact.lenderPlacement.lenderContact.firstName
          }];
          staticEmailTemplateData = (0, _emailContent.sendDealTemplate1Text)();
          _context17.next = 19;
          return _models.EmailTemplate.find({
            lenderPlacement: lenderPlacement,
            isFirstTime: true
          });
        case 19:
          templateData = _context17.sent;
          totalLoanAmountForSubject = lenderContact.lenderPlacement.deal.loanAmount.replace(/[$,]/g, '') * 1; // totalLoanAmount is converted into millions so if 1000000 then it should be 1
          totalLoanAmountForSubject /= 1000000;
          totalLoanAmountForSubject.toFixed(2);
          if (templateData.length) {
            _context17.next = 28;
            break;
          }
          _context17.next = 26;
          return _models.EmailTemplate.create({
            from: advisorEmail,
            advisorName: advisorName,
            contact: contact,
            // subject: '547 Valley Road - $1.5m Acquisition Financing',
            subject: "".concat(lenderContact.lenderPlacement.deal.dealName, "-$").concat(totalLoanAmountForSubject, "m Financing Request"),
            dealDocument: docIds,
            emailContent: staticEmailTemplateData,
            lenderPlacement: lenderPlacement,
            deal: deal,
            emailAttachments: [],
            isFirstTime: true,
            isEmailSent: false,
            totalLoanAmount: totalLoanAmount,
            templateName: "defaultTemplate - ".concat(lenderName)
          });
        case 26:
          defaultTemplate = _context17.sent;
          // create only one template for now
          // const blankTemplate = await EmailTemplate.create({
          //   from: advisorEmail,
          //   advisorName,
          //   contact,
          //   subject: '',
          //   dealDocument: docIds,
          //   emailContent: '',
          //   lenderPlacement,
          //   deal,
          //   emailAttachments: [],
          //   isFirstTime: true,
          //   isEmailSent: false,
          //   isBlankTemplate: true,
          //   templateName: `blankTemplate - ${lenderName}`,
          // });
          // createTemplates.push(defaultTemplate, blankTemplate);
          createTemplates.push(defaultTemplate);
        case 28:
          return _context17.abrupt("return", res.status(_httpStatus["default"].OK).send({
            createTemplates: createTemplates
          }));
        case 29:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function (_x27, _x28) {
    return _ref19.apply(this, arguments);
  };
}());

/**
 * @deprecated
 * This function is no longer in use as the functionality of choosing templates for send deal has been removed.
 */
var getEmailTemplatesByLanderPlacementId = exports.getEmailTemplatesByLanderPlacementId = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref20 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var lenderPlacement, filter, emailTemplate;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          lenderPlacement = req.params.lenderPlacement;
          filter = {
            lenderPlacement: lenderPlacement
          };
          _context18.next = 4;
          return _services.emailTemplateService.getEmailTemplateList(filter);
        case 4:
          emailTemplate = _context18.sent;
          return _context18.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: emailTemplate
          }));
        case 6:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return function (_x29, _x30) {
    return _ref20.apply(this, arguments);
  };
}());
/**
 * @deprecated
 * This function is no longer in use as the functionality of email templates has been removed.
 */
var getTemplateByTemplateId = exports.getTemplateByTemplateId = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref21 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var emailTemplateId, filter, options, getEmailTemplate, dealSummaryDocs, emailAttachments;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          emailTemplateId = req.params.emailTemplateId;
          filter = {
            _id: emailTemplateId
          };
          options = {
            populate: [{
              path: 'deal',
              populate: {
                path: 'dealSummary'
              }
            }]
          };
          _context19.next = 5;
          return _models.EmailTemplate.findOne(filter, {}, options);
        case 5:
          getEmailTemplate = _context19.sent;
          if (getEmailTemplate) {
            _context19.next = 8;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'no EmailTemplate found with this id!');
        case 8:
          // need to send attachment so getting all attachment of dealSummary
          dealSummaryDocs = [];
          if (getEmailTemplate.deal.dealSummary.documents && getEmailTemplate.deal.dealSummary.documents.length) {
            dealSummaryDocs.push.apply(dealSummaryDocs, _toConsumableArray(getEmailTemplate.deal.dealSummary.documents));
          }
          emailAttachments = dealSummaryDocs.map(function (item) {
            return {
              fileName: item.fileName,
              path: item.url,
              fileType: item.url.split('.').pop()
            };
          });
          getEmailTemplate.emailAttachments = emailAttachments;
          return _context19.abrupt("return", res.status(_httpStatus["default"].OK).send({
            getEmailTemplate: getEmailTemplate
          }));
        case 13:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return function (_x31, _x32) {
    return _ref21.apply(this, arguments);
  };
}());
/**
 * @deprecated
 * This function is no longer in use as the functionality to choose and update email template has been removed.
 */
var updateAndSaveInitialEmailContent = exports.updateAndSaveInitialEmailContent = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref22 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee21(req, res) {
    var emailTemplateId, filter, getEmailTemplate, body, emailContent, updatedBody, emailAttachments, result, data, templateData;
    return _regeneratorRuntime().wrap(function _callee21$(_context21) {
      while (1) switch (_context21.prev = _context21.next) {
        case 0:
          emailTemplateId = req.params.emailTemplateId;
          filter = {
            _id: emailTemplateId
          };
          _context21.next = 4;
          return _models.EmailTemplate.findOne(filter).lean();
        case 4:
          getEmailTemplate = _context21.sent;
          if (getEmailTemplate) {
            _context21.next = 7;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'no EmailTemplate found with this id..!!');
        case 7:
          if (!(req.body.templateName === getEmailTemplate.templateName)) {
            _context21.next = 9;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'A template with the same name already exists..');
        case 9:
          body = _objectSpread({}, getEmailTemplate);
          delete body._id;
          emailContent = req.body.emailContent ? req.body.emailContent : body.emailContent;
          updatedBody = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, body), req.body), {
            lenderPlacement: getEmailTemplate.lenderPlacement
          }), {
            isFirstTime: false
          }), {
            /*
             * he (for “HTML entities”) is a robust HTML entity encoder/decoder written in JavaScript
             * */
            emailContent: he.decode(emailContent)
          });
          if (updatedBody.emailAttachments) {
            emailAttachments = updatedBody.emailAttachments.map(function (item) {
              return {
                fileName: item.fileName,
                path: item.url ? item.url : item.path,
                fileType: item.fileType
              };
            });
            delete updatedBody.emailAttachments;
            updatedBody.emailAttachments = emailAttachments;
          }
          if (!updatedBody.sendTo) {
            _context21.next = 25;
            break;
          }
          result = updatedBody.sendTo.map(function (item) {
            return {
              sendTo: item
            };
          });
          if (!updatedBody.contact) {
            _context21.next = 23;
            break;
          }
          _context21.next = 19;
          return Promise.all(result.map( /*#__PURE__*/function () {
            var _ref23 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee20(item) {
              var getRecordFromContact, filter, lenderContact;
              return _regeneratorRuntime().wrap(function _callee20$(_context20) {
                while (1) switch (_context20.prev = _context20.next) {
                  case 0:
                    getRecordFromContact = updatedBody.contact.find(function (value) {
                      return item.sendTo === value.sendTo;
                    });
                    if (!getRecordFromContact) {
                      _context20.next = 3;
                      break;
                    }
                    return _context20.abrupt("return", getRecordFromContact);
                  case 3:
                    // eslint-disable-next-line no-shadow
                    filter = {
                      email: item.sendTo
                    };
                    _context20.next = 6;
                    return _services.lenderContactService.getOne(filter);
                  case 6:
                    lenderContact = _context20.sent;
                    if (lenderContact) {
                      _context20.next = 9;
                      break;
                    }
                    throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'First, Add this Email in Lender Contact');
                  case 9:
                    // eslint-disable-next-line no-param-reassign
                    item.name = lenderContact.firstName;
                    return _context20.abrupt("return", item);
                  case 11:
                  case "end":
                    return _context20.stop();
                }
              }, _callee20);
            }));
            return function (_x35) {
              return _ref23.apply(this, arguments);
            };
          }()));
        case 19:
          data = _context21.sent;
          updatedBody.contact = data;
          _context21.next = 24;
          break;
        case 23:
          updatedBody.contact = result;
        case 24:
          delete updatedBody.sendTo;
        case 25:
          _context21.next = 27;
          return _models.EmailTemplate.create(updatedBody);
        case 27:
          templateData = _context21.sent;
          return _context21.abrupt("return", res.status(_httpStatus["default"].OK).send({
            templateData: templateData
          }));
        case 29:
        case "end":
          return _context21.stop();
      }
    }, _callee21);
  }));
  return function (_x33, _x34) {
    return _ref22.apply(this, arguments);
  };
}());
/**
 * @deprecated
 * This function is no longer in use instead we are using '/sendDeal/v3'.
 */
var sendEmail = exports.sendEmail = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref24 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee24(req, res) {
    var emailTemplateId, sendToAdvisor, filter, getUser, emailPresentingPostmark, emailTemplate, getEmailTemplate, _result, data, placementId, dealId, ccList, bccList, headers, sendToIsEmpty, dealDetail, _String, _String2, _$find, _String3, _$find2, _String4, _$find3, isAdvisor, emailAttachments, getText, result, _stage4, stage, deal, createActivityLogBody;
    return _regeneratorRuntime().wrap(function _callee24$(_context24) {
      while (1) switch (_context24.prev = _context24.next) {
        case 0:
          emailTemplateId = req.params.emailTemplateId;
          sendToAdvisor = req.body.sendToAdvisor;
          filter = {
            _id: emailTemplateId
          };
          _context24.next = 5;
          return _models.User.findOne({
            _id: req.user._id
          });
        case 5:
          getUser = _context24.sent;
          emailPresentingPostmark = getUser.emailPresentingPostmark;
          _context24.next = 9;
          return _models.EmailTemplate.findOne(filter).lean().populate('deal');
        case 9:
          emailTemplate = _context24.sent;
          if (emailTemplate) {
            _context24.next = 12;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'no EmailTemplate found with this id..!!');
        case 12:
          if (!req.body.getEmailTemplate) {
            _context24.next = 27;
            break;
          }
          getEmailTemplate = req.body.getEmailTemplate;
          _result = getEmailTemplate.sendTo.map(function (item) {
            return {
              sendTo: item
            };
          });
          if (!emailTemplate.contact) {
            _context24.next = 22;
            break;
          }
          _context24.next = 18;
          return Promise.all(_result.map( /*#__PURE__*/function () {
            var _ref25 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee22(item) {
              var getRecordFromContact, filter, lenderContact;
              return _regeneratorRuntime().wrap(function _callee22$(_context22) {
                while (1) switch (_context22.prev = _context22.next) {
                  case 0:
                    getRecordFromContact = emailTemplate.contact.find(function (value) {
                      return item.sendTo === value.sendTo;
                    });
                    if (!getRecordFromContact) {
                      _context22.next = 3;
                      break;
                    }
                    return _context22.abrupt("return", getRecordFromContact);
                  case 3:
                    // eslint-disable-next-line no-shadow
                    filter = {
                      email: item.sendTo
                    };
                    _context22.next = 6;
                    return _services.lenderContactService.getOne(filter);
                  case 6:
                    lenderContact = _context22.sent;
                    if (lenderContact) {
                      _context22.next = 9;
                      break;
                    }
                    throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'First, Add this Email in Lender Contact');
                  case 9:
                    // eslint-disable-next-line no-param-reassign
                    item.name = lenderContact.firstName;
                    return _context22.abrupt("return", item);
                  case 11:
                  case "end":
                    return _context22.stop();
                }
              }, _callee22);
            }));
            return function (_x38) {
              return _ref25.apply(this, arguments);
            };
          }()));
        case 18:
          data = _context24.sent;
          getEmailTemplate.contact = data;
          _context24.next = 23;
          break;
        case 22:
          getEmailTemplate.contact = _result;
        case 23:
          delete getEmailTemplate.sendTo;
          if (getEmailTemplate.emailContent) {
            getEmailTemplate.emailContent = he.decode(getEmailTemplate.emailContent);
          }
          _context24.next = 28;
          break;
        case 27:
          getEmailTemplate = emailTemplate;
        case 28:
          placementId = getEmailTemplate.lenderPlacement;
          dealId = emailTemplate.deal._id;
          ccList = getEmailTemplate.ccList.map(function (item) {
            return item;
          });
          bccList = getEmailTemplate.bccList.map(function (item) {
            return item;
          });
          headers = [{
            Value: "".concat(placementId)
          }];
          sendToIsEmpty = getEmailTemplate.contact.map(function (item) {
            return item.sendTo;
          });
          _lodash["default"].templateSettings.interpolate = /{{([\s\S]+?)}}/g;
          if (!(sendToIsEmpty.length === 0)) {
            _context24.next = 37;
            break;
          }
          return _context24.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: 'No email addresses to send to.'
          }));
        case 37:
          dealDetail = emailTemplate.deal;
          if (!sendToAdvisor) {
            _context24.next = 44;
            break;
          }
          isAdvisor = _lodash["default"].template(getEmailTemplate.emailContent)({
            // userFirstName: req.user.firstName,
            // totalLoanAmount: getEmailTemplate.totalLoanAmount,
            // advisorName: req.user.firstName,
            // advisorEmail: req.user.email,
            sponsorName: emailTemplate.advisorName || '[Sponsor Name]',
            amount: (parseFloat((_String = String(dealDetail.loanAmount)) === null || _String === void 0 ? void 0 : _String.replaceAll(/[$,]/g, '')) || 0) / 1000000 || '[amount]',
            loanPurpose: dealDetail.loanPurpose || '[loan purpose]',
            dealName: dealDetail.dealName || '[deal name]',
            unitCount: dealDetail.unitCount || '[unitCount]',
            propertyType: dealDetail.assetType || '[propertyType]',
            toBeBuilt: '[to-be-built]',
            address: dealDetail.address || '[address]',
            city: dealDetail.city || '[city]',
            state: (0, _common.getStateFullName)(dealDetail.state) || '[state]',
            purchasePrice: (parseFloat((_String2 = String((_$find = _lodash["default"].find(dealDetail.loanInformation, function (data) {
              return (data === null || data === void 0 ? void 0 : data.key) === 'purchasePrice';
            })) === null || _$find === void 0 ? void 0 : _$find.value)) === null || _String2 === void 0 ? void 0 : _String2.replaceAll(/[$,]/g, '')) || 0) / 1000000 || '[x.xx purchasePrice]',
            inPlaceNOI: (parseFloat((_String3 = String((_$find2 = _lodash["default"].find(dealDetail.loanInformation, function (data) {
              return (data === null || data === void 0 ? void 0 : data.key) === 'inPlaceNOI';
            })) === null || _$find2 === void 0 ? void 0 : _$find2.value)) === null || _String3 === void 0 ? void 0 : _String3.replaceAll(/[$,]/g, '')) || 0) / 1000000 || '[x.xx]',
            stabilizedNOI: (parseFloat((_String4 = String((_$find3 = _lodash["default"].find(dealDetail.loanInformation, function (data) {
              return (data === null || data === void 0 ? void 0 : data.key) === 'stabilizedNOI';
            })) === null || _$find3 === void 0 ? void 0 : _$find3.value)) === null || _String4 === void 0 ? void 0 : _String4.replaceAll(/[$,]/g, '')) || 0) / 1000000 || '[x.xx]',
            passLink: '',
            dealSummaryLink: ''
          });
          emailAttachments = getEmailTemplate.emailAttachments.map(function (item) {
            return {
              fileName: item.fileName,
              path: item.url ? item.url : item.path,
              fileType: item.fileType
            };
          });
          _context24.next = 43;
          return _services.emailService.sendEmail(_objectSpread(_objectSpread({
            to: req.user.email,
            subject: "TEST - ".concat(getEmailTemplate.subject)
          }, emailPresentingPostmark && {
            from: req.user.email
          }), {}, {
            text: isAdvisor,
            attachments: emailAttachments,
            isHtml: true,
            headers: headers
          }));
        case 43:
          return _context24.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: 'Test-mail sent..'
          }));
        case 44:
          getText = function getText(passLink, dealSummaryLink) {
            var _String5, _String6, _$find4, _String7, _$find5, _String8, _$find6;
            // const getText = (userFirstName, totalLoanAmount, advisorName, advisorEmail) => {
            var data = _lodash["default"].template(getEmailTemplate.emailContent)({
              // userFirstName,
              // totalLoanAmount,
              // advisorName,
              // advisorEmail,
              sponsorName: emailTemplate.advisorName || '[Sponsor Name]',
              amount: (parseFloat((_String5 = String(dealDetail === null || dealDetail === void 0 ? void 0 : dealDetail.loanAmount)) === null || _String5 === void 0 ? void 0 : _String5.replaceAll(/[$,]/g, '')) || 0) / 1000000 || '[x.xx]',
              loanPurpose: (dealDetail === null || dealDetail === void 0 ? void 0 : dealDetail.loanPurpose) || '[loan purpose]',
              dealName: (dealDetail === null || dealDetail === void 0 ? void 0 : dealDetail.dealName) || '[deal name]',
              unitCount: (dealDetail === null || dealDetail === void 0 ? void 0 : dealDetail.unitCount) || '[unitCount]',
              propertyType: (dealDetail === null || dealDetail === void 0 ? void 0 : dealDetail.assetType) || '[propertyType]',
              toBeBuilt: '[to-be-built]',
              address: (dealDetail === null || dealDetail === void 0 ? void 0 : dealDetail.address) || '[address]',
              city: (dealDetail === null || dealDetail === void 0 ? void 0 : dealDetail.city) || '[city]',
              state: (0, _common.getStateFullName)(dealDetail.state) || '[state]',
              purchasePrice: (parseFloat( // eslint-disable-next-line no-shadow
              (_String6 = String((_$find4 = _lodash["default"].find(dealDetail === null || dealDetail === void 0 ? void 0 : dealDetail.loanInformation, function (data) {
                return (data === null || data === void 0 ? void 0 : data.key) === 'purchasePrice';
              })) === null || _$find4 === void 0 ? void 0 : _$find4.value)) === null || _String6 === void 0 ? void 0 : _String6.replaceAll(/[$,]/g, '')) || 0) / 1000000 || '[x.xx]',
              inPlaceNOI: (parseFloat( // eslint-disable-next-line no-shadow
              (_String7 = String((_$find5 = _lodash["default"].find(dealDetail === null || dealDetail === void 0 ? void 0 : dealDetail.loanInformation, function (data) {
                return (data === null || data === void 0 ? void 0 : data.key) === 'inPlaceNOI';
              })) === null || _$find5 === void 0 ? void 0 : _$find5.value)) === null || _String7 === void 0 ? void 0 : _String7.replaceAll(/[$,]/g, '')) || 0) / 1000000 || '[x.xx]',
              stabilizedNOI: (parseFloat( // eslint-disable-next-line no-shadow
              (_String8 = String((_$find6 = _lodash["default"].find(dealDetail === null || dealDetail === void 0 ? void 0 : dealDetail.loanInformation, function (data) {
                return (data === null || data === void 0 ? void 0 : data.key) === 'stabilizedNOI';
              })) === null || _$find6 === void 0 ? void 0 : _$find6.value)) === null || _String8 === void 0 ? void 0 : _String8.replaceAll(/[$,]/g, '')) || 0) / 1000000 || '[x.xx]',
              dealSummaryLink: "<a href=".concat(dealSummaryLink, ">Deal Summary</a>"),
              passLink: "<a href=".concat(passLink, ">Pass</a>")
            });
            return data;
          }; // todo : make function for this one, and make synchronize so we can handle error coming from that.
          _context24.next = 47;
          return Promise.allSettled(getEmailTemplate.contact.map( /*#__PURE__*/function () {
            var _ref26 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee23(item, index) {
              var frontEndUrl, user, isLenderContact, userBody, tokens, dealSummaryLink, passLink;
              return _regeneratorRuntime().wrap(function _callee23$(_context23) {
                while (1) switch (_context23.prev = _context23.next) {
                  case 0:
                    frontEndUrl = _config["default"].front.url || 'http://54.196.81.18';
                    _context23.next = 3;
                    return _services.userService.getOne({
                      email: item.sendTo,
                      role: _enum["default"].EnumRoleOfUser.LENDER
                    });
                  case 3:
                    user = _context23.sent;
                    if (user) {
                      _context23.next = 12;
                      break;
                    }
                    _context23.next = 7;
                    return _services.lenderContactService.getOne({
                      email: item.sendTo
                    }, {
                      populate: 'lenderInstitute'
                    });
                  case 7:
                    isLenderContact = _context23.sent;
                    // create user if user has not register
                    userBody = {
                      firstName: isLenderContact.firstName,
                      companyName: isLenderContact.lenderInstitute.lenderNameVisible,
                      lastName: isLenderContact.lastName,
                      role: _enum["default"].EnumRoleOfUser.LENDER,
                      enforcePassword: true,
                      email: item.sendTo,
                      emailVerified: true,
                      password: Math.random().toString(36).slice(-10)
                    };
                    _context23.next = 11;
                    return _services.userService.createUser(userBody);
                  case 11:
                    user = _context23.sent;
                  case 12:
                    _context23.next = 14;
                    return _services.tokenService.generateAuthTokens(user);
                  case 14:
                    tokens = _context23.sent;
                    dealSummaryLink = "".concat(frontEndUrl, "/dealDetail/").concat(dealId, "?tab=dealSummary&token=").concat(tokens.access.token);
                    passLink = "".concat(frontEndUrl, "/dealDetail/").concat(dealId, "?tab=dealSummary&pass=true&token=").concat(tokens.access.token);
                    return _context23.abrupt("return", _services.emailService.sendEmail(_objectSpread(_objectSpread({
                      to: item.sendTo
                    }, index === 0 && {
                      cc: ccList,
                      bcc: bccList
                    }), {}, {
                      subject: getEmailTemplate.subject,
                      // ...(emailPresentingPostmark && { from: req.user.sendEmailFrom }),
                      // we will need to send email from this email if not present than it will take default email we have that condition in the sendEmail function
                      from: req.user.sendEmailFrom,
                      // text: getText(item.name, getEmailTemplate.totalLoanAmount, getEmailTemplate.advisorName, getEmailTemplate.from, passLink, dealSummaryLink),
                      text: getText(passLink, dealSummaryLink),
                      // eslint-disable-next-line no-shadow
                      attachments: getEmailTemplate.emailAttachments.map(function (item) {
                        return {
                          fileName: item.fileName,
                          path: item.url ? item.url : item.path,
                          fileType: item.fileType
                        };
                      }),
                      isHtml: true,
                      headers: headers,
                      isSendDeal: true
                    })));
                  case 18:
                  case "end":
                    return _context23.stop();
                }
              }, _callee23);
            }));
            return function (_x39, _x40) {
              return _ref26.apply(this, arguments);
            };
          }()));
        case 47:
          _context24.next = 49;
          return _models.LenderPlacement.findOne({
            _id: placementId
          });
        case 49:
          result = _context24.sent;
          if (!(result.isEmailSent === _enum.EnumOfEmailStatus.SEND_DEAL)) {
            _context24.next = 56;
            break;
          }
          _stage4 = _enum.EnumStageOfLenderPlacement.SENT;
          _context24.next = 54;
          return _models.LenderPlacement.findByIdAndUpdate(placementId, {
            followOnDate: new Date(Date.now() + _config["default"].followUpTimeForSendEmail),
            isEmailSent: _enum.EnumOfEmailStatus.EMAIL_SENT,
            isEmailSentFirstTime: true,
            stage: _stage4,
            stageEnumWiseNumber: (0, _enumStageOfLenderPlacement.stageOfLenderPlacementWithNumber)(_stage4),
            nextStep: _enum["default"].EnumNextStepOfLenderPlacement[_stage4],
            timeLine: (0, _common.manageLenderPlacementStageTimeline)(result.stage, _stage4, result.timeLine)
          });
        case 54:
          _context24.next = 58;
          break;
        case 56:
          _context24.next = 58;
          return _models.LenderPlacement.findByIdAndUpdate(placementId, {
            followOnDate: new Date(Date.now() + _config["default"].followUpTimeForSendEmail),
            isEmailSent: _enum.EnumOfEmailStatus.EMAIL_SENT,
            isEmailSentFirstTime: false
          });
        case 58:
          stage = _enum.EnumStageOfDeal.OUT_IN_MARKET;
          _context24.t0 = _models.Deal;
          _context24.t1 = dealId;
          _context24.t2 = stage;
          _context24.t3 = (0, _enumStageForDeal.stageOfDealWithNumber)(stage);
          _context24.t4 = {
            timeLine: {
              stage: stage,
              updatedAt: new Date()
            }
          };
          _context24.next = 66;
          return (0, _detailsInDeal.detailsInDeal)(stage, dealId);
        case 66:
          _context24.t5 = _context24.sent;
          _context24.t6 = {
            stage: _context24.t2,
            orderOfStage: _context24.t3,
            $push: _context24.t4,
            details: _context24.t5
          };
          _context24.next = 70;
          return _context24.t0.findByIdAndUpdate.call(_context24.t0, _context24.t1, _context24.t6);
        case 70:
          _context24.next = 72;
          return _models.Deal.findById(dealId);
        case 72:
          deal = _context24.sent;
          // commenting user in case we need it again in future
          createActivityLogBody = {
            createdBy: req.user._id,
            updatedBy: req.user._id,
            update: "".concat(deal.dealName, " was sent out to lenders"),
            deal: dealId,
            type: _enum.EnumOfActivityType.ACTIVITY
            // user: config.activitySystemUser || 'system',
          };
          if (!createActivityLogBody.update) {
            _context24.next = 77;
            break;
          }
          _context24.next = 77;
          return _services.activityLogService.createActivityLog(createActivityLogBody);
        case 77:
          return _context24.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: 'Email sent....'
          }));
        case 78:
        case "end":
          return _context24.stop();
      }
    }, _callee24);
  }));
  return function (_x36, _x37) {
    return _ref24.apply(this, arguments);
  };
}());
/**
 * @deprecated
 * This function is no longer in use instead we are using '/sendDeal/v3' we added the functionality of sending deal to multiple lenders.
 */
var sendDealV2 = exports.sendDealV2 = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref27 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee27(req, res) {
    var deals, frontEndUrl, admin, isFollowUp, advisorEmail, promises;
    return _regeneratorRuntime().wrap(function _callee27$(_context27) {
      while (1) switch (_context27.prev = _context27.next) {
        case 0:
          deals = req.body.deals;
          frontEndUrl = _config["default"].front.url || 'http://54.196.81.18';
          admin = req.user;
          isFollowUp = req.query.isFollowUp;
          advisorEmail = admin.email;
          _context27.next = 7;
          return deals.map( /*#__PURE__*/function () {
            var _ref28 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee26(body) {
              var lenderInstitute, deal, lenderPlacement, followUpContent, lender, filterToFindContact, filterToFindPlacement, filterToFindDeal, lenderContact, emailBodyValues, totalLoanAmount, dealSummaryDocs, documentsText, docIds, lendersDetail, contact, staticEmailTemplateData, emailTemplate, filter, getEmailTemplate, placementId, ccList, bccList, headers, result, _stage5, stage, dealData, createActivityLogBody;
              return _regeneratorRuntime().wrap(function _callee26$(_context26) {
                while (1) switch (_context26.prev = _context26.next) {
                  case 0:
                    lenderInstitute = body.lenderInstitute, deal = body.deal, lenderPlacement = body.lenderPlacement, followUpContent = body.followUpContent, lender = body.lender;
                    filterToFindContact = {
                      lenderInstitute: lenderInstitute
                    };
                    filterToFindPlacement = {
                      lendingInstitution: lenderInstitute,
                      deal: deal
                    };
                    filterToFindDeal = {
                      deal: deal
                    };
                    _context26.next = 6;
                    return _services.lenderPlacementService.sendDeal(filterToFindContact, filterToFindPlacement, filterToFindDeal);
                  case 6:
                    lenderContact = _context26.sent;
                    emailBodyValues = {
                      dealSummaryLink: "".concat(frontEndUrl, "/dealDetail/").concat(deal, "?tab=presentation"),
                      // TODO: conform & remove from here if not needed
                      passLink: "".concat(frontEndUrl, "/dealDetail/").concat(deal, "?tab=dealSummary&pass=true"),
                      advisorName: admin.firstName,
                      documents: [],
                      executiveSummary: ''
                    };
                    if (lenderContact.lenderPlacement.lendingInstitution) {
                      emailBodyValues.lenderName = lenderContact.lenderPlacement.lendingInstitution.lenderNameVisible;
                    }
                    totalLoanAmount = 0;
                    if (lenderContact.lenderPlacement && lenderContact.lenderPlacement.deal) {
                      emailBodyValues.dealName = lenderContact.lenderPlacement.deal.dealName;
                      // here loanAmount is coming as $100,000 (string) so we are converting that to number
                      totalLoanAmount = lenderContact.lenderPlacement.deal.loanAmount.replace(/[$,]/g, '') * 1;
                      // totalLoanAmount is converted into millions so if 1000000 then it should be 1
                      totalLoanAmount /= 1000000;
                      totalLoanAmount.toFixed(2);
                      emailBodyValues.loanAmount = totalLoanAmount;
                    }
                    dealSummaryDocs = [];
                    if (lenderContact.lenderPlacement.deal.dealSummary && !isFollowUp) {
                      if (lenderContact.lenderPlacement.deal.dealSummary.documents && lenderContact.lenderPlacement.deal.dealSummary.documents.length) {
                        documentsText = 'Please see attached for deal materials';
                        emailBodyValues.documentsText = documentsText;
                        dealSummaryDocs.push.apply(dealSummaryDocs, _toConsumableArray(lenderContact.lenderPlacement.deal.dealSummary.documents));
                      }
                      if (lenderContact.lenderPlacement.deal.dealSummary.executiveSummary && !isFollowUp) {
                        emailBodyValues.executiveSummary = lenderContact.lenderPlacement.deal.dealSummary.executiveSummary;
                      }
                    }
                    docIds = lenderContact.docIds;
                    lendersDetail = lenderContact.lenderContact.filter(function (lc) {
                      return lc._id.toString() === lender;
                    });
                    contact = lendersDetail.map(function (lc) {
                      return {
                        sendTo: lc.email,
                        name: lc.firstName,
                        _id: lc._id
                      };
                    });
                    _lodash["default"].templateSettings.interpolate = /{{([\s\S]+?)}}/g;
                    staticEmailTemplateData = isFollowUp ? (0, _emailContent.followUpEmailContent)() : (0, _emailContent.borrowerSendDealEmailContent)();
                    filter = isFollowUp ? {
                      lenderPlacement: lenderPlacement,
                      templateName: {
                        $in: ["advisorFollowUpTemplate - ".concat(emailBodyValues.lenderName), "borrowerFollowUpTemplate - ".concat(emailBodyValues.lenderName)]
                      }
                    } : {
                      lenderPlacement: lenderPlacement,
                      templateName: {
                        $in: ["advisorSendDealTemplate - ".concat(emailBodyValues.lenderName), "borrowerSendDealTemplate - ".concat(emailBodyValues.lenderName)]
                      }
                    };
                    _context26.next = 21;
                    return _services.emailTemplateService.getOne(filter, {
                      populate: 'deal'
                    });
                  case 21:
                    emailTemplate = _context26.sent;
                    if (emailTemplate) {
                      _context26.next = 26;
                      break;
                    }
                    _context26.next = 25;
                    return _models.EmailTemplate.create({
                      from: advisorEmail,
                      advisorName: admin.firstName,
                      contact: contact,
                      subject: "".concat(emailBodyValues.dealName, "-$").concat(emailBodyValues.loanAmount, "m Financing Request"),
                      dealDocument: isFollowUp ? [] : docIds,
                      emailContent: staticEmailTemplateData,
                      lenderPlacement: lenderPlacement,
                      deal: deal,
                      emailAttachments: [],
                      isFirstTime: !isFollowUp,
                      isEmailSent: false,
                      totalLoanAmount: totalLoanAmount,
                      templateName: isFollowUp ? "advisorFollowUpTemplate - ".concat(emailBodyValues.lenderName) : "advisorSendDealTemplate - ".concat(emailBodyValues.lenderName)
                    });
                  case 25:
                    emailTemplate = _context26.sent;
                  case 26:
                    getEmailTemplate = emailTemplate;
                    placementId = getEmailTemplate.lenderPlacement;
                    ccList = getEmailTemplate.ccList.map(function (item) {
                      return item;
                    });
                    bccList = getEmailTemplate.bccList.map(function (item) {
                      return item;
                    });
                    headers = [{
                      Value: "".concat(placementId)
                    }];
                    _context26.next = 33;
                    return _services.lenderPlacementService.getOne({
                      _id: placementId
                    });
                  case 33:
                    result = _context26.sent;
                    // for sending email in the thread we need to pass this header
                    if (isFollowUp) {
                      headers.push({
                        Name: 'In-Reply-To',
                        Value: result.postmarkMessageId[0]
                      });
                    }

                    // todo : make function for this one, and make synchronize so we can handle error coming from that.
                    // await Promise.allSettled(
                    _context26.next = 37;
                    return (0, _common.asyncForEach)(getEmailTemplate.contact, /*#__PURE__*/function () {
                      var _ref29 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee25(item) {
                        var dealSummaryLink, passLink, user, tokens;
                        return _regeneratorRuntime().wrap(function _callee25$(_context25) {
                          while (1) switch (_context25.prev = _context25.next) {
                            case 0:
                              dealSummaryLink = "".concat(frontEndUrl, "/dealDetail/").concat(deal, "?tab=dealSummary");
                              passLink = "".concat(frontEndUrl, "/dealDetail/").concat(deal, "?tab=dealSummary&pass=true");
                              _context25.next = 4;
                              return _services.userService.getOne({
                                email: item.sendTo,
                                role: _enum["default"].EnumRoleOfUser.LENDER
                              });
                            case 4:
                              user = _context25.sent;
                              _context25.next = 7;
                              return _services.tokenService.generateAuthTokens(user);
                            case 7:
                              tokens = _context25.sent;
                              dealSummaryLink = "".concat(frontEndUrl, "/dealDetail/").concat(deal, "?tab=dealSummary&token=").concat(tokens.access.token);
                              passLink = "".concat(frontEndUrl, "/dealDetail/").concat(deal, "?tab=dealSummary&pass=true&token=").concat(tokens.access.token);
                              if (user) {
                                _context25.next = 15;
                                break;
                              }
                              dealSummaryLink = "".concat(frontEndUrl, "/register?isRedirectedFromSendDeal=true&id=").concat(item._id);
                              passLink = "".concat(frontEndUrl, "/register?isRedirectedFromSendDeal=true&id=").concat(item._id);
                              _context25.next = 15;
                              return _services.invitationService.createInvitation({
                                deal: deal,
                                invitedBy: admin._id,
                                inviteeEmail: item.sendTo,
                                role: _enum["default"].EnumRoleOfUser.LENDER
                              });
                            case 15:
                              return _context25.abrupt("return", _services.emailService.sendEmail({
                                to: item.sendTo,
                                cc: ccList,
                                bcc: bccList,
                                // for sending email in the thread we need to change subject like this
                                subject: isFollowUp ? "RE: ".concat(getEmailTemplate.subject) : getEmailTemplate.subject,
                                // ...(emailPresentingPostmark && { from: req.user.email }),
                                // we will need to send email from this email if not present than it will take default email we have that condition in the sendEmail function
                                from: req.user.sendEmailFrom,
                                text: (0, _common.getTextFromTemplate)({
                                  lenderName: item.name,
                                  executiveSummary: emailBodyValues.executiveSummary,
                                  documents: emailBodyValues.documentsText,
                                  // dealSummaryLink: emailBodyValues.dealSummaryLink,
                                  dealSummaryLink: dealSummaryLink,
                                  // passLink: emailBodyValues.passLink,
                                  passLink: passLink,
                                  advisorName: emailBodyValues.advisorName,
                                  emailTemplate: getEmailTemplate.emailContent,
                                  followUpContent: followUpContent || "following up, did you have any feedback on this deal."
                                }),
                                // eslint-disable-next-line no-shadow
                                attachments: dealSummaryDocs.map(function (item) {
                                  return {
                                    fileName: item.fileName,
                                    path: item.url,
                                    fileType: item.url.split('.').pop()
                                  };
                                }),
                                isHtml: true,
                                headers: headers,
                                isSendDeal: true,
                                replyTo: req.user.email
                              }));
                            case 16:
                            case "end":
                              return _context25.stop();
                          }
                        }, _callee25);
                      }));
                      return function (_x44) {
                        return _ref29.apply(this, arguments);
                      };
                    }());
                  case 37:
                    if (!(result.isEmailSent === _enum["default"].EnumOfEmailStatus.SEND_DEAL)) {
                      _context26.next = 43;
                      break;
                    }
                    _stage5 = _enum["default"].EnumStageOfLenderPlacement.SENT;
                    _context26.next = 41;
                    return _services.lenderPlacementService.updateLenderPlacement({
                      _id: placementId
                    }, {
                      followOnDate: new Date(Date.now() + _config["default"].followUpTimeForSendEmail),
                      isEmailSent: _enum.EnumOfEmailStatus.EMAIL_SENT,
                      isEmailSentFirstTime: true,
                      stage: _stage5,
                      stageEnumWiseNumber: (0, _enumStageOfLenderPlacement.stageOfLenderPlacementWithNumber)(_stage5),
                      nextStep: _enum["default"].EnumNextStepOfLenderPlacement[_stage5],
                      timeLine: (0, _common.manageLenderPlacementStageTimeline)(result.stage, _stage5, result.timeLine)
                    });
                  case 41:
                    _context26.next = 45;
                    break;
                  case 43:
                    _context26.next = 45;
                    return _services.lenderPlacementService.updateLenderPlacement({
                      _id: placementId
                    }, {
                      followOnDate: new Date(Date.now() + _config["default"].followUpTimeForSendEmail),
                      isEmailSent: _enum["default"].EnumOfEmailStatus.EMAIL_SENT,
                      isEmailSentFirstTime: false
                    });
                  case 45:
                    stage = _enum["default"].EnumStageOfDeal.OUT_IN_MARKET;
                    _context26.t0 = _services.dealService;
                    _context26.t1 = {
                      _id: deal
                    };
                    _context26.t2 = stage;
                    _context26.t3 = (0, _enumStageForDeal.stageOfDealWithNumber)(stage);
                    _context26.t4 = (0, _common.manageDealStageTimeline)(lenderContact.lenderPlacement.deal.stage, stage, lenderContact.lenderPlacement.deal.timeLine);
                    _context26.t5 = _enum["default"].EnumNextStepOfLenderPlacement[stage];
                    _context26.next = 54;
                    return (0, _detailsInDeal.detailsInDeal)(stage, deal);
                  case 54:
                    _context26.t6 = _context26.sent;
                    _context26.t7 = {
                      stage: _context26.t2,
                      orderOfStage: _context26.t3,
                      timeLine: _context26.t4,
                      nextStep: _context26.t5,
                      details: _context26.t6
                    };
                    _context26.t8 = {
                      "new": true
                    };
                    _context26.next = 59;
                    return _context26.t0.updateDeal.call(_context26.t0, _context26.t1, _context26.t7, _context26.t8);
                  case 59:
                    dealData = _context26.sent;
                    // commenting user in case we need it again in future
                    createActivityLogBody = {
                      createdBy: req.user._id,
                      updatedBy: req.user._id,
                      update: "".concat(dealData.dealName, " was sent out to lenders"),
                      deal: deal,
                      type: _enum["default"].EnumOfActivityType.ACTIVITY
                      // user: config.activitySystemUser || 'system',
                    };
                    if (!createActivityLogBody.update) {
                      _context26.next = 64;
                      break;
                    }
                    _context26.next = 64;
                    return _services.activityLogService.createActivityLog(createActivityLogBody);
                  case 64:
                  case "end":
                    return _context26.stop();
                }
              }, _callee26);
            }));
            return function (_x43) {
              return _ref28.apply(this, arguments);
            };
          }());
        case 7:
          promises = _context27.sent;
          _context27.next = 10;
          return Promise.all(promises);
        case 10:
          return _context27.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: 'Email sent....'
          }));
        case 11:
        case "end":
          return _context27.stop();
      }
    }, _callee27);
  }));
  return function (_x41, _x42) {
    return _ref27.apply(this, arguments);
  };
}());
var sendMessage = exports.sendMessage = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref30 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee28(req, res) {
    var _response, _response2;
    var lenderPlacementId, advisor, body, _body$to, to, _body$cc, cc, filter, options, lenderPlacement, emailAttachments, headers, subject, response, postmarkMessageId, recipientEmails, recipients;
    return _regeneratorRuntime().wrap(function _callee28$(_context28) {
      while (1) switch (_context28.prev = _context28.next) {
        case 0:
          lenderPlacementId = req.params.lenderPlacementId;
          advisor = req.user;
          body = req.body; // a function call that decodes HTML-encoded text. It's commonly used to decode HTML entities like &lt; (represents <), &gt; (represents >), &amp; (represents &), and so on.
          body.message = body.message && he.decode(body.message);
          _body$to = body.to, to = _body$to === void 0 ? [] : _body$to, _body$cc = body.cc, cc = _body$cc === void 0 ? [] : _body$cc;
          filter = {
            _id: lenderPlacementId
          }; // also populating sender in the messages array
          // '+messages' will explicitly include the message field along with other fields as in model we have set "select: false"
          options = {
            populate: [{
              path: 'deal',
              populate: {
                path: 'dealSummary'
              }
            }, {
              path: 'lenderContact'
            }, {
              path: 'messages.sender'
            }],
            select: '+messages'
          };
          _context28.next = 9;
          return _services.lenderPlacementService.getOne(filter, options);
        case 9:
          lenderPlacement = _context28.sent;
          emailAttachments = body.documents ? body.documents : [];
          headers = [{
            Value: "".concat(lenderPlacementId)
          },
          // for sending email in the thread we need to pass this header
          {
            Name: 'In-Reply-To',
            Value: lenderPlacement.postmarkMessageId[0]
          }]; // now we are not storing email template in the code
          subject = (0, _common.getEmailSubjectForDeal)(lenderPlacement.deal.dealSummary._doc);
          if (!(_config["default"].application_env !== _enum.EnumOfNodeEnv.SANDBOX)) {
            _context28.next = 17;
            break;
          }
          _context28.next = 16;
          return _services.emailService.sendEmailUsingGmail({
            to: [lenderPlacement.lenderContact.email].concat(_toConsumableArray(to)),
            // for sending email in the thread we need to change subject like this
            subject: "Re: ".concat(subject),
            // ...(emailPresentingPostmark && { from: req.user.email }),
            // we will need to send email from this email if not present than it will take default email we have that condition in the sendEmail function
            from: req.user.sendEmailFrom,
            pass: (0, _encryptDecryptText.decrypt)(req.user.appPassword, _config["default"].encryptionPassword),
            // we want send deal mail, followup mails and other messages as reply so calling common function for it along with message
            text: "".concat(body.message).concat((0, _common.constructEmailContent)({
              lenderPlacement: lenderPlacement,
              sender: req.user.sendEmailFrom
            })),
            attachments: emailAttachments.map(function (item) {
              var path;
              if (_config["default"].aws.enablePrivateAccess) {
                path = item.url ? decodeURI(item.url) : decodeURI(item.path);
              } else {
                path = item.url ? item.url : item.path;
              }
              return {
                fileName: item.fileName,
                path: path,
                fileType: item.fileType
              };
            }),
            isHtml: true,
            // Headers: [{ Name: 'In-Reply-To', Value: 'originalMessageId@example.com' }],
            headers: headers,
            cc: cc,
            // when we reply than it should go to sender also & sender is sendEmailFrom
            replyTo: req.user.sendEmailFrom
          });
        case 16:
          response = _context28.sent;
        case 17:
          // Adding postmark message id in placement while updating lender placement when we send message to the lender
          postmarkMessageId = ((_response = response) === null || _response === void 0 ? void 0 : _response.MessageID) || ((_response2 = response) === null || _response2 === void 0 ? void 0 : _response2.messageId);
          _context28.next = 20;
          return _services.lenderPlacementService.updateLenderPlacement({
            _id: lenderPlacementId
          }, {
            $push: {
              messages: {
                sender: advisor._id,
                updatedAt: new Date(),
                message: body.message,
                documents: body.documents,
                to: to,
                cc: cc
              }
            },
            $addToSet: {
              postmarkMessageId: postmarkMessageId
            }
          });
        case 20:
          if (_config["default"].application_env !== _enum.EnumOfNodeEnv.SANDBOX) {
            recipientEmails = response.accepted;
            recipients = recipientEmails.join(' ,');
            _logger.logger.info("Message successfully sent to ".concat(recipients, " from ").concat(req.user.sendEmailFrom, " when advisor sent message from manage lender page"));
          }
          return _context28.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: 'Message sent...'
          }));
        case 22:
        case "end":
          return _context28.stop();
      }
    }, _callee28);
  }));
  return function (_x45, _x46) {
    return _ref30.apply(this, arguments);
  };
}());
var getMessages = exports.getMessages = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref31 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee29(req, res) {
    var user, lenderPlacementId, filter, options, lenderPlacement;
    return _regeneratorRuntime().wrap(function _callee29$(_context29) {
      while (1) switch (_context29.prev = _context29.next) {
        case 0:
          user = req.user;
          lenderPlacementId = req.params.lenderPlacementId;
          filter = {
            _id: lenderPlacementId
          };
          options = {
            select: {
              messages: 1
            },
            populate: [{
              path: 'messages.sender',
              select: {
                firstName: 1,
                lastName: 1,
                email: 1
              }
            }],
            "new": true
          }; // Removed(commented) below line because we have to add the userId in messageReadBy array to mark as user read this message. so we are using update lenderPlacementService and pass the updated lenderPlacement data in the response.
          // const lenderPlacement = await lenderPlacementService.getOne(filter, options);
          // here updating the message is read by user, adding current userId to messageReadBy array so this message is marked as read by the current logged-in user.
          _context29.next = 6;
          return _services.lenderPlacementService.updateLenderPlacement(filter, {
            $addToSet: {
              'messages.$[].messageReadBy': user._id
            }
          }, options);
        case 6:
          lenderPlacement = _context29.sent;
          return _context29.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: lenderPlacement
          }));
        case 8:
        case "end":
          return _context29.stop();
      }
    }, _callee29);
  }));
  return function (_x47, _x48) {
    return _ref31.apply(this, arguments);
  };
}());
var removeDocument = exports.removeDocument = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref32 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee30(req, res) {
    var _req$params, lenderPlacementId, documentId, query, updates;
    return _regeneratorRuntime().wrap(function _callee30$(_context30) {
      while (1) switch (_context30.prev = _context30.next) {
        case 0:
          _req$params = req.params, lenderPlacementId = _req$params.lenderPlacementId, documentId = _req$params.documentId;
          query = {
            _id: lenderPlacementId
          };
          updates = {
            $pull: {
              'messages.$[].documents': {
                _id: documentId
              } // Remove the document with this _id from the documents array
            }
          };
          _context30.next = 5;
          return _services.lenderPlacementService.updateLenderPlacement(query, updates);
        case 5:
          return _context30.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: 'Document removed.'
          }));
        case 6:
        case "end":
          return _context30.stop();
      }
    }, _callee30);
  }));
  return function (_x49, _x50) {
    return _ref32.apply(this, arguments);
  };
}());