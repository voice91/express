"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addDeviceToken = addDeviceToken;
exports.checkForExistingUsers = checkForExistingUsers;
exports.createUser = createUser;
exports.enforcePassword = void 0;
exports.getOne = getOne;
exports.getUserById = getUserById;
exports.getUserList = getUserList;
exports.getUserListWithPagination = getUserListWithPagination;
exports.removeManyUser = removeManyUser;
exports.removeUser = removeUser;
exports.updateManyUser = updateManyUser;
exports.updateUser = updateUser;
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
var _httpStatus = _interopRequireDefault(require("http-status"));
var _models = require("../models");
var _lodash = _interopRequireDefault(require("lodash"));
var _index = require("./index");
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
 * Only fields name will be overwritten, if the field name will be changed.
 */
/**
 * Check for existing users based on provided email addresses and role.
 *
 * @param {string[]} emails - Array of email addresses to check.
 * @param {string} role - Role to filter users by.
 * @returns {Promise<Array>} - Array of existing users matching the criteria.
 * @throws {ApiError} - Throws an error if the provided email addresses are not associated with registered users.
 */
function checkForExistingUsers(_x, _x2) {
  return _checkForExistingUsers.apply(this, arguments);
}
function _checkForExistingUsers() {
  _checkForExistingUsers = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(emails, role) {
    var existingUsers, userEmailNotExists;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return _models.User.find({
            email: {
              $in: emails
            },
            role: role
          });
        case 2:
          existingUsers = _context2.sent;
          if (!existingUsers.length) {
            _context2.next = 9;
            break;
          }
          userEmailNotExists = _lodash["default"].differenceBy(emails, existingUsers.map(function (item) {
            return item.email;
          }));
          if (!userEmailNotExists.length) {
            _context2.next = 7;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "".concat(userEmailNotExists, " does not correspond to any registered ").concat(role));
        case 7:
          _context2.next = 10;
          break;
        case 9:
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "The provided email address (".concat(emails, ") is not associated with any registered ").concat(role, "."));
        case 10:
          return _context2.abrupt("return", existingUsers);
        case 11:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _checkForExistingUsers.apply(this, arguments);
}
function getUserById(_x3) {
  return _getUserById.apply(this, arguments);
}
function _getUserById() {
  _getUserById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(id) {
    var options,
      user,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
          _context3.next = 3;
          return _models.User.findById(id, options.projection, options);
        case 3:
          user = _context3.sent;
          return _context3.abrupt("return", user);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getUserById.apply(this, arguments);
}
function getOne(_x4) {
  return _getOne.apply(this, arguments);
}
function _getOne() {
  _getOne = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(query) {
    var options,
      user,
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          _context4.next = 3;
          return _models.User.findOne(query, options.projection, options);
        case 3:
          user = _context4.sent;
          return _context4.abrupt("return", user);
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getOne.apply(this, arguments);
}
function getUserList(_x5) {
  return _getUserList.apply(this, arguments);
}
function _getUserList() {
  _getUserList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(filter) {
    var options,
      user,
      _args5 = arguments;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          options = _args5.length > 1 && _args5[1] !== undefined ? _args5[1] : {};
          _context5.next = 3;
          return _models.User.find(filter, options.projection, options);
        case 3:
          user = _context5.sent;
          return _context5.abrupt("return", user);
        case 5:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _getUserList.apply(this, arguments);
}
function getUserListWithPagination(_x6) {
  return _getUserListWithPagination.apply(this, arguments);
}
function _getUserListWithPagination() {
  _getUserListWithPagination = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(filter) {
    var options,
      user,
      _args6 = arguments;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          options = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {};
          _context6.next = 3;
          return _models.User.paginate(filter, options);
        case 3:
          user = _context6.sent;
          return _context6.abrupt("return", user);
        case 5:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _getUserListWithPagination.apply(this, arguments);
}
function createUser() {
  return _createUser.apply(this, arguments);
}
function _createUser() {
  _createUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    var body,
      user,
      _args7 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          body = _args7.length > 0 && _args7[0] !== undefined ? _args7[0] : {};
          _context7.next = 3;
          return _models.User.isEmailTaken(body.email);
        case 3:
          if (!_context7.sent) {
            _context7.next = 5;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Email already taken');
        case 5:
          _context7.next = 7;
          return _models.User.create(body);
        case 7:
          user = _context7.sent;
          return _context7.abrupt("return", user);
        case 9:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _createUser.apply(this, arguments);
}
function updateUser(_x7, _x8) {
  return _updateUser.apply(this, arguments);
}
function _updateUser() {
  _updateUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(filter, body) {
    var options,
      userData,
      user,
      _args8 = arguments;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          options = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : {};
          _context8.next = 3;
          return getOne(filter, {});
        case 3:
          userData = _context8.sent;
          if (userData) {
            _context8.next = 6;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].NOT_FOUND, 'user not found');
        case 6:
          _context8.t0 = body.email;
          if (!_context8.t0) {
            _context8.next = 11;
            break;
          }
          _context8.next = 10;
          return _models.User.isEmailTaken(body.email, userData.id);
        case 10:
          _context8.t0 = _context8.sent;
        case 11:
          if (!_context8.t0) {
            _context8.next = 13;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'Email already taken');
        case 13:
          _context8.next = 15;
          return _models.User.findOneAndUpdate(filter, body, options);
        case 15:
          user = _context8.sent;
          return _context8.abrupt("return", user);
        case 17:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _updateUser.apply(this, arguments);
}
function updateManyUser(_x9, _x10) {
  return _updateManyUser.apply(this, arguments);
}
function _updateManyUser() {
  _updateManyUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(filter, body) {
    var options,
      user,
      _args9 = arguments;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          options = _args9.length > 2 && _args9[2] !== undefined ? _args9[2] : {};
          _context9.next = 3;
          return _models.User.updateMany(filter, body, options);
        case 3:
          user = _context9.sent;
          return _context9.abrupt("return", user);
        case 5:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _updateManyUser.apply(this, arguments);
}
function removeUser(_x11) {
  return _removeUser.apply(this, arguments);
}
function _removeUser() {
  _removeUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(filter) {
    var user;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _models.User.findOneAndRemove(filter);
        case 2:
          user = _context10.sent;
          return _context10.abrupt("return", user);
        case 4:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _removeUser.apply(this, arguments);
}
function removeManyUser(_x12) {
  return _removeManyUser.apply(this, arguments);
}
function _removeManyUser() {
  _removeManyUser = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(filter) {
    var user;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _models.User.deleteMany(filter);
        case 2:
          user = _context11.sent;
          return _context11.abrupt("return", user);
        case 4:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return _removeManyUser.apply(this, arguments);
}
function addDeviceToken(_x13, _x14) {
  return _addDeviceToken.apply(this, arguments);
}
function _addDeviceToken() {
  _addDeviceToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(user, body) {
    var deviceToken, platform, isFCMValid, deviceTokenList, updateUserBody, updatedUser;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          deviceToken = body.deviceToken, platform = body.platform;
          _context12.next = 3;
          return _index.notificationService.verifyFCMToken(deviceToken);
        case 3:
          isFCMValid = _context12.sent;
          if (isFCMValid) {
            _context12.next = 6;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, 'The FCM Token is invalid!');
        case 6:
          deviceTokenList = user.deviceTokens.map(function (data) {
            return data.deviceToken;
          });
          if (!(_lodash["default"].indexOf(deviceTokenList, deviceToken) === -1)) {
            _context12.next = 15;
            break;
          }
          user.deviceTokens.push({
            deviceToken: deviceToken,
            platform: platform
          });
          updateUserBody = _objectSpread({}, user._doc); // we do not want to change password, so we delete from updated body. otherwise it change password for same user.
          delete updateUserBody.password;
          _context12.next = 13;
          return updateUser({
            _id: user._id
          }, _objectSpread({}, updateUserBody));
        case 13:
          updatedUser = _context12.sent;
          return _context12.abrupt("return", updatedUser);
        case 15:
          return _context12.abrupt("return", user);
        case 16:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return _addDeviceToken.apply(this, arguments);
}
var enforcePassword = exports.enforcePassword = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(userId, body) {
    var password, user;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          password = body.password;
          _context.next = 3;
          return getUserById(userId);
        case 3:
          user = _context.sent;
          if (user) {
            _context.next = 6;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].NOT_FOUND, 'User not found');
        case 6:
          if (user.enforcePassword) {
            _context.next = 8;
            break;
          }
          throw new _ApiError["default"](_httpStatus["default"].NOT_FOUND, 'You were not allowed to set password!');
        case 8:
          // making enforcePassword to false so user can not set pass again.
          Object.assign(user, {
            password: password,
            enforcePassword: false
          });
          _context.next = 11;
          return user.save();
        case 11:
          return _context.abrupt("return", user);
        case 12:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function enforcePassword(_x15, _x16) {
    return _ref.apply(this, arguments);
  };
}();