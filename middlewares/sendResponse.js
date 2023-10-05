import { encrypt } from 'utils/encrypt-decrypt-text';
import config from '../config/config';

function sendResponse(req, res, next) {
  const response = res.send;
  res.send = function (originalData) {
    if (originalData.error) {
      // eslint-disable-next-line prefer-rest-params
      arguments[0] = {
        status: 'Failure',
        code: originalData.code,
        message: originalData.message,
        stack: originalData.stack,
      };
    } else if (originalData.results) {
      // eslint-disable-next-line prefer-rest-params
      arguments[0] = { status: 'Success', data: originalData.results };
    }
    // If dataEncryption is enabled then ,encrypt the response before sending
    if (config.dataEncryption) {
      // eslint-disable-next-line prefer-rest-params
      arguments[0] = encrypt(JSON.stringify(arguments[0]), config.encryptionPassword);
    }
    // eslint-disable-next-line prefer-rest-params
    response.apply(res, arguments);
  };
  next();
}
export default sendResponse;
