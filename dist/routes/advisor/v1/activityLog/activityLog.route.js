import express from 'express';
import { activityLogController } from "../../../../controllers/advisor";
import { activityLogValidation } from "../../../../validations/advisor";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createActivityLog
 * */.post(auth('advisor'), validate(activityLogValidation.createActivityLog), activityLogController.create)
/**
 * getActivityLog
 * */.get(auth('advisor'), validate(activityLogValidation.getActivityLog), activityLogController.list);
router.route('/paginated')
/**
 * getActivityLogPaginated
 * */.get(auth('advisor'), validate(activityLogValidation.paginatedActivityLog), activityLogController.paginate);
router.route('/:activityLogId')
/**
 * getActivityLogById
 * */.get(auth('advisor'), validate(activityLogValidation.getActivityLogById), activityLogController.get)
/**
 * updateActivityLog
 * */.put(auth('advisor'), validate(activityLogValidation.updateActivityLog), activityLogController.update)
/**
 * deleteActivityLogById
 * */.delete(auth('advisor'), validate(activityLogValidation.deleteActivityLogById), activityLogController.remove);
export default router;