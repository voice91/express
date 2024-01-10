"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyResetCode = exports.verifyOtp = exports.verifyEmail = exports.userInfo = exports.updateUserInfo = exports.updateDeviceToken = exports.socialLogin = exports.sendVerifyOtp = exports.sendVerifyEmail = exports.resetPasswordToken = exports.resetPasswordOtpVerify = exports.resetPasswordOtp = exports.registerDeviceToken = exports.register = exports.refreshTokens = exports.logout = exports.login = exports.forgotPasswordToken = exports.forgotPassword = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _common = require("../../utils/common");
var _ApiError = _interopRequireDefault(require("../../utils/ApiError"));
var _catchAsync = require("../../utils/catchAsync");
var _services = require("../../services");
var _enum = require("../../models/enum.model");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
var register = exports.register = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var body, user, emailVerifyToken;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          body = req.body;
          _context.next = 3;
          return _services.userService.createUser(body);
        case 3:
          user = _context.sent;
          _context.next = 6;
          return _services.tokenService.generateVerifyEmailToken(user.email);
        case 6:
          emailVerifyToken = _context.sent;
          _services.emailService.sendEmailVerificationEmail(user, emailVerifyToken).then()["catch"]();
          res.status(_httpStatus["default"].OK).send({
            results: {
              success: true,
              message: 'Email has been sent to your registered email. Please check your email and verify it',
              user: user
            }
          });
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
var login = exports.login = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, email, password, deviceToken, user, tokens, updatedUser;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          deviceToken = req.body.deviceToken;
          _context2.next = 4;
          return _services.authService.loginUserWithEmailAndPassword(email, password);
        case 4:
          user = _context2.sent;
          _context2.next = 7;
          return _services.tokenService.generateAuthTokens(user);
        case 7:
          tokens = _context2.sent;
          if (!deviceToken) {
            _context2.next = 15;
            break;
          }
          _context2.next = 11;
          return _services.userService.addDeviceToken(user, req.body);
        case 11:
          updatedUser = _context2.sent;
          res.status(_httpStatus["default"].OK).send({
            results: {
              user: updatedUser,
              tokens: tokens
            }
          });
          _context2.next = 16;
          break;
        case 15:
          res.status(_httpStatus["default"].OK).send({
            results: {
              user: user,
              tokens: tokens
            }
          });
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());

// if user's email is not verified then we call this function for reverification
var sendVerifyEmail = exports.sendVerifyEmail = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var email, emailVerifyToken, user;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          email = req.body.email;
          _context3.next = 3;
          return _services.tokenService.generateVerifyEmailToken(email);
        case 3:
          emailVerifyToken = _context3.sent;
          _context3.next = 6;
          return _services.userService.getOne({
            email: email
          });
        case 6:
          user = _context3.sent;
          _services.emailService.sendEmailVerificationEmail(user, emailVerifyToken).then()["catch"]();
          res.status(_httpStatus["default"].OK).send({
            success: true,
            message: 'Email has been sent to your registered email. Please check your email and verify it'
          });
        case 9:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

/**
 * Token-based forgotPassword Verify Controller
 * @type {(request.query: token)}
 * @return (successMessage)
 */
var verifyEmail = exports.verifyEmail = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return _services.authService.verifyEmail(req.query);
        case 3:
          res.status(_httpStatus["default"].OK).send({
            message: 'Your Email is Verified Successfully'
          });
          _context4.next = 9;
          break;
        case 6:
          _context4.prev = 6;
          _context4.t0 = _context4["catch"](0);
          res.status(_httpStatus["default"].OK).send({
            message: _context4.t0.message
          });
        case 9:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 6]]);
  }));
  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}());
var forgotPassword = exports.forgotPassword = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var email;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          email = req.body.email;
          _context5.next = 3;
          return _services.authService.forgotPassword(email);
        case 3:
          res.status(_httpStatus["default"].OK).send({
            results: {
              success: true,
              message: 'Code has been sent'
            }
          });
        case 4:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}());

/**
 * Token-based forgotPassword Controller
 * @type {(function(*, *, *): void)|*}
 */
var forgotPasswordToken = exports.forgotPasswordToken = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var resetPasswordToken;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _services.tokenService.generateResetPasswordToken(req.body.email);
        case 2:
          resetPasswordToken = _context6.sent;
          _context6.next = 5;
          return _services.emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
        case 5:
          res.status(_httpStatus["default"].OK).send({
            success: true,
            message: 'Code has been sent'
          });
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());

/**
 * Token-based forgotPassword Verify Controller
 * @type {(function(*, *, *): void)|*}
 */
var verifyResetCode = exports.verifyResetCode = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(req, res) {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          req.body.type = _enum.EnumTypeOfToken.RESET_PASSWORD;
          _context7.next = 3;
          return _services.tokenService.verifyCode(req.body);
        case 3:
          res.status(_httpStatus["default"].OK).send({
            success: true
          });
        case 4:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function (_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}());
var verifyOtp = exports.verifyOtp = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(req, res) {
    var body, otp, email;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          body = req.body;
          otp = body.otp, email = body.email;
          _context8.next = 4;
          return _services.tokenService.verifyOtp(email, otp);
        case 4:
          res.status(_httpStatus["default"].OK).send({
            results: {
              success: true
            }
          });
        case 5:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function (_x15, _x16) {
    return _ref8.apply(this, arguments);
  };
}());
var resetPasswordOtp = exports.resetPasswordOtp = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(req, res) {
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _services.authService.resetPasswordOtp(req.body);
        case 2:
          res.status(_httpStatus["default"].OK).send({
            results: {
              success: true,
              message: 'Password has been reset successfully'
            }
          });
        case 3:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function (_x17, _x18) {
    return _ref9.apply(this, arguments);
  };
}());
var resetPasswordOtpVerify = exports.resetPasswordOtpVerify = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(req, res) {
    var _req$body2, email, otp, user;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, otp = _req$body2.otp;
          _context10.next = 3;
          return _services.tokenService.verifyResetOtpVerify(email, otp);
        case 3:
          user = _context10.sent;
          if (user) {
            _context10.next = 6;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'something is went wrong!');
        case 6:
          res.status(_httpStatus["default"].OK).send({
            results: {
              success: true
            }
          });
        case 7:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function (_x19, _x20) {
    return _ref10.apply(this, arguments);
  };
}());

/**
 * Token-based resetPassword Controller
 * @type {(function(*, *, *): void)|*}
 */
var resetPasswordToken = exports.resetPasswordToken = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(req, res) {
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _services.authService.resetPasswordToken(req.body);
        case 2:
          res.status(_httpStatus["default"].OK).send({
            success: true,
            message: 'Password has been reset successfully'
          });
        case 3:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function (_x21, _x22) {
    return _ref11.apply(this, arguments);
  };
}());
var userInfo = exports.userInfo = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(req, res) {
    var user;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          _context12.next = 2;
          return _services.userService.getUserById(req.user._id);
        case 2:
          user = _context12.sent;
          res.status(_httpStatus["default"].OK).send({
            results: {
              user: user
            }
          });
        case 4:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function (_x23, _x24) {
    return _ref12.apply(this, arguments);
  };
}());

/**
 * Update the userInfo when he is LoggedIn
 * @type {(function(*, *, *): void)|*}
 */
var updateUserInfo = exports.updateUserInfo = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(req, res) {
    var filter, user;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          filter = {
            _id: req.user._id
          };
          _context13.next = 3;
          return _services.userService.updateUser(filter, req.body);
        case 3:
          user = _context13.sent;
          res.status(_httpStatus["default"].OK).send({
            user: user
          });
        case 5:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function (_x25, _x26) {
    return _ref13.apply(this, arguments);
  };
}());
var sendVerifyOtp = exports.sendVerifyOtp = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(req, res) {
    var email, otp, user;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          email = req.body.email;
          otp = (0, _common.generateOtp)();
          _context14.next = 4;
          return _services.userService.getOne({
            email: email
          });
        case 4:
          user = _context14.sent;
          if (user) {
            _context14.next = 7;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'no user found with this id!');
        case 7:
          if (!user.emailVerified) {
            _context14.next = 9;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'your email is already verified!');
        case 9:
          user.codes.push({
            code: otp,
            expirationDate: Date.now() + 10 * 60 * 1000,
            used: false,
            codeType: _enum.EnumCodeTypeOfCode.LOGIN
          });
          _context14.next = 12;
          return user.save();
        case 12:
          _context14.next = 14;
          return _services.emailService.sendOtpVerificationEmail(user, otp).then()["catch"]();
        case 14:
          res.status(_httpStatus["default"].OK).send({
            results: {
              success: true,
              message: 'Email has been sent to your registered email. Please check your email and verify it'
            }
          });
        case 15:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function (_x27, _x28) {
    return _ref14.apply(this, arguments);
  };
}());
var refreshTokens = exports.refreshTokens = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(req, res) {
    var tokens;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return _services.authService.refreshAuth(req.body.refreshToken);
        case 2:
          tokens = _context15.sent;
          res.status(_httpStatus["default"].OK).send({
            results: _objectSpread({}, tokens)
          });
        case 4:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function (_x29, _x30) {
    return _ref15.apply(this, arguments);
  };
}());
var logout = exports.logout = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16(req, res) {
    var user, deviceToken;
    return _regeneratorRuntime().wrap(function _callee16$(_context16) {
      while (1) switch (_context16.prev = _context16.next) {
        case 0:
          user = req.user;
          deviceToken = req.body.deviceToken;
          if (!deviceToken) {
            _context16.next = 6;
            break;
          }
          user.deviceTokens = user.deviceTokens.filter(function (token) {
            return token !== deviceToken;
          });
          _context16.next = 6;
          return user.save();
        case 6:
          _context16.next = 8;
          return _services.tokenService.invalidateToken(req.body);
        case 8:
          res.status(_httpStatus["default"].OK).send({
            results: {
              success: true
            }
          });
        case 9:
        case "end":
          return _context16.stop();
      }
    }, _callee16);
  }));
  return function (_x31, _x32) {
    return _ref16.apply(this, arguments);
  };
}());
var socialLogin = exports.socialLogin = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref17 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(req, res) {
    var user, token;
    return _regeneratorRuntime().wrap(function _callee17$(_context17) {
      while (1) switch (_context17.prev = _context17.next) {
        case 0:
          _context17.next = 2;
          return _services.authService.socialLogin(req.user);
        case 2:
          user = _context17.sent;
          _context17.next = 5;
          return _services.tokenService.generateAuthTokens(req.user);
        case 5:
          token = _context17.sent;
          res.status(_httpStatus["default"].OK).send({
            results: {
              user: user,
              token: token
            }
          });
        case 7:
        case "end":
          return _context17.stop();
      }
    }, _callee17);
  }));
  return function (_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}());
var registerDeviceToken = exports.registerDeviceToken = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref18 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(req, res) {
    var user, body, updatedUser;
    return _regeneratorRuntime().wrap(function _callee18$(_context18) {
      while (1) switch (_context18.prev = _context18.next) {
        case 0:
          user = req.user, body = req.body;
          if (!body.deviceToken) {
            _context18.next = 8;
            break;
          }
          _context18.next = 4;
          return _services.userService.addDeviceToken(user, body);
        case 4:
          updatedUser = _context18.sent;
          res.status(_httpStatus["default"].OK).send({
            results: updatedUser
          });
          _context18.next = 9;
          break;
        case 8:
          res.status(_httpStatus["default"].OK).send({
            results: user
          });
        case 9:
        case "end":
          return _context18.stop();
      }
    }, _callee18);
  }));
  return function (_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}());
var updateDeviceToken = exports.updateDeviceToken = (0, _catchAsync.catchAsync)( /*#__PURE__*/function () {
  var _ref19 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19(req, res) {
    var user, body, deviceToken, updatedUser;
    return _regeneratorRuntime().wrap(function _callee19$(_context19) {
      while (1) switch (_context19.prev = _context19.next) {
        case 0:
          user = req.user, body = req.body;
          deviceToken = req.body.deviceToken;
          if (!deviceToken) {
            _context19.next = 9;
            break;
          }
          _context19.next = 5;
          return _services.userService.addDeviceToken(user, body);
        case 5:
          updatedUser = _context19.sent;
          res.status(_httpStatus["default"].OK).send({
            results: updatedUser
          });
          _context19.next = 10;
          break;
        case 9:
          res.status(_httpStatus["default"].OK).send({
            results: user
          });
        case 10:
        case "end":
          return _context19.stop();
      }
    }, _callee19);
  }));
  return function (_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}());