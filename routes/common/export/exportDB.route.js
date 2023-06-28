import express from 'express';
import { exportDBController } from 'controllers/common';
import auth from 'middlewares/auth';

const router = express();
/**
 * Export Database to Excel
 * */
router.get('/', auth('advisor'), exportDBController.exportToExcel);
module.exports = router;
