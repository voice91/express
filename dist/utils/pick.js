"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pick = void 0;
/**
 * Create an object composed of the picked object properties
 * @param {Object} object
 * @param {string[]} keys
 * @returns {Object}
 */
// eslint-disable-next-line import/prefer-default-export
var pick = exports.pick = function pick(object, keys) {
  return keys.reduce(function (obj, key) {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      // eslint-disable-next-line no-param-reassign
      obj[key] = object[key];
    }
    return obj;
  }, {});
};