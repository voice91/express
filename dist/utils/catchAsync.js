"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchAsync = void 0;
// eslint-disable-next-line import/prefer-default-export
var catchAsync = exports.catchAsync = function catchAsync(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next))["catch"](function (err) {
      return next(err);
    });
  };
};