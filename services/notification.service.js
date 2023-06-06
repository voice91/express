/**
 * This file is generated by Appinvento, also it can be overwritten by Appinvento.
 */
import admin from 'firebase-admin';
import { Notifications } from '../models';
// TODO: uncomment this line and create FirebaseJson
const serviceAccount = require('../config/firebase.json');

const notificationOptions = {
  priority: 'high',
};
/**
 * intializing the firebase messaging service (push notification)
 */
const messaging = admin
  .initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
  .messaging();
/* eslint-disable */
export const verifyFCMToken = async (fcmToken) => {
  try {
    const isValid = await messaging.send(
      {
        token: fcmToken,
      },
      true
    );
    return isValid;
  } catch (er) {}
};

/* eslint-enable */
/**
 * Send an Notification
 * @param {string || string[]} deviceToken
 * @param {Object} message
 * @param {string} options
 * @returns {Promise}
 */
export const sendNotification = async (deviceToken, message, options = {}) => {
  return messaging.sendToDevice(deviceToken, message, { ...notificationOptions, ...options });
};

export async function createNotification(body) {
  const notification = await Notifications.create(body);
  return notification;
}

export async function getNotificationList(filter, options = {}) {
  const notification = await Notifications.find(filter, options.projection, options);
  return notification;
}
