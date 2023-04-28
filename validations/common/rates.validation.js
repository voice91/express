import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const rates = {
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
      sort: Joi.string(),
    })
    .unknown(true),
};
