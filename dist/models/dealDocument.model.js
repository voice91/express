"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var _enum = _interopRequireDefault(require("./enum.model"));
var _plugins = require("./plugins");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */

var documentSchema = new _mongoose["default"].Schema({
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
  },
  documentType: {
    type: String,
    "enum": Object.values(_enum["default"].EnumDocumentTypeOfDealDocument),
    // required: true,
    "default": _enum["default"].EnumDocumentTypeOfDealDocument.OTHERS
  },
  fileDescription: {
    type: String
  },
  uploadedBy: {
    type: String,
    "enum": Object.values(_enum["default"].EnumRoleOfUser)
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
});
var DealDocumentSchema = new _mongoose["default"].Schema({
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
  documents: {
    type: [documentSchema]
  },
  deal: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'Deal',
    required: true
  },
  fileDescription: {
    type: String
  },
  comment: {
    type: String
  },
  isAddRecommendedFile: {
    type: Boolean,
    "default": false
  },
  uploadedBy: {
    type: String,
    "enum": Object.values(_enum["default"].EnumRoleOfUser)
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  autoCreate: true
});
DealDocumentSchema.plugin(_plugins.toJSON);
DealDocumentSchema.plugin(_mongoosePaginateV["default"]);
DealDocumentSchema.plugin(_plugins.softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt'
});
var DealDocumentModel = _mongoose["default"].models.DealDocument || _mongoose["default"].model('DealDocument', DealDocumentSchema, 'DealDocument');
module.exports = DealDocumentModel;