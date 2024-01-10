import express from 'express';
import { webhookController } from "../../../controllers/common";
const router = express();
router.post('/post-mark', webhookController.processEmailMessage);
module.exports = router;