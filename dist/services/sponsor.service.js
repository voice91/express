"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggregateSponsor = aggregateSponsor;
exports.aggregateSponsorWithPagination = aggregateSponsorWithPagination;
exports.createSponsor = createSponsor;
exports.getOne = getOne;
exports.getSponsorById = getSponsorById;
exports.getSponsorList = getSponsorList;
exports.getSponsorListWithPagination = getSponsorListWithPagination;
exports.removeManySponsor = removeManySponsor;
exports.removeSponsor = removeSponsor;
exports.updateManySponsor = updateManySponsor;
exports.updateSponsor = updateSponsor;
exports.validateBorrowersNotAttachedToSponsor = validateBorrowersNotAttachedToSponsor;
var _models = require("../models");
var _httpStatus = _interopRequireDefault(require("http-status"));
var _lodash = _interopRequireDefault(require("lodash"));
var _enum = require("../models/enum.model");
var _user = require("./user.service");
var _index = require("./index");
var _ApiError = _interopRequireDefault(require("../utils/ApiError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * Only fields name will be overwritten, if the field name will be changed.
 */
function getSponsorById(_x) {
  return _getSponsorById.apply(this, arguments);
}
function _getSponsorById() {
  _getSponsorById = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(id) {
    var options,
      sponsor,
      _args = arguments;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _context.next = 3;
          return _models.Sponsor.findById(id, options.projection, options);
        case 3:
          sponsor = _context.sent;
          return _context.abrupt("return", sponsor);
        case 5:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _getSponsorById.apply(this, arguments);
}
function getOne(_x2) {
  return _getOne.apply(this, arguments);
}
function _getOne() {
  _getOne = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(query) {
    var options,
      sponsor,
      _args2 = arguments;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          options = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
          _context2.next = 3;
          return _models.Sponsor.findOne(query, options.projection, options);
        case 3:
          sponsor = _context2.sent;
          return _context2.abrupt("return", sponsor);
        case 5:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getOne.apply(this, arguments);
}
function getSponsorList(_x3) {
  return _getSponsorList.apply(this, arguments);
}
function _getSponsorList() {
  _getSponsorList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(filter) {
    var options,
      sponsor,
      _args3 = arguments;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          options = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {};
          _context3.next = 3;
          return _models.Sponsor.find(filter, options.projection, options);
        case 3:
          sponsor = _context3.sent;
          return _context3.abrupt("return", sponsor);
        case 5:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return _getSponsorList.apply(this, arguments);
}
function getSponsorListWithPagination(_x4) {
  return _getSponsorListWithPagination.apply(this, arguments);
}
/**
 * Checks if a list of borrowers' emails is already attached to a sponsor in the system.
 *
 * @param {string[]} borrowers - An array of borrowers id to check , ids are converted to string from objectId to validate more efficiently.
 * @throws {ApiError} If any of the provided borrower id are already attached to a sponsor.
 */
function _getSponsorListWithPagination() {
  _getSponsorListWithPagination = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(filter) {
    var options,
      sponsor,
      _args4 = arguments;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          options = _args4.length > 1 && _args4[1] !== undefined ? _args4[1] : {};
          _context4.next = 3;
          return _models.Sponsor.paginate(filter, options);
        case 3:
          sponsor = _context4.sent;
          return _context4.abrupt("return", sponsor);
        case 5:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _getSponsorListWithPagination.apply(this, arguments);
}
function validateBorrowersNotAttachedToSponsor(_x5) {
  return _validateBorrowersNotAttachedToSponsor.apply(this, arguments);
}
function _validateBorrowersNotAttachedToSponsor() {
  _validateBorrowersNotAttachedToSponsor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(borrowers) {
    var filteredSponsorsIncludedBorrowers, alreadyAttachedBorrowers, alreadyAttachedWithSponsor;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return getSponsorList({}, {
            populate: {
              path: 'borrowers',
              match: {
                _id: {
                  $in: borrowers
                }
              },
              select: {
                _id: 1,
                email: 1
              }
            }
          }).then(function (sponsors) {
            return sponsors.filter(function (sponsor) {
              return sponsor.borrowers.length;
            });
          });
        case 2:
          filteredSponsorsIncludedBorrowers = _context5.sent;
          if (!filteredSponsorsIncludedBorrowers.length) {
            _context5.next = 8;
            break;
          }
          alreadyAttachedBorrowers = [];
          alreadyAttachedWithSponsor = ''; // Iterate through sponsors and check for common emails with provided borrowers
          filteredSponsorsIncludedBorrowers.forEach(function (sponsor) {
            var commonBorrowers = sponsor.borrowers.filter(function (borrower) {
              return borrowers.includes(borrower._id.toString());
            });
            alreadyAttachedBorrowers.push.apply(alreadyAttachedBorrowers, _toConsumableArray(commonBorrowers.map(function (borrower) {
              return borrower.email;
            })));
            alreadyAttachedWithSponsor = sponsor.name;
          });
          throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, // [...new Set(alreadyAttachedBorrowers)] make array with unique emails (remove repeated emails from array)
          "".concat(_toConsumableArray(new Set(alreadyAttachedBorrowers)).join(', '), " is already attached to another Sponsor ").concat(alreadyAttachedWithSponsor));
        case 8:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return _validateBorrowersNotAttachedToSponsor.apply(this, arguments);
}
function createSponsor(_x6) {
  return _createSponsor.apply(this, arguments);
}
function _createSponsor() {
  _createSponsor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(body) {
    var borrowers, sponsor;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          if (!(body.borrowersEmails && body.borrowersEmails.length)) {
            _context6.next = 7;
            break;
          }
          _context6.next = 3;
          return (0, _user.checkForExistingUsers)(body.borrowersEmails, _enum.EnumRoleOfUser.USER);
        case 3:
          borrowers = _context6.sent;
          Object.assign(body, {
            borrowers: borrowers.map(function (user) {
              return user._id.toString();
            })
          });
          // check if borrower is attached with any other sponsor.
          _context6.next = 7;
          return validateBorrowersNotAttachedToSponsor(body.borrowers);
        case 7:
          _context6.next = 9;
          return _models.Sponsor.create(body);
        case 9:
          sponsor = _context6.sent;
          return _context6.abrupt("return", sponsor);
        case 11:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return _createSponsor.apply(this, arguments);
}
function updateSponsor(_x7, _x8) {
  return _updateSponsor.apply(this, arguments);
}
function _updateSponsor() {
  _updateSponsor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(filter, body) {
    var options,
      borrowers,
      sponsor,
      existingBorrowerIds,
      updatedBorrowerIds,
      removedBorrowers,
      addedBorrowers,
      updatedSponsor,
      _args7 = arguments;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          options = _args7.length > 2 && _args7[2] !== undefined ? _args7[2] : {};
          if (!(body.borrowersEmails && body.borrowersEmails.length)) {
            _context7.next = 6;
            break;
          }
          _context7.next = 4;
          return (0, _user.checkForExistingUsers)(body.borrowersEmails, _enum.EnumRoleOfUser.USER);
        case 4:
          borrowers = _context7.sent;
          Object.assign(body, {
            borrowers: borrowers.map(function (user) {
              return user._id;
            })
          });
        case 6:
          _context7.next = 8;
          return getOne(filter, {
            populate: {
              path: 'borrowers'
            }
          });
        case 8:
          sponsor = _context7.sent;
          existingBorrowerIds = sponsor.borrowers ? sponsor.borrowers.map(function (borrower) {
            return borrower._id.toString();
          }) : [];
          updatedBorrowerIds = body.borrowers ? body.borrowers.map(function (id) {
            return id.toString();
          }) : [];
          if (_lodash["default"].isEqual(existingBorrowerIds.sort(), updatedBorrowerIds.sort())) {
            _context7.next = 20;
            break;
          }
          removedBorrowers = existingBorrowerIds.filter(function (id) {
            return !updatedBorrowerIds.includes(id);
          });
          addedBorrowers = updatedBorrowerIds.filter(function (id) {
            return !existingBorrowerIds.includes(id);
          });
          if (!(addedBorrowers && addedBorrowers.length)) {
            _context7.next = 17;
            break;
          }
          _context7.next = 17;
          return validateBorrowersNotAttachedToSponsor(addedBorrowers);
        case 17:
          if (!(removedBorrowers && removedBorrowers.length)) {
            _context7.next = 20;
            break;
          }
          _context7.next = 20;
          return _index.userService.updateManyUser({
            _id: {
              $in: removedBorrowers
            }
          }, {
            $unset: {
              sponsor: ''
            }
          });
        case 20:
          _context7.next = 22;
          return _models.Sponsor.findOneAndUpdate(filter, body, options);
        case 22:
          updatedSponsor = _context7.sent;
          return _context7.abrupt("return", updatedSponsor);
        case 24:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return _updateSponsor.apply(this, arguments);
}
function updateManySponsor(_x9, _x10) {
  return _updateManySponsor.apply(this, arguments);
}
function _updateManySponsor() {
  _updateManySponsor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(filter, body) {
    var options,
      sponsor,
      _args8 = arguments;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          options = _args8.length > 2 && _args8[2] !== undefined ? _args8[2] : {};
          _context8.next = 3;
          return _models.Sponsor.updateMany(filter, body, options);
        case 3:
          sponsor = _context8.sent;
          return _context8.abrupt("return", sponsor);
        case 5:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _updateManySponsor.apply(this, arguments);
}
function removeSponsor(_x11) {
  return _removeSponsor.apply(this, arguments);
}
function _removeSponsor() {
  _removeSponsor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(filter) {
    var sponsor;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return _models.Sponsor.findOneAndRemove(filter);
        case 2:
          sponsor = _context9.sent;
          return _context9.abrupt("return", sponsor);
        case 4:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _removeSponsor.apply(this, arguments);
}
function removeManySponsor(_x12) {
  return _removeManySponsor.apply(this, arguments);
}
function _removeManySponsor() {
  _removeManySponsor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(filter) {
    var sponsor;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return _models.Sponsor.deleteMany(filter);
        case 2:
          sponsor = _context10.sent;
          return _context10.abrupt("return", sponsor);
        case 4:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return _removeManySponsor.apply(this, arguments);
}
function aggregateSponsor(_x13) {
  return _aggregateSponsor.apply(this, arguments);
}
function _aggregateSponsor() {
  _aggregateSponsor = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(query) {
    var sponsor;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          _context11.next = 2;
          return _models.Sponsor.aggregate(query);
        case 2:
          sponsor = _context11.sent;
          return _context11.abrupt("return", sponsor);
        case 4:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return _aggregateSponsor.apply(this, arguments);
}
function aggregateSponsorWithPagination(_x14) {
  return _aggregateSponsorWithPagination.apply(this, arguments);
}
function _aggregateSponsorWithPagination() {
  _aggregateSponsorWithPagination = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(query) {
    var options,
      aggregate,
      sponsor,
      _args12 = arguments;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          options = _args12.length > 1 && _args12[1] !== undefined ? _args12[1] : {};
          aggregate = _models.Sponsor.aggregate(); // eslint-disable-next-line array-callback-return
          query.map(function (obj) {
            aggregate._pipeline.push(obj);
          });
          _context12.next = 5;
          return _models.Sponsor.aggregatePaginate(aggregate, options);
        case 5:
          sponsor = _context12.sent;
          return _context12.abrupt("return", sponsor);
        case 7:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return _aggregateSponsorWithPagination.apply(this, arguments);
}