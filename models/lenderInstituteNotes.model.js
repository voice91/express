/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from './plugins';

const LenderInstituteNotesSchema = new mongoose.Schema(
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
    content: {
      type: String,
    },
    lenderInstitute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LendingInstitution',
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

LenderInstituteNotesSchema.plugin(toJSON);
LenderInstituteNotesSchema.plugin(mongoosePaginateV2);
LenderInstituteNotesSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const LenderInstituteNotesModel =
  mongoose.models.LenderInstituteNotes ||
  mongoose.model('LenderInstituteNotes', LenderInstituteNotesSchema, 'LenderInstituteNotes');
module.exports = LenderInstituteNotesModel;
