"use strict";

/* eslint-disable no-param-reassign */
/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */
var toJSON = function toJSON(schema) {
  var _transform;
  if (schema.options.toJSON && schema.options.toJSON.transform) {
    _transform = schema.options.toJSON.transform;
  }
  schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
    transform: function transform(doc, ret, options) {
      Object.keys(schema.paths).forEach(function (path) {
        if (schema.paths[path].options && schema.paths[path].options["private"]) {
          delete ret[path];
        }
      });
      ret.id = ret._id ? ret._id.toString() : ret.id;
      delete ret._id;
      delete ret.__v;
      // delete ret.createdAt;
      // delete ret.updatedAt;
      if (_transform) {
        return _transform(doc, ret, options);
      }
    },
    virtuals: true
  });
};
module.exports = toJSON;