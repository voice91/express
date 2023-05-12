/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import config from 'config/config';
import { toJSON, softDelete } from './plugins';

const LenderNotesSchema = new mongoose.Schema(
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
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      type: String,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isFlagged: {
      type: Boolean,
    },
    lastReadBy: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    lenderInstitute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LendingInstitution',
    },
    lenderPlacement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LenderPlacement',
    },
    isEnabled: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true }, toJSON: { virtuals: true } }
);
// TODO: we can pass var from option in place of taking update doc
// We don't want updatedAt to be changed when we pass the field isPinned and isFlagged as we are also sorting the notes by updatedAt field
LenderNotesSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate();
  // in operator is used to check if the field 'isPinned' or 'isFlagged' exist in the update object
  if ('isPinned' in update || 'isFlagged' in update) {
    delete update.$set.updatedAt;
  }
  next();
});
// Define the toJSON transform method for the LenderNotesSchema options object
LenderNotesSchema.options.toJSON.transform = function (doc, { createdAt, ...ret }) {
  if (createdAt) {
    const timeDiff = Date.now() - createdAt.getTime();
    if (timeDiff >= config.disabledTimeForNotes) {
      // Set isEnabled property to false
      // eslint-disable-next-line no-param-reassign
      ret.isEnabled = false;
    }
  }
  // Return the ret object
  return ret;
};

LenderNotesSchema.plugin(toJSON);
LenderNotesSchema.plugin(mongoosePaginateV2);
LenderNotesSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const LenderNotesModel = mongoose.models.LenderNotes || mongoose.model('LenderNotes', LenderNotesSchema, 'LenderNotes');
module.exports = LenderNotesModel;
