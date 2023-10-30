/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose, { Schema } from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import enumModel from 'models/enum.model';
import { toJSON, softDelete } from './plugins';
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
const InvolvedUserSchema = new mongoose.Schema({
  /**
   *ObjecIds from User collection in the respective section
   * */
  lenders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  /**
   *ObjecIds from User collection in the respective section
   * */
  borrowers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  /**
   *ObjecIds from User collection in the respective section
   * */
  advisors: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
});
const pointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});
const TimeLineSchema = new mongoose.Schema({
  stage: {
    type: String,
    enum: Object.values(enumModel.EnumStageOfDeal),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});
const DealSchema = new mongoose.Schema(
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
     * Name/Title of property on which deal need to be created
     * */
    dealName: {
      type: String,
      required: true,
    },
    stage: {
      type: String,
      enum: Object.values(enumModel.EnumStageOfDeal),
      default: enumModel.EnumStageOfDeal.NEW,
    },
    /**
     * Address of the property stored as free text
     * */
    address: {
      type: String,
      required: true,
      maxLength: 100,
    },
    /**
     * city name
     * */
    city: {
      type: String,
      required: true,
      maxLength: 30,
    },
    /**
     * state name
     * */
    state: {
      type: String,
      enum: Object.values(enumModel.EnumStatesOfDeal),
      required: true,
    },
    /**
     * zip code
     * */
    zipcode: {
      type: String,
      required: true,
      match: /^[0-9]{5}$/, // Regular expression to ensure it's 5 digits
    },
    /**
     * map co-ordinates to be stored as the exact location
     * */
    mapLocation: pointSchema,
    /**
     * hashmap of users involved in the deal. Collection of user-ids (ObjecIds from User collection) in the respective section
     * */
    involvedUsers: {
      type: InvolvedUserSchema,
      required: true,
    },
    /**
     * list of user ids involved (lender) in the deal
     * */
    involvedUsersLender: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    /**
     * list of user ids involved (borrower) in the deal
     * */
    involvedUsersBorrower: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    /**
     * list of user ids involved (advisor) in the deal
     * */
    involvedUsersAdvisor: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'User',
    },
    /**
     * Property Type
     * */
    assetType: {
      type: String,
      enum: Object.values(enumModel.EnumAssetTypeOfDeal),
      required: true,
    },
    /**
     * Loan amount to be requested. The assumption amount is in USD
     * */
    loanAmount: {
      type: String,
      required: true,
    },
    /**
     * Purpose of the loan
     * */
    loanPurpose: {
      type: String,
      enum: Object.values(enumModel.EnumLoanPurposeOfDeal),
      required: true,
    },
    /**
     * Type of loan
     * */
    loanType: {
      type: String,
      enum: Object.values(enumModel.EnumLoanTypeOfDeal),
    },
    /**
     * User creating the deal
     * */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    orderOfStage: {
      type: Number,
      min: 0,
      max: enumModel.EnumStageOfDeal.length,
      default: 5,
    },
    squareFootage: {
      type: String,
    },
    unitCount: {
      type: Number,
    },
    occupancy: {
      type: String,
    },
    details: {
      type: String,
      default: 'Waiting on initial information needed from borrower',
    },
    dealSummary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'DealSummary',
    },
    timeLine: {
      type: [TimeLineSchema],
      default: [{ stage: enumModel.EnumStageOfDeal.NEW, updatedAt: new Date() }],
    },
    loanInformation: [
      {
        key: {
          type: String,
        },
        value: {
          type: Schema.Types.Mixed,
        },
        type: {
          type: String,
          enum: Object.values(enumModel.EnumOfTypeOfValue),
        },
      },
    ],
    sponsor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Sponsor',
    },
  },
  { timestamps: { createdAt: true, updatedAt: true }, autoCreate: true }
);

DealSchema.virtual('notes', {
  ref: 'DealNotes',
  localField: '_id',
  foreignField: 'deal',
  justOne: false,
});

DealSchema.virtual('documents', {
  ref: 'DealDocument',
  localField: '_id',
  foreignField: 'deal',
  justOne: false,
});

DealSchema.virtual('task', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'deal',
  justOne: false,
});

// Lender now will only have 2 fields the date at which the deal received and the stage of the placement
DealSchema.virtual('lenderPlacement', {
  ref: 'LenderPlacement',
  localField: '_id',
  foreignField: 'deal',
  justOne: false,
});

// DealSchema.virtual('outstandingTaskCount', {
//   ref: 'Task',
//   localField: '_id',
//   foreignField: 'deal',
//   count: true,
//   match: { taskAnswer: { $exists: false } },
// });

DealSchema.virtual('outstandingTaskCount', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'deal',
  count: true,
  match: {
    $expr: {
      $or: [
        { $eq: ['$taskAnswer', []] }, // Check if taskAnswer is an empty array
        { $not: { $isArray: '$taskAnswer' } }, // Check if taskAnswer is not an array or non-existent
      ],
    },
  },
});

DealSchema.plugin(toJSON);
DealSchema.plugin(mongoosePaginateV2);
DealSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const DealModel = mongoose.models.Deal || mongoose.model('Deal', DealSchema, 'Deal');
module.exports = DealModel;
