import express from 'express';

import s3Routes from './common/aws/s3.route';

import docsRoutes from './common/docs/swagger.route';

import searchRoutes from './common/search/search.route';

import ratesRoutes from './common/rates/rates.route';

import authRoutes from './common/auth/auth.route';

import importFileRoutes from './common/importFile/importFile.route';

import exportDBRoutes from './common/ExportDB/exportDB.route';

import wehbookRoutes from './common/wehbook/wehbook.route';

import addUsersRoute from './common/addUsers/addUsers.route';

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
router.use('/rates', ratesRoutes);
router.use('/importFile', importFileRoutes);
router.use('/exportDB', exportDBRoutes);
router.use('/auth', authRoutes);
router.use('/wehbook', wehbookRoutes);
router.use('/add-users', addUsersRoute);
module.exports = router;
