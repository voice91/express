import express from 'express';
import { feedbackController } from "../../../../controllers/user";
import { feedbackValidation } from "../../../../validations/user";
import validate from "../../../../middlewares/validate";
import auth from "../../../../middlewares/auth";
const router = express.Router();
router.route('/')
/**
 * createFeedback
 * */.post(auth('user'), validate(feedbackValidation.createFeedback), feedbackController.create);
export default router;