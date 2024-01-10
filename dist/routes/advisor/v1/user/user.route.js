import express from 'express';
import { userController } from "../../../../controllers/advisor";
import { userValidation } from "../../../../validations/advisor";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createUser
 * */.post(auth('advisor'), validate(userValidation.createUser), userController.create)
/**
 * getUser
 * */.get(auth('advisor'), validate(userValidation.getUser), userController.list)
/**
 * updateUser
 * */.put(auth('advisor'), validate(userValidation.updateUser), userController.update);
router.route('/paginated')
/**
 * getUserPaginated
 * */.get(auth('advisor'), validate(userValidation.paginatedUser), userController.paginate);
router.route('/:userId')
/**
 * getUserById
 * */.get(auth('advisor'), validate(userValidation.getUserById), userController.get)
/**
 * deleteUserById
 * */.delete(auth('advisor'), validate(userValidation.deleteUserById), userController.remove);
export default router;