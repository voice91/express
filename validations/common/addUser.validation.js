import Joi from 'joi';
import enumFields from '../../models/enum.model';

// eslint-disable-next-line import/prefer-default-export
export const addUser = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().email().required(),
    role: Joi.string().valid(...Object.values(enumFields.EnumRoleOfUser)),
    password: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phoneNumber: Joi.string(),
    companyName: Joi.string().required(),
    companyAddress: Joi.string(),
    city: Joi.string(),
    state: Joi.string().valid(...Object.values(enumFields.EnumStatesOfDeal)),
    zipcode: Joi.number().integer().min(100).max(999999),
    lastSignIn: Joi.date(),
    profilePhoto: Joi.string(),
    emailPresentingPostmark: Joi.bool().default(false),
  }),
};
