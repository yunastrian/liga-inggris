var webPush = require('web-push');
     
const vapidKeys = {
  "publicKey": "BBhDq8LCZTYhZRAIV_vovAD9z_rWgzYEWz-TlNG3LjaqOEPfTc_57yEQ_j4aFvxiwyNoKcg2cBJCuIfMXWc5ar0",
  "privateKey": "HH4xCsSQdZiAAgB_r4A5XC0EvC3MQDhgAVFvw4XuAOw"
};
 
webPush.setVapidDetails(
  'mailto:example@yourdomain.org',
  vapidKeys.publicKey,
  vapidKeys.privateKey
)
var pushSubscription = {
  "endpoint": "https://fcm.googleapis.com/fcm/send/fjmGSXYzJOM:APA91bG_6BTtqsgL4utU9LZ6ZTnbjfpFKnnkQQkzJoFpqa4yqg3qKRmOJrmln0m8HJZC3HUcUhx79rL2x7auGx1C4gBsYupSC_ihQY-aEo7bNHwB7C-syGKCE7m6WOY7Vp8DVSUITsek",
  "keys": {
    "p256dh": "BEAPGQ541hEb9yL8aOa0QV65iDBOLpvP443VaDHaLbVaOTUpso/dclUG9MKb6/4QAGlKECus/wZDa2mv5GMLNOc=",
    "auth": "x/Mme/P3WddWxQlnSI8gFQ=="
  }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
  gcmAPIKey: '477805357638',
  TTL: 60
};
webPush.sendNotification(
  pushSubscription,
  payload,
  options
);