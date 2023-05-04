import express from 'express';
import validate from 'middlewares/validate';
import { authValidation } from 'validations/common';
import { authController } from 'controllers/common';

const router = express.Router();
/**
 * Register API
 */
router.post('/register', validate(authValidation.register), authController.register);
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

module.exports = router;
