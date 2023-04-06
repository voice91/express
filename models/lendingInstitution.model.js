/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import enumModel from 'models/enum.model';
import { toJSON, softDelete } from './plugins';

const LendingInstitutionSchema = new mongoose.Schema(
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
     * The name of the bank (there are some banks with same name so will need another field to differentiate in the database)
     * */
    lenderNameVisible: {
      type: String,
      required: true,
    },
    /**
     * The internal name in the database to avoid potential naming conflicts.
     * */
    lenderNameInternal: {
      type: String,
      required: true,
    },
    /**
     * Type of lender
     * */
    lenderType: {
      type: String,
      enum: Object.values(enumModel.EnumLenderTypeOfLendingInstitution),
      required: true,
    },
    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deal',
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true }, autoCreate: true }
);
LendingInstitutionSchema.plugin(toJSON);
LendingInstitutionSchema.plugin(mongoosePaginateV2);
LendingInstitutionSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const LendingInstitutionModel =
  mongoose.models.LendingInstitution || mongoose.model('LendingInstitution', LendingInstitutionSchema, 'LendingInstitution');
module.exports = LendingInstitutionModel;
