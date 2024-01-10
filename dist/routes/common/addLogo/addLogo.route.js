import express from 'express';
import { addLogoController } from "../../../controllers/common";
import auth from "../../../middlewares/auth";
const router = express();
router.post('/', auth(), addLogoController.addLogo);
module.exports = router;