import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const search = {
  query: Joi.object()
    .keys({
      page: Joi.number().default(1),
      limit: Joi.number().default(10).max(100),
      sort: Joi.string(),
      search: Joi.string(),
    })
    .unknown(true),
};
