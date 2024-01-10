// import multer from 'multer';
import express from 'express';
// import { importFileController } from 'controllers/common';
// import auth from 'middlewares/auth';

// const upload = multer({ dest: 'uploads/' });
const router = express();
/**
 * FileUpload
 * */
// router.post('/', auth('advisor'), upload.single('file'), importFileController.importDataFromFile);
module.exports = router;
