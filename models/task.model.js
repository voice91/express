/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
import mongoose from 'mongoose';
import mongoosePaginateV2 from 'mongoose-paginate-v2';
import { toJSON, softDelete } from './plugins';

const TaskSchema = new mongoose.Schema(
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
     * Free text questions, prompts or to-do from a lender or advisor
     * */
    taskQuestion: {
      type: String,
      required: true,
    },
    /**
     * Question from the advisor(user collection table)
     * */
    askingParty: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    /**
     * Free text response, from the borrower (the advisor can also answer on behalf of the borrower)
     * */
    taskAnswer: {
      type: String,
    },
    /**
     * List of documents that pertain to the question, that borrower and advisor can upload and all can download/view
     * */
    taskDocuments: {
      type: [String],
    },
    deal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Deal',
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: { createdAt: true, updatedAt: true }, autoCreate: true }
);
TaskSchema.plugin(toJSON);
TaskSchema.plugin(mongoosePaginateV2);
TaskSchema.plugin(softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt',
});
const TaskModel = mongoose.models.Task || mongoose.model('Task', TaskSchema, 'Task');
module.exports = TaskModel;
