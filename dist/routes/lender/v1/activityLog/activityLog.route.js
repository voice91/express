import express from 'express';
import { activityLogController } from "../../../../controllers/lender";
import { activityLogValidation } from "../../../../validations/lender";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createActivityLog
 * */.post(auth('lender'), validate(activityLogValidation.createActivityLog), activityLogController.create)
/**
 * getActivityLog
 * */.get(auth('lender'), validate(activityLogValidation.getActivityLog), activityLogController.list);
router.route('/paginated')
/**
 * getActivityLogPaginated
 * */.get(auth('lender'), validate(activityLogValidation.paginatedActivityLog), activityLogController.paginate);
router.route('/:activityLogId')
/**
 * getActivityLogById
 * */.get(auth('lender'), validate(activityLogValidation.getActivityLogById), activityLogController.get)
/**
 * updateActivityLog
 * */.put(auth('lender'), validate(activityLogValidation.updateActivityLog), activityLogController.update)
/**
 * deleteActivityLogById
 * */.delete(auth('lender'), validate(activityLogValidation.deleteActivityLogById), activityLogController.remove);
export default router;