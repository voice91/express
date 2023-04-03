/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from './plugins';

const DealNotesSchema = new mongoose.Schema(
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
     * Deals on which Note is created
     * */
    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deal',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    pinnedByUsers: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    flagedByUser: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    content: {
      type: String,
    },
    lastReadBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
  },
  { timestamps: { createdAt: true, updatedAt: true }, autoCreate: true }
);

DealNotesSchema.plugin(toJSON);
DealNotesSchema.plugin(mongoosePaginateV2);
DealNotesSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const DealNotesModel = mongoose.models.DealNotes || mongoose.model('DealNotes', DealNotesSchema, 'DealNotes');
module.exports = DealNotesModel;
