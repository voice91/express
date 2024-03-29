/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from './plugins';

const EmailTemplateSchema = new mongoose.Schema(
  {
    templateName: {
      type: String,
    },

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
    from: {
      type: String,
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    contact: [
      {
        sendTo: {
          type: String,
          match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        },
        name: String,
      },
    ],
    advisorName: {
      type: String,
    },
    totalLoanAmount: {
      type: Number,
    },
    /**
     * Free text for the email subject line
     * */
    subject: {
      type: String,
    },
    /**
     * List of email addresses to copy on the email
     * */
    ccList: {
      type: [String],
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    bccList: {
      type: [String],
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
    },
    dealDocument: [
      {
        ref: 'DealDocument',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    /**
     * Body of the email (will need to include formatting as it is email body)
     * */
    emailContent: {
      type: String,
    },
    lenderPlacement: {
      ref: 'LenderPlacement',
      type: mongoose.Schema.Types.ObjectId,
    },
    deal: {
      ref: 'Deal',
      type: mongoose.Schema.Types.ObjectId,
    },
    isFirstTime: {
      type: Boolean,
    },
    isEmailSent: {
      type: Boolean,
    },
    isBlankTemplate: {
      type: Boolean,
      default: false,
    },
    /**
     * List of documents that will be attached to the email
     * */
    emailAttachments: [
      {
        dealDocumentId: {
          ref: 'DealDocument',
          type: mongoose.Schema.Types.ObjectId,
        },
        fileName: String,
        path: String,
        fileType: String,
      },
    ],
  },
  { timestamps: { createdAt: true, updatedAt: true }, autoCreate: true }
);
EmailTemplateSchema.index({ lenderPlacement: 1, templateName: -1 }, { unique: true });
EmailTemplateSchema.plugin(toJSON);
EmailTemplateSchema.plugin(mongoosePaginateV2);
EmailTemplateSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const EmailTemplateModel =
  mongoose.models.EmailTemplate || mongoose.model('EmailTemplate', EmailTemplateSchema, 'EmailTemplate');
module.exports = EmailTemplateModel;
