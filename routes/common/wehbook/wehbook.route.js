import express from 'express';
import { wehbookController } from 'controllers/common';

const router = express();

router.post('/', wehbookController.list);
module.exports = router;
