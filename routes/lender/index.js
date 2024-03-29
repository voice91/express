import express from 'express';
import userRoutes from './v1/user/user.route';
import dealRoutes from './v1/deal/deal.route';
import dealNotesRoutes from './v1/dealNotes/dealNotes.route';
import lenderProgramRoutes from './v1/lenderProgram/lenderProgram.route';
import lendingInstitutionRoutes from './v1/lendingInstitution/lendingInstitution.route';
import lenderPlacementRoutes from './v1/lenderPlacement/lenderPlacement.route';
import lenderContactRoutes from './v1/lenderContact/lenderContact.route';
import emailTemplateRoutes from './v1/emailTemplate/emailTemplate.route';
import activityLogRoutes from './v1/activityLog/activityLog.route';
import taskRoutes from './v1/task/task.route';
import dealDocumentRoutes from './v1/dealDocument/dealDocument.route';
import authRoutes from './v1/auth/auth.route';
import lenderNotesRoutes from './v1/lenderNotes/lenderNotes.route';
import dealSummaryRoutes from './v1/dealSummary/dealSummary.route';
import feedbackRoutes from './v1/feedback/feedback.routes';

const router = express.Router();
router.use('/user', userRoutes);
router.use('/deal', dealRoutes);
router.use('/dealNotes', dealNotesRoutes);
router.use('/lenderProgram', lenderProgramRoutes);
router.use('/lendingInstitution', lendingInstitutionRoutes);
router.use('/lenderPlacement', lenderPlacementRoutes);
router.use('/lenderContact', lenderContactRoutes);
router.use('/emailTemplate', emailTemplateRoutes);
router.use('/activityLog', activityLogRoutes);
router.use('/task', taskRoutes);
router.use('/dealDocument', dealDocumentRoutes);
router.use('/lenderNotes', lenderNotesRoutes);
router.use('/dealSummary', dealSummaryRoutes);
router.use('/auth', authRoutes);
router.use('/feedback', feedbackRoutes);
module.exports = router;
