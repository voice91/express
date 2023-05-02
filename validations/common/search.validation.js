import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const search = {
  query: Joi.object().keys({
    searchValue: Joi.string(),
  }),
};
