"use strict";

var _express = _interopRequireDefault(require("express"));
var _validate = _interopRequireDefault(require("../../../middlewares/validate"));
var _common = require("../../../validations/common");
var _common2 = require("../../../controllers/common");
var _auth = _interopRequireDefault(require("../../../middlewares/auth"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// console.log('auth vadi file ma');
var router = _express["default"].Router();

/**
 * Register API
 */
router.post('/register', (0, _auth["default"])('advisor'), (0, _validate["default"])(_common.authValidation.register), _common2.authController.register);
/**
 * Token-based verification
 * If User did not receive Email during register then call this API Again
 */
router.post('/send-verify-email', (0, _validate["default"])(_common.authValidation.sendVerifyEmail), _common2.authController.sendVerifyEmail);
/**
 * Token-based email verification
 * Verify email for successfully SignUp
 */
router.get('/verify-email', (0, _validate["default"])(_common.authValidation.verifyEmail), _common2.authController.verifyEmail);
/**
 * If User is successfully signup and Verified OTP then can login with Credential.
 */
router.post('/login', (0, _validate["default"])(_common.authValidation.login), _common2.authController.login);

/**
 * get the Current LoggedIn UserInfo using token
 */
router.get('/me', _common2.authController.userInfo);

/**
 * When user is created from BE while sending email then user can change password
 */
router.post('/enforce-password', (0, _auth["default"])(), (0, _validate["default"])(_common.authValidation.enforcePassword), _common2.authController.enforcePassword);

/**
 *User gets the verification email to reset Password
 */
router.post('/forgot-password', (0, _validate["default"])(_common.authValidation.forgotPassword), _common2.authController.forgotPassword);

/**
 * Reset the password for the user
 */
router.post('/reset-password', (0, _validate["default"])(_common.authValidation.resetPassword), _common2.authController.resetPassword);
module.exports = router;