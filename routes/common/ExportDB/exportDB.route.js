import express from 'express';
import { exportDBController } from 'controllers/common';

const router = express();
/**
 * Export Database to Excel
 * */
router.get('/', exportDBController.exportToExcel);
module.exports = router;
