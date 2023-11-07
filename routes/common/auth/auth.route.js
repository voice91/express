import express from 'express';
import validate from 'middlewares/validate';
import { authValidation } from 'validations/common';
import { authController } from 'controllers/common';
import auth from 'middlewares/auth';

const router = express.Router();
/**
 * Register API
 */
router.post('/register', auth('advisor'), validate(authValidation.register), authController.register);
/**
 * Token-based verification
 * If User did not receive Email during register then call this API Again
 */
router.post('/send-verify-email', validate(authValidation.sendVerifyEmail), authController.sendVerifyEmail);
/**
 * Token-based email verification
 * Verify email for successfully SignUp
 */
router.get('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
/**
 * If User is successfully signup and Verified OTP then can login with Credential.
 */
router.post('/login', validate(authValidation.login), authController.login);

/**
 * get the Current LoggedIn UserInfo using token
 */
router.get('/me', auth(), authController.userInfo);

/**
 * When user is created from BE while sending email then user can change password
 */
router.post('/enforce-password', auth(), validate(authValidation.enforcePassword), authController.enforcePassword);

/**
 *User gets the verification email to reset Password
 */
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);

/**
 * Reset the password for the user
 */
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);

module.exports = router;
