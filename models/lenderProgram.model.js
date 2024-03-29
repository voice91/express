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

const LenderProgramSchema = new mongoose.Schema(
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
     * The type of lender program
     * */
    lenderProgramType: {
      type: String,
    },
    /**
     * List of all the states in the US where the lender will lend for the given program
     * */
    statesArray: {
      type: [String],
      enum: Object.values(enumModel.EnumStatesOfDeal),
      required: true,
    },
    statesArrTag: [
      {
        type: Number,
        default: 1,
      },
    ],
    /**
     * The minimum loan amount for the given program
     * */
    minLoanSize: {
      type: Number,
      min: 100000,
      max: 1000000000,
    },
    minLoanTag: {
      type: Number,
      default: 1,
    },
    /**
     * The maximum loan amount for the given program
     * */
    maxLoanSize: {
      type: Number,
      min: 100000,
      max: 1000000000,
    },
    maxLoanTag: {
      type: Number,
      default: 1,
    },
    propertyType: {
      type: [String],
      enum: Object.values(enumModel.EnumAssetTypeOfDeal),
      required: true,
    },
    propTypeArrTag: {
      type: [Number],
      default: 1,
    },
    doesNotLandOn: {
      type: [String],
      enum: Object.values(enumModel.EnumAssetTypeOfDeal),
    },
    doesNotLandOnArrTag: {
      type: [Number],
      default: 1,
    },
    loanType: {
      type: [String],
      enum: Object.values(enumModel.EnumLoanTypeOfDeal),
    },
    loanTypeArrTag: {
      type: [Number],
      default: 1,
    },
    lenderInstitute: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LendingInstitution',
    },
    indexUsed: {
      type: String,
    },
    spreadEstimate: {
      type: Number,
    },
    counties: {
      type: [String],
    },
    recourseRequired: {
      type: String,
      default: 'No',
    },
    nonRecourseLTV: {
      type: String,
    },
  },
  { timestamps: { createdAt: true, updatedAt: true }, autoCreate: true }
);

LenderProgramSchema.plugin(toJSON);
LenderProgramSchema.plugin(mongoosePaginateV2);
LenderProgramSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const LenderProgramModel =
  mongoose.models.LenderProgram || mongoose.model('LenderProgram', LenderProgramSchema, 'LenderProgram');
module.exports = LenderProgramModel;
