"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transport = exports.sendResetPasswordEmail = exports.sendReportUserEmail = exports.sendOtpVerificationEmail = exports.sendInvitationEmail = exports.sendFeedbackEmail = exports.sendFeedBackEmail = exports.sendEmailVerificationEmail = exports.sendEmailUsingGmail = exports.sendEmail = exports.sendDealTemplate3 = exports.sendDealTemplate2 = exports.sendDealTemplate1 = exports.FAQTemplate = void 0;
var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _config = _interopRequireDefault(require("../config/config"));
var _logger = require("../config/logger");
var _axios = _interopRequireDefault(require("axios"));
var _encryptDecryptText = require("../utils/encrypt-decrypt-text");
var _s = require("./s3.service");
var _common = require("../utils/common");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
// eslint-disable-next-line import/no-extraneous-dependencies
var postmark = require('postmark');

/**
 * configuration for postmark
 * */
var transport = exports.transport = new postmark.ServerClient(_config["default"].postmarkAPIToken);

// We implemented postmark for email send so we commented the code of nodemailer functionality

/**
 * configuration for nodemailer
 * */
// todo: use below configuration for sendEmails using nodemailer
// export const nodemailerTransport = nodemailer.createTransport(config.email.smtp);
// /* istanbul ignore next */
// if (config.env !== 'test') {
//   nodemailerTransport
//     .verify()
//     .then(() => logger.info('Connected to email server'))
//     .catch(() => logger.warn('Unable to connect to email server. Make sure you have configured the SMTP options in .env'));
// }

/**
 * Send an email using postmark
 * @returns {Promise}
 * @param emailParams
 */
var sendEmail = exports.sendEmail = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(emailParams) {
    var to, cc, bcc, from, subject, text, isHtml, attachments, headers, _emailParams$replyTo, replyTo, msg, senderName, response;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          to = emailParams.to, cc = emailParams.cc, bcc = emailParams.bcc, from = emailParams.from, subject = emailParams.subject, text = emailParams.text, isHtml = emailParams.isHtml, attachments = emailParams.attachments, headers = emailParams.headers, _emailParams$replyTo = emailParams.replyTo, replyTo = _emailParams$replyTo === void 0 ? '' : _emailParams$replyTo;
          msg = {
            from: "".concat(_config["default"].emailSenderDisplayName, " <").concat(from || _config["default"].email.from, ">"),
            to: to,
            cc: cc,
            bcc: bcc,
            subject: subject,
            text: text,
            attachments: attachments,
            headers: headers
          };
          if (isHtml) {
            msg.HtmlBody = text;
            delete msg.text;
          } else {
            msg.TextBody = text;
          }
          // we have cc and bcc type is array and postmark allow only string for this so, we did this thing
          if (cc) {
            msg.cc = msg.cc.join(',');
          }
          if (bcc) {
            msg.bcc = msg.bcc.join(',');
          }
          if (!attachments) {
            _context2.next = 9;
            break;
          }
          _context2.next = 8;
          return Promise.all(msg.attachments.map( /*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(item) {
              var response;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _axios["default"].get(item.path, {
                      responseType: 'arraybuffer'
                    });
                  case 2:
                    response = _context.sent;
                    return _context.abrupt("return", {
                      Name: item.fileName,
                      Content: Buffer.from(response.data).toString('base64'),
                      ContentType: item.fileType
                    });
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }, _callee);
            }));
            return function (_x2) {
              return _ref2.apply(this, arguments);
            };
          }()));
        case 8:
          msg.attachments = _context2.sent;
        case 9:
          senderName = msg.from.split('@').reverse().pop(); // we have requirement that when lender reply to email than advisor should get email so for that need to add that email to here
          msg.ReplyTo = "".concat(senderName, "@").concat(_config["default"].postmarkInboundDomain, ", ").concat(replyTo);
          if (!msg.subject) {
            msg.subject = '';
          }
          _context2.next = 14;
          return transport.sendEmail(msg);
        case 14:
          response = _context2.sent;
          _logger.logger.info("Email sent successfully to ".concat(msg.to, "}"));
          return _context2.abrupt("return", response);
        case 17:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function sendEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Send an email using gmail SMTP
 * By using this we can send the email from various admin email , no need to use from(sender) value from env
 * @returns {Promise}
 * @param emailParams
 */
var sendEmailUsingGmail = exports.sendEmailUsingGmail = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(emailParams) {
    var to, subject, text, isHtml, attachments, from, pass, cc, bcc, _emailParams$replyTo2, replyTo, transporter, mailOptions, senderName, response, messageId, messageIdParts, extractedMessageId;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          // TODO : check how can we pass headers in the mail
          to = emailParams.to, subject = emailParams.subject, text = emailParams.text, isHtml = emailParams.isHtml, attachments = emailParams.attachments, from = emailParams.from, pass = emailParams.pass, cc = emailParams.cc, bcc = emailParams.bcc, _emailParams$replyTo2 = emailParams.replyTo, replyTo = _emailParams$replyTo2 === void 0 ? '' : _emailParams$replyTo2; // const msg = { from: config.email.from, to, subject, text };
          transporter = _nodemailer["default"].createTransport({
            host: _config["default"].email.smtp.host,
            port: _config["default"].email.smtp.port,
            secure: true,
            // true for 465, false for other ports
            // service: 'gmail',
            auth: {
              user: from,
              // sender Gmail address
              pass: pass // The app password you generated
            }
          });
          mailOptions = {
            to: to,
            // Receiver's email address
            subject: subject,
            text: text
          };
          if (isHtml) {
            delete mailOptions.text;
            mailOptions.html = text;
          }
          if (cc && cc.length) {
            mailOptions.cc = cc;
          }
          if (bcc) {
            mailOptions.bcc = bcc;
          }
          if (attachments) {
            mailOptions.attachments = attachments.map(function (item) {
              return {
                // need to send attachment with the name
                filename: item.fileName,
                path: _config["default"].aws.enablePrivateAccess ? (0, _s.getSignedUrl)((0, _common.getKeyFromUrl)(item.path)) : item.path
              };
            });
          }
          // if we have this variable in env than take that else take sender name
          senderName = _config["default"].postmarkInboundSenderName || from.split('@').reverse().pop(); // remove this thing bcs in gmail we do not need this one was for postmark conform & remove this
          // // we have requirement that when lender reply to email than advisor should get email so for that need to add that email to here
          // As per the requirement, we want inbound domain mail to be at the end and reply to mail first
          mailOptions.replyTo = "".concat(replyTo, ",").concat(senderName, "@").concat(_config["default"].postmarkInboundDomain);
          //
          if (!mailOptions.subject) {
            mailOptions.subject = '';
          }
          _context3.next = 12;
          return transporter.sendMail(mailOptions);
        case 12:
          response = _context3.sent;
          messageId = response.messageId; // here we are extracting only messageIdString part from the whole messageId getting in response
          // In the response we are getting messageId like "<messageIdString@inbounddomain.com>" but we required to store only part "messageIdString".
          // we required only messageIdString for the webhook API instead of whole messageId including domain
          messageIdParts = messageId.split('@'); // split messageId from @, so we get ["<messageIdString", "inbounddomain.com>"]
          extractedMessageId = messageIdParts[0].slice(1); // removing < from the starting of the messageIdString
          Object.assign(response, {
            messageId: extractedMessageId
          });
          _logger.logger.info("Email sent successfully to ".concat(mailOptions.to, " from ").concat(from));
          return _context3.abrupt("return", response);
        case 19:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function sendEmailUsingGmail(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Send an email using nodemailer
 * @returns {Promise}
 * @param emailParams
 */
// todo: use below function for sendEmails using nodemailer
// export const sendEmailUsingNodemailer = async (emailParams) => {
//   const { to, subject, text, isHtml, attachments } = emailParams;
//   const msg = { from: config.email.from, to, subject, text };
//   if (isHtml) {
//     delete msg.text;
//     msg.html = text;
//   }
//   if (attachments) {
//     msg.attachments = await Promise.all(
//       attachments.map(async (item) => {
//         const response = await axios.get(item.path, { responseType: 'arraybuffer' });
//         return {
//           Name: item.fileName,
//           Content: Buffer.from(response.data).toString('base64'),
//           ContentType: item.fileType,
//         };
//       })
//     );
//   }
//   await nodemailerTransport.sendMail(msg);
// };

/**
 * Send an email
 * @param {String} from
 * @param {string} to
 * @param {string} subject
 * @param {string} text
 * @returns {Promise}
 */
var sendAdminEmail = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(from, to, subject, text) {
    var msg;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          msg = {
            from: from || _config["default"].email.from,
            to: to,
            subject: subject,
            text: text
          };
          _context4.next = 3;
          return transport.sendEmail(msg);
        case 3:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return function sendAdminEmail(_x4, _x5, _x6, _x7) {
    return _ref4.apply(this, arguments);
  };
}();
/**
 * Send reset password email
 * @param {string} to
 * @param {string} token
 * @returns {Promise}
 */
var sendResetPasswordEmail = exports.sendResetPasswordEmail = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(token, user) {
    var to, firstName, subject, resetPasswordUrl, text;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          to = user.email, firstName = user.firstName;
          subject = 'Reset password';
          resetPasswordUrl = "".concat(_config["default"].front.url, "/resetPassword?email=").concat(to, "&token=").concat(token);
          text = "\n<html lang=\"en\">\n<head>\n<style>\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  color: #ffffff !important;\n  background-color: #051EA3;\n  border: 1px solid #007bff;\n  box-shadow: none;\n  text-decoration: none;\n}\n.text-center {\ntext-align: center\n}\n</style>\n</head>\n<body>\n<div>\n<div>Hi ".concat(firstName, ",</div>\n<br>\n  <div>Forgot your password?</div>\n  <div>We received a request to reset the password for your account.</div><br>\n  <div>To reset your password, click on the button below:</div>\n  <div><a   target=\"_blank\" href=\"").concat(resetPasswordUrl, "\" id=\"verifyButton\" class=\"btn btn-primary\" >Reset password</a></div><br><br>\n  <div>Or copy and paste the URL into your browser:</div>\n  <div>").concat(resetPasswordUrl, "</div>\n  </div>\n  </body>\n  </html>");
          _context5.next = 6;
          return sendEmail({
            to: to,
            subject: subject,
            text: text,
            isHtml: true
          });
        case 6:
        case "end":
          return _context5.stop();
      }
    }, _callee5);
  }));
  return function sendResetPasswordEmail(_x8, _x9) {
    return _ref5.apply(this, arguments);
  };
}();

/**
 * Send Verification email
 * @param {Object} user
 * @param {string} token
 * @returns {Promise}
 */
var sendEmailVerificationEmail = exports.sendEmailVerificationEmail = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(user, token) {
    var to, firstName, subject, verifyEmailUrl, text;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          to = user.email, firstName = user.firstName;
          subject = 'Welcome to the ParallelCRE';
          verifyEmailUrl = "".concat(_config["default"].front.url, "/verify-email?token=").concat(token);
          text = "\n<html lang=\"en\">\n<head>\n<style>\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  color: #ffffff !important;\n  background-color: #007bff;\n  border: 1px solid #007bff;\n  box-shadow: none;\n  text-decoration: none;\n}\n.text-center {\ntext-align: center\n}\n</style>\n</head>\n<body>\n<div>\n<div>Dear ".concat(firstName, ",</div>\n<br>\n  <div>We\u2019re super excited that you\u2019ve decided to join Parallel CRE!</div><br>\n  <div>All you have to do is click the link below to confirm it\u2019s you and you\u2019re in!</div><br>\n  <div><a   target=\"_blank\" href=\"").concat(verifyEmailUrl, "\" id=\"verifyButton\" class=\"btn btn-primary\" >Click here to Verify</a></div><br><br>\n  <div>Thanks You,</div>\n  <div>The Parallel Team</div>\n  </div>\n  </body>\n  </html>\n");
          _context6.next = 6;
          return sendEmail({
            to: to,
            subject: subject,
            text: text,
            isHtml: true
          });
        case 6:
        case "end":
          return _context6.stop();
      }
    }, _callee6);
  }));
  return function sendEmailVerificationEmail(_x10, _x11) {
    return _ref6.apply(this, arguments);
  };
}();
// as now, we don't want to use postmark email so removing it
// we need user first name to be in email of invitation for existing users
var sendInvitationEmail = exports.sendInvitationEmail = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(_ref7) {
    var fromEmail, user, dealName, userName, isDealCreated, link, pass, firstName, invitee, to, subject, text;
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          fromEmail = _ref7.fromEmail, user = _ref7.user, dealName = _ref7.dealName, userName = _ref7.userName, isDealCreated = _ref7.isDealCreated, link = _ref7.link, pass = _ref7.pass, firstName = _ref7.firstName;
          invitee = firstName;
          to = user;
          subject = "Parallel: ".concat(isDealCreated ? 'New Deal Created' : 'Added to Deal', " - ").concat(dealName);
          text = "\n<html lang=\"en\">\n<head>\n<style>\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  color: #ffffff !important;\n  background-color: #007bff;\n  border: 1px solid #007bff;\n  box-shadow: none;\n  text-decoration: none;\n}\n.text-center {\ntext-align: center\n}\n</style>\n</head>\n<body>\n<div>\n<div>  ".concat(invitee ? "Hi ".concat(invitee) : 'Hello', ",</div>\n<br>\n  <div>").concat(userName, " invited you to the ").concat(isDealCreated ? 'new' : '', " deal, <b>").concat(dealName, " </b></div><br>\n  <div>Please <a class=\"text-center\" target=\"_blank\" href=\"").concat(_config["default"].front.url, "/").concat(link, "\" >click here</a> to access the deal</div><br><br>\n  <div>Thank You,</div>\n  <div>The Parallel Team</div>\n  </div>\n  </body>\n  </html>\n"); // as before we were sending mail from the sendEmailFrom set in the .env, but now we have to send it from the mail we set in our profile and whose app password we have set.
          _context7.next = 7;
          return sendEmailUsingGmail({
            from: fromEmail,
            pass: (0, _encryptDecryptText.decrypt)(pass, _config["default"].encryptionPassword),
            // as we have encrypted the app password while saving, so we have to decrypt here
            to: to,
            subject: subject,
            text: text,
            isHtml: true
          });
        case 7:
        case "end":
          return _context7.stop();
      }
    }, _callee7);
  }));
  return function sendInvitationEmail(_x12) {
    return _ref8.apply(this, arguments);
  };
}();
var FAQTemplate = exports.FAQTemplate = /*#__PURE__*/function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(user) {
    var to, subject, from, text;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          to = 'testrichard67@gmail.com';
          subject = 'Submit a Question';
          from = user.from;
          text = "\n<html lang=\"en\">\n<head>\n<style>\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  color: #ffffff !important;\n  background-color: #007bff;\n  border: 1px solid #007bff;\n  box-shadow: none;\n  text-decoration: none;\n}\n.text-center {\ntext-align: center\n}\n</style>\n</head>\n<body>\n<div>\n<div> Hii, Richard</div>\n<br>\n  <div> Question : ".concat(user.question, "</div><br>\n  <div> Asked By,</div>\n  <div>").concat(user.name, "</div><br><br>\n  </div>\n  </body>\n  </html>\n");
          _context8.next = 6;
          return sendEmail({
            to: to,
            subject: subject,
            from: from,
            text: text,
            isHtml: true
          });
        case 6:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return function FAQTemplate(_x13) {
    return _ref9.apply(this, arguments);
  };
}();
var sendFeedbackEmail = exports.sendFeedbackEmail = /*#__PURE__*/function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(user) {
    var to, subject, from, attachments, text;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          to = user.to;
          subject = user.subject;
          from = user.from;
          attachments = user.attachments;
          text = "\n<html lang=\"en\">\n<head>\n<style>\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  color: #ffffff !important;\n  background-color: #007bff;\n  border: 1px solid #007bff;\n  box-shadow: none;\n  text-decoration: none;\n}\n.text-center {\ntext-align: center\n}\n</style>\n</head>\n<body>\n<div>\n<div> Hii, Richard</div>\n<br>\n  <div> Description : ".concat(user.description, "</div><br>\n  <div> Feedback By,</div>\n  <div>").concat(user.name, "</div><br><br>\n  </div>\n  </body>\n  </html>\n");
          _context9.next = 7;
          return sendEmail({
            to: to,
            subject: subject,
            from: from,
            text: text,
            isHtml: true,
            attachments: attachments
          });
        case 7:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return function sendFeedbackEmail(_x14) {
    return _ref10.apply(this, arguments);
  };
}();
var sendDealTemplate1 = exports.sendDealTemplate1 = /*#__PURE__*/function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(user) {
    var to, cc, bcc, subject, from, file, attachments, text;
    return _regeneratorRuntime().wrap(function _callee10$(_context10) {
      while (1) switch (_context10.prev = _context10.next) {
        case 0:
          to = user.email;
          cc = user.email;
          bcc = user.email;
          subject = 'PFG Cold Storage Industrial - $9.1m Acquisition Financing';
          from = user.from;
          file = user.file;
          attachments = file.map(function (data) {
            var fileName = data.split('/').pop();
            return {
              filename: fileName,
              path: data
            };
          });
          text = "\n<html lang=\"en\">\n<head>\n<style>\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  color: #ffffff !important;\n  background-color: #007bff;\n  border: 1px solid #007bff;\n  box-shadow: none;\n  text-decoration: none;\n}\n.text-center {\ntext-align: center\n}\n</style>\n</head>\n<body>\n<div>\n<div> Hi ".concat(user.firstName, "</div>\n<br>\n  <div> This is a short message that would include details about the deal.</div><br>\n  <div> Please see below the summary of PFG deal:</div><br>\n  <div> The property is: example of text</div><br>\n  <div> The loan of $").concat(user.totalLoanAmount, "m is</div><br>\n  <div> Best Regards,</div>\n  <div>").concat(user.advisorName, "</div><br><br>\n  </div>\n  </body>\n  </html>\n");
          _context10.next = 10;
          return sendEmail({
            to: to,
            cc: cc,
            bcc: bcc,
            subject: subject,
            from: from,
            text: text,
            isHtml: true,
            attachments: attachments
          });
        case 10:
        case "end":
          return _context10.stop();
      }
    }, _callee10);
  }));
  return function sendDealTemplate1(_x15) {
    return _ref11.apply(this, arguments);
  };
}();
var sendDealTemplate2 = exports.sendDealTemplate2 = /*#__PURE__*/function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(user) {
    var to, cc, bcc, subject, from, text;
    return _regeneratorRuntime().wrap(function _callee11$(_context11) {
      while (1) switch (_context11.prev = _context11.next) {
        case 0:
          to = user.email;
          cc = user.email;
          bcc = user.email;
          subject = 'PFG Cold Storage Industrial - $9.1m Acquisition Financing';
          from = user.from;
          text = "\n<html lang=\"en\">\n<head>\n<style>\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  color: #ffffff !important;\n  background-color: #007bff;\n  border: 1px solid #007bff;\n  box-shadow: none;\n  text-decoration: none;\n}\n.text-center {\ntext-align: center\n}\n.underline{\n   text-decoration:underline\n}\n.bold{\ntext-style: bold\n}\n.text-color{\ncolor: gray;\n}\n.text-blue{\ncolor:blue;\n}\n</style>\n</head>\n<body>\n<div>\n<div> Hi ".concat(user.firstName, " - hope all is well, please see below for the financing summary of PFG Cold Storage Industrial: </div>\n<br>\n  <div> The Sponsor is acquiring the Property for $13.0 million and is seeking $9.1m in acquisition financing (67% LTP).\nPFG Cold Storage is a 100% occupied, 299,177sf cold-storage industrial facility located at 4901 Asher Avenue in Little Rock, Arkansas.  \n</div><br>\n  <div> The Property is occupied by Performance Food Group (PFG) on an absolute net lease. PFG is a food distributor with a market capitalization of approximately $10 billion. The tenants has approximately three years of lease term remaining with five, five-year renewal options and has occupied the Property since 2004. The Property is comprised of three buildings with 13 drive-in doors and 50 dock doors and is 299,177sf on 41.82 acres.\n</div><br>\n  <div> The Sponsor owns over 4.0 million SF and is focused on a competitive rate and non-recourse financing.</div><br>\n  <div class=\"underline\" > Financing Request:</div><br>\n  <div class=\"bold\"> - $9.1m Request </div><br>\n  <div class=\"bold\"> - Competitive Fixed Rate </div><br>\n  <div class=\"bold\"> - Interest-Only </div><br>\n  <div class=\"bold\"> - Non-recourse </div><br>\n  <div> Please see the OM and model attached and let me know if you have any questions / if this is a fit.</div><br>\n  <div> Thank you,</div>\n  <div> ").concat(user.advisorName, "</div><br><br>\n  <div class=\"text-color\"> --</div><br>\n  <div class=\"text-color\"> ").concat(user.advisorName, "</div><br>\n  <div class=\"text-color\"> Parallel CRE</div><br>\n  <div class=\"underline\", class=\"text-blue\"> ").concat(user.advisorEmail, "</div>\n  </div>\n  </body>\n  </html>\n");
          _context11.next = 8;
          return sendEmail({
            to: to,
            cc: cc,
            bcc: bcc,
            subject: subject,
            from: from,
            text: text,
            isHtml: true
          });
        case 8:
        case "end":
          return _context11.stop();
      }
    }, _callee11);
  }));
  return function sendDealTemplate2(_x16) {
    return _ref12.apply(this, arguments);
  };
}();
var sendDealTemplate3 = exports.sendDealTemplate3 = /*#__PURE__*/function () {
  var _ref13 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(user) {
    var to, cc, bcc, subject, from, text;
    return _regeneratorRuntime().wrap(function _callee12$(_context12) {
      while (1) switch (_context12.prev = _context12.next) {
        case 0:
          to = user.email;
          cc = user.email;
          bcc = user.email;
          subject = '547 Valley Road - $1.5m Acquisition Financing';
          from = user.from;
          text = "\n<html lang=\"en\">\n<head>\n<style>\n.btn {\n  display: inline-block;\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none;\n  padding: 0.375rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.5;\n  border-radius: 0.25rem;\n  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  color: #ffffff !important;\n  background-color: #007bff;\n  border: 1px solid #007bff;\n  box-shadow: none;\n  text-decoration: none;\n}\n.text-center {\ntext-align: center\n}\n.underline{\n   text-decoration:underline\n}\n.bold{\ntext-style: bold\n}\n.text-color{\ncolor: gray;\n}\n.text-blue{\ncolor: blue;\n}\n</style>\n</head>\n<body>\n<div>\n<div> Hi ".concat(user.firstName, " - hope all is well, please see below for the 547 Valley Road financing request. </div>\n<br>\n  <div> 547 Valley Road is a 5,650sf, mixed-use Property (apartments and retail) located in Monclair, NJ. The Property is located on a highly-trafficked corridor, well-known as a shopping and dining destination and features convenient transportation: two blocks to the Upper Montclair train station with direct line to NYC, and short walk to #28 bus station. The in-place NOI is $102k and will increase to $158k upon the remaining residential unit being leased. Once increased, the metrics of the loan are 10.5% debt yield, 1.55x DSCR and 52% LTV.  \n</div><br>\n  <div> The Sponsor is looking to refinance their current loan with a $1.5m term loan. </div><br>\n  <div class=\"underline\",class=\"bold\" > Financing Request:</div><br>\n  <div> - $1.5m Request </div><br>\n  <div> - Competitive Rate </div> <br>  \n  <div> Please let me know when works to discuss further. </div><br>\n  <div> Thank you,</div>\n  <div> ").concat(user.advisorName, "</div><br><br>\n  <div class=\"text-color\"> --</div><br>\n  <div class=\"text-color\"> ").concat(user.advisorName, "</div><br>\n  <div class=\"text-color\"> Parallel CRE</div><br>\n  <div class=\"underline\", class=\"text-blue\"> ").concat(user.advisorEmail, "</div>\n  </div>\n  </body>\n  </html>\n");
          _context12.next = 8;
          return sendEmail({
            to: to,
            cc: cc,
            bcc: bcc,
            subject: subject,
            from: from,
            text: text,
            isHtml: true
          });
        case 8:
        case "end":
          return _context12.stop();
      }
    }, _callee12);
  }));
  return function sendDealTemplate3(_x17) {
    return _ref13.apply(this, arguments);
  };
}();

/**
 * @param {Object} feedBack
 * @returns {Promise<void>}
 */
var sendFeedBackEmail = exports.sendFeedBackEmail = /*#__PURE__*/function () {
  var _ref14 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(feedBack) {
    var comment, user, name, subject, text;
    return _regeneratorRuntime().wrap(function _callee13$(_context13) {
      while (1) switch (_context13.prev = _context13.next) {
        case 0:
          comment = feedBack.comment, user = feedBack.user;
          name = user.name;
          subject = "Feedback received from ".concat(name);
          text = "Below is the feedback received from ".concat(name, " \n FeedBack: ").concat(comment);
          _context13.next = 6;
          return sendAdminEmail(_config["default"].email.from, _config["default"].email.from, subject, text);
        case 6:
        case "end":
          return _context13.stop();
      }
    }, _callee13);
  }));
  return function sendFeedBackEmail(_x18) {
    return _ref14.apply(this, arguments);
  };
}();

/**
 * @returns {Promise<void>}
 * @param reporter
 * @param reportedUser
 * @param party
 * @param comment
 */
var sendReportUserEmail = exports.sendReportUserEmail = /*#__PURE__*/function () {
  var _ref15 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(reporter, reportedUser, party, comment) {
    var reporterName, reportedId, name, reportedUserId, subject, text;
    return _regeneratorRuntime().wrap(function _callee14$(_context14) {
      while (1) switch (_context14.prev = _context14.next) {
        case 0:
          reporterName = reporter.name, reportedId = reporter._id;
          name = reportedUser.name, reportedUserId = reportedUser._id;
          subject = "Regarding Report of user ".concat(name);
          text = "".concat(name, ", ").concat(reportedUserId, " is blocked by ").concat(reporterName, ", ").concat(reportedId, " \n  The reason is : ").concat(comment, " \n partyId: ").concat(party._id);
          _context14.next = 6;
          return sendAdminEmail(_config["default"].email.from, _config["default"].email.from, subject, text);
        case 6:
        case "end":
          return _context14.stop();
      }
    }, _callee14);
  }));
  return function sendReportUserEmail(_x19, _x20, _x21, _x22) {
    return _ref15.apply(this, arguments);
  };
}();

/**
 * Send Verification email
 * @param {Object} user
 * @param otp
 * @returns {Promise}
 */
var sendOtpVerificationEmail = exports.sendOtpVerificationEmail = /*#__PURE__*/function () {
  var _ref16 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(user, otp) {
    var to, subject, text;
    return _regeneratorRuntime().wrap(function _callee15$(_context15) {
      while (1) switch (_context15.prev = _context15.next) {
        case 0:
          to = user.email;
          subject = 'Otp verification email!';
          text = "Dear user,\n  Your email verification Code, Copy this Code: ".concat(otp, "\n  If you did not request any password resets, then ignore this email.");
          _context15.next = 5;
          return sendEmail({
            to: to,
            subject: subject,
            text: text,
            isHtml: false
          }).then(function () {
            return _logger.logger.info('email sent successfully');
          })["catch"](function (error) {
            return _logger.logger.warn("Unable to send mail ".concat(error));
          });
        case 5:
        case "end":
          return _context15.stop();
      }
    }, _callee15);
  }));
  return function sendOtpVerificationEmail(_x23, _x24) {
    return _ref16.apply(this, arguments);
  };
}();