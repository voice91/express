"use strict";

var _express = _interopRequireDefault(require("express"));
var _passport = _interopRequireDefault(require("passport"));
var _auth = _interopRequireDefault(require("../../../../middlewares/auth"));
var _validate = _interopRequireDefault(require("../../../../middlewares/validate"));
var _lender = require("../../../../validations/lender");
var _lender2 = require("../../../../controllers/lender");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import verifyCaptcha from 'middlewares/captcha';
var router = _express["default"].Router();
/**
 * Register API
 */
router.post('/register', (0, _validate["default"])(_lender.authValidation.register), /* verifyCaptcha('captcha'), // we have disable the captcha so that nothing will break in the code. */
_lender2.authController.register);
/**
 * Token-based verification
 * If User did not receive Email during register then call this API Again
 */
router.post('/send-verify-email', (0, _validate["default"])(_lender.authValidation.sendVerifyEmail), _lender2.authController.sendVerifyEmail);
/**
 * OTP-based verification
 * If User did not receive Email during register then call this API Again
 */
router.post('/send-verify-otp', (0, _validate["default"])(_lender.authValidation.sendVerifyEmail), _lender2.authController.sendVerifyOtp);
/**
 * OTP-based verification
 * Verify OTP for successfully Signup
 */
router.post('/verify-otp', (0, _validate["default"])(_lender.authValidation.verifyOtp), _lender2.authController.verifyOtp);
/**
 * Token-based email verification
 * Verify email for successfully SignUp
 */
router.get('/verify-email', (0, _validate["default"])(_lender.authValidation.verifyEmail), _lender2.authController.verifyEmail);
/**
 * If User is successfully signup and Verified OTP then can login with Credential.
 */
router.post('/login', (0, _validate["default"])(_lender.authValidation.login), _lender2.authController.login);
/**
 * get the Current LoggedIn UserInfo
 */
router.get('/me', (0, _auth["default"])(), _lender2.authController.userInfo);
/**
 * update the Current UserInfo
 */
router.put('/me', (0, _auth["default"])(), _lender2.authController.updateUserInfo);
/**
 * OTP-based verification
 * When User Forgot Password call this API and he get the OTP in his Email to reset Password
 */
router.post('/forgot-password', (0, _validate["default"])(_lender.authValidation.forgotPassword), _lender2.authController.forgotPassword);
/**
 * Token-based Verification
 * When User Forgot Password call this API, and user get the verification email to reset Password
 */
router.post('/forgot-password-based-on-token', (0, _validate["default"])(_lender.authValidation.forgotPassword), _lender2.authController.forgotPasswordToken);
/**
 * Token-based Verification
 * verify that code is for changePassword is Valid.
 */
router.post('/verify-reset-code', (0, _validate["default"])(_lender.authValidation.verifyCode), _lender2.authController.verifyResetCode);
/**
 * OTP-based verification
 * verify that OTP is for changePassword is Valid.
 */
router.post('/verify-reset-otp', (0, _validate["default"])(_lender.authValidation.resetPasswordOtpVerify), _lender2.authController.resetPasswordOtpVerify);
/**
 * OTP-based verification
 * Reset the password Using the OTP and Email provided by User.
 */
router.post('/reset-password', (0, _validate["default"])(_lender.authValidation.resetPasswordOtp), _lender2.authController.resetPasswordOtp);
/**
 * Token-based Verification
 * Reset the password Using the Token and Email provided by Use
 */
router.post('/reset-password-based-on-token', (0, _validate["default"])(_lender.authValidation.resetPasswordToken), _lender2.authController.resetPasswordToken);
/**
 * Get the Refresh Token for the User
 */
router.post('/refresh-tokens', (0, _validate["default"])(_lender.authValidation.refreshTokens), _lender2.authController.refreshTokens);
/**
 * Register device token Api
 */
router.post('/register-device-token', (0, _auth["default"])(), (0, _validate["default"])(_lender.authValidation.createDeviceToken), _lender2.authController.registerDeviceToken);
/**
 * Update device token Api
 */
router.post('/update-device-token', (0, _auth["default"])(), (0, _validate["default"])(_lender.authValidation.updateDeviceToken), _lender2.authController.updateDeviceToken);
/**
 * Logout the API for the User
 */
router.post('/logout', (0, _auth["default"])(), (0, _validate["default"])(_lender.authValidation.logout), _lender2.authController.logout);
/**
 * Google login API for the User
 */
router.post('/google', (0, _validate["default"])(_lender.authValidation.googleLogin), _passport["default"].authenticate('google-token', {
  session: false,
  json: true
}), _lender2.authController.socialLogin);
module.exports = router;