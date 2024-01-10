import express from 'express';
import { userController } from "../../../../controllers/user";
import { userValidation } from "../../../../validations/user";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createUser
 * */.post(auth('user'), validate(userValidation.createUser), userController.create)
/**
 * getUser
 * */.get(auth('user'), validate(userValidation.getUser), userController.list)
/**
 * updateUser
 * */.put(auth('user'), validate(userValidation.updateUser), userController.update);
router.route('/paginated')
/**
 * getUserPaginated
 * */.get(auth('user'), validate(userValidation.paginatedUser), userController.paginate);
router.route('/:userId')
/**
 * getUserById
 * */.get(auth('user'), validate(userValidation.getUserById), userController.get)
/**
 * deleteUserById
 * */.delete(auth('user'), validate(userValidation.deleteUserById), userController.remove);
export default router;