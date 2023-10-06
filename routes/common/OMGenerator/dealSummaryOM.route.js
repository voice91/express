import express from 'express';
import { dealSummaryOMController } from '../../../controllers/common';
import validateInternalToken from '../../../middlewares/internalToken';

const router = express();

router.get('/OM/:dealId', validateInternalToken, dealSummaryOMController.dealSummaryOM);
module.exports = router;
