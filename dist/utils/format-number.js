"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatStripeAmount = formatStripeAmount;
exports.formatUSD = formatUSD;
function formatUSD(stripeAmount) {
  return "$".concat((stripeAmount / 100).toFixed(2));
}
function formatStripeAmount(USDString) {
  return parseFloat(USDString) * 100;
}