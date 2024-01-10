"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : String(i); }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var Schema = _mongoose["default"].Schema;
var Model = _mongoose["default"].Model;
function parseUpdateArguments(conditions, doc, options, callbackFunc) {
  var callback = callbackFunc;
  var condition = conditions;
  var document = doc;
  var option = options;
  if (typeof option === 'function') {
    // .update(conditions, doc, callback)
    callback = option;
    option = null;
  } else if (typeof document === 'function') {
    // .update(doc, callback);
    callback = document;
    document = condition;
    condition = {};
    option = null;
  } else if (typeof condition === 'function') {
    // .update(callback)
    callback = condition;
    condition = undefined;
    document = undefined;
    option = undefined;
  } else if (_typeof(condition) === 'object' && !document && !option && !callback) {
    // .update(doc)
    document = condition;
    condition = undefined;
    option = undefined;
    callback = undefined;
  }
  var args = [];
  if (condition) args.push(condition);
  if (document) args.push(document);
  if (option) args.push(option);
  if (callback) args.push(callback);
  return args;
}
function parseIndexFields(options) {
  var deleted = options.deleted,
    deletedAt = options.deletedAt,
    deletedBy = options.deletedBy;
  var indexFields = _defineProperty(_defineProperty(_defineProperty({}, deleted, false), deletedAt, false), deletedBy, false);
  if (!options.indexFields) {
    return indexFields;
  }
  if ((typeof options.indexFields === 'string' || options.indexFields instanceof String) && options.indexFields === 'all') {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (var item in indexFields) {
      indexFields[item] = true;
    }
  }
  if (typeof options.indexFields === 'boolean' && options.indexFields === true) {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (var _item in indexFields) {
      indexFields[_item] = true;
    }
  }
  if (Array.isArray(options.indexFields)) {
    indexFields[deleted] = options.indexFields.indexOf(deleted) > -1;
    indexFields[deletedAt] = options.indexFields.indexOf(deletedAt) > -1;
    indexFields[deletedBy] = options.indexFields.indexOf(deletedBy) > -1;
  }
  return indexFields;
}
function createSchemaObject(typeKey, typeValue, options) {
  var option = options;
  option[typeKey] = typeValue;
  return option;
}
/* eslint-disable-next-line prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable-next-line prefer-rest-params */
module.exports = function (schema, options) {
  options = options || {};
  var indexFields = parseIndexFields(options);
  var _options = options,
    deleted = _options.deleted,
    deletedAt = _options.deletedAt,
    deletedBy = _options.deletedBy;
  var typeKey = schema.options.typeKey;
  var mongooseMajorVersion = +_mongoose["default"].version[0]; // 4, 5...
  var mainUpdateMethod = mongooseMajorVersion < 5 ? 'update' : 'updateMany';
  var mainUpdateWithDeletedMethod = "".concat(mainUpdateMethod, "WithDeleted");
  function updateDocumentsByQuery(model, conditions, updateQuery, callback) {
    if (model[mainUpdateWithDeletedMethod]) {
      return model[mainUpdateWithDeletedMethod](conditions, updateQuery, {
        multi: true
      }, callback);
    }
    return model[mainUpdateMethod](conditions, updateQuery, {
      multi: true
    }, callback);
  }
  if (options.deleted) {
    schema.add(_defineProperty({}, deleted, createSchemaObject(typeKey, Boolean, {
      "default": false,
      index: indexFields[deleted]
    })));
  }
  if (options.deletedAt) {
    schema.add(_defineProperty({}, deletedAt, createSchemaObject(typeKey, Date, {
      "default": Date.now(),
      index: indexFields[deletedAt]
    })));
  }
  if (options.deletedBy) {
    schema.add(_defineProperty({}, deletedBy, createSchemaObject(typeKey, options.deletedByType || Schema.Types.ObjectId, {
      index: indexFields[deletedBy]
    })));
  }
  var use$neOperator = true;
  if (options.use$neOperator !== undefined && typeof options.use$neOperator === 'boolean') {
    use$neOperator = options.use$neOperator;
  }
  schema.pre('save', function (next) {
    if (!this[deleted]) {
      this[deleted] = false;
    }
    next();
  });
  if (options.overrideMethods) {
    var overrideItems = options.overrideMethods;
    var overridableMethods = ['count', 'countDocuments', 'find', 'findOne', 'findOneAndUpdate', 'update', 'updateOne', 'updateMany', 'aggregate'];
    var finalList = [];
    if ((typeof overrideItems === 'string' || overrideItems instanceof String) && overrideItems === 'all') {
      finalList = overridableMethods;
    }
    if (typeof overrideItems === 'boolean' && overrideItems === true) {
      finalList = overridableMethods;
    }
    if (Array.isArray(overrideItems)) {
      overrideItems.forEach(function (method) {
        if (overridableMethods.indexOf(method) > -1) {
          finalList.push(method);
        }
      });
    }
    if (finalList.indexOf('aggregate') > -1) {
      schema.pre('aggregate', function () {
        var firsMatchStr = JSON.stringify(this.pipeline()[0]);
        if (firsMatchStr !== "{\"$match\":{\"".concat(deleted, "\":{\"$ne\":false}}}")) {
          if (firsMatchStr === '{"$match":{"showAllDocuments":"true"}}') {
            this.pipeline().shift();
          } else {
            this.pipeline().unshift({
              $match: _defineProperty({}, deleted, {
                $ne: true
              })
            });
          }
        }
      });
    }
    finalList.forEach(function (method) {
      if (['count', 'countDocuments', 'find', 'findOne'].indexOf(method) > -1) {
        var modelMethodName = method;
        // countDocuments do not exist in Mongoose v4
        /* istanbul ignore next */
        if (mongooseMajorVersion < 5 && method === 'countDocuments' && typeof Model.countDocuments !== 'function') {
          modelMethodName = 'count';
        }
        schema.statics[method] = function () {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          var query = Model[modelMethodName].apply(this, args);
          if (!args[2] || args[2].withDeleted !== true) {
            if (use$neOperator) {
              query.where("".concat(deleted)).ne(true);
            } else {
              query.where(_defineProperty({}, deleted, false));
            }
          }
          return query;
        };
        schema.statics["".concat(method, "Deleted")] = function () {
          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }
          if (use$neOperator) {
            return Model[modelMethodName].apply(this, args).where("'".concat(deleted, "'")).ne(false);
          }
          return Model[modelMethodName].apply(this, args).where(_defineProperty({}, deleted, true));
        };
        schema.statics["".concat(method, "WithDeleted")] = function () {
          for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            args[_key3] = arguments[_key3];
          }
          return Model[modelMethodName].apply(this, args);
        };
      } else if (method === 'aggregate') {
        schema.statics["".concat(method, "Deleted")] = function () {
          var args = [];
          for (var _len4 = arguments.length, arg = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
            arg[_key4] = arguments[_key4];
          }
          Array.prototype.push.apply(args, arg);
          var match = {
            $match: _defineProperty({}, deleted, {
              $ne: false
            })
          };
          // eslint-disable-next-line no-unused-expressions
          arg.length ? args[0].unshift(match) : args.push([match]);
          return Model[method].apply(this, args);
        };
        schema.statics["".concat(method, "WithDeleted")] = function () {
          var args = [];
          for (var _len5 = arguments.length, arg = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
            arg[_key5] = arguments[_key5];
          }
          Array.prototype.push.apply(args, arg);
          var match = {
            $match: {
              showAllDocuments: 'true'
            }
          };
          // eslint-disable-next-line no-unused-expressions
          arg.length ? args[0].unshift(match) : args.push([match]);
          return Model[method].apply(this, args);
        };
      } else {
        schema.statics[method] = function () {
          for (var _len6 = arguments.length, arg = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
            arg[_key6] = arguments[_key6];
          }
          // eslint-disable-next-line prefer-spread
          var args = parseUpdateArguments.apply(undefined, arg);
          if (use$neOperator) {
            args[0][deleted] = {
              $ne: true
            };
          } else {
            args[0][deleted] = false;
          }
          return Model[method].apply(this, args);
        };
        schema.statics["".concat(method, "Deleted")] = function () {
          for (var _len7 = arguments.length, arg = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
            arg[_key7] = arguments[_key7];
          }
          // eslint-disable-next-line prefer-spread
          var args = parseUpdateArguments.apply(undefined, arg);
          if (use$neOperator) {
            args[0][deleted] = {
              $ne: false
            };
          } else {
            args[0][deleted] = true;
          }
          return Model[method].apply(this, args);
        };
        schema.statics["".concat(method, "WithDeleted")] = function () {
          for (var _len8 = arguments.length, arg = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
            arg[_key8] = arguments[_key8];
          }
          return Model[method].apply(this, arg);
        };
      }
    });
  }
  schema.methods["delete"] = function (deleteBy, cb) {
    if (typeof deleteBy === 'function') {
      cb = deleteBy;
      deleteBy = null;
    }
    this[deleted] = true;
    if (schema.path(deletedAt)) {
      this[deletedAt] = new Date();
    }
    if (schema.path(deletedBy)) {
      this[deletedBy] = deleteBy;
    }
    if (options.validateBeforeDelete === false) {
      return this.save({
        validateBeforeSave: false
      }, cb);
    }
    return this.save(cb);
  };
  schema.statics["delete"] = function (conditions, deleteBy, callback) {
    if (typeof deleteBy === 'function') {
      callback = deleteBy;
      // eslint-disable-next-line no-self-assign
      conditions = conditions;
      deleteBy = null;
    } else if (typeof conditions === 'function') {
      callback = conditions;
      conditions = {};
      deleteBy = null;
    }
    var doc = _defineProperty({}, deleted, true);
    if (schema.path(deletedAt)) {
      doc[deletedAt] = new Date();
    }
    if (schema.path(deletedBy)) {
      doc[deletedBy] = deleteBy;
    }
    return updateDocumentsByQuery(this, conditions, doc, callback);
  };
  schema.statics.deleteById = function (id, deleteBy, callback) {
    if (arguments.length === 0 || typeof id === 'function') {
      var msg = 'First argument is mandatory and must not be a function.';
      throw new TypeError(msg);
    }
    var conditions = {
      _id: id
    };
    return this["delete"](conditions, deleteBy, callback);
  };
  schema.methods.restore = function (callback) {
    this[deleted] = false;
    this[deletedAt] = undefined;
    this[deletedBy] = undefined;
    return this.save(callback);
  };
  schema.statics.restore = function (conditions, callback) {
    if (typeof conditions === 'function') {
      callback = conditions;
      conditions = {};
    }
    var doc = _defineProperty(_defineProperty(_defineProperty({}, deleted, false), deletedAt, undefined), deletedBy, undefined);
    return updateDocumentsByQuery(this, conditions, doc, callback);
  };
};