/*!
 *
 * E-goi - Web Push Services
 *
 * JavaScript WebPush client
 *
 * @date 08-02-2021 16:36:00
 * @License Proprietary
 * @Version 1.0
 *
 * All rights reserved. 2021
 *
 */
importScripts('https://cdn-static-96.dev-egoiapp2.com/' + 'js/egoiSDK.min.js');
importScripts(
    `https://www.gstatic.com/firebasejs/${EgoiSDK.FIREBASE_VERSION}/firebase-app-compat.js`,
    `https://www.gstatic.com/firebasejs/${EgoiSDK.FIREBASE_VERSION}/firebase-messaging-compat.js`,
);

'use strict';
const egoiSDK = new EgoiSDK({"apiKey":"AIzaSyB_VqBGJQ6hr43OVPT95QxNDVSEWRseh2U","projectId":"egoi-web-push","messagingSenderId":"938265814124","appId":"1:938265814124:web:ad448a9d0d5fe9e339a449"}, true);

self.addEventListener('install', () => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
    egoiSDK.handleNotificationClick(event);
});
