import express from 'express';
import { activityLogController } from "../../../../controllers/user";
import { activityLogValidation } from "../../../../validations/user";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createActivityLog
 * */.post(auth('user'), validate(activityLogValidation.createActivityLog), activityLogController.create)
/**
 * getActivityLog
 * */.get(auth('user'), validate(activityLogValidation.getActivityLog), activityLogController.list);
router.route('/paginated')
/**
 * getActivityLogPaginated
 * */.get(auth('user'), validate(activityLogValidation.paginatedActivityLog), activityLogController.paginate);
router.route('/:activityLogId')
/**
 * getActivityLogById
 * */.get(auth('user'), validate(activityLogValidation.getActivityLogById), activityLogController.get)
/**
 * updateActivityLog
 * */.put(auth('user'), validate(activityLogValidation.updateActivityLog), activityLogController.update)
/**
 * deleteActivityLogById
 * */.delete(auth('user'), validate(activityLogValidation.deleteActivityLogById), activityLogController.remove);
export default router;