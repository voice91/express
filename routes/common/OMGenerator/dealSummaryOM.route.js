import express from 'express';
import { dealSummaryOMController } from '../../../controllers/common';
import validateInternalToken from '../../../middlewares/internalToken';

const router = express();

/**
 * @deprecated
 * This route is no longer in use as we are creating the OM from FE.
 */
router.get('/OM/:dealId', validateInternalToken, dealSummaryOMController.dealSummaryOM);
module.exports = router;
