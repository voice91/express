import express from 'express';

// import s3Routes from './common/aws/s3.route';
//
// import docsRoutes from './common/docs/swagger.route';
//
// import searchRoutes from './common/search/search.route';
//
// import ratesRoutes from './common/rates/rates.route';

import authRoutes from './common/auth/auth.route';

// import importFileRoutes from './common/import/importFile.route';
//
// import exportDBRoutes from './common/export/exportDB.route';
//
// import webhookRoutes from './common/webhook/webhook.route';
//
// import addUserRoute from './common/addUser/addUser.route';
//
// import addLogoRoute from './common/addLogo/addLogo.route';
//
// import dealSummaryOMRoute from './common/OMGenerator/dealSummaryOM.route';

// const userRoutes = require('./user');
// const advisorRoutes = require('./advisor');
// const lenderRoutes = require('./lender');

const router = express.Router();
router.use('/auth', authRoutes);
// router.use('/user', userRoutes);
// router.use('/advisor', advisorRoutes);
// router.use('/lender', lenderRoutes);
// router.use('/s3', s3Routes);
// router.use('/docs', docsRoutes);
// router.use('/search', searchRoutes);
// router.use('/rates', ratesRoutes);
// router.use('/importFile', importFileRoutes);
// router.use('/exportDB', exportDBRoutes);
// router.use('/auth', authRoutes);
// router.use('/webhook', webhookRoutes);
// router.use('/add-user', addUserRoute);
// router.use('/add-logo', addLogoRoute);
// router.use('/deal-summary', dealSummaryOMRoute);
module.exports = router;
