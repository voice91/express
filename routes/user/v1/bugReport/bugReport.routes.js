import express from 'express';
import { bugReportController } from 'controllers/user';
import { bugReportValidation } from 'validations/user';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express.Router();
router
  .route('/')
  /**
   * createActivityLog
   * */
  .post(auth('user'), validate(bugReportValidation.createBugReport), bugReportController.create);
export default router;
