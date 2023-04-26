import express from 'express';

import s3Routes from './common/aws/s3.route';

import docsRoutes from './common/docs/swagger.route';

import searchRoutes from './common/search/search.route';

const userRoutes = require('./user');
const advisorRoutes = require('./advisor');
const lenderRoutes = require('./lender');

const router = express.Router();
router.use('/user', userRoutes);
router.use('/advisor', advisorRoutes);
router.use('/lender', lenderRoutes);
router.use('/s3', s3Routes);
router.use('/docs', docsRoutes);
router.use('/search', searchRoutes);
module.exports = router;
