import express from 'express';
import auth from 'middlewares/auth';
import validate from 'middlewares/validate';
import { searchController } from 'controllers/common';
import { searchValidation } from 'validations/common';

const router = express();

router.get(
  '/universal-search',
  auth(),
  validate(searchValidation.search),
  searchController.getDealsAndLendersForUniversalSearch
);
module.exports = router;
