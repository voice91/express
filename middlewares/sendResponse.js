import { encrypt } from 'utils/encrypt-decrypt-text';
import config from '../config/config';

function sendResponse(req, res, next) {
  const response = res.send;
  res.send = function (originalData) {
    let proxySend = {};
    if (originalData.error) {
      // eslint-disable-next-line prefer-rest-params
      proxySend = {
        status: 'Failure',
        code: originalData.code,
        message: originalData.message,
        stack: originalData.stack,
      };
    } else if (originalData.results) {
      // eslint-disable-next-line prefer-rest-params
      proxySend = { status: 'Success', data: originalData.results };
      //
    }
    // If dataEncryption is enabled then ,encrypt the response before sending to FE else send response as it is.
    // eslint-disable-next-line prefer-rest-params
    arguments[0] = config.dataEncryption ? encrypt(JSON.stringify(proxySend), config.encryptionPassword) : proxySend;
    // eslint-disable-next-line prefer-rest-params
    response.apply(res, arguments);
  };
  next();
}
export default sendResponse;
