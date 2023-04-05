/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from './plugins';

const LenderContactSchema = new mongoose.Schema(
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
     * First name of the contact
     * */
    firstName: {
      type: String,
      required: true,
    },
    /**
     * Last name of the contact
     * */
    lastName: {
      type: String,
      required: true,
    },
    /**
     * The first name that will be used in the email send-outs
     * */
    nickname: {
      type: String,
    },
    /**
     * Email of the contact
     * */
    email: {
      type: String,
      // eslint-disable-next-line security/detect-unsafe-regex
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      required: true,
    },
    /**
     * Free text with a combination of country code and phone number
     * */
    phoneNumberDirect: {
      type: String,
    },
    /**
     * Free text with a combination of country code and phone number
     * */
    phoneNumberOffice: {
      type: String,
    },
    /**
     * Free text with a combination of country code and phone number
     * */
    phoneNumberCell: {
      type: String,
    },
    /**
     * title of the contact at the lending institution
     * */
    title: {
      type: String,
    },
    /**
     * city and state of the address of the contact
     * */
    city: {
      type: String,
    },
    /**
     * Free text
     * */
    note: {
      type: String,
    },
    /**
     * State of the contact
     * */
    state: {
      type: String,
    },
    lendingInstitute: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'LendingInstitution',
    },
  },
  { timestamps: { createdAt: true, updatedAt: true }, autoCreate: true }
);
LenderContactSchema.plugin(toJSON);
LenderContactSchema.plugin(mongoosePaginateV2);
LenderContactSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const LenderContactModel =
  mongoose.models.LenderContact || mongoose.model('LenderContact', LenderContactSchema, 'LenderContact');
module.exports = LenderContactModel;
