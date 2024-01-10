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

var FeedbackSchema = new _mongoose["default"].Schema({
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
   * Subject of Feedback
   * */
  subject: {
    type: String,
    required: true
  },
  /**
   * Description of Feedback
   * */
  description: {
    type: String,
    required: true
  },
  /**
   * Images for Feedback
   * */
  images: [{
    fileName: String,
    path: String,
    fileType: String
  }]
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  autoCreate: true
});
FeedbackSchema.plugin(_plugins.toJSON);
FeedbackSchema.plugin(_mongoosePaginateV["default"]);
FeedbackSchema.plugin(_plugins.softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt'
});
var FeedbackModel = _mongoose["default"].models.Feedback || _mongoose["default"].model('Feedback', FeedbackSchema, 'Feedback');
module.exports = FeedbackModel;