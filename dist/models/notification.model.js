/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from "./plugins";
const NotificationSchema = new mongoose.Schema({
  /**
   * created By
   * */
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  /**
   * updated By
   * */
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deal'
  },
  message: {
    type: String
  },
  isClear: {
    type: Boolean,
    default: false
  },
  isReadable: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  autoCreate: true
});
NotificationSchema.plugin(toJSON);
NotificationSchema.plugin(mongoosePaginateV2);
NotificationSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt'
});
const NotificationModel = mongoose.models.Notifications || mongoose.model('Notifications', NotificationSchema, 'Notifications');
module.exports = NotificationModel;