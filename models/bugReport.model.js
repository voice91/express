/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from './plugins';

const BugReportSchema = new mongoose.Schema(
  {
    /**
     * created By
     * */
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    /**
     * updated By
     * */
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    /**
     * System Operation for Bug Report
     * */
    systemOperation: {
      type: String,
      required: true,
    },
    /**
     * Browser for Bug Report
     * */
    browser: {
      required: true,
      type: String,
    },
    /**
     * Description of Bug Report
     * */
    description: {
      required: true,
      type: String,
    },
    /**
     * Image for Bug Report
     * */
    images: {
      type: [String],
    },
  },
  { timestamps: { createdAt: true, updatedAt: true }, autoCreate: true }
);
BugReportSchema.plugin(toJSON);
BugReportSchema.plugin(mongoosePaginateV2);
BugReportSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const BugReportModel = mongoose.models.BugReport || mongoose.model('BugReport', BugReportSchema, 'BugReport');
module.exports = BugReportModel;
