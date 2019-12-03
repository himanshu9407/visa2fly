const skipWaiting = () => self.skipWaiting();
const unregister = (event) => {
  event.waitUntil(self.clients.claim());

  self.registration.unregister()
    .then(() =>
      console.log('Unregistered old service worker'));
};

self.addEventListener('install', skipWaiting);
self.addEventListener('activate', unregister);