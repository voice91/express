/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from './plugins';

const FAQSchema = new mongoose.Schema(
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
    // TODO: Question is send by system or user need to ask Client
    /**
     * Topic Title of FAQ
     * */
    question: {
      type: String,
    },
    userId: {
      type: String,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true }, autoCreate: true }
);
FAQSchema.plugin(toJSON);
FAQSchema.plugin(mongoosePaginateV2);
FAQSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const FAQModel = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema, 'FAQ');
module.exports = FAQModel;