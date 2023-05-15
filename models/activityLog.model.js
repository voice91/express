/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from './plugins';
import enumModel from './enum.model';

const ActivityLogSchema = new mongoose.Schema(
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
     * ID linked to a specific deal
     * */
    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deal',
      required: true,
    },
    lender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LendingInstitution',
    },
    /**
     * There will be certain messages that the system will generate at specific times
     * */
    update: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(enumModel.EnumOfActivityType),
    },
    user: {
      type: String,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true }, autoCreate: true, toJSON: { virtuals: true } }
);

ActivityLogSchema.plugin(toJSON);
ActivityLogSchema.plugin(mongoosePaginateV2);
ActivityLogSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const ActivityLogModel = mongoose.models.ActivityLog || mongoose.model('ActivityLog', ActivityLogSchema, 'ActivityLog');
module.exports = ActivityLogModel;
