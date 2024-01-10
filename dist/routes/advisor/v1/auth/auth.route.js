"use strict";

var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _auth = _interopRequireDefault(require("../../../../middlewares/auth"));
var _validate = _interopRequireDefault(require("../../../../middlewares/validate"));
var _advisor = require("../../../../validations/advisor");
var _advisor2 = require("../../../../controllers/advisor");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import verifyCaptcha from 'middlewares/captcha';
var router = _express["default"].Router();
/**
 * Register API
 */
router.post('/register', (0, _validate["default"])(_advisor.authValidation.register), /* verifyCaptcha('captcha'), // we have disable the captcha so that nothing will break in the code. */
_advisor2.authController.register);

/**
 * Token-based verification
 * If User did not receive Email during register then call this API Again
 */
router.post('/send-verify-email', (0, _validate["default"])(_advisor.authValidation.sendVerifyEmail), _advisor2.authController.sendVerifyEmail);
/**
 * OTP-based verification
 * If User did not receive Email during register then call this API Again
 */
router.post('/send-verify-otp', (0, _validate["default"])(_advisor.authValidation.sendVerifyEmail), _advisor2.authController.sendVerifyOtp);
/**
 * OTP-based verification
 * Verify OTP for successfully Signup
 */
router.post('/verify-otp', (0, _validate["default"])(_advisor.authValidation.verifyOtp), _advisor2.authController.verifyOtp);
/**
 * Token-based email verification
 * Verify email for successfully SignUp
 */
router.get('/verify-email', (0, _validate["default"])(_advisor.authValidation.verifyEmail), _advisor2.authController.verifyEmail);
/**
 * If User is successfully signup and Verified OTP then can login with Credential.
 */
router.post('/login', (0, _validate["default"])(_advisor.authValidation.login), _advisor2.authController.login);
/**
 * get the Current LoggedIn UserInfo
 */
router.get('/me', (0, _auth["default"])(), _advisor2.authController.userInfo);
/**
 * update the Current UserInfo
 */
router.put('/me', (0, _auth["default"])(), _advisor2.authController.updateUserInfo);
/**
 * OTP-based verification
 * When User Forgot Password call this API and he get the OTP in his Email to reset Password
 */
router.post('/forgot-password', (0, _validate["default"])(_advisor.authValidation.forgotPassword), _advisor2.authController.forgotPassword);
/**
 * Token-based Verification
 * When User Forgot Password call this API, and user get the verification email to reset Password
 */
router.post('/forgot-password-based-on-token', (0, _validate["default"])(_advisor.authValidation.forgotPassword), _advisor2.authController.forgotPasswordToken);
/**
 * Token-based Verification
 * verify that code is for changePassword is Valid.
 */
router.post('/verify-reset-code', (0, _validate["default"])(_advisor.authValidation.verifyCode), _advisor2.authController.verifyResetCode);
/**
 * OTP-based verification
 * verify that OTP is for changePassword is Valid.
 */
router.post('/verify-reset-otp', (0, _validate["default"])(_advisor.authValidation.resetPasswordOtpVerify), _advisor2.authController.resetPasswordOtpVerify);
/**
 * OTP-based verification
 * Reset the password Using the OTP and Email provided by User.
 */
router.post('/reset-password', (0, _validate["default"])(_advisor.authValidation.resetPasswordOtp), _advisor2.authController.resetPasswordOtp);
/**
 * Token-based Verification
 * Reset the password Using the Token and Email provided by Use
 */
router.post('/reset-password-based-on-token', (0, _validate["default"])(_advisor.authValidation.resetPasswordToken), _advisor2.authController.resetPasswordToken);
/**
 * Get the Refresh Token for the User
 */
router.post('/refresh-tokens', (0, _validate["default"])(_advisor.authValidation.refreshTokens), _advisor2.authController.refreshTokens);
/**
 * Register device token Api
 */
router.post('/register-device-token', (0, _auth["default"])(), (0, _validate["default"])(_advisor.authValidation.createDeviceToken), _advisor2.authController.registerDeviceToken);
/**
 * Update device token Api
 */
router.post('/update-device-token', (0, _auth["default"])(), (0, _validate["default"])(_advisor.authValidation.updateDeviceToken), _advisor2.authController.updateDeviceToken);
/**
 * Logout the API for the User
 */
router.post('/logout', (0, _auth["default"])(), (0, _validate["default"])(_advisor.authValidation.logout), _advisor2.authController.logout);
/**
 * Google login API for the User
 */
router.post('/google', (0, _validate["default"])(_advisor.authValidation.googleLogin), _passport["default"].authenticate('google-token', {
  session: false,
  json: true
}), _advisor2.authController.socialLogin);
module.exports = router;