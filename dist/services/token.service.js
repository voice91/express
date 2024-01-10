"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.verifyResetOtpVerify = exports.verifyResetOtp = exports.verifyOtp = exports.verifyCode = exports.saveToken = exports.invalidateToken = exports.getAuthTokens = exports.generateVerifyEmailToken = exports.generateToken = exports.generateResetPasswordToken = exports.generateAuthTokens = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _moment = _interopRequireDefault(require("moment"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _models = require("../models");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _config = _interopRequireDefault(require("../config/config"));
var _lodash = _interopRequireDefault(require("lodash"));
var _2 = require("./");
var _enum = require("../models/enum.model");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
/**
 * Generate token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} [secret]
 * @returns {string}
 */
var generateToken = exports.generateToken = function generateToken(userId, expires) {
  var secret = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _config["default"].jwt.secret;
  var payload = {
    sub: userId,
    iat: (0, _moment["default"])().unix(),
    exp: expires.unix()
  };
  return _jsonwebtoken["default"].sign(payload, secret);
};

/**
 * Save a token
 * @param {string} token
 * @param {ObjectId} userId
 * @param {Moment} expires
 * @param {string} type
 * @param {boolean} [blacklisted]
 * @returns {Promise<Token>}
 */
var saveToken = exports.saveToken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(token, userId, expires, type) {
    var blacklisted,
      tokenDoc,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          blacklisted = _args.length > 4 && _args[4] !== undefined ? _args[4] : false;
          _context.next = 3;
          return _models.Token.create({
            token: token,
            user: userId,
            expires: expires.toDate(),
            type: type,
            blacklisted: blacklisted
          });
        case 3:
          tokenDoc = _context.sent;
          return _context.abrupt("return", tokenDoc);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function saveToken(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
var verifyToken = exports.verifyToken = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(token, type) {
    var payload, user, tokenDoc;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          payload = _jsonwebtoken["default"].verify(token, _config["default"].jwt.secret);
          _context2.next = 3;
          return _models.User.findOne({
            _id: payload.sub
          });
        case 3:
          user = _context2.sent;
          if (!user.emailVerified) {
            _context2.next = 6;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Email Already Verified');
        case 6:
          _context2.next = 8;
          return _models.Token.findOne({
            token: token,
            type: type,
            user: payload.sub
          });
        case 8:
          tokenDoc = _context2.sent;
          if (tokenDoc) {
            _context2.next = 11;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].NOT_FOUND, 'Invalid Token');
        case 11:
          return _context2.abrupt("return", tokenDoc);
        case 12:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function verifyToken(_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * Verify Code
 * @returns {Promise<Token>}
 * @param verificationRequest
 * @param {string} [verificationRequest.token]
 * @param {string} [verificationRequest.type]
 * @param {string} [verificationRequest.user]
 */
var verifyCode = exports.verifyCode = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(verificationRequest) {
    var token, type, email, userObj, tokenDoc, currentTime;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          token = verificationRequest.code, type = verificationRequest.type, email = verificationRequest.email;
          _context3.next = 3;
          return _2.userService.getOne({
            email: email
          });
        case 3:
          userObj = _context3.sent;
          if (userObj) {
            _context3.next = 6;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].NOT_FOUND, 'No such User');
        case 6:
          _context3.next = 8;
          return _models.Token.findOne({
            token: token,
            type: type,
            user: userObj._id
          });
        case 8:
          tokenDoc = _context3.sent;
          if (tokenDoc) {
            _context3.next = 11;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].NOT_FOUND, 'Incorrect code');
        case 11:
          // to check whether the token is expired or not
          currentTime = new Date();
          if (!(tokenDoc.expires <= currentTime)) {
            _context3.next = 14;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].NOT_FOUND, 'Token expired');
        case 14:
          return _context3.abrupt("return", tokenDoc);
        case 15:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function verifyCode(_x7) {
    return _ref3.apply(this, arguments);
  };
}();
var verifyOtp = exports.verifyOtp = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(email, otp) {
    var user, otpCode;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return _2.userService.getOne({
            email: email
          });
        case 2:
          user = _context4.sent;
          if (user) {
            _context4.next = 5;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'no user found with this email');
        case 5:
          if (!user.emailVerified) {
            _context4.next = 7;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'your email is already verified!');
        case 7:
          // eslint-disable-next-line eqeqeq
          otpCode = _lodash["default"].find(user.codes, function (code) {
            return code.code == otp && code.codeType === _enum.EnumCodeTypeOfCode.LOGIN;
          });
          if (!(!otpCode || otpCode.expirationDate < Date.now())) {
            _context4.next = 10;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'otp is Invalid');
        case 10:
          user.codes = _lodash["default"].filter(user.codes, function (code) {
            return code.code !== otp;
          });
          user.emailVerified = true;
          user.active = true;
          return _context4.abrupt("return", user.save());
        case 14:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function verifyOtp(_x8, _x9) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Generate token
 * @returns {string}
 * @param length
 */
var generateCode = function generateCode(length) {
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  return Array.from({
    length: length
  }, function () {
    return characters.charAt(Math.floor(Math.random() * charactersLength));
  }).join('');
};
/**
 * Generate reset password token
 * @param {string} email
 * @returns {Promise<string>}
 */
var generateResetPasswordToken = exports.generateResetPasswordToken = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(email) {
    var user, expires, resetPasswordToken;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return _2.userService.getOne({
            email: email
          });
        case 2:
          user = _context5.sent;
          if (user) {
            _context5.next = 5;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].NOT_FOUND, 'No users found with this email');
        case 5:
          expires = (0, _moment["default"])().add(_config["default"].jwt.resetPasswordExpirationMinutes, 'minutes');
          resetPasswordToken = generateCode(_config["default"].jwt.resetPasswordCodeSize);
          _context5.next = 9;
          return _models.Token.deleteMany({
            user: user,
            type: _enum.EnumTypeOfToken.RESET_PASSWORD
          });
        case 9:
          _context5.next = 11;
          return saveToken(resetPasswordToken, user.id, expires, _enum.EnumTypeOfToken.RESET_PASSWORD);
        case 11:
          return _context5.abrupt("return", resetPasswordToken);
        case 12:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function generateResetPasswordToken(_x10) {
    return _ref5.apply(this, arguments);
  };
}();
var verifyResetOtp = exports.verifyResetOtp = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(email, otp) {
    var user, otpCode;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return _2.userService.getOne({
            email: email
          });
        case 2:
          user = _context6.sent;
          if (user) {
            _context6.next = 5;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'no user found with this email');
        case 5:
          // eslint-disable-next-line eqeqeq
          otpCode = _lodash["default"].find(user.codes, function (code) {
            return code.code == otp && code.codeType === _enum.EnumCodeTypeOfCode.RESETPASSWORD;
          });
          if (!(!otpCode || otpCode.expirationDate < Date.now())) {
            _context6.next = 8;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'otp is Invalid');
        case 8:
          user.codes = _lodash["default"].filter(user.codes, function (code) {
            return code.code !== otp;
          });
          _context6.next = 11;
          return user.save();
        case 11:
          return _context6.abrupt("return", user);
        case 12:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function verifyResetOtp(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();
var verifyResetOtpVerify = exports.verifyResetOtpVerify = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(email, otp) {
    var user, otpCode;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return _2.userService.getOne({
            email: email
          });
        case 2:
          user = _context7.sent;
          if (user) {
            _context7.next = 5;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'no user found with this email');
        case 5:
          // eslint-disable-next-line eqeqeq
          otpCode = _lodash["default"].find(user.codes, function (code) {
            return code.code == otp && code.codeType === _enum.EnumCodeTypeOfCode.RESETPASSWORD;
          });
          if (otpCode) {
            _context7.next = 8;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'otp is Invalid');
        case 8:
          if (!(otpCode.expirationDate < Date.now())) {
            _context7.next = 10;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'otp is expired');
        case 10:
          return _context7.abrupt("return", user);
        case 11:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function verifyResetOtpVerify(_x13, _x14) {
    return _ref7.apply(this, arguments);
  };
}();

/**
 * Generate Verify email token
 * @param {string} email
 * @returns {Promise<string>}
 */
var generateVerifyEmailToken = exports.generateVerifyEmailToken = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(email) {
    var user, expires, token;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return _2.userService.getOne({
            email: email
          });
        case 2:
          user = _context8.sent;
          if (user) {
            _context8.next = 7;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].NOT_FOUND, 'No users found with this email');
        case 7:
          if (!user.emailVerified) {
            _context8.next = 9;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Email is already Verified');
        case 9:
          expires = (0, _moment["default"])().add(_config["default"].jwt.verifyEmailExpirationMinutes, 'minutes');
          token = generateToken(user.id, expires);
          _context8.next = 13;
          return _models.Token.deleteMany({
            user: user,
            type: _enum.EnumTypeOfToken.VERIFY_EMAIL
          });
        case 13:
          _context8.next = 15;
          return saveToken(token, user.id, expires, _enum.EnumTypeOfToken.VERIFY_EMAIL);
        case 15:
          return _context8.abrupt("return", token);
        case 16:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function generateVerifyEmailToken(_x15) {
    return _ref8.apply(this, arguments);
  };
}();

/**
 * Generate auth tokens
 * @param {User} user
 * @returns {Promise<Object>}
 */
var generateAuthTokens = exports.generateAuthTokens = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(user) {
    var accessTokenExpires, accessToken, refreshTokenExpires, refreshToken;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          accessTokenExpires = (0, _moment["default"])().add(_config["default"].jwt.accessExpirationMinutes, 'minutes');
          accessToken = generateToken(user.id, accessTokenExpires);
          refreshTokenExpires = (0, _moment["default"])().add(_config["default"].jwt.refreshExpirationDays, 'days');
          refreshToken = generateToken(user.id, refreshTokenExpires);
          _context9.next = 6;
          return saveToken(refreshToken, user.id, refreshTokenExpires, _enum.EnumTypeOfToken.REFRESH);
        case 6:
          return _context9.abrupt("return", {
            access: {
              token: accessToken,
              expires: accessTokenExpires.toDate()
            },
            refresh: {
              token: refreshToken,
              expires: refreshTokenExpires.toDate()
            }
          });
        case 7:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function generateAuthTokens(_x16) {
    return _ref9.apply(this, arguments);
  };
}();

/**
 * Get auth tokens
 * @param {User} user
 * @param token
 * @returns {Promise<Object>}
 */
var getAuthTokens = exports.getAuthTokens = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(user, token) {
    var tokenDoc, _jwt$verify, exp;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _models.Token.findOne({
            type: _enum.EnumTypeOfToken.REFRESH,
            user: user.id
          });
        case 2:
          tokenDoc = _context10.sent;
          if (tokenDoc) {
            _context10.next = 5;
            break;
          }
          throw new Error('Token not found');
        case 5:
          _jwt$verify = _jsonwebtoken["default"].verify(token, _config["default"].jwt.secret), exp = _jwt$verify.exp;
          return _context10.abrupt("return", {
            access: {
              token: token,
              expires: _moment["default"].unix(exp).toDate()
            },
            refresh: {
              token: tokenDoc.token,
              expires: tokenDoc.expires
            }
          });
        case 7:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function getAuthTokens(_x17, _x18) {
    return _ref10.apply(this, arguments);
  };
}();

/**
 * @returns {Promise<*>}
 * @param {Object}  invalidReq
 */
var invalidateToken = exports.invalidateToken = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(invalidReq) {
    var token, tokenDoc;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          token = invalidReq.refreshToken;
          _context11.next = 3;
          return _models.Token.findOne({
            type: _enum.EnumTypeOfToken.REFRESH,
            token: token
          });
        case 3:
          tokenDoc = _context11.sent;
          if (tokenDoc) {
            _context11.next = 8;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Token not found');
        case 8:
          return _context11.abrupt("return", _models.Token.findByIdAndDelete(tokenDoc._id));
        case 9:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function invalidateToken(_x19) {
    return _ref11.apply(this, arguments);
  };
}();