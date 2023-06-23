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
    nickName: {
      type: String,
    },
    /**
     * Email of the contact
     * */
    email: {
      type: String,
      // eslint-disable-next-line security/detect-unsafe-regex
      match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      unique: true,
      required: true,
    },
    emailTag: {
      type: Number,
      default: 1,
    },
    contactTag: {
      type: Number,
      default: 1,
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
     * officeStreetAddress of the contact
     * */
    officeStreetAddress: {
      type: String,
    },
    /**
     * city of the address of the contact
     * */
    city: {
      type: String,
      required: true,
      maxLength: 30,
    },
    /**
     * State of the contact
     * */
    state: {
      type: String,
      enum: Object.values(enumModel.EnumStatesOfDeal),
      required: true,
    },
    /**
     * Zipcode of the address of the contact
     */
    zipcode: {
      type: Number,
      min: 10000,
      max: 99999,
    },
    /**
     * Free text
     * */
    note: {
      type: String,
    },
    programs: {
      type: [String],
    },
    lenderInstitute: {
      type: mongoose.Schema.Types.ObjectId,
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

LenderContactSchema.statics.isEmailTaken = async function (email, excludeLenderContactId) {
  const lenderContact = await this.findOne({ email, _id: { $ne: excludeLenderContactId } });
  return !!lenderContact;
};

const LenderContactModel =
  mongoose.models.LenderContact || mongoose.model('LenderContact', LenderContactSchema, 'LenderContact');
module.exports = LenderContactModel;
