"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var _plugins = require("./plugins");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */

var TaskDocumentSchema = new _mongoose["default"].Schema({
  url: {
    type: String,
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileType: {
    type: String
  }
});
var TaskAnswerSchema = new _mongoose["default"].Schema({
  answer: {
    type: String
  },
  receivedAt: {
    type: Date,
    "default": new Date()
  },
  answeredBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  taskDocuments: {
    type: [TaskDocumentSchema]
  },
  fileDescription: {
    type: String
  },
  comment: {
    type: String
  }
});
var TaskSchema = new _mongoose["default"].Schema({
  /**
   * created By
   * */
  createdBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  /**
   * updated By
   * */
  updatedBy: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  /**
   * Free text questions, prompts or to-do from a lender or advisor
   * */
  taskQuestion: {
    type: String,
    required: true
  },
  /**
   * Question from the advisor(user collection table)
   * */
  askingPartyAdvisor: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  askingPartyInstitute: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'LendingInstitution'
  },
  /**
   * Free text response, from the borrower (the advisor can also answer on behalf of the borrower)
   * */
  taskAnswer: {
    type: [TaskAnswerSchema]
  },
  /**
   * List of documents that pertain to the question, that borrower and advisor can upload and all can download/view
   * */
  taskDocuments: {
    type: [TaskDocumentSchema]
  },
  deal: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Deal',
    required: true
  },
  user: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'User'
  },
  isCompleted: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  autoCreate: true
});
TaskSchema.plugin(_plugins.toJSON);
TaskSchema.plugin(_mongoosePaginateV["default"]);
TaskSchema.plugin(_plugins.softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt'
});
var TaskModel = _mongoose["default"].models.Task || _mongoose["default"].model('Task', TaskSchema, 'Task');
module.exports = TaskModel;