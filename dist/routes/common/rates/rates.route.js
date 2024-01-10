import express from 'express';
import auth from "../../../middlewares/auth";
import { ratesController } from "../../../controllers/common";
const router = express();
router.get('/', auth(), ratesController.rates);
module.exports = router;