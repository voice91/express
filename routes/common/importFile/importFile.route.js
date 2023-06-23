import multer from 'multer';
import express from 'express';
import { importFileController } from '../../../controllers/common';

const upload = multer({ dest: 'uploads/' });
const router = express();
/**
 * FileUpload
 * */
router.post('/', upload.single('file'), importFileController.importDataFromFileV2);
module.exports = router;
