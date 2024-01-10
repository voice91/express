import httpStatus from 'http-status';
import ApiError from "./ApiError";

// eslint-disable-next-line import/no-extraneous-dependencies
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
export const encryptResponseData = (plainText, password) => {
  try {
    // Generate a random IV (Initialization Vector)
    const iv = CryptoJS.lib.WordArray.random(16);

    // Derive an encryption key from the provided password using SHA-256 hashing
    const key = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64).substring(0, 32);

    // Convert plain text to UTF-8 encoded WordArray object
    const encrypted = CryptoJS.AES.encrypt(plainText, CryptoJS.enc.Base64.parse(key), {
      iv,
      mode: CryptoJS.mode.CBC
    });

    // Convert IV and encrypted data to hex strings
    const ivHex = iv.toString(CryptoJS.enc.Hex);
    const encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);

    // Return IV and encrypted data as a single string, separated by a colon
    return `${ivHex}:${encryptedHex}`;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Error in encrypt text : ${error.message}`);
  }
};
export const decryptRequestData = (encryptedData, password) => {
  try {
    // Split the encrypted data into IV and ciphertext
    const [ivHex, encryptedHex] = encryptedData.split(':');

    // Parse IV and ciphertext from hex strings
    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const ciphertext = CryptoJS.enc.Hex.parse(encryptedHex);

    // Derive the encryption key from the provided password using SHA-256 hashing
    const key = CryptoJS.SHA256(password).toString(CryptoJS.enc.Base64).substring(0, 32);

    // Decrypt the ciphertext using the key and IV
    const decrypted = CryptoJS.AES.decrypt({
      ciphertext
    }, CryptoJS.enc.Base64.parse(key), {
      iv,
      mode: CryptoJS.mode.CBC
    });

    // Convert the decrypted data to a UTF-8 encoded string
    const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);

    // Return the decrypted text
    return decryptedText;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Error in decrypt text : ${error.message}`);
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
export const encrypt = (plainText, password) => {
  try {
    // Generate a random initialization vector (IV) with 16 bytes of data.
    const iv = crypto.randomBytes(16);

    // Derive an encryption key from the provided password using SHA-256 hashing.
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);

    // Create a cipher object for AES-256-CBC encryption, using the derived key and IV.
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    // Encrypt the plainText using the cipher.
    let encrypted = cipher.update(plainText);

    // Finalize the encryption process and append the result to the encrypted data.
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    // Return the IV and encrypted data as a single string, separated by a colon.
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Error in encrypt text : ${error.message}`);
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
export const decrypt = (encryptedText, password) => {
  try {
    // Split the input encrypted text into two parts: IV and EncryptedData, separated by a colon.
    const textParts = encryptedText.split(':');

    // Parse the IV (Initialization Vector) from its hexadecimal representation
    const iv = Buffer.from(textParts.shift(), 'hex');

    // Parse the encrypted data from its hexadecimal representation.
    const encryptedData = Buffer.from(textParts.join(':'), 'hex');

    // Derive a decryption key from the provided password using SHA-256 hashing.
    const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);

    // Create a decipher object for AES-256-CBC decryption, using the derived key and IV.
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const decrypted = decipher.update(encryptedData);
    const decryptedText = Buffer.concat([decrypted, decipher.final()]);

    // Convert the decrypted binary data to a string and return it as the plain text.
    return decryptedText.toString();
  } catch (error) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Error in decrypt text : ${error.message}`);
  }
};