"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
// import multer from 'multer';

// import { importFileController } from 'controllers/common';
// import auth from 'middlewares/auth';

// const upload = multer({ dest: 'uploads/' });
var router = (0, _express["default"])();
/**
 * FileUpload
 * */
// router.post('/', auth('advisor'), upload.single('file'), importFileController.importDataFromFile);
module.exports = router;