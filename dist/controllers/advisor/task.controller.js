"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.update = exports.removeTaskDocument = exports.remove = exports.paginate = exports.listByDeal = exports.list = exports.get = exports.create = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _services = require("../../services");
var _catchAsync = require("../../utils/catchAsync");
var _fileFieldValidation = _interopRequireDefault(require("../../models/fileFieldValidation.model"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _tempS = _interopRequireDefault(require("../../models/tempS3.model"));
var _common = require("../../utils/common");
var _pick = require("../../utils/pick");
var _ApiError = _interopRequireDefault(require("../../utils/ApiError"));
var _config = _interopRequireDefault(require("../../config/config"));
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
 */ // eslint-disable-next-line no-unused-vars
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
                    fieldValidation = _fileFieldValidation["default"]["".concat(key, "OfTask")];
                    basePath = "users/".concat(user._id, "/task/").concat(body._id, "/").concat(key, "/").concat(_mongoose["default"].Types.ObjectId(), "/");
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
                              newUrlsArray.push(moveFileAndUpdateTempS3({
                                url: ele,
                                newFilePath: basePath + filePath
                              }));
                            case 2:
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
var get = exports.get = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var taskId, filter, options, task;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          taskId = req.params.taskId;
          filter = {
            _id: taskId
          }; // populating user's first name as had to display name of user who has given the answer
          options = {
            populate: [{
              path: 'askingPartyInstitute'
            }, {
              path: 'askingPartyAdvisor'
            }, {
              path: 'taskAnswer.answeredBy',
              select: ['firstName']
            }]
          };
          _context5.next = 5;
          return _services.taskService.getOne(filter, options);
        case 5:
          task = _context5.sent;
          return _context5.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: task
          }));
        case 7:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x5, _x6) {
    return _ref7.apply(this, arguments);
  };
}());
var list = exports.list = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var filter, options, task;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          filter = {};
          options = {};
          _context6.next = 4;
          return _services.taskService.getTaskList(filter, options);
        case 4:
          task = _context6.sent;
          return _context6.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: task
          }));
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x7, _x8) {
    return _ref8.apply(this, arguments);
  };
}());
var paginate = exports.paginate = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    var query, sortingObj, sortObj, sort, filter, options, task;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          query = req.query;
          sortingObj = (0, _pick.pick)(query, ['sort', 'order']); // Extracting the 'sort' and 'order' fields from the query
          // Check if 'sort' field is an array
          if (Array.isArray(sortingObj.sort)) {
            sort = {};
            sortingObj.sort.forEach(function (field) {
              sort[field] = sortingObj.order; // Assuming all fields should be sorted in ascending order (1)
            });
            sortObj = sort; // Creating the sort object
          } else {
            sortObj = _defineProperty({}, sortingObj.sort, sortingObj.order);
          }
          filter = {
            deal: req.params.dealId
          };
          options = _objectSpread(_objectSpread({}, (0, _pick.pick)(query, ['limit', 'page'])), {}, {
            populate: [{
              path: 'user'
            }, {
              path: 'askingPartyInstitute'
            }, {
              path: 'askingPartyAdvisor'
            }]
          });
          if (sortingObj.sort) {
            options.sort = sortObj; // Setting the sort options in the options object
            // options.collation = { locale: 'en', caseLevel: false }; // Case-insensitive sorting
          }
          if (!(Array.isArray(sortingObj.sort) && sortingObj.sort.includes('askingPartyInstitute.lenderNameVisible'))) {
            _context7.next = 12;
            break;
          }
          _context7.next = 9;
          return _services.taskService.getTaskListWithPaginationBasedOnAskingPary(filter, options, sortingObj.order);
        case 9:
          task = _context7.sent;
          _context7.next = 16;
          break;
        case 12:
          _context7.next = 14;
          return _services.taskService.getTaskListWithPagination(filter, options);
        case 14:
          task = _context7.sent;
          // Call the function to get task list with pagination
          task.results = task.results.map(function (taskObject) {
            return _objectSpread({
              createdAt: taskObject.createdAt
            }, taskObject.toJSON());
          });
        case 16:
          return _context7.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: task
          }));
        case 17:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x9, _x10) {
    return _ref9.apply(this, arguments);
  };
}());
var listByDeal = exports.listByDeal = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var query, sortingObj, sortObj, sort, filter, lenderPlacement, options, task;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          query = req.query;
          sortingObj = (0, _pick.pick)(query, ['sort', 'order']); // Extracting the 'sort' and 'order' fields from the query
          // Check if 'sort' field is an array
          if (Array.isArray(sortingObj.sort)) {
            sort = {};
            sortingObj.sort.forEach(function (field) {
              sort[field] = sortingObj.order; // Assuming all fields should be sorted in ascending order (1)
            });
            sortObj = sort; // Creating the sort object
          } else {
            sortObj = _defineProperty({}, sortingObj.sort, sortingObj.order);
          }
          filter = {
            deal: req.params.dealId
          };
          if (!query.lenderPlacement) {
            _context8.next = 9;
            break;
          }
          _context8.next = 7;
          return _services.lenderPlacementService.getLenderPlacementById(query.lenderPlacement);
        case 7:
          lenderPlacement = _context8.sent;
          if (lenderPlacement) {
            filter.askingPartyInstitute = lenderPlacement.lendingInstitution._id;
          }
        case 9:
          options = _objectSpread(_objectSpread({}, (0, _pick.pick)(query, ['limit', 'page'])), {}, {
            // populating user's first name as had to display name of user who has given the answer
            populate: [{
              path: 'user'
            }, {
              path: 'askingPartyInstitute'
            }, {
              path: 'askingPartyAdvisor'
            }]
          });
          if (sortingObj.sort) {
            options.sort = sortObj; // Setting the sort options in the options object
            // options.collation = { locale: 'en', caseLevel: false }; // Case-insensitive sorting
          }
          _context8.next = 13;
          return _services.taskService.getTaskList(filter, options);
        case 13:
          task = _context8.sent;
          // Call the function to get task list with pagination
          task = task.map(function (taskObject) {
            return _objectSpread({
              createdAt: taskObject.createdAt
            }, taskObject.toJSON());
          });
          return _context8.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: task
          }));
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x11, _x12) {
    return _ref10.apply(this, arguments);
  };
}());
var create = exports.create = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    var body, taskDocuments, user, moveFileObj, options, fileName, taskResult, uploadedFileUrls, uploadedFileUrl;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          body = req.body;
          taskDocuments = body.taskDocuments;
          body.createdBy = req.user._id;
          body.updatedBy = req.user._id;
          body.user = req.user.id;
          user = req.user;
          moveFileObj = _objectSpread({}, body.taskDocuments && {
            taskDocuments: body.taskDocuments.map(function (item) {
              return item.url;
            })
          });
          body._id = _mongoose["default"].Types.ObjectId();
          _context9.next = 10;
          return moveFiles({
            body: body,
            user: user,
            moveFileObj: moveFileObj
          });
        case 10:
          options = {};
          if (body.taskDocuments) {
            fileName = taskDocuments.map(function (item) {
              return item.fileName;
            });
            body.taskDocuments = body.taskDocuments.map(function (item, index) {
              return {
                url: (0, _common.encodeUrl)(item),
                fileName: fileName[index]
              };
            });
          }
          _context9.next = 14;
          return _services.taskService.createTask(body, options);
        case 14:
          taskResult = _context9.sent;
          if (!taskResult) {
            _context9.next = 21;
            break;
          }
          uploadedFileUrls = [];
          uploadedFileUrls.push.apply(uploadedFileUrls, _toConsumableArray(taskResult.taskDocuments));
          uploadedFileUrl = uploadedFileUrls.map(function (data) {
            return data.url;
          });
          _context9.next = 21;
          return _tempS["default"].updateMany({
            url: {
              $in: uploadedFileUrl
            }
          }, {
            active: true
          });
        case 21:
          return _context9.abrupt("return", res.status(_httpStatus["default"].CREATED).send({
            results: taskResult
          }));
        case 22:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x13, _x14) {
    return _ref11.apply(this, arguments);
  };
}());
var update = exports.update = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var body, taskDocuments, taskId, user, moveFileObj, filter, fileName, options, taskResult, uploadedFileUrls, uploadedFileUrl;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          body = req.body;
          taskDocuments = body.taskDocuments;
          body.updatedBy = req.user;
          taskId = req.params.taskId;
          user = req.user;
          moveFileObj = _objectSpread({}, body.taskDocuments && {
            taskDocuments: body.taskDocuments.map(function (item) {
              return item.url;
            })
          });
          body._id = taskId;
          _context10.next = 9;
          return moveFiles({
            body: body,
            user: user,
            moveFileObj: moveFileObj
          });
        case 9:
          filter = {
            _id: taskId
          }; // added this condition because it was adding null values in db when we were not uploading any task document as it is not required field.
          // before we use to push all the data in the array but instead of integrating the delete api for deleting the documents, we are directly passing the documents in the body while updating the response
          if (body.taskDocuments) {
            fileName = taskDocuments.map(function (item) {
              return item.fileName;
            });
            body.taskDocuments = body.taskDocuments.map(function (item, index) {
              return {
                url: (0, _common.encodeUrl)(item),
                fileName: fileName[index]
              };
            });
          }
          // populating user's first name as had to display name of user who has given the answer
          options = {
            "new": true,
            populate: {
              path: 'taskAnswer.answeredBy',
              select: ['firstName']
            }
          };
          if (body.askingPartyInstitute) {
            body.$unset = {
              askingPartyAdvisor: ''
            };
          } else if (body.askingPartyAdvisor) {
            body.$unset = {
              askingPartyInstitute: ''
            };
          }
          if (body.taskAnswer === null) {
            body.$unset = {
              taskAnswer: ''
            };
            delete body.taskAnswer;
          }
          if (body.taskAnswer && body.taskAnswer.length) {
            body.taskAnswer.forEach(function (answer) {
              if (!answer.answeredBy) {
                Object.assign(answer, {
                  answeredBy: user._id
                }); // passing user id instead of name
              }
            });
          }
          _context10.next = 17;
          return _services.taskService.updateTask(filter, body, options);
        case 17:
          taskResult = _context10.sent;
          if (!taskResult) {
            _context10.next = 24;
            break;
          }
          uploadedFileUrls = [];
          uploadedFileUrls.push.apply(uploadedFileUrls, _toConsumableArray(taskResult.taskDocuments));
          uploadedFileUrl = uploadedFileUrls.map(function (data) {
            return data.url;
          });
          _context10.next = 24;
          return _tempS["default"].updateMany({
            url: {
              $in: uploadedFileUrl
            }
          }, {
            active: true
          });
        case 24:
          return _context10.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: taskResult
          }));
        case 25:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function (_x15, _x16) {
    return _ref12.apply(this, arguments);
  };
}());
var remove = exports.remove = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    var taskId, filter, task;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          taskId = req.params.taskId;
          filter = {
            _id: taskId
          };
          _context11.next = 4;
          return _services.taskService.removeTask(filter);
        case 4:
          task = _context11.sent;
          return _context11.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: task
          }));
        case 6:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function (_x17, _x18) {
    return _ref13.apply(this, arguments);
  };
}());

// removing single document from task-reply's task document
var removeTaskDocument = exports.removeTaskDocument = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var taskDocumentId, filter, updateDocument, options, updatedTask;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          taskDocumentId = req.params.taskDocumentId;
          filter = {
            'taskAnswer.taskDocuments._id': taskDocumentId
          };
          updateDocument = {
            $pull: {
              'taskAnswer.$[].taskDocuments': {
                _id: taskDocumentId
              }
            }
          };
          options = {
            "new": true
          };
          _context12.next = 6;
          return _services.taskService.updateTask(filter, updateDocument, options);
        case 6:
          updatedTask = _context12.sent;
          if (updatedTask) {
            _context12.next = 9;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Task document is not available');
        case 9:
          return _context12.abrupt("return", res.status(_httpStatus["default"].OK).send({
            results: updatedTask
          }));
        case 10:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function (_x19, _x20) {
    return _ref14.apply(this, arguments);
  };
}());