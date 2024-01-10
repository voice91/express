"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
var _mongoosePaginateV = _interopRequireDefault(require("mongoose-paginate-v2"));
var _plugins = require("./plugins");
var _config = _interopRequireDefault(require("../config/config"));
var _excluded = ["createdAt"];
/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 * If you want to add the new fields to your schema then go to the app.appinvento.io,
 * select your project then select model and click on + icon to add new fields.
 * For more checkout the docs at "docs.appinvento.io/product-guides/create-a-new-collection-field"
 */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var LenderInstituteNotesSchema = new _mongoose["default"].Schema({
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
  content: {
    type: String
  },
  isPinned: {
    type: Boolean,
    "default": false
  },
  isFlagged: {
    type: Boolean
  },
  lenderInstitute: {
    type: _mongoose["default"].Schema.Types.ObjectId,
    ref: 'LendingInstitution',
    required: true
  },
  isEnabled: {
    type: Boolean,
    "default": true
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  },
  toJSON: {
    virtuals: true
  }
});
// TODO: we can pass var from option in place of taking update doc
// We don't want updatedAt to be changed when we pass the field isPinned and isFlagged as we are also sorting the notes by updatedAt field
LenderInstituteNotesSchema.pre('findOneAndUpdate', function (next) {
  var update = this.getUpdate();
  // in operator is used to check if the field 'isPinned' or 'isFlagged' exist in the update object
  if ('isPinned' in update || 'isFlagged' in update) {
    delete update.$set.updatedAt;
  }
  next();
});
// Define the toJSON transform method for the LenderInstituteNotesSchema options object
LenderInstituteNotesSchema.options.toJSON.transform = function (doc, _ref) {
  var createdAt = _ref.createdAt,
    ret = _objectWithoutProperties(_ref, _excluded);
  if (createdAt) {
    var timeDiff = Date.now() - createdAt.getTime();
    if (timeDiff >= _config["default"].disabledTimeForNotes) {
      // Set isEnabled property to false
      // eslint-disable-next-line no-param-reassign
      ret.isEnabled = false;
    }
  }
  // Return the ret object
  return ret;
};
LenderInstituteNotesSchema.plugin(_plugins.toJSON);
LenderInstituteNotesSchema.plugin(_mongoosePaginateV["default"]);
LenderInstituteNotesSchema.plugin(_plugins.softDelete, {
  isSoftDeleteAddon: true,
  overrideMethods: 'all',
  deleted: 'isDeleted',
  deletedBy: 'deletedBy',
  deletedAt: 'deletedAt'
});
var LenderInstituteNotesModel = _mongoose["default"].models.LenderInstituteNotes || _mongoose["default"].model('LenderInstituteNotes', LenderInstituteNotesSchema, 'LenderInstituteNotes');
module.exports = LenderInstituteNotesModel;