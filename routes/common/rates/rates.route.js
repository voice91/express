import express from 'express';
import auth from 'middlewares/auth';
import validate from 'middlewares/validate';
import { ratesController } from 'controllers/common';
import { ratesValidation } from 'validations/common';

const router = express();

router.get('/', auth(), validate(ratesValidation.rates), ratesController.rates);
module.exports = router;
