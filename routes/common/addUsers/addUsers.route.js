import express from 'express';
import { addUsersController } from 'controllers/common';
import { addUsersValidation } from 'validations/common';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express();

router.post('/', auth(), validate(addUsersValidation.addUsers), addUsersController.addUsers);
module.exports = router;
