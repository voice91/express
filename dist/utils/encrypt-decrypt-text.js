"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encryptResponseData = exports.encrypt = exports.decryptRequestData = exports.decrypt = void 0;
var _httpStatus = _interopRequireDefault(require("http-status"));
var _ApiError = _interopRequireDefault(require("./ApiError"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// eslint-disable-next-line import/no-extraneous-dependencies
var CryptoJS = require('crypto-js');
var crypto = require('crypto');
var encryptResponseData = exports.encryptResponseData = function encryptResponseData(plainText, password) {
  try {
    // Generate a random IV (Initialization Vector)
    var iv = CryptoJS.lib.WordArray.random(16);

    // Derive an encryption key from the provided password using SHA-256 hashing
    var key = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64).substring(0, 32);

    // Convert plain text to UTF-8 encoded WordArray object
    var encrypted = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Base64.parse(key), {
      iv: iv,
      mode: CryptoJS.mode.CBC
    });

    // Convert IV and encrypted data to hex strings
    var ivHex = iv.toString(CryptoJS.enc.Hex);
    var encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

    // Return IV and encrypted data as a single string, separated by a colon
    return "".concat(ivHex, ":").concat(encryptedHex);
  } catch (error) {
    throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "Error in encrypt text : ".concat(error.message));
  }
};
var decryptRequestData = exports.decryptRequestData = function decryptRequestData(encryptedData, password) {
  try {
    // Split the encrypted data into IV and ciphertext
    var _encryptedData$split = encryptedData.split(':'),
      _encryptedData$split2 = _slicedToArray(_encryptedData$split, 2),
      ivHex = _encryptedData$split2[0],
      encryptedHex = _encryptedData$split2[1];

    // Parse IV and ciphertext from hex strings
    var iv = CryptoJS.enc.Hex.parse(ivHex);
    var ciphertext = CryptoJS.enc.Hex.parse(encryptedHex);

    // Derive the encryption key from the provided password using SHA-256 hashing
    var key = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64).substring(0, 32);

    // Decrypt the ciphertext using the key and IV
    var decrypted = CryptoJS.AES.decrypt({
      ciphertext: ciphertext
    }, CryptoJS.enc.Base64.parse(key), {
      iv: iv,
      mode: CryptoJS.mode.CBC
    });

    // Convert the decrypted data to a UTF-8 encoded string
    var decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    // Return the decrypted text
    return decryptedText;
  } catch (error) {
    throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "Error in decrypt text : ".concat(error.message));
  }
};

/**
 * Encrypts the given plain text using AES-256-CBC encryption.
 *
 * @param {string} plainText - The plain text to be encrypted.
 * @param {string} password - The password used for encryption key derivation.
 * @returns {string} - The encrypted text in the format "IV:EncryptedData".
 * @throws {ApiError} - Throws a custom error with a status code if encryption fails.
 */
var encrypt = exports.encrypt = function encrypt(plainText, password) {
  try {
    // Generate a random initialization vector (IV) with 16 bytes of data.
    var iv = crypto.randomBytes(16);

    // Derive an encryption key from the provided password using SHA-256 hashing.
    var key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);

    // Create a cipher object for AES-256-CBC encryption, using the derived key and IV.
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Encrypt the plainText using the cipher.
    var encrypted = cipher.update(plainText);

    // Finalize the encryption process and append the result to the encrypted data.
    encrypted = Buffer.concat([encrypted, cipher["final"]()]);

    // Return the IV and encrypted data as a single string, separated by a colon.
    return "".concat(iv.toString('hex'), ":").concat(encrypted.toString('hex'));
  } catch (error) {
    throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "Error in encrypt text : ".concat(error.message));
  }
};

/**
 * Decrypts the given encrypted text using AES-256-CBC decryption.
 *
 * @param {string} encryptedText - The encrypted text in the format "IV:EncryptedData".
 * @param {string} password - The password used for decryption key derivation.
 * @returns {string} - The decrypted plain text.
 * @throws {ApiError} - Throws a custom error with a status code if decryption fails.
 */
var decrypt = exports.decrypt = function decrypt(encryptedText, password) {
  try {
    // Split the input encrypted text into two parts: IV and EncryptedData, separated by a colon.
    var textParts = encryptedText.split(':');

    // Parse the IV (Initialization Vector) from its hexadecimal representation
    var iv = Buffer.from(textParts.shift(), 'hex');

    // Parse the encrypted data from its hexadecimal representation.
    var encryptedData = Buffer.from(textParts.join(':'), 'hex');

    // Derive a decryption key from the provided password using SHA-256 hashing.
    var key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);

    // Create a decipher object for AES-256-CBC decryption, using the derived key and IV.
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    var decrypted = decipher.update(encryptedData);
    var decryptedText = Buffer.concat([decrypted, decipher["final"]()]);

    // Convert the decrypted binary data to a string and return it as the plain text.
    return decryptedText.toString();
  } catch (error) {
    throw new _ApiError["default"](_httpStatus["default"].BAD_REQUEST, "Error in decrypt text : ".concat(error.message));
  }
};