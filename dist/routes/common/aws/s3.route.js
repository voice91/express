import express from 'express';
import auth from "../../../middlewares/auth";
import validate from "../../../middlewares/validate";
import { s3Controller } from "../../../controllers/common";
import { s3Validation } from "../../../validations/common";
const router = express();
/**
 * Create pre-signed url Api
 * */
router.post('/presignedurl', auth(), validate(s3Validation.preSignedPutUrl), s3Controller.preSignedPutUrl);

/**
 * get signed url Api to access the file
 * */
router.get('/get-signed-url', auth(), validate(s3Validation.getSignedUrl), s3Controller.getSignedUrl);
module.exports = router;