import express from 'express';
import { addUserController } from 'controllers/common';
import { addUserValidation } from 'validations/common';
import validate from 'middlewares/validate';
import auth from 'middlewares/auth';

const router = express();

router.post('/', auth(), validate(addUserValidation.addUser), addUserController.addUser);
module.exports = router;
