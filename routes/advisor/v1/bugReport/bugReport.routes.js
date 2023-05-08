import express from 'express';
import { bugReportController } from 'controllers/advisor';
import { bugReportValidation } from 'validations/advisor';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createBugReport
   * */
  .post(auth('advisor'), validate(bugReportValidation.createBugReport), bugReportController.create);
export default router;
