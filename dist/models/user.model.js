"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var _plugins = require("./plugins");
var _enum = _interopRequireDefault(require("./enum.model"));
var _bcryptjs = _interopRequireDefault(require("bcryptjs"));
var _encryptDecryptText = require("../utils/encrypt-decrypt-text");
var _config = _interopRequireDefault(require("../config/config"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
var CodeSchema = new _mongoose["default"].Schema({
  code: {
    type: String
  },
  expirationDate: {
    type: Date
  },
  used: {
    type: Boolean
  },
  codeType: {
    type: String,
    "enum": Object.values(_enum["default"].EnumCodeTypeOfCode)
  }
});
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
var OauthSchema = new _mongoose["default"].Schema({
  id: {
    type: String
  },
  token: {
    type: String
  }
});
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
var DeviceTokenSchema = new _mongoose["default"].Schema({
  /**
   *Device Token Of User
   * */
  deviceToken: {
    type: String
  },
  /**
   *Platform of User
   * */
  platform: {
    type: String,
    "enum": Object.values(_enum["default"].EnumPlatformOfDeviceToken)
  }
});
var UserSchema = new _mongoose["default"].Schema({
  /**
   * Name of User
   * */
  name: {
    type: String
  },
  /**
   * Email address of User
   * */
  email: {
    type: String,
    // eslint-disable-next-line security/detect-unsafe-regex
    match: /^\w+([.-]?\w+)*\+?\d*@(\w+([.-]?\w+)*\.\w{2,4})+$/,
    required: true
  },
  /**
   * we need to send the email with this email & assuming that this email will be verified in the postmark
   * currently we give condition from FE that domain will be one from parallelcr & highlandrecapital
   */
  sendEmailFrom: {
    type: String,
    // eslint-disable-next-line security/detect-unsafe-regex
    match: /^\w+([.-]?\w+)*\+?\d*@(\w+([.-]?\w+)*\.\w{2,4})+$/
  },
  /**
   * For email verification
   * */
  emailVerified: {
    type: Boolean,
    "private": true
  },
  /**
   * role
   * */
  role: {
    type: String,
    "enum": Object.values(_enum["default"].EnumRoleOfUser),
    "default": _enum["default"].EnumRoleOfUser.USER
  },
  /**
   * custom server authentication
   * */
  codes: {
    type: [CodeSchema]
  },
  /**
   * password for authentication
   * */
  password: {
    type: String,
    "private": true,
    required: true
  },
  /**
   * appPassword for access Google Account
   * */
  appPassword: {
    type: String,
    "private": true
  },
  /**
   * it will use for to show set password page, for new lender when we send email that time we are creating user if not exist in DB
   */
  enforcePassword: {
    type: Boolean,
    "default": false
  },
  /**
   * Google based authentication
   * */
  googleProvider: {
    type: OauthSchema
  },
  /**
   * To store device tokens
   * */
  deviceTokens: {
    type: [DeviceTokenSchema]
  },
  /**
   * First name of User
   * */
  firstName: {
    type: String,
    required: true
  },
  /**
   * Last name of User
   * */
  lastName: {
    type: String,
    required: true
  },
  /**
   * Free text with combination of country code and phone number
   * */
  phoneNumber: {
    type: String
  },
  /**
   * The name of the company of the user
   * */
  companyName: {
    type: String,
    required: true
  },
  /**
   * Address of Company of the User
   * */
  companyAddress: {
    type: String
  },
  /**
   * City of the User
   * */
  city: {
    type: String,
    maxLength: 30
  },
  /**
   * State of the User
   * */
  state: {
    type: String,
    "enum": Object.values(_enum["default"].EnumStatesOfDeal)
  },
  /**
   * Zipcode of the address of the User
   */
  zipcode: {
    type: Number,
    min: 10000,
    max: 99999
  },
  /**
   * Updated whenever the user signs, by default null
   * */
  lastSignIn: {
    type: Date,
    "default": new Date()
  },
  /**
   * profile Photo
   * */
  profilePhoto: {
    type: String
  },
  emailPresentingPostmark: {
    type: Boolean,
    "default": false
  },
  /**
   * Signature of advisor for send email
   * */
  signature: {
    type: String
  },
  sponsor: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Sponsor'
  },
  /**
   * Indicates whether the user account is active or not
   * */
  active: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: true,
  autoCreate: true
});
UserSchema.plugin(_plugins.toJSON, {
  getters: true // Include virtual properties in toJSON output
});
UserSchema.plugin(_mongoosePaginateV["default"]);
/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the User to be excluded
 * @returns Promise with boolean value
 */
UserSchema.statics.isEmailTaken = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(email, excludeUserId) {
    var User;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return this.findOne({
            email: email,
            _id: {
              $ne: excludeUserId
            }
          });
        case 2:
          User = _context.sent;
          return _context.abrupt("return", !!User);
        case 4:
        case "end":
          return _context.stop();
      }
    }, _callee, this);
  }));
  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
UserSchema.pre('save', /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(next) {
    var User;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          User = this;
          if (!User.isModified('password')) {
            _context2.next = 5;
            break;
          }
          _context2.next = 4;
          return _bcryptjs["default"].hash(User.password, 8);
        case 4:
          User.password = _context2.sent;
        case 5:
          next();
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2, this);
  }));
  return function (_x3) {
    return _ref2.apply(this, arguments);
  };
}());
/**
 * When user reset password or change password then it save in bcrypt format
 * When update the appPassword, then it save in encrypted format
 */
UserSchema.pre('findOneAndUpdate', /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(next) {
    var update, passwordHash, encryptedAppPassword;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          update = this.getUpdate(); // {password: "..."}
          if (!(update && update.password)) {
            _context3.next = 6;
            break;
          }
          _context3.next = 4;
          return _bcryptjs["default"].hash(update.password, 10);
        case 4:
          passwordHash = _context3.sent;
          this.getUpdate().password = passwordHash;
        case 6:
          if (!(update && update.appPassword)) {
            _context3.next = 11;
            break;
          }
          _context3.next = 9;
          return (0, _encryptDecryptText.encrypt)(update.appPassword, _config["default"].encryptionPassword);
        case 9:
          encryptedAppPassword = _context3.sent;
          this.getUpdate().appPassword = encryptedAppPassword;
        case 11:
          next();
        case 12:
        case "end":
          return _context3.stop();
      }
    }, _callee3, this);
  }));
  return function (_x4) {
    return _ref3.apply(this, arguments);
  };
}());

// this will set if appPassword field is available in the field
UserSchema.virtual('isAppPasswordSet').get(function () {
  return !!this.appPassword;
}).set(function (v) {
  this.appPassword = v;
});
var UserModel = _mongoose["default"].models.User || _mongoose["default"].model('User', UserSchema, 'User');
module.exports = UserModel;