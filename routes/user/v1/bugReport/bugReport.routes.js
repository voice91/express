import express from 'express';
import { bugReportController } from 'controllers/user';
import { bugReportValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createBugReport
   * */
  .post(auth('user'), validate(bugReportValidation.createBugReport), bugReportController.create);
export default router;
